class KiraArtisOraniHesaplama {
    constructor() {
        console.log('KiraArtisOraniHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Kira Artış Oranı Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mevcutKira">Mevcut Kira (TL):</label>
                    <input type="text" id="mevcutKira" placeholder="5000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="kiraHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="kiraTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="kiraResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Kira Artış Oranı Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.KiraArtisOraniHesaplama = KiraArtisOraniHesaplama;
