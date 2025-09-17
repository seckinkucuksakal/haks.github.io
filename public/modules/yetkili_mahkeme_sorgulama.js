class YetkiliMahkemeSorgulama {
    constructor() {
        // İl ve ilçe verileri CSV'den dinamik olarak yüklenecek
        this.ilData = {};   // { "Adana": ["Aladağ", ...], ... }
        this.mahkemeVerileri = [];
        this.loaded = false;
        this.loadMahkemeData();
    }

    async loadMahkemeData() {
        try {
            const response = await fetch('data/adliye_verileri_13092025.csv');
            const text = await response.text();
            this.parseMahkemeData(text);
            this.loaded = true;
            // Eğer initialize çağrıldıysa ve il/ilçe select'leri varsa doldur
            if (this._pendingInit) {
                this._pendingInit();
                this._pendingInit = null;
            }
        } catch (e) {
            console.error('Mahkeme CSV yüklenemedi:', e);
        }
    }

    parseMahkemeData(csvText) {
        const lines = csvText.trim().split('\n');
        // CSV başlık satırı
        const headers = lines[0].split(',');
        // Dinamik il-ilçe listesi oluştur
        this.ilData = {};
        for (let i = 1; i < lines.length; i++) {
            const parts = lines[i].split(',');
            if (parts.length >= 9) {
                // İl ve ilçe adlarını baş harfi büyük, diğerleri küçük yap
                const il = this.capitalize(parts[0].trim());
                const ilce = this.capitalize(parts[1].trim());
                if (!this.ilData[il]) this.ilData[il] = [];
                if (!this.ilData[il].includes(ilce)) this.ilData[il].push(ilce);

                this.mahkemeVerileri.push({
                    il,
                    ilce,
                    adliye: parts[2].trim(),
                    agirCeza: parts[3].trim(),
                    bassavcilik: parts[4].trim(),
                    bolgeAdliye: parts[5].trim(),
                    bolgeIdare: parts[6].trim(),
                    idare: parts[7].trim(),
                    vergi: parts[8].trim()
                });
            }
        }
    }

    capitalize(str) {
        // Tüm kelimelerin ilk harfi büyük, diğerleri küçük (ör: "doğubayazıt" -> "Doğubayazıt")
        return (str || '').toLocaleLowerCase('tr-TR').replace(/(^|\s|\/|-)([a-zğüşıöç])/g, (m, p1, p2) => p1 + p2.toLocaleUpperCase('tr-TR'));
    }

    getTabContent() {
        // Dinamik il listesi için
        const ilList = Object.keys(this.ilData || {}).sort((a, b) => a.localeCompare(b, 'tr-TR'));
        return `
            <h3>Yetkili Mahkeme Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mahkemeIlSelect">İl Seçiniz:</label>
                    <select id="mahkemeIlSelect" class="form-select">
                        <option value="">İl seçin...</option>
                        ${ilList.map(il => `<option value="${il}">${il}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label for="mahkemeIlceSelect">İlçe Seçiniz:</label>
                    <select id="mahkemeIlceSelect" class="form-select" disabled>
                        <option value="">Önce il seçin...</option>
                    </select>
                </div>
                <div class="form-actions">
                    <button id="mahkemeSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="mahkemeTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                <div id="pdfCikarBtnContainer" style="margin-top:24px;display:flex;justify-content:center;display:none;">
                    <button id="pdfCikarBtn" class="hesapla-btn" style="padding:10px 24px;font-size:1rem;">PDF Olarak Kaydet</button>
                </div>
                <div id="mahkemeResult" class="tapu-result"></div>
            </div>
        `;
    }

    initialize() {
        // Eğer CSV henüz yüklenmediyse, initialize işlemini yükleme bitinceye ertele
        if (!this.loaded) {
            this._pendingInit = () => this.initialize();
            return;
        }
        const ilSelect = document.getElementById('mahkemeIlSelect');
        const ilceSelect = document.getElementById('mahkemeIlceSelect');
        const sorgulaBtn = document.getElementById('mahkemeSorgulaBtn');
        const temizleBtn = document.getElementById('mahkemeTemizleBtn');
        const resultDiv = document.getElementById('mahkemeResult');
        const pdfBtnContainer = document.getElementById('pdfCikarBtnContainer');
        const pdfBtn = document.getElementById('pdfCikarBtn');

        // İl select'i doldur (tekrar doldurmayı önlemek için önce temizle)
        ilSelect.innerHTML = '<option value="">İl seçin...</option>' +
            Object.keys(this.ilData).sort((a, b) => a.localeCompare(b, 'tr-TR')).map(il =>
                `<option value="${il}">${il}</option>`
            ).join('');
        ilceSelect.innerHTML = '<option value="">Önce il seçin...</option>';
        ilceSelect.disabled = true;

        ilSelect.addEventListener('change', () => {
            const selectedIl = ilSelect.value;
            ilceSelect.innerHTML = '<option value="">İlçe seçin...</option>';
            if (selectedIl && this.ilData[selectedIl]) {
                ilceSelect.disabled = false;
                const sortedIlceler = [...this.ilData[selectedIl]].sort((a, b) => a.localeCompare(b, 'tr-TR'));
                sortedIlceler.forEach(ilce => {
                    const option = document.createElement('option');
                    option.value = ilce;
                    option.textContent = ilce;
                    ilceSelect.appendChild(option);
                });
            } else {
                ilceSelect.disabled = true;
            }
            resultDiv.innerHTML = '';
            if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
        });

        sorgulaBtn.addEventListener('click', () => {
            function normalizeTurkish(str) {
                return (str || '')
                    .trim()
                    .toUpperCase('tr-TR')
                    .replace(/İ/g, 'I')
                    .replace(/I/g, 'I')
                    .replace(/ı/g, 'I')
                    .replace(/Ğ/g, 'G')
                    .replace(/Ü/g, 'U')
                    .replace(/Ş/g, 'S')
                    .replace(/Ö/g, 'O')
                    .replace(/Ç/g, 'C')
                    .replace(/ğ/g, 'G')
                    .replace(/ü/g, 'U')
                    .replace(/ş/g, 'S')
                    .replace(/ö/g, 'O')
                    .replace(/ç/g, 'C');
            }

            const ilName = (ilSelect.value || '').trim();
            const ilceName = (ilceSelect.value || '').trim();
            if (!ilName) {
                resultDiv.innerHTML = '<div class="result-box error">Lütfen il seçiniz.</div>';
                if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
                return;
            }
            if (!ilceName) {
                resultDiv.innerHTML = '<div class="result-box error">Lütfen ilçe seçiniz.</div>';
                if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
                return;
            }
            const normIl = normalizeTurkish(ilName);
            const normIlce = normalizeTurkish(ilceName);

            const sonuc = this.mahkemeVerileri.find(
                row =>
                    normalizeTurkish(row.il) === normIl &&
                    normalizeTurkish(row.ilce) === normIlce
            );
            if (!sonuc) {
                resultDiv.innerHTML = `<div class="result-box">Bilgi bulunamadı.</div>`;
                if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
                return;
            }
            resultDiv.innerHTML = `
                <div class="tapu-hesaplama-sonuc">
                    <h4>Girilen Adres Bakımından Yetkili Mahkemeler</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir"><span class="label">Adliye (Mülhakat):</span><span class="value">${sonuc.adliye}</span></div>
                        <div class="sonuc-satir"><span class="label">Ağır Ceza Merkezi:</span><span class="value">${sonuc.agirCeza}</span></div>
                        <div class="sonuc-satir"><span class="label">Cumhuriyet Başsavcılığı:</span><span class="value">${sonuc.bassavcilik}</span></div>
                        <div class="sonuc-satir"><span class="label">Bölge Adliye Mahkemesi:</span><span class="value">${sonuc.bolgeAdliye}</span></div>
                        <div class="sonuc-satir"><span class="label">Bölge İdare Mahkemesi:</span><span class="value">${sonuc.bolgeIdare}</span></div>
                        <div class="sonuc-satir"><span class="label">İdare Mahkemeleri:</span><span class="value">${sonuc.idare}</span></div>
                        <div class="sonuc-satir"><span class="label">Vergi Mahkemeleri:</span><span class="value">${sonuc.vergi}</span></div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Sorgulama sonuçları 13.09.2025 tarihi itibariyle güncellenmiş Hakimler ve Savcılar Kurulu verilerine dayanmaktadır.</p>
                        <p><strong>Not:</strong> Mülhakat adliyelerde ağır ceza mahkemesi bulunmaz. Bu mahkemeler, ağır cezayı gerektiren iş ve işlemler bakımından ağır ceza merkezindeki ağır ceza mahkemelerine bağlıdırlar.</p>
                    </div>
                    <style>
                        .uyari p{
                            text-align: left;
                            color: black;
                        }
                        .sonuc-satir span.label {
                            font-weight: bold;    
                        }
                    </style>
                </div>
            `;
            // PDF butonunu göster
            if (pdfBtnContainer) pdfBtnContainer.style.display = 'flex';
        });

        temizleBtn.addEventListener('click', () => {
            ilSelect.value = '';
            ilceSelect.innerHTML = '<option value="">Önce il seçin...</option>';
            ilceSelect.disabled = true;
            resultDiv.innerHTML = '';
            if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
        });

        // PDF butonuna tıklanıldığında sonucu PDF'e aktar
        if (pdfBtn) {
            pdfBtn.onclick = () => {
                const resultDiv = document.getElementById('mahkemeResult');
                let htmlContent = '';
                if (resultDiv) {
                    // Tüm child'ları birleştir (scrollable container'ın içeriği)
                    const parent = resultDiv.querySelector('.tapu-hesaplama-sonuc');
                    if (parent) {
                        htmlContent = parent.innerHTML;
                    } else {
                        htmlContent = resultDiv.innerHTML;
                    }
                }
                const tarih = new Date().toLocaleDateString('tr-TR');
                PdfCikar.showPdfModal(htmlContent, tarih);
            };
        }
    }
}

// Export for use in main script
window.YetkiliMahkemeSorgulama = YetkiliMahkemeSorgulama;