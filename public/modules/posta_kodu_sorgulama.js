class PostaKoduSorgulama {
    constructor() {
        console.log('PostaKoduSorgulama modülü yüklendi');
        this.data = [];
    }

    async fetchData() {
        if (this.data.length > 0) return;
        try {
            const res = await fetch('posta_kodu_verileri_17092025.csv');
            const csvText = await res.text();
            // CSV parse: il,ilce,mahalle,post_kodu
            const lines = csvText.split('\n').filter(l => l.trim());
            this.data = lines.slice(1).map(line => {
                const [il, ilce, mahalle, post_kodu] = line.split(',');
                return { il: il?.trim(), ilce: ilce?.trim(), mahalle: mahalle?.trim(), post_kodu: post_kodu?.trim() };
            });
        } catch (err) {
            this.data = [];
        }
    }

    getTabContent() {
        return `
            <h3>Posta Kodu Sorgulama</h3>
            <div class="plaka-container">
                <div class="search-mode-buttons" style="display:flex;gap:12px;margin-bottom:18px;">
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
                    <div class="form-actions" style="margin-bottom:18px;display:flex;gap:12px;">
                        <button type="button" id="adresSorgulaBtn" class="hesapla-btn">Sorgula</button>
                        <button type="button" id="postaKoduTemizleBtn" class="temizle-btn">Temizle</button>
                    </div>
                </div>
                <div id="kodModeSection" style="display:none;">
                    <div class="form-group" style="margin-top:18px;">
                        <label for="postaKoduInput">Posta Kodu:</label>
                        <input type="text" id="postaKoduInput" placeholder="34000" class="form-input">
                    </div>
                    <div class="form-actions" style="display:flex;gap:12px;">
                        <button type="button" id="postaKoduSorgulaBtn" class="hesapla-btn">Sorgula</button>
                        <button type="button" id="postaKoduTemizleBtn2" class="temizle-btn">Temizle</button>
                    </div>
                </div>
                <div id="postaKoduResult" class="tapu-result"></div>
            </div>
        `;
    }

    async initialize() {
        await this.fetchData();
        const data = this.data;

        const ilSelect = document.getElementById('ilSelect');
        const ilceSelect = document.getElementById('ilceSelect');
        const mahalleSelect = document.getElementById('mahalleSelect');
        const adresSorgulaBtn = document.getElementById('adresSorgulaBtn');
        const postaKoduInput = document.getElementById('postaKoduInput');
        const postaKoduSorgulaBtn = document.getElementById('postaKoduSorgulaBtn');
        const postaKoduTemizleBtn = document.getElementById('postaKoduTemizleBtn');
        const postaKoduTemizleBtn2 = document.getElementById('postaKoduTemizleBtn2');
        const resultDiv = document.getElementById('postaKoduResult');
        const adresModeBtn = document.getElementById('adresModeBtn');
        const kodModeBtn = document.getElementById('kodModeBtn');
        const adresModeSection = document.getElementById('adresModeSection');
        const kodModeSection = document.getElementById('kodModeSection');

        if (!ilSelect || !ilceSelect || !mahalleSelect || !adresSorgulaBtn || !postaKoduInput || !postaKoduSorgulaBtn || !postaKoduTemizleBtn || !resultDiv || !adresModeBtn || !kodModeBtn || !adresModeSection || !kodModeSection) return;

        // Mode switching
        adresModeBtn.onclick = function() {
            adresModeBtn.classList.add('active');
            kodModeBtn.classList.remove('active');
            adresModeSection.style.display = '';
            kodModeSection.style.display = 'none';
            resultDiv.innerHTML = '';
        };
        kodModeBtn.onclick = function() {
            kodModeBtn.classList.add('active');
            adresModeBtn.classList.remove('active');
            adresModeSection.style.display = 'none';
            kodModeSection.style.display = '';
            resultDiv.innerHTML = '';
        };

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

        adresSorgulaBtn.onclick = function() {
            const il = ilSelect.value;
            const ilce = ilceSelect.value;
            const mahalle = mahalleSelect.value;
            if (!il || !ilce || !mahalle) {
                resultDiv.innerHTML = `<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen il, ilçe ve mahalle seçiniz.</span></div></div></div>`;
                return;
            }
            const kayit = data.find(d => d.il === il && d.ilce === ilce && d.mahalle === mahalle);
            if (kayit) {
                resultDiv.innerHTML = `
                    <div class="tapu-hesaplama-sonuc" style="margin-bottom:24px;">
                        <h4>Posta Kodu Sonucu</h4>
                        <div class="sonuc-detay">
                            <div class="sonuc-satir"><span class="label">İl</span><span class="value">${kayit.il}</span></div>
                            <div class="sonuc-satir"><span class="label">İlçe</span><span class="value">${kayit.ilce}</span></div>
                            <div class="sonuc-satir"><span class="label">Mahalle</span><span class="value">${kayit.mahalle}</span></div>
                            <div class="sonuc-satir toplam"><span class="label">Posta Kodu</span><span class="value">${kayit.post_kodu}</span></div>
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Sonuç</span><span class="value">Kayıt bulunamadı.</span></div></div></div>`;
            }
        };

        postaKoduSorgulaBtn.onclick = function() {
            const kod = postaKoduInput.value.trim();
            if (!kod) {
                resultDiv.innerHTML = `<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen posta kodu giriniz.</span></div></div></div>`;
                return;
            }
            const kayitlar = data.filter(d => d.post_kodu === kod);
            if (kayitlar.length > 0) {
                resultDiv.innerHTML = `
                    <div class="tapu-hesaplama-sonuc" style="margin-bottom:24px;">
                        <h4>Adres Sonucu</h4>
                        <div class="sonuc-detay">
                            ${kayitlar.map(k => `
                                <div class="sonuc-satir"><span class="label">İl</span><span class="value">${k.il}</span></div>
                                <div class="sonuc-satir"><span class="label">İlçe</span><span class="value">${k.ilce}</span></div>
                                <div class="sonuc-satir"><span class="label">Mahalle</span><span class="value">${k.mahalle}</span></div>
                                <hr>
                            `).join('')}
                        </div>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `<div class="tapu-hesaplama-sonuc"><div class="sonuc-detay"><div class="sonuc-satir error"><span class="label">Sonuç</span><span class="value">Kayıt bulunamadı.</span></div></div></div>`;
            }
        };

        // Temizle butonları her iki modda da çalışsın
        function temizle() {
            ilSelect.value = '';
            ilceSelect.value = '';
            mahalleSelect.value = '';
            postaKoduInput.value = '';
            resultDiv.innerHTML = '';
            ilceSelect.innerHTML = '<option value="">Seçiniz...</option>';
            mahalleSelect.innerHTML = '<option value="">Seçiniz...</option>';
        }
        postaKoduTemizleBtn.onclick = temizle;
        if (postaKoduTemizleBtn2) postaKoduTemizleBtn2.onclick = temizle;
    }
}

window.PostaKoduSorgulama = PostaKoduSorgulama;
