class MirasHesaplama {
    constructor() {
        // TMK (Türk Medeni Kanunu) miras oranları
        this.tmkOranlari = {
            // TMK md. 499 - Sağ kalan eş payları
            esPaylari: {
                altsoyIle: 1/4,        // Altsoyu ile birlikte 1/4
                anaBabaIle: 1/2,       // Ana-baba zümresi ile 1/2
                buyukAnaBabaIle: 3/4,  // Büyük ana-baba zümresi ile 3/4
                tekBasina: 1           // Tek başına tamamı
            },
            // TMK md. 506 - Saklı paylar
            sakliPaylar: {
                altsoy: 1/2,           // Altsoyu için yasal payın yarısı
                anaBaba: 1/4,          // Ana-baba için yasal payın 1/4'ü
                esTamami: 1,           // Eş için (altsoyu/ana-baba ile) yasal payın tamamı
                esUcTe: 3/4            // Eş için (diğer durumlarda) yasal payın 3/4'ü
            }
        };
    }

    getTabContent() {
        return `
            <h3>Miras Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mirasVarligi">Tahmini Parasal Miras Malvarlığı (TL):</label>
                    <input type="text" id="mirasVarligi" placeholder="1800000.25 TL" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="esSagMi">Muris Öldüğünde Eşi Sağ mıydı:</label>
                    <select id="esSagMi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="evet">Evet</option>
                        <option value="hayir">Hayır</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cocukVarMi">Muris Öldüğünde Sağ Çocuğu Var mıydı:</label>
                    <select id="cocukVarMi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="evet">Evet</option>
                        <option value="hayir">Hayır</option>
                    </select>
                </div>
                
                <div class="form-group" id="cocukSayisiGroup" style="display: none;">
                    <label for="cocukSayisi">Kaç Sağ Çocuğu Vardı:</label>
                    <input type="number" id="cocukSayisi" class="form-input" min="1" max="50" value="1">
                </div>
                
                <div class="form-group">
                    <label for="torunVarMi">Murisin Kendinden Önce Ölen Çocuklarından Torunu Olan Var mıydı:</label>
                    <select id="torunVarMi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="evet">Evet</option>
                        <option value="hayir">Hayır</option>
                    </select>
                </div>
                
                <div class="form-group" id="torunSayisiGroup" style="display: none;">
                    <label for="torunSayisi">Murisin Kendinden Önce Ölen Çocuklarından Torunu Olan Kaç Çocuğu Vardı:</label>
                    <input type="number" id="torunSayisi" class="form-input" min="1" max="50" value="1">
                </div>
                
                <div id="torunDetayGroup" style="display: none;">
                    <div class="form-group">
                        <label>1. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun1" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun2Group" style="display: none;">
                        <label>2. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun2" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun3Group" style="display: none;">
                        <label>3. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun3" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun4Group" style="display: none;">
                        <label>4. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun4" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun5Group" style="display: none;">
                        <label>5. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun5" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun6Group" style="display: none;">
                        <label>6. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun6" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun7Group" style="display: none;">
                        <label>7. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun7" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun8Group" style="display: none;">
                        <label>8. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun8" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun9Group" style="display: none;">
                        <label>9. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun9" class="form-input" min="1" max="20" value="1">
                    </div>
                    <div class="form-group" id="torun10Group" style="display: none;">
                        <label>10. Çocuk | Torun Sayısı:</label>
                        <input type="number" id="torun10" class="form-input" min="1" max="20" value="1">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button id="hesaplaMirasBtn" class="hesapla-btn">Hesapla</button>
                    <button id="temizleMirasBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="mirasResult" class="tapu-result"></div>
            </div>
        `;
    }

