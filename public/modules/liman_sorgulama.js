class LimanSorgulama {
    constructor() {
        this.portData = {};
        this.dataLoaded = false;
        this.loadPortData();
    }

    async loadPortData() {
        try {
            const response = await fetch('./data/liman_verileri.csv');
            const csvText = await response.text();
            this.parseCsvData(csvText);
            this.dataLoaded = true;
        } catch (error) {
            console.error('CSV dosyası yüklenirken hata:', error);
            // Fallback data in case CSV fails
            this.portData = {
                "TRALA-001": "ALANYA DEMİR MEVKİİ",
                "TRALA-002": "ALANYA İSKELESİ", 
                "TRISK-001": "ASSAN PORT İSKENDERUN",
                "TRIST-005": "KARAKÖY SALIPAZARI LİMANI",
                "TRIZM-001": "ALSANCAK LİMANI"
            };
            this.dataLoaded = true;
        }
    }

    parseCsvData(csvText) {
        const lines = csvText.trim().split('\n');
        // Skip header line (liman_turk_adi;liman_turk_kodu)
        for (let i = 1; i < lines.length; i++) {
            const [limanAdi, limanKodu] = lines[i].split(';');
            if (limanKodu && limanAdi) {
                // Remove \r and \n characters and trim whitespace
                // Also fix Turkish character encoding issues (� becomes proper Turkish chars)
                const cleanLimanAdi = limanAdi.trim()
                    .replace(/\r/g, '').replace(/\n/g, '')
                    .replace(/�/g, 'İ')
                    .replace(/�/g, 'Ş')
                    .replace(/�/g, 'Ğ')
                    .replace(/�/g, 'Ü')
                    .replace(/�/g, 'Ö')
                    .replace(/�/g, 'Ç');
                
                const cleanLimanKodu = limanKodu.trim().replace(/\r/g, '').replace(/\n/g, '');
                
                this.portData[cleanLimanKodu] = cleanLimanAdi;
            }
        }
        console.log('Loaded port data:', this.portData);
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
            <h3>Türkiye Liman Sorgulama</h3>
            <div class="plaka-container">
                <div class="search-mode-buttons">
                    <button id="limanKodMode" class="mode-btn active">Koddan Bul</button>
                    <button id="limanIsimMode" class="mode-btn">İsimden Bul</button>
                </div>
                <div class="plaka-search">
                    <input type="text" id="limanInput" placeholder="Liman kodunu girin (örn: TRALA-001, TRIST-005)" class="plaka-input">
                    <button id="limanSearchBtn" class="plaka-search-btn">Ara</button>
                </div>
                <div id="limanResult" class="plaka-result"></div>
                <div class="results-container">
                    <h4>Tüm Eşleşmeler:</h4>
                    <div id="allResults" class="all-results-list">
                        <p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>
                    </div>
                </div>
            </div>
        `;
    }

    initialize() {
        const limanKodMode = document.getElementById('limanKodMode');
        const limanIsimMode = document.getElementById('limanIsimMode');
        const limanInput = document.getElementById('limanInput');
        const limanSearchBtn = document.getElementById('limanSearchBtn');
        const limanResult = document.getElementById('limanResult');
        const allResults = document.getElementById('allResults');
        
        let currentMode = 'kod';
        
        // Mode switching
        limanKodMode.addEventListener('click', () => {
            currentMode = 'kod';
            limanKodMode.classList.add('active');
            limanIsimMode.classList.remove('active');
            limanInput.placeholder = 'Liman kodunu girin (örn: TRALA-001, TRIST-005)';
            limanResult.innerHTML = '';
            allResults.innerHTML = '<p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>';
        });
        
        limanIsimMode.addEventListener('click', () => {
            currentMode = 'isim';
            limanIsimMode.classList.add('active');
            limanKodMode.classList.remove('active');
            limanInput.placeholder = 'Liman adını girin (örn: Alanya, İstanbul)';
            limanResult.innerHTML = '';
            allResults.innerHTML = '<p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>';
        });
        
        // Search functionality
        const performSearch = () => {
            // Wait for data to be loaded
            if (!this.dataLoaded) {
                limanResult.innerHTML = '<p style="color: black;">Veriler yükleniyor, lütfen bekleyin...</p>';
                allResults.innerHTML = '<p class="no-results">Veriler yükleniyor...</p>';
                setTimeout(() => performSearch(), 500);
                return;
            }

            const searchTerm = limanInput.value.trim();
            if (!searchTerm) {
                limanResult.innerHTML = '<p style="color: black;">Lütfen bir değer girin.</p>';
                allResults.innerHTML = '<p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>';
                return;
            }
            
            if (currentMode === 'kod') {
                // Search by port code (like TRALA-001)
                const searchTermUpper = searchTerm.toUpperCase();
                
                // Find exact match and partial matches
                let exactMatch = null;
                let partialMatches = [];
                
                for (const code in this.portData) {
                    if (code === searchTermUpper) {
                        exactMatch = {code: code, name: this.portData[code]};
                    } else if (code.includes(searchTermUpper)) {
                        partialMatches.push({code: code, name: this.portData[code]});
                    }
                }
                
                if (exactMatch) {
                    // Show all matches (exact + partial)
                    let allMatches = [exactMatch, ...partialMatches];
                    let allResultsHtml = '';
                    allMatches.forEach(result => {
                        allResultsHtml += `<div class="result-item">
                            <strong>${result.code}</strong><br>
                            <span class="result-name">${result.name}</span>
                        </div>`;
                    });
                    allResults.innerHTML = allResultsHtml;
                    
                    limanResult.innerHTML = `<div class="result-count">${allMatches.length} adet eşleşme bulundu</div>`;
                } else if (partialMatches.length > 0) {
                    let allResultsHtml = '';
                    partialMatches.forEach(result => {
                        allResultsHtml += `<div class="result-item">
                            <strong>${result.code}</strong><br>
                            <span class="result-name">${result.name}</span>
                        </div>`;
                    });
                    allResults.innerHTML = allResultsHtml;
                    limanResult.innerHTML = `<div class="result-count">${partialMatches.length} adet eşleşme bulundu</div>`;
                } else {
                    limanResult.innerHTML = '<div class="result-box error">Bu liman kodu bulunamadı.</div>';
                    allResults.innerHTML = '<p class="no-results">Eşleşme bulunamadı</p>';
                }
            } else {
                // Search by port name - show all matches
                let searchTermUpper = searchTerm
                    .replace(/ı/g, 'I')
                    .replace(/i/g, 'İ')
                    .replace(/ğ/g, 'Ğ')
                    .replace(/ü/g, 'Ü')
                    .replace(/ş/g, 'Ş')
                    .replace(/ö/g, 'Ö')
                    .replace(/ç/g, 'Ç')
                    .toUpperCase();
                
                let foundCodes = [];
                
                // Find all matches - search more comprehensively
                for (const code in this.portData) {
                    const portName = this.portData[code].trim();
                    if (portName.includes(searchTermUpper)) {
                        foundCodes.push({code: code, name: portName});
                    }
                }
                
                if (foundCodes.length > 0) {
                    // Show all results in scrollable list
                    let allResultsHtml = '';
                    foundCodes.forEach(result => {
                        allResultsHtml += `<div class="result-item">
                            <strong>${result.code}</strong><br>
                            <span class="result-name">${result.name}</span>
                        </div>`;
                    });
                    allResults.innerHTML = allResultsHtml;
                    
                    // Only show count for name searches
                    limanResult.innerHTML = `<div class="result-count">${foundCodes.length} adet eşleşme bulundu</div>`;
                } else {
                    limanResult.innerHTML = '<div class="result-box error">Bu liman adı bulunamadı. Liman adının bir kısmını yazın.</div>';
                    allResults.innerHTML = '<p class="no-results">Eşleşme bulunamadı</p>';
                }
            }
        };
        
        limanSearchBtn.addEventListener('click', performSearch);
        limanInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}
// Export for use in main script
window.LimanSorgulama = LimanSorgulama;



