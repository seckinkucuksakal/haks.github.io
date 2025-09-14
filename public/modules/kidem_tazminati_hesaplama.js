class KidemTazminatiHesaplama {
    constructor() {
        console.log('KidemTazminatiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Kıdem Tazminatı Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="brutMaasKidem">Brüt Aylık Maaş (TL):</label>
                    <input type="text" id="brutMaasKidem" placeholder="15000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="kidemHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="kidemTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="kidemResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Kıdem Tazminatı Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.KidemTazminatiHesaplama = KidemTazminatiHesaplama;
