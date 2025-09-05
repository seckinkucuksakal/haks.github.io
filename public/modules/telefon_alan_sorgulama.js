class TelefonAlanSorgulama {
    constructor() {
        this.countryData = {};
        this.dataLoaded = false;
        this.loadCountryData();
    }

    async loadCountryData() {
        try {
            const response = await fetch('./data/ulke_alan_verileri.csv');
            const csvText = await response.text();
            this.parseCsvData(csvText);
            this.dataLoaded = true;
        } catch (error) {
            console.error('CSV dosyası yüklenirken hata:', error);
            // Fallback data in case CSV fails
            this.countryData = {
                "+90": "TÜRKİYE",
                "+49": "ALMANYA", 
                "+31": "HOLLANDA",
                "+33": "FRANSA",
                "+44": "İNGİLTERE"
            };
            this.dataLoaded = true;
        }
    }

    parseCsvData(csvText) {
        const lines = csvText.trim().split('\n');
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Try different separators
            let parts = line.split(',');
            if (parts.length < 2) {
                parts = line.split(';');
            }
            
            if (parts.length >= 2) {
                const [countryName, areaCode] = parts;
                if (countryName && areaCode) {
                    // Clean and fix Turkish character encoding
                    const cleanCountryName = countryName.trim()
                        .replace(/\r/g, '').replace(/\n/g, '')
                        .replace(/�/g, 'İ').replace(/�/g, 'Ş').replace(/�/g, 'Ğ')
                        .replace(/�/g, 'Ü').replace(/�/g, 'Ö').replace(/�/g, 'Ç')
                        .toUpperCase();
                    
                    let cleanAreaCode = areaCode.trim().replace(/\r/g, '').replace(/\n/g, '');
                    
                    // Ensure area code starts with +
                    if (!cleanAreaCode.startsWith('+')) {
                        cleanAreaCode = '+' + cleanAreaCode;
                    }
                    
                    this.countryData[cleanAreaCode] = cleanCountryName;
                }
            }
        }
        console.log('Loaded country data:', this.countryData);
    }

    // Turkish character normalization function
    normalizeTurkish(text) {
        return text.toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c');
    }

    getTabContent() {
        return `
            <h3>Telefon Alan Kodu Sorgulama</h3>
            <div class="plaka-container">
                <div class="search-mode-buttons">
                    <button id="telefonKodMode" class="mode-btn active">Koddan Bul</button>
                    <button id="telefonIsimMode" class="mode-btn">İsimden Bul</button>
                </div>
                <div class="plaka-search">
                    <input type="text" id="telefonInput" placeholder="Alan kodunu girin (örn: +90, +49)" class="plaka-input">
                    <button id="telefonSearchBtn" class="plaka-search-btn">Ara</button>
                </div>
                <div id="telefonResult" class="plaka-result"></div>
            </div>
        `;
    }

    initialize() {
        const telefonKodMode = document.getElementById('telefonKodMode');
        const telefonIsimMode = document.getElementById('telefonIsimMode');
        const telefonInput = document.getElementById('telefonInput');
        const telefonSearchBtn = document.getElementById('telefonSearchBtn');
        const telefonResult = document.getElementById('telefonResult');
        
        let currentMode = 'kod';
        
        // Mode switching
        telefonKodMode.addEventListener('click', () => {
            currentMode = 'kod';
            telefonKodMode.classList.add('active');
            telefonIsimMode.classList.remove('active');
            telefonInput.placeholder = 'Alan kodunu girin (örn: +90, +49)';
            telefonResult.innerHTML = '';
        });
        
        telefonIsimMode.addEventListener('click', () => {
            currentMode = 'isim';
            telefonIsimMode.classList.add('active');
            telefonKodMode.classList.remove('active');
            telefonInput.placeholder = 'Ülke adını girin (örn: türkiye, almanya)';
            telefonResult.innerHTML = '';
        });
        
        // Search functionality
        const performSearch = () => {
            // Wait for data to be loaded
            if (!this.dataLoaded) {
                telefonResult.innerHTML = '<p style="color: black;">Veriler yükleniyor, lütfen bekleyin...</p>';
                setTimeout(() => performSearch(), 500);
                return;
            }

            const searchTerm = telefonInput.value.trim();
            if (!searchTerm) {
                telefonResult.innerHTML = '<p style="color: black;">Lütfen bir değer girin.</p>';
                return;
            }
            
            if (currentMode === 'kod') {
                // Search by area code
                let searchCode = searchTerm;
                if (!searchCode.startsWith('+')) {
                    searchCode = '+' + searchCode;
                }
                
                console.log('Searching for code:', searchCode);
                console.log('Available codes:', Object.keys(this.countryData));
                
                if (this.countryData[searchCode]) {
                    telefonResult.innerHTML = `<div class="result-box"><strong>${searchCode}</strong> alan kodu: <span style="color: #007bff; font-weight: bold;">${this.countryData[searchCode]}</span></div>`;
                } else {
                    telefonResult.innerHTML = '<div class="result-box error">Bu alan kodu bulunamadı.</div>';
                }
            } else {
                // Search by country name
                let searchTermUpper = searchTerm
                    .replace(/ı/g, 'I')
                    .replace(/i/g, 'İ')
                    .replace(/ğ/g, 'Ğ')
                    .replace(/ü/g, 'Ü')
                    .replace(/ş/g, 'Ş')
                    .replace(/ö/g, 'Ö')
                    .replace(/ç/g, 'Ç')
                    .toUpperCase()
                    .replace(/İ/g, 'I'); // Convert İ back to I after toUpperCase
                
                console.log('Search term:', searchTerm);
                console.log('Normalized search term:', searchTermUpper);
                console.log('Available countries:', Object.values(this.countryData));
                
                let foundCode = null;
                
                // Find country match - normalize both sides
                for (const code in this.countryData) {
                    const countryName = this.countryData[code].trim();
                    
                    // Normalize the country name from database too
                    const normalizedCountryName = countryName
                        .replace(/ı/g, 'I')
                        .replace(/i/g, 'İ')
                        .replace(/ğ/g, 'Ğ')
                        .replace(/ü/g, 'Ü')
                        .replace(/ş/g, 'Ş')
                        .replace(/ö/g, 'Ö')
                        .replace(/ç/g, 'Ç')
                        .toUpperCase()
                        .replace(/İ/g, 'I'); // Convert İ back to I after toUpperCase
                    
                    console.log(`Checking: "${normalizedCountryName}" includes "${searchTermUpper}"?`, normalizedCountryName.includes(searchTermUpper));
                    
                    if (normalizedCountryName.includes(searchTermUpper)) {
                        foundCode = code;
                        console.log('Found match:', foundCode, countryName);
                        break;
                    }
                }
                
                if (foundCode) {
                    telefonResult.innerHTML = `<div class="result-box"><strong>${this.countryData[foundCode]}</strong> ülkesinin alan kodu: <span style="color: #007bff; font-weight: bold;">${foundCode}</span></div>`;
                } else {
                    telefonResult.innerHTML = '<div class="result-box error">Bu ülke adı bulunamadı.</div>';
                }
            }
        };
        
        telefonSearchBtn.addEventListener('click', performSearch);
        telefonInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Export for use in main script
window.TelefonAlanSorgulama = TelefonAlanSorgulama;

