class VekaletUcretiHesaplama {
    constructor() {
        console.log('VekaletUcretiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Vekalet Ücreti Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="davaKonusu">Dava Konusu Değeri (TL):</label>
                    <input type="text" id="davaKonusu" placeholder="500000.00" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="mahkemeTuru">Mahkeme Türü:</label>
                    <select id="mahkemeTuru" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="asliye">Asliye Hukuk Mahkemesi</option>
                        <option value="ticaret">Ticaret Mahkemesi</option>
                        <option value="iş">İş Mahkemesi</option>
                        <option value="idare">İdare Mahkemesi</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button id="vekaletHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="vekaletTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="vekaletResult" class="tapu-result"></div>
            </div>
            
            <style>
                .form-select {
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                    background-color: white;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                    cursor: pointer;
                }
                .form-select:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
            </style>
        `;
    }

    initialize() {
        console.log('Vekalet Ücreti Hesaplama modülü başlatıldı');
        // Initialize functionality here
    }
}

window.VekaletUcretiHesaplama = VekaletUcretiHesaplama;
