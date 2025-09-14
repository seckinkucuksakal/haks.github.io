class PostaKoduSorgulama {
    constructor() {
        console.log('PostaKoduSorgulama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Posta Kodu Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="postaKodu">Posta Kodu:</label>
                    <input type="text" id="postaKodu" placeholder="34000" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="postaKoduSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="postaKoduTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="postaKoduResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Posta Kodu Sorgulama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.OperatorSorgulama = OperatorSorgulama;
