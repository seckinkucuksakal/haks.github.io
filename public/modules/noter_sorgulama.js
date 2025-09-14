class NoterSorgulama {
    constructor() {
        this.noterVerileri = [];
        this.ilListesi = [];
        this.ilceListesi = {};
        this.loadNoterData();
    }

    async loadNoterData() {
        try {
            const response = await fetch('./data/turkiye_noterler_verileri_09092025.csv');
            const csvText = await response.text();
            this.parseCSV(csvText);
            // populateIlSelect() çağrısını kaldırdık - initialize() içinde çağrılacak
        } catch (error) {
            console.error('Noter verileri yüklenirken hata:', error);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(';');
                if (values.length >= 10) {
                    const noterData = {
                        il: values[0] ? values[0].trim() : '',
                        ilce: values[1] ? values[1].trim() : '',
                        noterlikAdi: values[2] ? values[2].trim() : '',
                        adiSoyadi: values[3] ? values[3].trim() : '',
                        noterlikSinifi: values[4] ? values[4].trim() : '',
                        noterSinifi: values[5] ? values[5].trim() : '',
                        asilVekil: values[6] ? values[6].trim() : '',
                        telefon: values[7] ? values[7].trim() : '',
                        faks: values[8] ? values[8].trim() : '',
                        adres: values[9] ? values[9].trim() : ''
                    };
                    
                    this.noterVerileri.push(noterData);
                    
                    // İl listesini oluştur
                    if (!this.ilListesi.includes(noterData.il)) {
                        this.ilListesi.push(noterData.il);
                    }
                    
                    // İlçe listesini oluştur
                    if (!this.ilceListesi[noterData.il]) {
                        this.ilceListesi[noterData.il] = [];
                    }
                    if (!this.ilceListesi[noterData.il].includes(noterData.ilce)) {
                        this.ilceListesi[noterData.il].push(noterData.ilce);
                    }
                }
            }
        }
        
        // Listeleri alfabetik olarak sırala
        this.ilListesi.sort((a, b) => a.localeCompare(b, 'tr'));
        Object.keys(this.ilceListesi).forEach(il => {
            this.ilceListesi[il].sort((a, b) => a.localeCompare(b, 'tr'));
        });
        
        console.log('Noter verileri yüklendi:', this.noterVerileri.length, 'kayıt');
    }

    getTabContent() {
        return `
            <h3>Noter Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="noterIl">İl Seçiniz:</label>
                    <select id="noterIl" class="form-select noter-select">
                        <option value="">İl seçiniz...</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="noterIlce">İlçe Seçiniz:</label>
                    <select id="noterIlce" class="form-select noter-select" disabled>
                        <option value="">Önce il seçiniz...</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button id="noterSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="noterTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="noterResult" class="tapu-result"></div>
            </div>
            
            <style>
                .noter-select {
                    width: 100%;
                    min-width: 300px;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                }

                .noter-select:disabled {
                    background-color: #f8f9fa;
                    color: #6c757d;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .noter-select {
                        min-width: 250px;
                    }
                }
            </style>
        `;
    }

    populateIlSelect() {
        const ilSelect = document.getElementById('noterIl');
        if (!ilSelect || this.ilListesi.length === 0) return;

        // İl seçeneklerini ekle
        this.ilListesi.forEach(il => {
            const option = document.createElement('option');
            option.value = il;
            option.textContent = il;
            ilSelect.appendChild(option);
        });
    }

    populateIlceSelect(secilenIl) {
        const ilceSelect = document.getElementById('noterIlce');
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

    searchByIlIlce(il, ilce) {
        let results = this.noterVerileri.filter(noter => noter.il === il);
        
        if (ilce) {
            results = results.filter(noter => noter.ilce === ilce);
        }

        return results;
    }

    showSonuclar(sonuclar) {
        const resultDiv = document.getElementById('noterResult');

        let html = `
            <div class="tapu-hesaplama-sonuc">
                <h4>Noter Sorgulama Sonucu</h4>
                <div class="noter-sonuc-container" style="max-height: 400px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
        `;

        sonuclar.forEach((noter, index) => {
            html += `
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${noter.il} - ${noter.ilce}</h5>
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Noterlik Adı:</span>
                            <span class="value">${noter.noterlikAdi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Noter Adı Soyadı:</span>
                            <span class="value">${noter.adiSoyadi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Noterlik Sınıfı:</span>
                            <span class="value">${noter.noterlikSinifi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Noter Sınıfı:</span>
                            <span class="value">${noter.noterSinifi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Durum:</span>
                            <span class="value">${noter.asilVekil === 'A' ? 'Asil' : 'Vekil'}</span>
                        </div>
                        ${noter.telefon ? `
                        <div class="sonuc-satir">
                            <span class="label">Telefon:</span>
                            <span class="value">${noter.telefon}</span>
                        </div>` : ''}
                        ${noter.faks && noter.faks !== '-' ? `
                        <div class="sonuc-satir">
                            <span class="label">Faks:</span>
                            <span class="value">${noter.faks}</span>
                        </div>` : ''}
                        ${noter.adres ? `
                        <div class="sonuc-satir">
                            <span class="label">Adres:</span>
                            <span class="value">
                                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(noter.adres + ', ' + noter.ilce + ', ' + noter.il)}" target="_blank" title="Google Maps'te görüntüle">
                                    ${noter.adres}
                                </a>
                            </span>
                        </div>` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="uyari">
                    <p><strong>Not:</strong> Bu bilgiler 09.09.2025 tarihli Türkiye Noterler Birliği verilerine dayanmaktadır.</p>
                </div>
                <style>
                    .uyari p {
                        text-align: left;
                        color: black;
                    }
                    .noter-sonuc-container::-webkit-scrollbar {
                        width: 6px;
                    }
                    .noter-sonuc-container::-webkit-scrollbar-track {
                        background: #f0f0f0;
                        border-radius: 3px;
                    }
                    .noter-sonuc-container::-webkit-scrollbar-thumb {
                        background: #007bff;
                        border-radius: 3px;
                    }
                    .noter-sonuc-container::-webkit-scrollbar-thumb:hover {
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

    displayResults(results) {
        const container = document.getElementById('noterResult');
        
        if (results.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666;">Arama kriterlerinize uygun sonuç bulunamadı.</p>';
            return;
        }

        this.showSonuclar(results);
    }

    initialize() {
        console.log('Noter Sorgulama modülü başlatıldı');
        
        // İl listesini doldur - veri yüklenmişse hemen, yoksa interval ile kontrol et
        const populateWhenReady = () => {
            if (this.ilListesi.length > 0) {
                this.populateIlSelect();
            } else {
                setTimeout(populateWhenReady, 100);
            }
        };
        populateWhenReady();
        
        // Elementleri bekleyerek al
        setTimeout(() => {
            const noterIlSelect = document.getElementById('noterIl');
            const noterIlceSelect = document.getElementById('noterIlce');
            const noterSorgulaBtn = document.getElementById('noterSorgulaBtn');
            const noterTemizleBtn = document.getElementById('noterTemizleBtn');
            const noterResult = document.getElementById('noterResult');

            if (!noterSorgulaBtn || !noterTemizleBtn || !noterResult) {
                console.error('Noter sorgulama elementleri bulunamadı');
                return;
            }

            // İl seçimi değiştiğinde ilçeleri güncelle
            noterIlSelect?.addEventListener('change', (e) => {
                this.populateIlceSelect(e.target.value);
                noterResult.innerHTML = ''; // Sonuçları temizle
            });

            // Sorgula butonu
            noterSorgulaBtn.addEventListener('click', () => {
                this.sorgula();
            });

            // Temizle butonu
            noterTemizleBtn.addEventListener('click', () => {
                this.temizle();
            });

        }, 100);
    }

    sorgula() {
        const ilSelect = document.getElementById('noterIl');
        const ilceSelect = document.getElementById('noterIlce');
        const resultDiv = document.getElementById('noterResult');

        const secilenIl = ilSelect.value;
        const secilenIlce = ilceSelect.value;

        if (!secilenIl) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen bir il seçin.</div>';
            return;
        }

        // Noter verilerini filtrele
        let sonuclar = this.noterVerileri.filter(noter => 
            noter.il === secilenIl
        );

        if (secilenIlce) {
            sonuclar = sonuclar.filter(noter => noter.ilce === secilenIlce);
        }

        if (sonuclar.length === 0) {
            const mesaj = secilenIlce 
                ? `${secilenIl} - ${secilenIlce} için noter bilgisi bulunamadı.`
                : `${secilenIl} ili için noter bilgisi bulunamadı.`;
            resultDiv.innerHTML = `
                <div class="result-box">
                    <h4>Arama Sonucu</h4>
                    <p><strong>"${mesaj}"</strong></p>
                </div>
            `;
            return;
        }

        this.showSonuclar(sonuclar);
    }

    temizle() {
        const ilSelect = document.getElementById('noterIl');
        const ilceSelect = document.getElementById('noterIlce');
        const resultDiv = document.getElementById('noterResult');

        if (ilSelect) ilSelect.value = '';
        if (ilceSelect) {
            ilceSelect.innerHTML = '<option value="">Önce il seçiniz...</option>';
            ilceSelect.disabled = true;
        }
        if (resultDiv) resultDiv.innerHTML = '';
    }
}

// Export for use in main script
window.NoterSorgulama = NoterSorgulama;