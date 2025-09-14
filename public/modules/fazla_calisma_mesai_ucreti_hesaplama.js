class FazlaCalismaMessaiUcretiHesaplama {
    constructor() {
        console.log('FazlaCalismaMessaiUcretiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Fazla Çalışma Mesai Ücreti Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="brutMaasMesai">Brüt Aylık Maaş (TL):</label>
                    <input type="text" id="brutMaasMesai" placeholder="15000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="mesaiHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="mesaiTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="mesaiResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Fazla Çalışma Mesai Ücreti Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.FazlaCalismaMessaiUcretiHesaplama = FazlaCalismaMessaiUcretiHesaplama;
