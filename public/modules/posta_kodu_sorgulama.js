class PostaKoduSorgulama {
    constructor() {
        this.data = [];
        this.dataLoaded = false;
        this.fetchData();
    }

    async fetchData() {
        if (this.data.length > 0) return;
        try {
            const res = await fetch('data/posta_kodlari_verileri_18092025.csv');
            const csvText = await res.text();
            const lines = csvText.split('\n').filter(l => l.trim());
            this.data = lines.slice(1).map(line => {
                const [il, ilce, mahalle, posta_kodu] = line.split(',');
                return { il: il?.trim(), ilce: ilce?.trim(), mahalle: mahalle?.trim(), posta_kodu: posta_kodu?.trim() };
            });
            this.dataLoaded = true;
        } catch (err) {
            this.data = [];
            this.dataLoaded = true;
        }
    }

    getTabContent() {
        return `
            <h3>Posta Kodu Sorgulama</h3>
            <div class="plaka-container">
                <div class="search-mode-buttons">
                    <button id="adresModeBtn" class="mode-btn active">Adresten Sorgula</button>
                    <button id="kodModeBtn" class="mode-btn">Posta Kodundan Sorgula</button>
                </div>
                <div id="adresModeSection">
                    <div class="form-group">
                        <label for="ilSelect">İl:</label>
                        <select id="ilSelect" class="form-select"><option value="">Seçiniz...</option></select>
                    </div>
                    <div class="form-group">
                        <label for="ilceSelect">İlçe:</label>
                        <select id="ilceSelect" class="form-select"><option value="">Seçiniz...</option></select>
                    </div>
                    <div class="form-group">
                        <label for="mahalleSelect">Mahalle:</label>
                        <select id="mahalleSelect" class="form-select"><option value="">Seçiniz...</option></select>
                    </div>
                    <div class="plaka-search" style="display:flex;justify-content:center;gap:12px;">
                        <button type="button" id="adresSorgulaBtn" class="hesapla-btn">Sorgula</button>
                        <button type="button" id="adresTemizleBtn" class="temizle-btn">Temizle</button>
                    </div>
                    <div id="pdfCikarBtnContainerAdres" style="margin-top:24px;display:flex;justify-content:center;display:none;">
                        <button id="pdfCikarBtnAdres" class="hesapla-btn" style="padding:10px 24px;font-size:1rem;">PDF Olarak Kaydet</button>
                    </div>
                    <div id="adresResult" class="plaka-result"></div>
                </div>
                <div id="kodModeSection" style="display:none;">
                    <div class="plaka-search" style="display:flex;justify-content:center;gap:12px;">
                        <input type="text" id="postaKoduInput" placeholder="Posta kodunu girin (örn: 34000)" class="plaka-input">
                    </div>
                    <div style="display:flex;justify-content:center;gap:12px;margin-top:12px;">
                        <button id="postaKoduSorgulaBtn" class="hesapla-btn">Sorgula</button>
                        <button type="button" id="kodTemizleBtn" class="temizle-btn">Temizle</button>
                    </div>
                    <div id="pdfCikarBtnContainerKod" style="margin-top:24px;display:flex;justify-content:center;display:none;">
                        <button id="pdfCikarBtnKod" class="hesapla-btn" style="padding:10px 24px;font-size:1rem;">PDF Olarak Kaydet</button>
                    </div>
                    <div id="kodResult" class="plaka-result"></div>
                </div>
            </div>
        `;
    }

    async initialize() {
        await this.fetchData();
        const data = this.data;

        // Adresten sorgulama
        const ilSelect = document.getElementById('ilSelect');
        const ilceSelect = document.getElementById('ilceSelect');
        const mahalleSelect = document.getElementById('mahalleSelect');
        const adresSorgulaBtn = document.getElementById('adresSorgulaBtn');
        const adresResult = document.getElementById('adresResult');
        const pdfBtnContainerAdres = document.getElementById('pdfCikarBtnContainerAdres');
        const pdfBtnAdres = document.getElementById('pdfCikarBtnAdres');
        const adresTemizleBtn = document.getElementById('adresTemizleBtn');

        // Koddan sorgulama
        const postaKoduInput = document.getElementById('postaKoduInput');
        const postaKoduSorgulaBtn = document.getElementById('postaKoduSorgulaBtn');
        const kodResult = document.getElementById('kodResult');
        const pdfBtnContainerKod = document.getElementById('pdfCikarBtnContainerKod');
        const pdfBtnKod = document.getElementById('pdfCikarBtnKod');
        const kodTemizleBtn = document.getElementById('kodTemizleBtn');

        // Mode switching
        const adresModeBtn = document.getElementById('adresModeBtn');
        const kodModeBtn = document.getElementById('kodModeBtn');
        const adresModeSection = document.getElementById('adresModeSection');
        const kodModeSection = document.getElementById('kodModeSection');

        let currentMode = 'adres';

        adresModeBtn.addEventListener('click', () => {
            currentMode = 'adres';
            adresModeBtn.classList.add('active');
            kodModeBtn.classList.remove('active');
            adresModeSection.style.display = '';
            kodModeSection.style.display = 'none';
            adresResult.innerHTML = '';
            pdfBtnContainerAdres.style.display = 'none';
        });

        kodModeBtn.addEventListener('click', () => {
            currentMode = 'kod';
            kodModeBtn.classList.add('active');
            adresModeBtn.classList.remove('active');
            adresModeSection.style.display = 'none';
            kodModeSection.style.display = '';
            kodResult.innerHTML = '';
            pdfBtnContainerKod.style.display = 'none';
        });

        // İl doldur
        const iller = [...new Set(data.map(d => d.il))].sort();
        ilSelect.innerHTML = '<option value="">Seçiniz...</option>' + iller.map(il => `<option value="${il}">${il}</option>`).join('');

        ilSelect.onchange = function() {
            ilceSelect.innerHTML = '<option value="">Seçiniz...</option>';
            mahalleSelect.innerHTML = '<option value="">Seçiniz...</option>';
            if (!ilSelect.value) return;
            const ilceler = [...new Set(data.filter(d => d.il === ilSelect.value).map(d => d.ilce))].sort();
            ilceSelect.innerHTML += ilceler.map(ilce => `<option value="${ilce}">${ilce}</option>`).join('');
        };

        ilceSelect.onchange = function() {
            mahalleSelect.innerHTML = '<option value="">Seçiniz...</option>';
            if (!ilSelect.value || !ilceSelect.value) return;
            const mahalleler = [...new Set(data.filter(d => d.il === ilSelect.value && d.ilce === ilceSelect.value).map(d => d.mahalle))].sort();
            mahalleSelect.innerHTML += mahalleler.map(m => `<option value="${m}">${m}</option>`).join('');
        };

        // Adresten sorgulama
        let sonKayitAdres = null;
        adresSorgulaBtn.addEventListener('click', () => {
            const il = ilSelect.value;
            const ilce = ilceSelect.value;
            const mahalle = mahalleSelect.value;
            if (!il || !ilce || !mahalle) {
                adresResult.innerHTML = '<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen il, ilçe ve mahalle seçiniz.</span></div></div></div>';
                pdfBtnContainerAdres.style.display = 'none';
                sonKayitAdres = null;
                return;
            }
            const kayit = data.find(d => d.il === il && d.ilce === ilce && d.mahalle === mahalle);
            if (kayit) {
                adresResult.innerHTML = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Girilen Adrese Göre Posta Kodu</h4>
                        <div class="sonuc-detay">
                            <div class="sonuc-satir"><span class="label">İl:</span><span class="value">${kayit.il}</span></div>
                            <div class="sonuc-satir"><span class="label">İlçe:</span><span class="value">${kayit.ilce}</span></div>
                            <div class="sonuc-satir"><span class="label">Mahalle:</span><span class="value">${kayit.mahalle}</span></div>
                            <div class="sonuc-satir toplam"><span class="label">Posta Kodu:</span><span class="value">${kayit.posta_kodu}</span></div>
                        </div>
                    </div>
                `;
                pdfBtnContainerAdres.style.display = 'flex';
                sonKayitAdres = kayit;
                // Database'e gönder
                fetch('/api/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        visitor: 'visitor',
                        tab: 'Posta Kodu Sorgulama',
                        tarih: new Date().toISOString().split('T')[0],
                        saat: new Date().toLocaleTimeString('tr-TR')
                    })
                });
            } else {
                adresResult.innerHTML = '<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Sonuç</span><span class="value">Kayıt bulunamadı.</span></div></div></div>';
                pdfBtnContainerAdres.style.display = 'none';
                sonKayitAdres = null;
            }
        });

        // Koddan sorgulama
        let sonKayitKod = null;
        postaKoduSorgulaBtn.addEventListener('click', () => {
            const kod = postaKoduInput.value.trim();
            if (!kod) {
                kodResult.innerHTML = '<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen posta kodu giriniz.</span></div></div></div>';
                pdfBtnContainerKod.style.display = 'none';
                sonKayitKod = null;
                return;
            }
            const kayitlar = data.filter(d => d.posta_kodu === kod);
            if (kayitlar.length > 0) {
                kodResult.innerHTML = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Girilen Posta Koduna Göre Adres</h4>
                        <div class="sonuc-detay">
                            ${kayitlar.map(k => `
                                <div class="sonuc-satir"><span class="label">İl:</span><span class="value">${k.il}</span></div>
                                <div class="sonuc-satir"><span class="label">İlçe:</span><span class="value">${k.ilce}</span></div>
                                <div class="sonuc-satir"><span class="label">Mahalle:</span><span class="value">${k.mahalle}</span></div>
                                <div class="sonuc-satir toplam"><span class="label">Posta Kodu:</span><span class="value">${k.posta_kodu}</span></div>
                                <hr>
                            `).join('')}
                        </div>
                    </div>
                `;
                pdfBtnContainerKod.style.display = 'flex';
                sonKayitKod = kayitlar;
                // Database'e gönder
                fetch('/api/log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        visitor: 'visitor',
                        tab: 'Posta Kodu Sorgulama',
                        tarih: new Date().toISOString().split('T')[0],
                        saat: new Date().toLocaleTimeString('tr-TR')
                    })
                });
            } else {
                kodResult.innerHTML = '<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Sonuç</span><span class="value">Kayıt bulunamadı.</span></div></div></div>';
                pdfBtnContainerKod.style.display = 'none';
                sonKayitKod = null;
            }
        });

        // PDF olarak kaydetme
        function exportPDF(content) {
            const win = window.open('', '', 'width=800,height=600');
            win.document.write(`
                <html>
                <head><title>PDF</title></head>
                <body>${content}</body>
                </html>
            `);
            win.document.close();
            win.print();
        }

        pdfBtnAdres.onclick = () => {
            if (sonKayitAdres) {
                const htmlContent = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Girilen Adrese Göre Posta Kodu</h4>
                        <div class="sonuc-detay">
                            <div class="sonuc-satir"><span class="label">İl:</span><span class="value">${sonKayitAdres.il}</span></div>
                            <div class="sonuc-satir"><span class="label">İlçe:</span><span class="value">${sonKayitAdres.ilce}</span></div>
                            <div class="sonuc-satir"><span class="label">Mahalle:</span><span class="value">${sonKayitAdres.mahalle}</span></div>
                            <div class="sonuc-satir toplam"><span class="label">Posta Kodu:</span><span class="value">${sonKayitAdres.posta_kodu}</span></div>
                        </div>
                    </div>
                `;
                const tarih = new Date().toLocaleDateString('tr-TR');
                PdfCikar.showPdfModal(htmlContent, tarih);
            }
        };

        pdfBtnKod.onclick = () => {
            if (sonKayitKod && sonKayitKod.length > 0) {
                const htmlContent = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Girilen Posta Koduna Göre Adres</h4>
                        <div class="sonuc-detay">
                            ${sonKayitKod.map(k => `
                                <div class="sonuc-satir"><span class="label">İl:</span><span class="value">${k.il}</span></div>
                                <div class="sonuc-satir"><span class="label">İlçe:</span><span class="value">${k.ilce}</span></div>
                                <div class="sonuc-satir"><span class="label">Mahalle:</span><span class="value">${k.mahalle}</span></div>
                                <div class="sonuc-satir toplam"><span class="label">Posta Kodu:</span><span class="value">${k.posta_kodu}</span></div>
                                <hr>
                            `).join('')}
                        </div>
                    </div>
                `;
                const tarih = new Date().toLocaleDateString('tr-TR');
                PdfCikar.showPdfModal(htmlContent, tarih);
            }
        };

        // Temizle fonksiyonu
        function temizleAdres() {
            ilSelect.value = '';
            ilceSelect.innerHTML = '<option value="">Seçiniz...</option>';
            mahalleSelect.innerHTML = '<option value="">Seçiniz...</option>';
            adresResult.innerHTML = '';
            pdfBtnContainerAdres.style.display = 'none';
            sonKayitAdres = null;
        }
        function temizleKod() {
            postaKoduInput.value = '';
            kodResult.innerHTML = '';
            pdfBtnContainerKod.style.display = 'none';
            sonKayitKod = null;
        }
        if (adresTemizleBtn) adresTemizleBtn.onclick = temizleAdres;
        if (kodTemizleBtn) kodTemizleBtn.onclick = temizleKod;
    }
}

window.PostaKoduSorgulama = PostaKoduSorgulama;
