class HavalimaniSorgulama {
    constructor() {
        this.airportData = [];
        this.dataLoaded = false;
        this.loadAirportData();
    }

    async loadAirportData() {
        try {
            console.log('Attempting to load airport data...');
            const response = await fetch('./data/airport_verileri.csv');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const csvText = await response.text();
            console.log('CSV loaded, length:', csvText.length);
            console.log('First 200 chars:', csvText.substring(0, 200));
            
            this.parseCsvData(csvText);
            this.dataLoaded = true;
            console.log('Airport data loaded successfully, count:', this.airportData.length);
        } catch (error) {
            console.error('CSV dosyası yüklenirken hata:', error);
            console.log('Using fallback data');
            // Fallback data in case CSV fails
            this.airportData = [
                {
                    airport_name: "İSTANBUL HAVALİMANI",
                    airport_city: "İSTANBUL",
                    airport_country: "TÜRKİYE",
                    iata_code: "IST",
                    icao_code: "LTBA"
                },
                {
                    airport_name: "SABIHA GÖKÇEN HAVALİMANI",
                    airport_city: "İSTANBUL",
                    airport_country: "TÜRKİYE",
                    iata_code: "SAW",
                    icao_code: "LTFM"
                }
            ];
            this.dataLoaded = true;
        }
    }

    parseCsvData(csvText) {
        console.log('Starting CSV parsing...');
        const lines = csvText.trim().split('\n');
        console.log('Total lines:', lines.length);
        console.log('Header line:', lines[0]);
        
        this.airportData = [];
        
        // Skip header line (airport_name,airport_city,airport_country,iata_code,icao_code)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue; // Skip empty lines
            
            console.log(`Processing line ${i}:`, line);
            
            // Try different separators - might be semicolon instead of comma
            let parts = line.split(',');
            if (parts.length < 5) {
                parts = line.split(';');
            }
            
            console.log('Split parts:', parts);
            
            if (parts.length >= 5) {
                const [airportName, airportCity, airportCountry, iataCode, icaoCode] = parts;
                
                if (airportName && airportCity && airportCountry && iataCode && icaoCode) {
                    // Clean and fix Turkish character encoding
                    const cleanData = {
                        airport_name: airportName.trim()
                            .replace(/\r/g, '').replace(/\n/g, '')
                            .replace(/�/g, 'İ').replace(/�/g, 'Ş').replace(/�/g, 'Ğ')
                            .replace(/�/g, 'Ü').replace(/�/g, 'Ö').replace(/�/g, 'Ç'),
                        airport_city: airportCity.trim()
                            .replace(/\r/g, '').replace(/\n/g, '')
                            .replace(/�/g, 'İ').replace(/�/g, 'Ş').replace(/�/g, 'Ğ')
                            .replace(/�/g, 'Ü').replace(/�/g, 'Ö').replace(/�/g, 'Ç'),
                        airport_country: airportCountry.trim()
                            .replace(/\r/g, '').replace(/\n/g, '')
                            .replace(/�/g, 'İ').replace(/�/g, 'Ş').replace(/�/g, 'Ğ')
                            .replace(/�/g, 'Ü').replace(/�/g, 'Ö').replace(/�/g, 'Ç'),
                        iata_code: iataCode.trim().replace(/\r/g, '').replace(/\n/g, ''),
                        icao_code: icaoCode.trim().replace(/\r/g, '').replace(/\n/g, '')
                    };
                    
                    this.airportData.push(cleanData);
                    console.log('Added airport:', cleanData);
                } else {
                    console.log('Skipping incomplete line:', parts);
                }
            } else {
                console.log('Line does not have enough parts:', parts.length, parts);
            }
        }
        