    calculateInheritance(toplamVarlik, esSag, cocukVar, torunVar, cocukSayisi, torunSayisi, torunDetaylari) {
        const varlik = parseFloat(toplamVarlik);
        
        // TMK md. 495: Altsoyu kontrol et (çocuk veya torun)
        const altsoyVar = cocukVar || torunVar;
        
        let esPay = 0;
        let altsoyPay = 0;
        let esOrani = 0;
        let altsoyOrani = 0;

        if (esSag && altsoyVar) {
            // TMK md. 499/1: Eş altsoyu ile birlikte 1/4
            esPay = varlik * this.tmkOranlari.esPaylari.altsoyIle;
            altsoyPay = varlik - esPay; // Kalan altsoyu için
            esOrani = 25;
            altsoyOrani = 75;
        } else if (esSag && !altsoyVar) {
            // TMK md. 499/2,3,4: Eş ana-baba zümresi ile 1/2, büyük ana-baba ile 3/4, tek başına tamamı
            // Bu hesaplayıcıda ana-baba bilgisi olmadığı için tek başına varsayıyoruz
            esPay = varlik * this.tmkOranlari.esPaylari.tekBasina;
            altsoyPay = 0;
            esOrani = 100;
            altsoyOrani = 0;
        } else if (!esSag && altsoyVar) {
            // TMK md. 495: Sadece altsoyu var
            esPay = 0;
            altsoyPay = varlik;
            esOrani = 0;
            altsoyOrani = 100;
        } else {
            // Ne eş ne altsoyu var - ana-baba zümresine geçer
            esPay = 0;
            altsoyPay = 0;
            esOrani = 0;
            altsoyOrani = 0;
        }
        
        // Çocuk ve torun payları hesaplama
        let cocukPaylari = [];
        let torunPaylari = [];
        
        if (altsoyVar) {
            const toplamCocukSayisi = cocukSayisi + torunSayisi;
            const cocukBasinaPay = altsoyPay / toplamCocukSayisi;
            
            // Sağ çocuklar için
            for (let i = 1; i <= cocukSayisi; i++) {
                cocukPaylari.push({
                    sirano: i,
                    pay: cocukBasinaPay
                });
            }
            
            // Ölen çocukların torunları için
            for (let i = 1; i <= torunSayisi; i++) {
                const torunSayisiCocuk = torunDetaylari[i] || 1;
                const torunBasinaPay = cocukBasinaPay / torunSayisiCocuk;
                
                torunPaylari.push({
                    cocukSirano: i,
                    torunSayisi: torunSayisiCocuk,
                    toplamPay: cocukBasinaPay,
                    torunBasinaPay: torunBasinaPay
                });
            }
        }
        
        // TMK md. 506: Saklı payları hesapla
        let esSakliPay = 0;
        let altsoySakliPay = 0;
        
        if (esSag) {
            if (altsoyVar) {
                // Eş altsoyu ile birlikte - yasal payın tamamı saklı
                esSakliPay = esPay * this.tmkOranlari.sakliPaylar.esTamami;
            } else {
                // Eş diğer durumda - yasal payın 3/4'ü saklı
                esSakliPay = esPay * this.tmkOranlari.sakliPaylar.esUcTe;
            }
        }
        
        if (altsoyVar) {
            // Altsoyu için yasal payın yarısı saklı
            altsoySakliPay = altsoyPay * this.tmkOranlari.sakliPaylar.altsoy;
        }
        
        const tasarrufNisabi = varlik - esSakliPay - altsoySakliPay;
        
        return {
            toplamVarlik: varlik,
            esPay,
            altsoyPay,
            esOrani,
            altsoyOrani,
            esSakliPay,
            altsoySakliPay,
            tasarrufNisabi,
            cocukPaylari,
            torunPaylari
        };
    }

