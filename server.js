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

let fiyatlarCache = null;
let lastFetchTime = 0;
let previousValues = null;

function getArrow(newVal, oldVal) {
    if (oldVal === undefined || newVal === null || newVal === '-') return '';
    if (parseFloat(newVal) > parseFloat(oldVal)) return 'up';
    if (parseFloat(newVal) < parseFloat(oldVal)) return 'down';
    return '';
}

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, { ...options, timeout: 10000 });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.error(`TCMB fetch deneme ${i + 1} hata:`, err.message);
            if (i === retries - 1) return null;
        }
    }
    return null;
}

async function fetchFiyatlar() {
    try {
        // TCMB Döviz Kurları için tarih hesaplama
        const now = new Date();
        let tcmbDate = new Date(now);
        if (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() >= 30)) {
            tcmbDate.setDate(tcmbDate.getDate() + 1); // 19:30'dan sonra bir sonraki gün
        }
        const dd = String(tcmbDate.getDate()).padStart(2, '0');
        const mm = String(tcmbDate.getMonth() + 1).padStart(2, '0');
        const yyyy = tcmbDate.getFullYear();
        const dateStr = `${dd}-${mm}-${yyyy}`;

        const tcmbUrl = `https://evds2.tcmb.gov.tr/service/evds/series=TP.DK.USD.S.YTL-TP.DK.EUR.S.YTL-TP.DK.GBP.S.YTL&startDate=${dateStr}&endDate=${dateStr}&type=json&formulas=0-0-0&aggregationTypes=avg-avg-avg&frequency=1`;

        const tcmbData = await fetchWithRetry(tcmbUrl, { headers: { key: TCMB_KEY } }, 3);
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

        // Arrow bilgisi oluştur
        const arrows = {};
        if (previousValues) {
            arrows.dolar = getArrow(dolar, previousValues.dolar);
            arrows.euro = getArrow(euro, previousValues.euro);
            arrows.sterlin = getArrow(sterlin, previousValues.sterlin);
            arrows.gramAltinTL = getArrow(gramAltinTL, previousValues.gramAltinTL);
            arrows.ceyrekAltinTL = getArrow(ceyrekAltinTL, previousValues.ceyrekAltinTL);
            arrows.yarimAltinTL = getArrow(yarimAltinTL, previousValues.yarimAltinTL);
            arrows.tamAltinTL = getArrow(tamAltinTL, previousValues.tamAltinTL);
            arrows.btcPrice = getArrow(btcPrice, previousValues.btcPrice);
            arrows.ethPrice = getArrow(ethPrice, previousValues.ethPrice);
        } else {
            // İlk veri çekildiğinde arrow'lar 'none' olsun
            arrows.dolar = arrows.euro = arrows.sterlin = arrows.gramAltinTL =
            arrows.ceyrekAltinTL = arrows.yarimAltinTL = arrows.tamAltinTL =
            arrows.btcPrice = arrows.ethPrice = 'none';
        }

        fiyatlarCache = {
            dolar,
            euro,
            sterlin,
            gramAltinTL,
            ceyrekAltinTL,
            yarimAltinTL,
            tamAltinTL,
            btcPrice,
            ethPrice,
            arrows // ok işaretleri burada!
        };
        previousValues = {
            dolar,
            euro,
            sterlin,
            gramAltinTL,
            ceyrekAltinTL,
            yarimAltinTL,
            tamAltinTL,
            btcPrice,
            ethPrice
        };
        lastFetchTime = Date.now();
    } catch (err) {
        console.error('Fiyatlar fetch error:', err.message);
    }
}

// Server'ın kapanmasını önle
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection:", reason);
});

// Sunucu başlatıldığında hemen çek
await fetchFiyatlar();
// Sonra her dakika bir güncelle
setInterval(fetchFiyatlar, 60000);

app.get('/api/fiyatlar', (req, res) => {
    if (fiyatlarCache) {
        res.json(fiyatlarCache);
    } else {
        res.status(503).json({ error: 'Veri yok' });
    }
});

// SPA fallback: bilinmeyen tüm GET isteklerinde index.html gönder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
