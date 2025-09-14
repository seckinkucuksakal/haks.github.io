class IhbarTazminatiHesaplama {
    constructor() {
        console.log('IhbarTazminatiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>İhbar Tazminatı Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="brutMaasIhbar">Brüt Aylık Maaş (TL):</label>
                    <input type="text" id="brutMaasIhbar" placeholder="15000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="ihbarHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="ihbarTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="ihbarResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('İhbar Tazminatı Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.IhbarTazminatiHesaplama = IhbarTazminatiHesaplama;