        console.log('Final airport data count:', this.airportData.length);
        console.log('Sample data:', this.airportData.slice(0, 3));
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
            <h3>Uluslararası Havalimanı Sorgulama 
                <span class="info-button" title="IATA: Uluslararası Hava Taşımacılığı Birliği Kodu&#10;ICAO: Uluslararası Sivil Havacılık Örgütü Kodu">ℹ️</span>
            </h3>
            <div class="plaka-container">
                <div class="plaka-search">
                    <input type="text" id="havalimaniInput" placeholder="Havalimanı adı, şehir, ülke veya kod girin (örn: İstanbul, LTBA, IST)" class="plaka-input">
                    <button id="havalimaniSearchBtn" class="plaka-search-btn">Ara</button>
                </div>
                <div id="havalimaniResult" class="plaka-result"></div>
                <div class="results-container">
                    <h4>Tüm Eşleşmeler:</h4>
                    <div id="allHavalimaniResults" class="all-results-list">
                        <p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>
                    </div>
                </div>
            </div>
        `;
    }

    initialize() {
        const havalimaniInput = document.getElementById('havalimaniInput');
        const havalimaniSearchBtn = document.getElementById('havalimaniSearchBtn');
        const havalimaniResult = document.getElementById('havalimaniResult');
        const allHavalimaniResults = document.getElementById('allHavalimaniResults');
        
        // Search functionality
        const performSearch = () => {
            // Wait for data to be loaded
            if (!this.dataLoaded) {
                havalimaniResult.innerHTML = '<p style="color: black;">Veriler yükleniyor, lütfen bekleyin...</p>';
                allHavalimaniResults.innerHTML = '<p class="no-results">Veriler yükleniyor...</p>';
                setTimeout(() => performSearch(), 500);
                return;
            }

            const searchTerm = havalimaniInput.value.trim();
            if (!searchTerm) {
                havalimaniResult.innerHTML = '<p style="color: black;">Lütfen bir değer girin.</p>';
                allHavalimaniResults.innerHTML = '<p class="no-results">Arama yapın ve tüm eşleşmeler burada görünecek</p>';
                return;
            }
            
            // Improved Turkish character handling for search
            let searchTermUpper = searchTerm.toUpperCase()
                .replace(/I/g, 'I')
                .replace(/İ/g, 'I')
                .replace(/Ğ/g, 'G')
                .replace(/Ü/g, 'U')
                .replace(/Ş/g, 'S')
                .replace(/Ö/g, 'O')
                .replace(/Ç/g, 'C');
            
            let foundAirports = [];
            let exactMatch = null;
            
            // Search through all airports and all fields
            this.airportData.forEach(airport => {
                // Check for exact IATA or ICAO match first
                if (airport.iata_code.toUpperCase() === searchTerm.toUpperCase() || 
                    airport.icao_code.toUpperCase() === searchTerm.toUpperCase()) {
                    exactMatch = airport;
                    return; // Found exact match, no need to continue with this airport
                }
                
                // Normalize both search term and data for better matching
                const normalizeText = (text) => {
                    return text.toUpperCase()
                        .replace(/I/g, 'I')
                        .replace(/İ/g, 'I')
                        .replace(/Ğ/g, 'G')
                        .replace(/Ü/g, 'U')
                        .replace(/Ş/g, 'S')
                        .replace(/Ö/g, 'O')
                        .replace(/Ç/g, 'C');
                };
                
                const searchableText = [
                    normalizeText(airport.airport_name),
                    normalizeText(airport.airport_city),
                    normalizeText(airport.airport_country),
                    normalizeText(airport.iata_code),
                    normalizeText(airport.icao_code)
                ].join(' ');
                
                if (searchableText.includes(searchTermUpper)) {
                    foundAirports.push(airport);
                }
            });
            
            // If we have an exact match, put it at the beginning
            if (exactMatch) {
                foundAirports = foundAirports.filter(airport => airport !== exactMatch);
                foundAirports.unshift(exactMatch);
            }
            
            if (foundAirports.length > 0) {
                // Show all results in scrollable list
                let allResultsHtml = '';
                foundAirports.forEach((airport, index) => {
                    const isExactMatch = index === 0 && exactMatch;
                    const searchQuery = `${airport.airport_name} ${airport.airport_city}`;
                    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
                    
                    allResultsHtml += `<div class="result-item ${isExactMatch ? 'exact-match' : ''}" onclick="window.open('${googleUrl}', '_blank')" style="cursor: pointer;">
                        <div class="airport-result">
                            <div class="airport-name">
                                <strong>${airport.airport_name}</strong>
                                ${isExactMatch ? '<span class="exact-badge">TAM EŞLEŞME</span>' : ''}
                            </div>
                            <div class="airport-location">${airport.airport_city}, ${airport.airport_country}</div>
                            <div class="airport-codes">
                                <span class="code-label">IATA:</span> <strong>${airport.iata_code}</strong> | 
                                <span class="code-label">ICAO:</span> <strong>${airport.icao_code}</strong>
                            </div>
                        </div>
                    </div>`;
                });
                allHavalimaniResults.innerHTML = allResultsHtml;
                
                // Show count
                havalimaniResult.innerHTML = `<div class="result-count">${foundAirports.length} adet eşleşme bulundu${exactMatch ? ' (1 tam eşleşme)' : ''}</div>`;
            } else {
                havalimaniResult.innerHTML = '<div class="result-box error">Eşleşme bulunamadı. Havalimanı adı, şehir, ülke veya kod ile arayın.</div>';
                allHavalimaniResults.innerHTML = '<p class="no-results">Eşleşme bulunamadı</p>';
            }
        };
        
        havalimaniSearchBtn.addEventListener('click', performSearch);
        havalimaniInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Export for use in main script
window.HavalimaniSorgulama = HavalimaniSorgulama;
        havalimaniSearchBtn.addEventListener('click', performSearch);
        havalimaniInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });