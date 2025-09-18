// server.js
import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

// __dirname çözümü ESM için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// TCMB API key
const TCMB_KEY = process.env.TCMB_KEY;
if (!TCMB_KEY) console.warn("⚠️ TCMB_KEY environment variable ayarlanmamış!");

// PostgreSQL bağlantı ayarları (✅ SSL eklendi)
const pool = new Pool({
    user: 'haksdb_user',
    host: 'dpg-d360j5ripnbc739snp6g-a.frankfurt-postgres.render.com',
    database: 'haksdb',
    password: 'NuQhQNwzSoGZizLInNVL9VgfXfIWytI7',
    port: 5432,
    ssl: { rejectUnauthorized: false }  // 🔑 ÖNEMLİ
});

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

// ✅ Timeout destekli fetch
async function fetchWithRetry(url, options = {}, retries = 3, timeoutMs = 10000) {
    for (let i = 0; i < retries; i++) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(timeout);

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
        // 1️⃣ TCMB Döviz Kurları
        const now = new Date();
        let tcmbDate = new Date(now);
        if (now.getHours() > 19 || (now.getHours() === 19 && now.getMinutes() >= 30)) {
            tcmbDate.setDate(tcmbDate.getDate() + 1);
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

        // 4️⃣ TL bazlı altın hesaplamaları
        const gramAltinTL = dolar && gramAltin ? (parseFloat(gramAltin) * parseFloat(dolar)).toFixed(2) : null;
        const ceyrekAltinTL = gramAltinTL ? (parseFloat(gramAltinTL) * 1.75).toFixed(2) : null;
        const yarimAltinTL  = gramAltinTL ? (parseFloat(gramAltinTL) * 3.5).toFixed(2) : null;
        const tamAltinTL    = gramAltinTL ? (parseFloat(gramAltinTL) * 7).toFixed(2) : null;

        // 5️⃣ Arrow bilgisi
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
            Object.keys({
                dolar, euro, sterlin, gramAltinTL,
                ceyrekAltinTL, yarimAltinTL, tamAltinTL,
                btcPrice, ethPrice
            }).forEach(key => arrows[key] = 'none');
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
            arrows
        };

        previousValues = { ...fiyatlarCache };
        lastFetchTime = Date.now();

    } catch (err) {
        console.error('Fiyatlar fetch error:', err.message);
    }
}

// Server'ın kapanmasını önle
process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

// Başlangıçta veri çek
await fetchFiyatlar();
setInterval(fetchFiyatlar, 60000);

// API endpointleri
app.get('/api/fiyatlar', (req, res) => {
    if (fiyatlarCache) {
        res.json(fiyatlarCache);
    } else {
        res.status(503).json({ error: 'Veri yok' });
    }
});

app.post("/api/log", async (req, res) => {
  try {
    const { visitor, tab, tarih, saat } = req.body;

    const result = await pool.query(
      "INSERT INTO ziyaretler (ziyaretci, tab, tarih, saat) VALUES ($1, $2, $3, $4) RETURNING *",
      [visitor, tab, tarih, saat]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("❌ DB INSERT ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/sorgulama_sayisi', async (req, res) => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS toplam FROM ziyaretler');
        res.json({ toplam: parseInt(result.rows[0].toplam, 10) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