    initialize() {
        const mirasVarligiInput = document.getElementById('mirasVarligi');
        const esSagMiSelect = document.getElementById('esSagMi');
        const cocukVarMiSelect = document.getElementById('cocukVarMi');
        const cocukSayisiSelect = document.getElementById('cocukSayisi');
        const cocukSayisiGroup = document.getElementById('cocukSayisiGroup');
        const torunVarMiSelect = document.getElementById('torunVarMi');
        const torunSayisiSelect = document.getElementById('torunSayisi');
        const torunSayisiGroup = document.getElementById('torunSayisiGroup');
        const torunDetayGroup = document.getElementById('torunDetayGroup');
        const hesaplaMirasBtn = document.getElementById('hesaplaMirasBtn');
        const temizleMirasBtn = document.getElementById('temizleMirasBtn');
        const mirasResult = document.getElementById('mirasResult');

        if (!mirasVarligiInput || !esSagMiSelect || !cocukVarMiSelect || !torunVarMiSelect || !hesaplaMirasBtn || !temizleMirasBtn || !mirasResult) {
            console.error('Required elements not found');
            return;
        }

        // Çocuk varsa sayı seçimini göster
        cocukVarMiSelect.addEventListener('change', () => {
            if (cocukVarMiSelect.value === 'evet') {
                cocukSayisiGroup.style.display = 'block';
            } else {
                cocukSayisiGroup.style.display = 'none';
                cocukSayisiSelect.value = '1';
            }
        });

        // Torun varsa sayı seçimini göster
        torunVarMiSelect.addEventListener('change', () => {
            if (torunVarMiSelect.value === 'evet') {
                torunSayisiGroup.style.display = 'block';
                torunDetayGroup.style.display = 'block';
            } else {
                torunSayisiGroup.style.display = 'none';
                torunDetayGroup.style.display = 'none';
                torunSayisiSelect.value = '1';
                // Tüm torun gruplarını gizle
                for (let i = 2; i <= 10; i++) {
                    const group = document.getElementById(`torun${i}Group`);
                    if (group) group.style.display = 'none';
                }
            }
        });

        // Torun sayısı değiştiğinde ilgili alanları göster/gizle
        torunSayisiSelect.addEventListener('change', () => {
            const torunSayisi = parseInt(torunSayisiSelect.value) || 1;
            
            // Önce tüm grupları gizle
            for (let i = 2; i <= 10; i++) {
                const group = document.getElementById(`torun${i}Group`);
                if (group) group.style.display = 'none';
            }
            
            // Seçilen sayı kadar grubu göster (max 10)
            const maxToShow = Math.min(torunSayisi, 10);
            for (let i = 2; i <= maxToShow; i++) {
                const group = document.getElementById(`torun${i}Group`);
                if (group) group.style.display = 'block';
            }
        });

        // Torun sayısı input değiştiğinde de aynı işlemi yap
        torunSayisiSelect.addEventListener('input', () => {
            const torunSayisi = parseInt(torunSayisiSelect.value) || 1;
            
            // Önce tüm grupları gizle
            for (let i = 2; i <= 10; i++) {
                const group = document.getElementById(`torun${i}Group`);
                if (group) group.style.display = 'none';
            }
            
            // Seçilen sayı kadar grubu göster (max 10)
            const maxToShow = Math.min(torunSayisi, 10);
            for (let i = 2; i <= maxToShow; i++) {
                const group = document.getElementById(`torun${i}Group`);
                if (group) group.style.display = 'block';
            }
        });

        // Number formatting for the input field
        mirasVarligiInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^\d,]/g, ''); // Only allow digits and comma for decimal
            
            if (value) {
                // Split by comma for decimal handling
                let parts = value.split(',');
                
                // Format the integer part with dots as thousands separator
                if (parts[0]) {
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                }
                
                // If there's a decimal part, limit to 2 digits
                if (parts.length > 1) {
                    parts[1] = parts[1].substring(0, 2);
                    value = parts[0] + ',' + parts[1];
                } else {
                    value = parts[0];
                }
                
                e.target.value = value;
            }
        });

        // Handle blur to ensure proper formatting
        mirasVarligiInput.addEventListener('blur', (e) => {
            let value = e.target.value;
            if (value) {
                // Convert display format to number for validation
                let numericValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
                if (!isNaN(numericValue) && numericValue > 0) {
                    // Format back to display format only if it's a valid positive number
                    e.target.value = numericValue.toLocaleString('tr-TR', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    });
                }
            }
        });

        // Handle focus to allow easy editing - remove formatting temporarily
        mirasVarligiInput.addEventListener('focus', (e) => {
            let value = e.target.value;
            if (value) {
                // Convert to plain number for editing (remove dots, keep comma as decimal)
                let numericValue = value.replace(/\./g, '');
                e.target.value = numericValue;
            }
        });

        // Hesapla butonu
        hesaplaMirasBtn.addEventListener('click', () => {
            // Convert formatted value to number
            let varlık = mirasVarligiInput.value.trim();
            if (varlık) {
                varlık = varlık.replace(/\./g, '').replace(',', '.');
            }
            
            const esSag = esSagMiSelect.value === 'evet';
            const cocukVar = cocukVarMiSelect.value === 'evet';
            const cocukSayisi = cocukVar ? parseInt(cocukSayisiSelect.value) : 0;
            const torunVar = torunVarMiSelect.value === 'evet';
            const torunSayisi = torunVar ? parseInt(torunSayisiSelect.value) : 0;
            
            // Torun detaylarını topla
            const torunDetaylari = {};
            if (torunVar) {
                for (let i = 1; i <= torunSayisi; i++) {
                    const torunInput = document.getElementById(`torun${i}`);
                    if (torunInput) {
                        torunDetaylari[i] = parseInt(torunInput.value) || 1;
                    }
                }
            }

            if (!varlık || isNaN(varlık) || parseFloat(varlık) <= 0) {
                mirasResult.innerHTML = '<div class="result-box error">Lütfen geçerli bir miras mal varlığı girin.</div>';
                return;
            }

            if (esSagMiSelect.value === '') {
                mirasResult.innerHTML = '<div class="result-box error">Lütfen eş durumunu seçiniz.</div>';
                return;
            }

            if (cocukVarMiSelect.value === '') {
                mirasResult.innerHTML = '<div class="result-box error">Lütfen çocuk durumunu seçiniz.</div>';
                return;
            }

            if (torunVarMiSelect.value === '') {
                mirasResult.innerHTML = '<div class="result-box error">Lütfen torun durumunu seçiniz.</div>';
                return;
            }

            const result = this.calculateInheritance(varlık, esSag, cocukVar, torunVar, cocukSayisi, torunSayisi, torunDetaylari);

            let detayliCocuklar = '';
            if (result.cocukPaylari.length > 0) {
                detayliCocuklar = `<div class="sonuc-satir">
                    <span class="label">Murisin Her Bir Çocuğuna Düşen Pay:</span>
                    <span class="value">${result.cocukPaylari[0].pay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</span>
                </div>`;
            }
            
            let detayliTorunlar = '';
            if (result.torunPaylari.length > 0) {
                detayliTorunlar = result.torunPaylari.map(torunGrubu => 
                    `<div class="sonuc-satir">
                        <span class="label">Muristen Önce Ölen ${torunGrubu.cocukSirano}. Çocuğun Sağ Olan Her Bir Çocuğuna:</span>
                        <span class="value">${torunGrubu.torunBasinaPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</span>
                    </div>`
                ).join('');
            }

            mirasResult.innerHTML = `
                <div class="tapu-hesaplama-sonuc" style="max-height: 600px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                    <h4>Miras Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Toplam Miras Varlığı:</span>
                            <span class="value">${result.toplamVarlik.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</span>
                        </div>
                        ${result.esPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Eşin Yasal Payı:</span>
                            <span class="value">${result.esPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.esOrani})</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Eşin Saklı Payı:</span>
                            <span class="value">${result.esSakliPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</span>
                        </div>` : ''}
                        
                        ${result.altsoyPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Altsoyu Yasal Payı:</span>
                            <span class="value">${result.altsoyPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.altsoyOrani})</span>
                        </div>
                        ${detayliCocuklar}
                        ${detayliTorunlar}` : ''}
                    </div>
                    <div class="uyari">
                        <p>Bu hesaplama TMK 4721 sayılı kanunun md. 495, 499 ve 506'ya göre yapılmıştır.</p>
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
        });

        // Temizle butonu
        temizleMirasBtn.addEventListener('click', () => {
            mirasVarligiInput.value = '';
            esSagMiSelect.value = '';
            cocukVarMiSelect.value = '';
            cocukSayisiSelect.value = '1';
            cocukSayisiGroup.style.display = 'none';
            torunVarMiSelect.value = '';
            torunSayisiSelect.value = '1';
            torunSayisiGroup.style.display = 'none';
            torunDetayGroup.style.display = 'none';
            
            // Tüm torun gruplarını gizle ve değerleri sıfırla
            for (let i = 1; i <= 10; i++) {
                const group = document.getElementById(`torun${i}Group`);
                const input = document.getElementById(`torun${i}`);
                if (group && i > 1) group.style.display = 'none';
                if (input) input.value = '1';
            }
            
            mirasResult.innerHTML = '';
        });

        // Enter tuşu ile hesaplama
        mirasVarligiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaMirasBtn.click();
            }
        });
    }
}

// Export for use in main script
window.MirasHesaplama = MirasHesaplama;