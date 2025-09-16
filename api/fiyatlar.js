const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

let cachedData = null;
let lastFetchTime = 0;

// Sunucu başlatıldığında ve her dakikada bir veriyi güncelle
async function fetchAndCacheData() {
    try {
        const res = await fetch('https://dis-api-url.com/fiyatlar'); // Dış API adresini buraya yazın
        cachedData = await res.json();
        lastFetchTime = Date.now();
    } catch (err) {
        // Hata olursa cache'i güncelleme
        console.error('Fiyatlar API fetch error:', err);
    }
}

// İlk başlatmada hemen çek
fetchAndCacheData();
// Sonra her dakika bir güncelle
setInterval(fetchAndCacheData, 60000);

router.get('/', (req, res) => {
    if (cachedData) {
        res.json(cachedData);
    } else {
        res.status(503).json({ error: 'Veri yok' });
    }
});

module.exports = router;
