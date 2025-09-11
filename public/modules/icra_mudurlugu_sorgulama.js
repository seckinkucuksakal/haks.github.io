class IcraMudurluguSorgulama {
    constructor() {
        this.icraVerileri = [];
        this.ilListesi = [];
        this.ilceListesi = {};
        this.loadIcraData();
    }

    async loadIcraData() {
        try {
            const response = await fetch('data/icra_daireleri_verileri_09092025.csv');
            const text = await response.text();
            this.parseIcraData(text);
        } catch (error) {
            console.error('İcra verileri yüklenirken hata:', error);
        }
    }

    parseIcraData(csvText) {
        const lines = csvText.trim().split('\n');
        
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length >= 3) {
                const icraData = {
                    il: values[0].trim(),
                    ilce: values[1].trim(),
                    kurumAdi: values[2].trim(),
                    vergiNo: values[3] ? values[3].trim() : '',
                    vergiDairesi: values[4] ? values[4].trim() : '',
                    hesapTuru: values[5] ? values[5].trim() : '',
                    bankaAdi: values[6] ? values[6].trim() : '',
                    iban: values[7] ? values[7].trim() : ''
                };
                
                this.icraVerileri.push(icraData);
                
                // İl listesini oluştur
                if (!this.ilListesi.includes(icraData.il)) {
                    this.ilListesi.push(icraData.il);
                }
                
                // İlçe listesini oluştur
                if (!this.ilceListesi[icraData.il]) {
                    this.ilceListesi[icraData.il] = [];
                }
                if (!this.ilceListesi[icraData.il].includes(icraData.ilce)) {
                    this.ilceListesi[icraData.il].push(icraData.ilce);
                }
            }
        }
        
        // Listeleri alfabetik olarak sırala
        this.ilListesi.sort((a, b) => a.localeCompare(b, 'tr'));
        Object.keys(this.ilceListesi).forEach(il => {
            this.ilceListesi[il].sort((a, b) => a.localeCompare(b, 'tr'));
        });
        
        console.log('İcra verileri yüklendi:', this.icraVerileri.length, 'kayıt');
    }

    parseCSVLine(line) {
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        values.push(current);
        return values;
    }

    getTabContent() {
        return `
            <h3>İcra Müdürlüğü Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="icraIl">İl Seçiniz:</label>
                    <select id="icraIl" class="form-select icra-select">
                        <option value="">İl seçiniz...</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="icraIlce">İlçe Seçiniz:</label>
                    <select id="icraIlce" class="form-select icra-select" disabled>
                        <option value="">Önce il seçiniz...</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button id="icraSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="icraTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="icraResult" class="tapu-result"></div>
            </div>
            
            <style>
                .icra-select {
                    position: relative;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                }

                .icra-select:disabled {
                    background-color: #f8f9fa;
                    color: #6c757d;
                    cursor: not-allowed;
                }

                .icra-sonuc-container {
                    max-height: 500px;
                    overflow-y: auto;
                    scrollbar-width: thin;
                    scrollbar-color: #007bff #f0f0f0;
                }

                .icra-sonuc-container::-webkit-scrollbar {
                    width: 6px;
                }

                .icra-sonuc-container::-webkit-scrollbar-track {
                    background: #f0f0f0;
                    border-radius: 3px;
                }

                .icra-sonuc-container::-webkit-scrollbar-thumb {
                    background: #007bff;
                    border-radius: 3px;
                }

                .icra-sonuc-container::-webkit-scrollbar-thumb:hover {
                    background: #0056b3;
                }

                .icra-detay {
                    margin-bottom: 20px;
                    padding: 15px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                    border-left: 4px solid #007bff;
                }

                .icra-baslik {
                    color: #007bff;
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 10px;
                }

                .bilgi-satir {
                    display: flex;
                    margin-bottom: 8px;
                    align-items: flex-start;
                }

                .bilgi-label {
                    font-weight: bold;
                    color: #495057;
                    min-width: 120px;
                    margin-right: 10px;
                }

                .bilgi-value {
                    color: #212529;
                    flex: 1;
                    word-break: break-all;
                }

                @media (max-width: 768px) {
                    .bilgi-satir {
                        flex-direction: column;
                        margin-bottom: 12px;
                    }
                    
                    .bilgi-label {
                        min-width: auto;
                        margin-right: 0;
                        margin-bottom: 4px;
                    }
                }
            </style>
        `;
    }

    initialize() {
        this.populateIlSelect();
        this.setupEventListeners();
        console.log('İcra Müdürlüğü Sorgulama modülü başlatıldı');
    }

    populateIlSelect() {
        const ilSelect = document.getElementById('icraIl');
        if (!ilSelect) return;

        // İl seçeneklerini ekle
        this.ilListesi.forEach(il => {
            const option = document.createElement('option');
            option.value = il;
            option.textContent = il;
            ilSelect.appendChild(option);
        });
    }

    populateIlceSelect(secilenIl) {
        const ilceSelect = document.getElementById('icraIlce');
        if (!ilceSelect) return;

        // İlçe seçeneklerini temizle
        ilceSelect.innerHTML = '<option value="">İlçe seçiniz...</option>';
        
        if (secilenIl && this.ilceListesi[secilenIl]) {
            // İlçe seçeneklerini ekle
            this.ilceListesi[secilenIl].forEach(ilce => {
                const option = document.createElement('option');
                option.value = ilce;
                option.textContent = ilce;
                ilceSelect.appendChild(option);
            });
            ilceSelect.disabled = false;
        } else {
            ilceSelect.disabled = true;
        }
    }

    setupEventListeners() {
        const ilSelect = document.getElementById('icraIl');
        const ilceSelect = document.getElementById('icraIlce');
        const sorgulaBtn = document.getElementById('icraSorgulaBtn');
        const temizleBtn = document.getElementById('icraTemizleBtn');

        // İl seçimi değiştiğinde
        if (ilSelect) {
            ilSelect.addEventListener('change', (e) => {
                this.populateIlceSelect(e.target.value);
            });
        }

        // Sorgula butonu
        if (sorgulaBtn) {
            sorgulaBtn.addEventListener('click', () => {
                this.sorgula();
            });
        }

        // Temizle butonu
        if (temizleBtn) {
            temizleBtn.addEventListener('click', () => {
                this.temizle();
            });
        }
    }

    sorgula() {
        const ilSelect = document.getElementById('icraIl');
        const ilceSelect = document.getElementById('icraIlce');
        const resultDiv = document.getElementById('icraResult');

        const secilenIl = ilSelect.value;
        const secilenIlce = ilceSelect.value;

        if (!secilenIl) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen bir il seçin.</div>';
            return;
        }

        if (!secilenIlce) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen bir ilçe seçin.</div>';
            return;
        }

        // İcra dairelerini filtrele
        const sonuclar = this.icraVerileri.filter(icra => 
            icra.il === secilenIl && icra.ilce === secilenIlce
        );

        if (sonuclar.length === 0) {
            resultDiv.innerHTML = `
                <div class="result-box">
                    <h4>Arama Sonucu</h4>
                    <p><strong>${secilenIl} - ${secilenIlce}</strong> için icra dairesi bilgisi bulunamadı.</p>
                </div>
            `;
            return;
        }

        this.showSonuclar(sonuclar);
    }

    showSonuclar(sonuclar) {
        const resultDiv = document.getElementById('icraResult');

        let html = `
            <div class="tapu-hesaplama-sonuc">
                <h4>İcra Daireleri Sorgulama Sonucu</h4>
                <div class="icra-sonuc-container" style="max-height: 400px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
        `;

        sonuclar.forEach((icra, index) => {
            html += `
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${icra.il} - ${icra.ilce}</h5>
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Kurum Adı:</span>
                            <span class="value">${icra.kurumAdi}</span>
                        </div>
                        ${icra.vergiNo ? `
                        <div class="sonuc-satir">
                            <span class="label">Vergi No:</span>
                            <span class="value">${icra.vergiNo}</span>
                        </div>` : ''}
                        ${icra.vergiDairesi ? `
                        <div class="sonuc-satir">
                            <span class="label">Vergi Dairesi:</span>
                            <span class="value">${icra.vergiDairesi}</span>
                        </div>` : ''}
                        ${icra.hesapTuru ? `
                        <div class="sonuc-satir">
                            <span class="label">Hesap Türü:</span>
                            <span class="value">${icra.hesapTuru}</span>
                        </div>` : ''}
                        ${icra.bankaAdi ? `
                        <div class="sonuc-satir">
                            <span class="label">Banka:</span>
                            <span class="value">${icra.bankaAdi}</span>
                        </div>` : ''}
                        ${icra.iban ? `
                        <div class="sonuc-satir">
                            <span class="label">IBAN:</span>
                            <span class="value">${icra.iban}</span>
                        </div>` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="uyari">
                    <p>Bu bilgiler 09.09.2025 tarihli İcra ve İflas Hukuku Genel Müdürlüğü verilerine dayanmaktadır.</p>
                </div>
                <style>
                    .icra-sonuc-container::-webkit-scrollbar {
                        width: 6px;
                    }
                    .icra-sonuc-container::-webkit-scrollbar-track {
                        background: #f0f0f0;
                        border-radius: 3px;
                    }
                    .icra-sonuc-container::-webkit-scrollbar-thumb {
                        background: #007bff;
                        border-radius: 3px;
                    }
                    .icra-sonuc-container::-webkit-scrollbar-thumb:hover {
                        background: #0056b3;
                    }
                    .value a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    .value a:hover {
                        text-decoration: underline;
                    }
                </style>
            </div>
        `;

        resultDiv.innerHTML = html;
    }

    temizle() {
        const ilSelect = document.getElementById('icraIl');
        const ilceSelect = document.getElementById('icraIlce');
        const resultDiv = document.getElementById('icraResult');

        if (ilSelect) ilSelect.value = '';
        if (ilceSelect) {
            ilceSelect.innerHTML = '<option value="">Önce il seçiniz...</option>';
            ilceSelect.disabled = true;
        }
        if (resultDiv) resultDiv.innerHTML = '';
    }
}

// Export for use in main script
window.IcraMudurluguSorgulama = IcraMudurluguSorgulama;
  