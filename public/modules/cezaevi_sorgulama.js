class CezaeviSorgulama {
    constructor() {
        this.cezaeviVerileri = [];
        this.ilListesi = this.getIlListesi();
        this.loadCezaeviData();
    }

    getIlListesi() {
        return [
            'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya',
            'Ardahan', 'Artvin', 'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik',
            'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum',
            'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
            'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
            'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis',
            'Kırklareli', 'Kırıkkale', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa',
            'Mardin', 'Mersin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye',
            'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Şanlıurfa', 'Şırnak',
            'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
        ];
    }

    async loadCezaeviData() {
        try {
            const response = await fetch('data/ceza_infaz_kurumlari_verileri_09092025.csv');
            const text = await response.text();
            this.parseCezaeviData(text);
        } catch (error) {
            console.error('Cezaevi verileri yüklenirken hata:', error);
        }
    }

    parseCezaeviData(csvText) {
        const lines = csvText.trim().split('\n');
        
        for (let i = 1; i < lines.length; i++) {
            const values = this.parseCSVLine(lines[i]);
            if (values.length >= 3) {
                this.cezaeviVerileri.push({
                    il: values[0].trim(),
                    kurumAdi: values[1].trim(),
                    telefon: values[2].trim(),
                    kurumCep: values[3] ? values[3].trim() : '',
                    email: values[4] ? values[4].trim() : '',
                    adres: values[5] ? values[5].trim() : '',
                    faks: values[6] ? values[6].trim() : '',
                    web: values[7] ? values[7].trim() : ''
                });
            }
        }
        
        console.log('Parsed cezaevi data:', this.cezaeviVerileri.length, 'items');
        console.log('First few items:', this.cezaeviVerileri.slice(0, 5));
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
            <h3>Cezaevi Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label>Sorgulama Türü:</label>
                    <div style="margin-bottom: 15px; display: flex; gap: 10px; flex-wrap: wrap; justify-content: center;">
                        <button type="button" class="mode-btn active" id="ileModeBtn" data-mode="il">İle Göre Sorgula</button>
                        <button type="button" class="mode-btn" id="kurumaModeBtn" data-mode="kurum">Kurum Adına Göre Sorgula</button>
                    </div>
                </div>

                <div class="form-group" id="ilSorgulamaGroup">
                    <label for="cezaeviIl">İl Seçiniz:</label>
                    <select id="cezaeviIl" class="form-select cezaevi-select">
                        <option value="">İl seçiniz...</option>
                    </select>
                </div>

                <div class="form-group" id="kurumSorgulamaGroup" style="display: none;">
                    <label for="kurumAdi">Kurum Adı:</label>
                    <input type="text" id="kurumAdi" placeholder="Kurum adını yazın... (Kurum adının baş harfini büyük yazınız)" class="form-input">
                    <div id="kurumOneri" class="kurum-oneri-container"></div>
                </div>
                
                <div class="form-actions">
                    <button id="cezaeviSorgulaBtn" class="hesapla-btn">Sorgula</button>
                    <button id="cezaeviTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="cezaeviResult" class="tapu-result"></div>
            </div>
            
            <style>
                .mode-btn {
                    padding: 10px 20px;
                    border: 2px solid #007bff;
                    background: transparent;
                    color: #007bff;
                    cursor: pointer;
                    border-radius: 5px;
                    transition: all 0.3s;
                    font-weight: bold;
                    font-size: 14px;
                }

                .mode-btn.active {
                    background: #007bff;
                    color: white;
                }

                .mode-btn:hover {
                    background: #0056b3;
                    color: white;
                    border-color: #0056b3;
                }

                .cezaevi-select {
                    position: relative;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                }

                .kurum-oneri-container {
                    max-height: 200px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-top: none;
                    background: white;
                    display: none;
                    position: absolute;
                    width: 100%;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                }

                .kurum-oneri-item {
                    padding: 10px;
                    cursor: pointer;
                    border-bottom: 1px solid #eee;
                    transition: background-color 0.2s;
                }

                .kurum-oneri-item:hover {
                    background-color: #f5f5f5;
                }

                .kurum-oneri-item:last-child {
                    border-bottom: none;
                }

                .tam-eslesme {
                    background-color: #d4edda !important;
                    color: #155724;
                    font-weight: bold;
                }

                .form-group {
                    position: relative;
                }

                @media (max-width: 520px) {
                    .mode-btn {
                        padding: 8px 16px;
                        font-size: 12px;
                        flex: 1;
                        min-width: 120px;
                    }
                }
            </style>
        `;
    }

    populateIlSelect() {
        const selectElement = document.getElementById('cezaeviIl');
        if (!selectElement) {
            console.error('İl select elementi bulunamadı');
            return;
        }
        
        if (this.ilListesi.length === 0) {
            console.error('İl listesi boş');
            return;
        }

        // Mevcut seçenekleri kontrol et - eğer zaten doldurulmuşsa tekrar doldurma
        if (selectElement.options.length > 1) {
            console.log('İl listesi zaten doldurulmuş');
            return;
        }

        // Mevcut seçenekleri temizle (ilk option hariç)
        selectElement.innerHTML = '<option value="">İl seçiniz...</option>';
        
        // İl listesini ekle
        this.ilListesi.forEach(il => {
            const option = document.createElement('option');
            option.value = il;
            option.textContent = il;
            selectElement.appendChild(option);
        });
        
        console.log('İl select dolduruldu:', selectElement.options.length, 'seçenek');
    }

    normalizeTurkish(text) {
        return text.toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/İ/g, 'i')
            .replace(/I/g, 'i')
            .replace(/Ğ/g, 'g')
            .replace(/Ü/g, 'u')
            .replace(/Ş/g, 's')
            .replace(/Ö/g, 'o')
            .replace(/Ç/g, 'c');
    }

    // Gelişmiş Türkçe karakter eşleştirme fonksiyonu
    turkishCharacterMatch(searchText, targetText) {
        // Hem arama metnini hem hedef metni normalize et
        const normalizedSearch = this.normalizeTurkish(searchText.toLowerCase());
        const normalizedTarget = this.normalizeTurkish(targetText.toLowerCase());
        
        // Orijinal metinleri de küçük harfe çevir
        const lowerSearch = searchText.toLowerCase();
        const lowerTarget = targetText.toLowerCase();
        
        // Çeşitli eşleştirme yöntemleri
        const matches = [
            // Direkt eşleşme
            lowerTarget.includes(lowerSearch),
            lowerSearch.includes(lowerTarget),
            // Normalize edilmiş eşleşme
            normalizedTarget.includes(normalizedSearch),
            normalizedSearch.includes(normalizedTarget),
            // Tam eşleşme
            lowerTarget === lowerSearch,
            normalizedTarget === normalizedSearch
        ];
        
        return matches.some(match => match);
    }

    // Ortak arama fonksiyonu
    searchCommon(searchText, searchField) {
        if (!searchText || !searchText.trim()) {
            return [];
        }
        
        const searchTerm = searchText.trim();
        
        return this.cezaeviVerileri.filter(cezaevi => {
            const targetField = searchField === 'il' ? cezaevi.il : cezaevi.kurumAdi;
            return this.turkishCharacterMatch(searchTerm, targetField);
        }).sort((a, b) => {
            const targetFieldA = searchField === 'il' ? a.il : a.kurumAdi;
            const targetFieldB = searchField === 'il' ? b.il : b.kurumAdi;
            
            // Tam eşleşmeleri önce göster
            const normalizedSearch = this.normalizeTurkish(searchTerm.toLowerCase());
            const aExact = this.normalizeTurkish(targetFieldA.toLowerCase()) === normalizedSearch;
            const bExact = this.normalizeTurkish(targetFieldB.toLowerCase()) === normalizedSearch;
            
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;
            
            // Alfabetik sıralama
            return targetFieldA.localeCompare(targetFieldB, 'tr');
        });
    }

    searchCezaevi(ilAdi) {
        return this.searchCommon(ilAdi, 'il');
    }

    searchCezaeviByName(kurumAdi) {
        if (!kurumAdi || !kurumAdi.trim()) {
            return [];
        }

        const searchTerm = this.normalizeTurkish(kurumAdi.trim().toLowerCase());

        return this.cezaeviVerileri.filter(cezaevi => {
            const kurumAdiLower = this.normalizeTurkish(cezaevi.kurumAdi.toLowerCase());
            const ilAdiLower = this.normalizeTurkish(cezaevi.il.toLowerCase());

            // Hem kurum adında hem de il adında ara
            return kurumAdiLower.includes(searchTerm) || ilAdiLower.includes(searchTerm);
        }).sort((a, b) => {
            // Tam eşleşmeleri önce göster (önce kurum adı, sonra il adı)
            const normalizedSearch = this.normalizeTurkish(searchTerm);
            const aKurumExact = this.normalizeTurkish(a.kurumAdi.toLowerCase()) === normalizedSearch;
            const bKurumExact = this.normalizeTurkish(b.kurumAdi.toLowerCase()) === normalizedSearch;
            const aIlExact = this.normalizeTurkish(a.il.toLowerCase()) === normalizedSearch;
            const bIlExact = this.normalizeTurkish(b.il.toLowerCase()) === normalizedSearch;

            // Kurum adında tam eşleşme en önde
            if (aKurumExact && !bKurumExact) return -1;
            if (!aKurumExact && bKurumExact) return 1;

            // İl adında tam eşleşme ikinci sırada
            if (aIlExact && !bIlExact) return -1;
            if (!aIlExact && bIlExact) return 1;

            // Alfabetik sıralama
            return a.kurumAdi.localeCompare(b.kurumAdi, 'tr');
        });
    }

    showKurumSuggestions(kurumAdi) {
        const oneriContainer = document.getElementById('kurumOneri');
        
        if (!kurumAdi.trim()) {
            oneriContainer.style.display = 'none';
            return;
        }

        const sonuclar = this.searchCezaeviByName(kurumAdi);
        
        if (sonuclar.length === 0) {
            oneriContainer.style.display = 'none';
            return;
        }

        const normalizedInput = this.normalizeTurkish(kurumAdi.toLowerCase());
        let html = '';
        
        sonuclar.slice(0, 10).forEach(kurum => {
            const normalizedKurum = this.normalizeTurkish(kurum.kurumAdi.toLowerCase());
            const tamEslesme = normalizedKurum === normalizedInput;
            
            html += `
                <div class="kurum-oneri-item ${tamEslesme ? 'tam-eslesme' : ''}" 
                     data-kurum='${JSON.stringify(kurum)}'>
                    ${kurum.kurumAdi} - ${kurum.il}
                </div>
            `;
        });

        oneriContainer.innerHTML = html;
        oneriContainer.style.display = 'block';

        // Önerilere tıklama olayları ekle
        oneriContainer.querySelectorAll('.kurum-oneri-item').forEach(item => {
            item.addEventListener('click', () => {
                const kurumData = JSON.parse(item.getAttribute('data-kurum'));
                this.showKurumDetay(kurumData);
                oneriContainer.style.display = 'none';
                document.getElementById('kurumAdi').value = kurumData.kurumAdi;
            });
        });
    }

    showKurumDetay(kurum) {
        const cezaeviResult = document.getElementById('cezaeviResult');
        
        let html = `
            <div class="tapu-hesaplama-sonuc">
                <h4>Ceza İnfaz Kurumu Detayları</h4>
                <div class="cezaevi-sonuc-container">
                    <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                        <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${kurum.il}</h5>
                        <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                            <div class="sonuc-satir">
                                <span class="label">Kurum Adı:</span>
                                <span class="value">${kurum.kurumAdi}</span>
                            </div>
                            <div class="sonuc-satir">
                                <span class="label">Telefon:</span>
                                <span class="value">${kurum.telefon}</span>
                            </div>
                            ${kurum.kurumCep && kurum.kurumCep !== '-' ? `
                            <div class="sonuc-satir">
                                <span class="label">Kurum Cep:</span>
                                <span class="value">${kurum.kurumCep}</span>
                            </div>` : ''}
                            ${kurum.email ? `
                            <div class="sonuc-satir">
                                <span class="label">E-Posta:</span>
                                <span class="value">${kurum.email}</span>
                            </div>` : ''}
                            <div class="sonuc-satir">
                                <span class="label">Adres:</span>
                                <span class="value">${kurum.adres}</span>
                            </div>
                            ${kurum.faks && kurum.faks !== '-' ? `
                            <div class="sonuc-satir">
                                <span class="label">Faks:</span>
                                <span class="value">${kurum.faks}</span>
                            </div>` : ''}
                            ${kurum.web ? `
                            <div class="sonuc-satir">
                                <span class="label">Web:</span>
                                <span class="value"><a href="${kurum.web}" target="_blank">${kurum.web}</a></span>
                            </div>` : ''}
                        </div>
                    </div>
                </div>
                <div class="uyari">
                    <p>Bu bilgiler 09.09.2025 tarihli Adalet Bakanlığı Ceza ve Tevkifevleri Genel Müdürlüğü verilerine dayanmaktadır.</p>
                </div>
                <style>
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

        cezaeviResult.innerHTML = html;
    }

    initialize() {
        // İl listesini kontrol et ve tek seferlik doldur
        setTimeout(() => {
            if (this.ilListesi.length > 0) {
                this.populateIlSelect();
            }
        }, 200);

        const ileModeBtn = document.getElementById('ileModeBtn');
        const kurumaModeBtn = document.getElementById('kurumaModeBtn');
        const ilSorgulamaGroup = document.getElementById('ilSorgulamaGroup');
        const kurumSorgulamaGroup = document.getElementById('kurumSorgulamaGroup');
        const cezaeviIlSelect = document.getElementById('cezaeviIl');
        const kurumAdiInput = document.getElementById('kurumAdi');
        const cezaeviSorgulaBtn = document.getElementById('cezaeviSorgulaBtn');
        const cezaeviTemizleBtn = document.getElementById('cezaeviTemizleBtn');
        const cezaeviResult = document.getElementById('cezaeviResult');
        const oneriContainer = document.getElementById('kurumOneri');

        if (!cezaeviSorgulaBtn || !cezaeviTemizleBtn || !cezaeviResult) {
            console.error('Cezaevi sorgulama elementi bulunamadı');
            return;
        }

        // Mod buton değişiklikleri
        ileModeBtn.addEventListener('click', () => {
            ileModeBtn.classList.add('active');
            kurumaModeBtn.classList.remove('active');
            ilSorgulamaGroup.style.display = 'block';
            kurumSorgulamaGroup.style.display = 'none';
            oneriContainer.style.display = 'none';
            cezaeviResult.innerHTML = '';
        });

        kurumaModeBtn.addEventListener('click', () => {
            kurumaModeBtn.classList.add('active');
            ileModeBtn.classList.remove('active');
            ilSorgulamaGroup.style.display = 'none';
            kurumSorgulamaGroup.style.display = 'block';
            cezaeviResult.innerHTML = '';
        });

        // Kurum adı input olayları
        if (kurumAdiInput) {
            kurumAdiInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (value.length >= 2) {
                    this.showKurumSuggestions(value);
                } else {
                    oneriContainer.style.display = 'none';
                }
            });

            kurumAdiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    cezaeviSorgulaBtn.click();
                }
            });

            // Input dışına tıklandığında önerileri gizle
            document.addEventListener('click', (e) => {
                if (!kurumSorgulamaGroup.contains(e.target)) {
                    oneriContainer.style.display = 'none';
                }
            });
        }

        // Sorgula butonu
        cezaeviSorgulaBtn.addEventListener('click', () => {
            const aktifMod = document.querySelector('.mode-btn.active').getAttribute('data-mode');
            
            if (aktifMod === 'il') {
                this.sorgulaIl();
            } else {
                this.sorgulaKurum();
            }
        });

        // Temizle butonu
        cezaeviTemizleBtn.addEventListener('click', () => {
            cezaeviIlSelect.value = '';
            kurumAdiInput.value = '';
            oneriContainer.style.display = 'none';
            cezaeviResult.innerHTML = '';
        });

        console.log('Cezaevi Sorgulama modülü başlatıldı');
    }

    sorgulaIl() {
        const cezaeviIlSelect = document.getElementById('cezaeviIl');
        const cezaeviResult = document.getElementById('cezaeviResult');
        const ilAdi = cezaeviIlSelect.value.trim();
        
        if (!ilAdi) {
            cezaeviResult.innerHTML = '<div class="result-box error">Lütfen bir il seçin.</div>';
            return;
        }

        const sonuclar = this.searchCezaevi(ilAdi);
        
        if (sonuclar.length === 0) {
            cezaeviResult.innerHTML = `
                <div class="result-box">
                    <h4>Arama Sonucu</h4>
                    <p><strong>"${ilAdi}"</strong> ili için ceza infaz kurumu bilgisi bulunamadı.</p>
                </div>
            `;
            return;
        }

        this.showSonuclar(sonuclar);
    }

    sorgulaKurum() {
        const kurumAdiInput = document.getElementById('kurumAdi');
        const cezaeviResult = document.getElementById('cezaeviResult');
        const kurumAdi = kurumAdiInput.value.trim();

        console.log('Kurum adı:', kurumAdi);
        console.log('cezaeviResult:', cezaeviResult);
        console.log('kurumAdiInput:', kurumAdiInput);

        if (!kurumAdi) {
            cezaeviResult.innerHTML = '<div class="result-box error">Lütfen bir kurum adı girin.</div>';
            return;
        }

        const sonuclar = this.searchCezaeviByName(kurumAdi);

        console.log('Arama sonuçları:', sonuclar);
        
        if (sonuclar.length === 0) {
            cezaeviResult.innerHTML = `
                <div class="result-box">
                    <h4>Arama Sonucu</h4>
                    <p><strong>"${kurumAdi}"</strong> için ceza infaz kurumu bilgisi bulunamadı.</p>
                </div>
            `;
            return;
        }

        this.showSonuclar(sonuclar);
    }

    showSonuclar(sonuclar) {
        const cezaeviResult = document.getElementById('cezaeviResult');
        
        // Sonuçları grupla
        const ilGruplari = {};
        sonuclar.forEach(cezaevi => {
            if (!ilGruplari[cezaevi.il]) {
                ilGruplari[cezaevi.il] = [];
            }
            ilGruplari[cezaevi.il].push(cezaevi);
        });

        let html = `
            <div class="tapu-hesaplama-sonuc">
                <h4>Ceza İnfaz Kurumları Sorgulama Sonucu</h4>
                <div class="cezaevi-sonuc-container" style="max-height: 400px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
        `;

        Object.keys(ilGruplari).forEach(il => {
            const kurumlar = ilGruplari[il];
            html += `
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">${il}</h5>
            `;

            kurumlar.forEach((kurum, index) => {
                html += `
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Kurum Adı:</span>
                            <span class="value">${kurum.kurumAdi}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Telefon:</span>
                            <span class="value">${kurum.telefon}</span>
                        </div>
                        ${kurum.kurumCep && kurum.kurumCep !== '-' ? `
                        <div class="sonuc-satir">
                            <span class="label">Kurum Cep:</span>
                            <span class="value">${kurum.kurumCep}</span>
                        </div>` : ''}
                        ${kurum.email ? `
                        <div class="sonuc-satir">
                            <span class="label">E-Posta:</span>
                            <span class="value">${kurum.email}</span>
                        </div>` : ''}
                        <div class="sonuc-satir">
                            <span class="label">Adres:</span>
                            <span class="value">${kurum.adres}</span>
                        </div>
                        ${kurum.faks && kurum.faks !== '-' ? `
                        <div class="sonuc-satir">
                            <span class="label">Faks:</span>
                            <span class="value">${kurum.faks}</span>
                        </div>` : ''}
                        ${kurum.web ? `
                        <div class="sonuc-satir">
                            <span class="label">Web:</span>
                            <span class="value"><a href="${kurum.web}" target="_blank">${kurum.web}</a></span>
                        </div>` : ''}
                    </div>
                `;
            });

            html += '</div>';
        });

        html += `
                </div>
                <div class="uyari">
                    <p>Bu bilgiler 09.09.2025 tarihli Adalet Bakanlığı Ceza ve Tevkifevleri Genel Müdürlüğü verilerine dayanmaktadır.</p>
                </div>
                <style>
                    .cezaevi-sonuc-container::-webkit-scrollbar {
                        width: 6px;
                    }
                    .cezaevi-sonuc-container::-webkit-scrollbar-track {
                        background: #f0f0f0;
                        border-radius: 3px;
                    }
                    .cezaevi-sonuc-container::-webkit-scrollbar-thumb {
                        background: #007bff;
                        border-radius: 3px;
                    }
                    .cezaevi-sonuc-container::-webkit-scrollbar-thumb:hover {
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

        cezaeviResult.innerHTML = html;
    }
}

// Export for use in main script
window.CezaeviSorgulama = CezaeviSorgulama;

