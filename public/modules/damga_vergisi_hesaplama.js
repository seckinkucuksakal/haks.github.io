class DamgaVergisiHesaplama {
    constructor() {
        console.log('DamgaVergisiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Damga Vergisi Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="belgeMatrahi">Belge Matrahı (TL):</label>
                    <input type="text" id="belgeMatrahi" placeholder="10000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="damgaHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="damgaTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="damgaResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Damga Vergisi Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.DamgaVergisiHesaplama = DamgaVergisiHesaplama;
