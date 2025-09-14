class OperatorSorgulama {
    constructor() {
        console.log('OperatorSorgulama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Operatör Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="telefonNumarasi">Telefon Numarası:</label>
                    <input type="text" id="telefonNumarasi" placeholder="05551234567" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="operatorSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="operatorTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="operatorResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Operatör Sorgulama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.OperatorSorgulama = OperatorSorgulama;
