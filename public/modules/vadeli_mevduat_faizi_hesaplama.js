class VadeliMevduatFaiziHesaplama {
    constructor() {
        console.log('VadeliMevduatFaiziHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Vadeli Mevduat Faizi Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="anaParaVade">Ana Para (TL):</label>
                    <input type="text" id="anaParaVade" placeholder="100000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="vadeHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="vadeTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="vadeResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Vadeli Mevduat Faizi Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.VadeliMevduatFaiziHesaplama = VadeliMevduatFaiziHesaplama;
