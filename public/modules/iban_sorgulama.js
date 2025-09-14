class IbanSorgulama {
    constructor() {
        this.bankData = {};
        this.branchData = {};
        this.loadBankData();
        this.loadBranchData();
    }

    async loadBankData() {
        try {
            const response = await fetch('./data/tcmb_bank_verileri_2025.csv');
            const arrayBuffer = await response.arrayBuffer();
            
            // Try different encodings
            let csvText;
            try {
                const decoder = new TextDecoder('utf-8');
                csvText = decoder.decode(arrayBuffer);
            } catch (error) {
                // Fallback to windows-1254 (Turkish encoding)
                const decoder = new TextDecoder('windows-1254');
                csvText = decoder.decode(arrayBuffer);
            }
            
            this.parseBankData(csvText);
        } catch (error) {
            console.error('Banka CSV dosyası yüklenirken hata:', error);
        }
    }

    async loadBranchData() {
        try {
            const response = await fetch('./data/tcmb_banka_subekodlari_2025.csv');
            const arrayBuffer = await response.arrayBuffer();
            
            // Try different encodings
            let csvText;
            try {
                const decoder = new TextDecoder('utf-8');
                csvText = decoder.decode(arrayBuffer);
            } catch (error) {
                // Fallback to windows-1254 (Turkish encoding)
                const decoder = new TextDecoder('windows-1254');
                csvText = decoder.decode(arrayBuffer);
            }
            
            this.parseBranchData(csvText);
        } catch (error) {
            console.error('Şube CSV dosyası yüklenirken hata:', error);
        }
    }

    parseBankData(csvText) {
        const lines = csvText.trim().split('\n');
        // Skip header line (bank_unique_code;bank_name)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const parts = line.split(';');
            if (parts.length >= 2) {
                const bankCode = parts[0].trim();
                const bankName = parts[1].trim();
                this.bankData[bankCode] = bankName;
            }
        }
        console.log('Bank data loaded:', Object.keys(this.bankData).length, 'banks');
    }

    getBranchName(iban) {
        const cleanIban = iban.replace(/\s/g, '');
        // Extract bank code from positions 5-8 (0-indexed)
        const bankCode = cleanIban.substring(5, 9);
        // Extract branch code from positions 10-14 (0-indexed)
        const branchCode = cleanIban.substring(10, 14);
        // Format: bankCode + "0" + branchCode
        const fullBranchCode = bankCode + "0" + branchCode;

        // First, try to find exact match
        if (this.branchData[fullBranchCode]) {
            return this.branchData[fullBranchCode];
        }

        // If exact match not found, look for partial matches
        for (const subeKodu in this.branchData) {
            if (subeKodu.includes(fullBranchCode)) {
                
                // Extract the city code (sube_il_kodu) from the matched key
                // Parse CSV to find the city code for this sube_kodu
                const cityCode = this.getCityCodeForBranch(subeKodu);
                if (cityCode) {
                    // Create new combination: fullBranchCode + cityCode
                    const combinedCode = fullBranchCode + cityCode
                    
                    // Check if this combined code exists
                    if (this.branchData[combinedCode]) {
                        return this.branchData[combinedCode];
                    }
                }
                
                // If combined match not found, return the partial match
                return this.branchData[subeKodu];
            }
        }
        return 'Bilinmeyen Şube';
    }

    getCityCodeForBranch(subeKodu) {
        // This method should extract city code from the original CSV data
        // Since we only stored branch names, we need to parse the CSV again or store city codes
        // For now, we'll extract from the stored data structure if available
        
        // The sube_kodu format appears to be: bankCode + 0 + branchCode + cityCode (3 digits)
        // Extract last 3 digits as city code
        if (subeKodu.length >= 3) {
            return subeKodu.slice(-3);
        }
        return null;
    }

    parseBranchData(csvText) {
        const lines = csvText.trim().split('\n');
        // Skip header line (sube_adi;sube_il_kodu;sube_kodu;)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            const parts = line.split(';');
            if (parts.length >= 3) {
                const branchName = parts[0].trim();
                const cityCode = parts[1].trim();
                const branchCode = parts[2].trim();
                
                // Store branch data with both original key and city-combined key
                this.branchData[branchCode] = branchName;
                
                // Also store city code mapping for later use
                if (!this.cityCodeMap) {
                    this.cityCodeMap = {};
                }
                this.cityCodeMap[branchCode] = cityCode;
            }
        }
        console.log('Branch data loaded:', Object.keys(this.branchData).length, 'branches');
    }

    getBankName(iban) {
        const cleanIban = iban.replace(/\s/g, '');
        // Extract bank code from positions 4-7 (0-indexed)
        const bankCode = cleanIban.substring(5, 9);
        
        // Add leading zero if 3 digits (e.g., "046" -> "0046")
        const formattedBankCode = bankCode.padStart(4, '0');
        
        return this.bankData[formattedBankCode] || 'Bilinmeyen Banka';
    }

    getCountryName(countryCode) {
        const countries = {
            'TR': 'Türkiye',
            'US': 'Amerika Birleşik Devletleri',
            'DE': 'Almanya',
            'FR': 'Fransa',
            'GB': 'Birleşik Krallık',
            'IT': 'İtalya',
            'ES': 'İspanya',
            'NL': 'Hollanda',
            'BE': 'Belçika',
            'AT': 'Avusturya',
            'CH': 'İsviçre',
            'SE': 'İsveç',
            'NO': 'Norveç',
            'DK': 'Danimarka',
            'FI': 'Finlandiya',
            'PL': 'Polonya',
            'CZ': 'Çek Cumhuriyeti',
            'HU': 'Macaristan',
            'GR': 'Yunanistan',
            'PT': 'Portekiz',
            'IE': 'İrlanda',
            'LU': 'Lüksemburg',
            'MT': 'Malta',
            'CY': 'Kıbrıs',
            'SK': 'Slovakya',
            'SI': 'Slovenya',
            'EE': 'Estonya',
            'LV': 'Letonya',
            'LT': 'Litvanya',
            'HR': 'Hırvatistan',
            'BG': 'Bulgaristan',
            'RO': 'Romanya'
        };
        return countries[countryCode] || countryCode;
    }

    getTabContent() {
        return `
            <h3>IBAN Sorgulama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="IBANInput">IBAN Numarası:</label>
                    <input type="text" id="IBANInput" placeholder="TR33 0006 1005 1978 6457 8413 26 - TR330006100519786457841326" class="form-input" maxlength="34">
                </div>
                
                <div class="form-actions">
                    <button id="IBANSearchBtn" class="hesapla-btn">Sorgula</button>
                    <button id="IBANClearBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="IBANResult" class="tapu-result"></div>
            </div>
        `;
    }

    formatIban(iban, cursorPosition = null) {
        const cleanIban = iban.replace(/\s/g, '').toUpperCase();
        let formatted = '';
        let newCursorPosition = cursorPosition;
        
        for (let i = 0; i < cleanIban.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' ';
                // Adjust cursor position for added spaces
                if (cursorPosition !== null && i <= cursorPosition) {
                    newCursorPosition++;
                }
            }
            formatted += cleanIban[i];
        }
        
        return { formatted, newCursorPosition };
    }

    validateIban(iban) {
        const cleanIban = iban.replace(/\s/g, '');
        
        if (!cleanIban) {
            return { valid: false, message: 'Lütfen IBAN numarası girin.' };
        }
        
        // Check if it's a valid Turkish IBAN format (with or without spaces)
        if (!cleanIban.startsWith('TR')) {
            return { valid: false, message: 'IBAN numarası TR ile başlamalıdır.' };
        }
        
        if (cleanIban.length !== 26) {
            return { valid: false, message: 'Türkiye IBAN numarası 26 karakter olmalıdır.' };
        }
        
        // Check if all characters after TR are digits
        const ibanDigits = cleanIban.substring(2);
        if (!/^\d+$/.test(ibanDigits)) {
            return { valid: false, message: 'IBAN numarası sadece TR ve ardından 24 rakam içermelidir.' };
        }
        
        return { valid: true, message: 'IBAN formatı geçerli.' };
    }

    initialize() {
        const IBANInput = document.getElementById('IBANInput');
        const IBANSearchBtn = document.getElementById('IBANSearchBtn');
        const IBANClearBtn = document.getElementById('IBANClearBtn');
        const IBANResult = document.getElementById('IBANResult');
        
        if (!IBANInput || !IBANSearchBtn || !IBANClearBtn || !IBANResult) return;
        
        let lastValue = '';
        let isFormatting = false;
        
        // Format IBAN input as user types with better cursor handling
        IBANInput.addEventListener('input', (e) => {
            if (isFormatting) return;
            
            isFormatting = true;
            const cursorPosition = e.target.selectionStart;
            const inputValue = e.target.value;
            
            // Calculate cursor position in clean text
            const beforeCursor = inputValue.substring(0, cursorPosition);
            const cleanBeforeCursor = beforeCursor.replace(/\s/g, '');
            
            const result = this.formatIban(inputValue, cleanBeforeCursor.length);
            e.target.value = result.formatted;
            
            // Restore cursor position
            setTimeout(() => {
                e.target.setSelectionRange(result.newCursorPosition, result.newCursorPosition);
                isFormatting = false;
            }, 0);
            
            lastValue = result.formatted;
        });
        
        // Handle backspace and delete keys properly
        IBANInput.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                const cursorPosition = e.target.selectionStart;
                const selectionEnd = e.target.selectionEnd;
                
                // If cursor is on a space, move it to the previous character
                if (e.key === 'Backspace' && cursorPosition > 0 && e.target.value[cursorPosition - 1] === ' ') {
                    e.preventDefault();
                    const newValue = e.target.value.substring(0, cursorPosition - 2) + e.target.value.substring(cursorPosition);
                    const result = this.formatIban(newValue);
                    e.target.value = result.formatted;
                    
                    // Set cursor position
                    setTimeout(() => {
                        e.target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
                    }, 0);
                }
                // If cursor is on a space when deleting forward
                else if (e.key === 'Delete' && cursorPosition < e.target.value.length && e.target.value[cursorPosition] === ' ') {
                    e.preventDefault();
                    const newValue = e.target.value.substring(0, cursorPosition) + e.target.value.substring(cursorPosition + 2);
                    const result = this.formatIban(newValue);
                    e.target.value = result.formatted;
                    
                    // Set cursor position
                    setTimeout(() => {
                        e.target.setSelectionRange(cursorPosition, cursorPosition);
                    }, 0);
                }
            }
        });
        
        // Allow undo functionality
        IBANInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                // Let the browser handle undo naturally
                setTimeout(() => {
                    const result = this.formatIban(e.target.value);
                    if (result.formatted !== e.target.value) {
                        e.target.value = result.formatted;
                    }
                }, 0);
            }
        });

        // Search button functionality - validates format and shows bank name
        IBANSearchBtn.addEventListener('click', () => {
            const iban = IBANInput.value;
            const validation = this.validateIban(iban);
            
            if (validation.valid) {
                const bankName = this.getBankName(iban);
                const cleanIban = iban.replace(/\s/g, '');
                const bankCode = cleanIban.substring(5, 9);
                const countryCode = cleanIban.substring(0, 2);
                const countryName = this.getCountryName(countryCode);
                
                // Special handling for bank code 0067
                if (bankCode === '0067') {
                    IBANResult.innerHTML = `
                        <div class="tapu-hesaplama-sonuc" style="max-height: 400px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                            <h4>IBAN Sorgulama Sonucu</h4>
                            <div style="text-align: center; margin-bottom: 15px;">
                                <img src="./visuals/banka_png_verileri/${bankCode}.png" 
                                     alt="${bankName}" 
                                     style="max-width: 140px; max-height: 80px; object-fit: contain;"
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="sonuc-detay">
                                <div class="sonuc-satir">
                                    <span class="label">IBAN:</span>
                                    <span class="value">${cleanIban}</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Banka Adı:</span>
                                    <span class="value">${bankName}</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Ülke:</span>
                                    <span class="value">${countryName}</span>
                                </div>
                            </div>
                            <style>
                                .tapu-hesaplama-sonuc::-webkit-scrollbar {
                                    width: 6px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-track {
                                    background: #f0f0f0;
                                    border-radius: 3px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-thumb {
                                    background: #007bff;
                                    border-radius: 3px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-thumb:hover {
                                    background: #0056b3;
                                }
                            </style>
                        </div>
                    `;
                } else {
                    // Normal handling for other banks
                    const branchName = this.getBranchName(iban);
                    
                    IBANResult.innerHTML = `
                        <div class="tapu-hesaplama-sonuc" style="max-height: 400px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                            <h4>IBAN Sorgulama Sonucu</h4>
                            <div style="text-align: center; margin-bottom: 15px;">
                                <img src="./visuals/banka_png_verileri/${bankCode}.png" 
                                     alt="${bankName}" 
                                     style="max-width: 140px; max-height: 80px; object-fit: contain;"
                                     onerror="this.style.display='none'">
                            </div>
                            <div class="sonuc-detay">
                                <div class="sonuc-satir">
                                    <span class="label">IBAN:</span>
                                    <span class="value">${cleanIban}</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Banka Adı:</span>
                                    <span class="value">${bankName}</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Şube Adı:</span>
                                    <span class="value">${branchName}</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Ülke:</span>
                                    <span class="value">${countryName}</span>
                                </div>
                            </div>
                            <style>
                                .tapu-hesaplama-sonuc::-webkit-scrollbar {
                                    width: 6px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-track {
                                    background: #f0f0f0;
                                    border-radius: 3px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-thumb {
                                    background: #007bff;
                                    border-radius: 3px;
                                }
                                .tapu-hesaplama-sonuc::-webkit-scrollbar-thumb:hover {
                                    background: #0056b3;
                                }
                            </style>
                        </div>
                    `;
                }
            } else {
                IBANResult.innerHTML = `<div class="result-box error">${validation.message}</div>`;
            }
        });
        
        // Clear button functionality
        IBANClearBtn.addEventListener('click', () => {
            IBANInput.value = '';
            IBANResult.innerHTML = '';
        });
        
        // Enter key functionality
        IBANInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                IBANSearchBtn.click();
            }
        });
    }
}

// Export for use in main script
window.IbanSorgulama = IbanSorgulama;
