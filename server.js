// server.js
import 'dotenv/config'; // dotenv otomatik olarak yüklenir
import express from 'express';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// __dirname çözümü ESM için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// TCMB API key
const TCMB_KEY = process.env.TCMB_KEY;
if (!TCMB_KEY) console.warn("⚠️ TCMB_KEY environment variable ayarlanmamış!");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Frontend route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API proxy route
app.get('/api/fiyatlar', async (req, res) => {
  try {
    // 1️⃣ TCMB Döviz Kurları
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const dateStr = `${dd}-${mm}-${yyyy}`;

    const tcmbUrl = `https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.S.YTL-TP.DK.EUR.S.YTL-TP.DK.GBP.S.YTL&startDate=${dateStr}&endDate=${dateStr}&type=json&formulas=0-0-0&aggregationTypes=avg-avg-avg&frequency=1`;

    const tcmbRes = await fetch(tcmbUrl, { headers: { key: TCMB_KEY } });
    const tcmbData = await tcmbRes.json();

    let dolar, euro, sterlin;
    if (tcmbData?.items?.length) {
      const latest = tcmbData.items[tcmbData.items.length - 1];
      dolar = latest.TP_DK_USD_S_YTL;
      euro = latest.TP_DK_EUR_S_YTL;
      sterlin = latest.TP_DK_GBP_S_YTL;
    }

    // 2️⃣ İzmir Kuyumcular ONS / Gram Altın
    const altinRes = await fetch("https://www.izko.org.tr/Home/GuncelKur");
    const altinHtml = await altinRes.text();
    const match = altinHtml.match(/<font id="ons"[^>]*>([\d.,]+)<\/font>/);
    let ons, gramAltin;
    if (match) {
      ons = parseFloat(match[1].replace(",", "."));
      gramAltin = (ons / 31.1035).toFixed(2);

    }

    // 3️⃣ Binance BTC / ETH (TRY)
    const binanceRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["ETHTRY","BTCTRY"]');
    const binanceData = await binanceRes.json();

    let btcPrice, ethPrice;
    binanceData.forEach(coin => {
      const price = parseFloat(coin.price).toFixed(2);
      if (coin.symbol === 'BTCTRY') btcPrice = price;
      else if (coin.symbol === 'ETHTRY') ethPrice = price;
    });

    const gramAltinTL = dolar && gramAltin ? (parseFloat(gramAltin) * parseFloat(dolar)).toFixed(2) : null;
    const ceyrekAltinTL = gramAltinTL ? (parseFloat(gramAltinTL) * 0.25 * 7).toFixed(2) : null; // 1 çeyrek = 1.75 gr, gramAltınTL zaten TL
    const yarimAltinTL = gramAltinTL ? (parseFloat(gramAltinTL) * 0.5 * 7).toFixed(2) : null; // 1 yarım = 3.5 gr
    const tamAltinTL = gramAltinTL ? (parseFloat(gramAltinTL) * 1 * 7).toFixed(2) : null; // 1 tam = 7 gr

    res.json({
      dolar,
      euro,
      sterlin,
      gramAltinTL,
      ceyrekAltinTL,
      yarimAltinTL,
      tamAltinTL,
      btcPrice,
      ethPrice
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Veri alınamadı' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
