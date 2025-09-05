class IlSorgulama {
    constructor() {
        this.cityData = {};
        this.dataLoaded = false;
        this.loadCityData();
    }

    async loadCityData() {
        try {
            const response = await fetch('./data/il_verileri.csv');
            const csvText = await response.text();
            this.parseCsvData(csvText);
            this.dataLoaded = true;
        } catch (error) {
            console.error('CSV dosyası yüklenirken hata:', error);
            // Fallback data in case CSV fails
            this.cityData = {
                "01": "ADANA", "02": "ADIYAMAN", "03": "AFYONKARAHİSAR", "04": "AĞRI", "05": "AMASYA",
                "06": "ANKARA", "07": "ANTALYA", "08": "ARTVİN", "09": "AYDIN", "10": "BALIKESİR",
                "11": "BİLECİK", "12": "BİNGÖL", "13": "BİTLİS", "14": "BOLU", "15": "BURDUR",
                "16": "BURSA", "17": "ÇANAKKALE", "18": "ÇANKIRI", "19": "ÇORUM", "20": "DENİZLİ",
                "21": "DİYARBAKIR", "22": "EDİRNE", "23": "ELAZIĞ", "24": "ERZİNCAN", "25": "ERZURUM",
                "26": "ESKİŞEHİR", "27": "GAZİANTEP", "28": "GİRESUN", "29": "GÜMÜŞHANE", "30": "HAKKARİ",
                "31": "HATAY", "32": "ISPARTA", "33": "MERSİN", "34": "İSTANBUL", "35": "İZMİR",
                "36": "KARS", "37": "KASTAMONU", "38": "KAYSERİ", "39": "KIRKLARELİ", "40": "KIRŞEHİR",
                "41": "KOCAELİ", "42": "KONYA", "43": "KÜTAHYA", "44": "MALATYA", "45": "MANİSA",
                "46": "KAHRAMANMARAŞ", "47": "MARDİN", "48": "MUĞLA", "49": "MUŞ", "50": "NEVŞEHİR",
                "51": "NİĞDE", "52": "ORDU", "53": "RİZE", "54": "SAKARYA", "55": "SAMSUN",
                "56": "SİİRT", "57": "SİNOP", "58": "SİVAS", "59": "TEKİRDAĞ", "60": "TOKAT",
                "61": "TRABZON", "62": "TUNCELİ", "63": "ŞANLIURFA", "64": "UŞAK", "65": "VAN",
                "66": "YOZGAT", "67": "ZONGULDAK", "68": "AKSARAY", "69": "BAYBURT", "70": "KARAMAN",
                "71": "KIRIKKALE", "72": "BATMAN", "73": "ŞIRNAK", "74": "BARTIN", "75": "ARDAHAN",
                "76": "IĞDIR", "77": "YALOVA", "78": "KARABÜK", "79": "KİLİS", "80": "OSMANİYE",
                "81": "DÜZCE"
            };
            this.dataLoaded = true;
        }
    }

    parseCsvData(csvText) {
        const lines = csvText.trim().split('\n');
        // Skip header line
        for (let i = 1; i < lines.length; i++) {
            const [plakaKodu, ilAdi] = lines[i].split(',');
            if (plakaKodu && ilAdi) {
                // Remove \r and \n characters and trim whitespace
                this.cityData[plakaKodu.trim()] = ilAdi.trim().replace(/\r/g, '').replace(/\n/g, '');
            }
        }
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
            <h3>Plaka Sorgulama</h3>
            <div class="plaka-container">
                <div class="search-mode-buttons">
                    <button id="plakaMode" class="mode-btn active">Plakadan Bul</button>
                    <button id="cityMode" class="mode-btn">İsimden Bul</button>
                </div>
                <div class="plaka-search">
                    <input type="text" id="plakaInput" placeholder="Plaka kodunu girin (örn: 34, 06)" class="plaka-input">
                    <button id="plakaSearchBtn" class="plaka-search-btn">Ara</button>
                </div>
                <div id="plakaResult" class="plaka-result"></div>
            </div>
        `;
    }

    initialize() {
        const plakaMode = document.getElementById('plakaMode');
        const cityMode = document.getElementById('cityMode');
        const plakaInput = document.getElementById('plakaInput');
        const plakaSearchBtn = document.getElementById('plakaSearchBtn');
        const plakaResult = document.getElementById('plakaResult');
        
        let currentMode = 'plaka';
        
        // Mode switching
        plakaMode.addEventListener('click', () => {
            currentMode = 'plaka';
            plakaMode.classList.add('active');
            cityMode.classList.remove('active');
            plakaInput.placeholder = 'Plaka kodunu girin (örn: 34, 06)';
            plakaResult.innerHTML = '';
        });
        
        cityMode.addEventListener('click', () => {
            currentMode = 'city';
            cityMode.classList.add('active');
            plakaMode.classList.remove('active');
            plakaInput.placeholder = 'İl adını girin (örn: İzmir, Ankara, İstanbul)';
            plakaResult.innerHTML = '';
        });
        
        // Search functionality
        const performSearch = () => {
            // Wait for data to be loaded
            if (!this.dataLoaded) {
                plakaResult.innerHTML = '<p style="color: black;">Veriler yükleniyor, lütfen bekleyin...</p>';
                setTimeout(() => performSearch(), 500);
                return;
            }

            const searchTerm = plakaInput.value.trim();
            if (!searchTerm) {
                plakaResult.innerHTML = '<p style="color: black;">Lütfen bir değer girin.</p>';
                return;
            }
            
            if (currentMode === 'plaka') {
                // Search by plate code
                const paddedCode = searchTerm.padStart(2, '0');
                if (this.cityData[paddedCode]) {
                    plakaResult.innerHTML = `<div class="result-box"><strong>${paddedCode}</strong> plaka kodu: <span style="color: #007bff; font-weight: bold;">${this.cityData[paddedCode]}</span></div>`;
                } else {
                    plakaResult.innerHTML = '<div class="result-box error">Bu plaka kodu bulunamadı.</div>';
                }
            } else {
                // Search by city name - convert lowercase Turkish chars to uppercase properly
                let searchTermUpper = searchTerm
                    .replace(/ı/g, 'I')
                    .replace(/i/g, 'İ')
                    .replace(/ğ/g, 'Ğ')
                    .replace(/ü/g, 'Ü')
                    .replace(/ş/g, 'Ş')
                    .replace(/ö/g, 'Ö')
                    .replace(/ç/g, 'Ç')
                    .toUpperCase();
                
                console.log('Girilen:', searchTerm);
                console.log('Dönüştürülen:', searchTermUpper);
                console.log('cityData:', this.cityData);
                
                let foundCode = null;
                
                // Loop through all codes to find match
                for (const code in this.cityData) {
                    const cityName = this.cityData[code].trim(); // Extra trim for safety
                    console.log(`Karşılaştırılan: "${cityName}" === "${searchTermUpper}" = ${cityName === searchTermUpper}`);
                    if (cityName === searchTermUpper) {
                        foundCode = code;
                        break;
                    }
                }
                
                console.log('Found code:', foundCode);
                
                if (foundCode) {
                    plakaResult.innerHTML = `<div class="result-box"><strong>${this.cityData[foundCode]}</strong> ili plaka kodu: <span style="color: #007bff; font-weight: bold;">${foundCode}</span></div>`;
                } else {
                    plakaResult.innerHTML = '<div class="result-box error">Bu il adı bulunamadı. Türkçe karakterlerle tam il adını yazın (örn: İzmir, Ankara).</div>';
                }
            }
        };
        
        plakaSearchBtn.addEventListener('click', performSearch);
        plakaInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}
// Export for use in main script
window.IlSorgulama = IlSorgulama;
