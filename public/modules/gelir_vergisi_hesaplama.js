class GelirVergisiHesaplama {
    constructor() {
        console.log('GelirVergisiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Gelir Vergisi Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="yillikGelir">Yıllık Brüt Gelir (TL):</label>
                    <input type="text" id="yillikGelir" placeholder="600000.00" class="form-input">
                </div>
                
                <div class="form-actions">
                    <button id="gelirVergisiHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="gelirVergisiTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="gelirVergisiResult" class="tapu-result"></div>
            </div>
        `;
    }

    // Gelir vergisi hesaplama fonksiyonu (sadece 2025)
    hesaplaGelirVergisi(yillikGelir, yil) {
        if (yil !== "2025") {
            return "Şimdilik sadece 2025 yılı vergi dilimleri tanımlı.";
        }

        let vergi = 0;

        if (yillikGelir <= 158000) {
            vergi = yillikGelir * 0.15;
        } else if (yillikGelir <= 330000) {
            vergi = 23700 + (yillikGelir - 158000) * 0.20;
        } else if (yillikGelir <= 800000) {
            vergi = 58100 + (yillikGelir - 330000) * 0.27;
        } else if (yillikGelir <= 4300000) {
            vergi = 185000 + (yillikGelir - 800000) * 0.35;
        } else {
            vergi = 1410000 + (yillikGelir - 4300000) * 0.40;
        }

        return vergi;
    }

    formatCurrency(value) {
        if (typeof value !== 'number' || isNaN(value)) return '';
        return value.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    initialize() {
        console.log('Gelir Vergisi Hesaplama modülü başlatıldı');

        setTimeout(() => {
            const gelirInput = document.getElementById("yillikGelir");
            if (gelirInput) {
                gelirInput.addEventListener('input', (e) => {
                    const input = e.target;
                    let raw = input.value.replace(/[^\d,]/g, '');
                    let [tam, ondalik] = raw.split(',');
                    tam = tam ? tam.replace(/^0+/, '') : '';
                    if (tam === '') tam = '0';
                    let formattedTam = tam.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    let formatted = ondalik !== undefined ? `${formattedTam},${ondalik}` : formattedTam;
                    const prevLen = input.value.length;
                    const prevPos = input.selectionStart;
                    input.value = formatted;
                    const newLen = formatted.length;
                    let newPos = prevPos + (newLen - prevLen);
                    if (formatted[newPos - 1] === '.' && raw.length < prevLen) {
                        newPos++;
                    }
                    setTimeout(() => {
                        input.setSelectionRange(newPos, newPos);
                    }, 0);
                });
            }
        }, 100);

        const hesaplaBtn = document.getElementById("gelirVergisiHesaplaBtn");
        const temizleBtn = document.getElementById("gelirVergisiTemizleBtn");
        const resultDiv = document.getElementById("gelirVergisiResult");

        hesaplaBtn.addEventListener("click", () => {
            let gelirRaw = document.getElementById("yillikGelir").value.trim();
            gelirRaw = gelirRaw.replace(/\./g, '').replace(',', '.');
            const yillikGelir = parseFloat(gelirRaw);
            const vergiYili = "2025"; // Vergi yılı otomatik olarak 2025

            if (isNaN(yillikGelir)) {
                resultDiv.innerHTML = `<p style="color:red">Lütfen geçerli bir gelir giriniz.</p>`;
                return;
            }

            const vergi = this.hesaplaGelirVergisi(yillikGelir, vergiYili);

            resultDiv.innerHTML = `
                <div class="tapu-hesaplama-sonuc" style="max-width:540px;margin:auto;font-size:18px;padding:28px 24px 18px 24px;">
                    <h4 style="font-size:22px;">Gelir Vergisi Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Yıllık Brüt Gelir:</span>
                            <span class="value">${this.formatCurrency(yillikGelir)} TL</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Vergi Yılı:</span>
                            <span class="value">2025</span>
                        </div>
                        <div class="sonuc-satir" style="border-top:2px solid #007bff; margin-top:16px; padding-top:16px;">
                            <span class="label">Hesaplanan Gelir Vergisi:</span>
                            <span class="value" style="color:#d9534f;font-size:22px;">${this.formatCurrency(vergi)} TL</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Net Gelir (Vergi Sonrası):</span>
                            <span class="value" style="color:#28a745;font-size:20px;">${this.formatCurrency(yillikGelir - vergi)} TL</span>
                        </div>
                    </div>
                    <div class="uyari" style="margin-top:22px;font-size:16px;">
                        <p><strong>Önemli Hususlar:</strong></p>
                        <ul>
                            <li>Hesaplama sadece 2025 yılı gelir vergisi dilimlerine göre yapılmaktadır.</li>
                            <li>Sonuçlar bilgilendirme amaçlıdır, resmi işlemler için lütfen mevzuatı kontrol ediniz.</li>
                        </ul>
                    </div>
                    <style>
                        .uyari p {
                            text-align: center;
                            color: black;
                        }
                        .uyari ul {
                            text-align: left;
                            color: black;
                        }
                        .uyari li {
                            text-align: left;
                            color: black;
                        }
                    </style>
                </div>
            `;
        });

        temizleBtn.addEventListener("click", () => {
            document.getElementById("yillikGelir").value = "";
            resultDiv.innerHTML = "";
        });
    }
}

window.GelirVergisiHesaplama = GelirVergisiHesaplama;

