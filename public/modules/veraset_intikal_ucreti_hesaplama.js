class VerasetIntikatUcretiHesaplama {
    constructor() {
        console.log('VerasetIntikatUcretiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Veraset ve İntikal Ücreti Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mirasMatrahi">Miras Matrahı (TL):</label>
                    <input type="text" id="mirasMatrahi" placeholder="500000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="verasetHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="verasetTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="verasetResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Veraset ve İntikal Ücreti Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.VerasetIntikatUcretiHesaplama = VerasetIntikatUcretiHesaplama;
