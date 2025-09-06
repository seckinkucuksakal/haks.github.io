class YasHesaplama {
    constructor() {
        this.minDate = new Date(1900, 0, 1); // 01.01.1900
        this.maxDate = new Date(); // Today
    }

    getTabContent() {
        return `
            <h3>Yaş Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="birthDate">Doğum Tarihi:</label>
                    <input type="date" id="birthDate" class="form-input" min="1900-01-01" max="${this.getTodayString()}">
                </div>
                
                <div class="form-group">
                    <label for="calculationDate">Hesaplama Tarihi (İsteğe bağlı):</label>
                    <input type="date" id="calculationDate" class="form-input" min="1900-01-01" value="${this.getTodayString()}">
                    <small style="color: #666; font-size: 12px;">Boş bırakılırsa bugünün tarihi kullanılır</small>
                </div>
                
                <div class="form-actions">
                    <button id="hesaplaYasBtn" class="hesapla-btn">Yaş Hesapla</button>
                    <button id="temizleYasBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="yasResult" class="tapu-result"></div>
            </div>
        `;
    }

    getTodayString() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    calculateAge(birthDate, calculationDate) {
        const birth = new Date(birthDate);
        const calculation = new Date(calculationDate);
        
        if (birth > calculation) {
            return { error: "Doğum tarihi hesaplama tarihinden sonra olamaz!" };
        }

        if (birth < this.minDate) {
            return { error: "Doğum tarihi 01.01.1900'den önce olamaz!" };
        }

        let years = calculation.getFullYear() - birth.getFullYear();
        let months = calculation.getMonth() - birth.getMonth();
        let days = calculation.getDate() - birth.getDate();

        // Gün negatifse, bir önceki aydan gün çek
        if (days < 0) {
            months--;
            const previousMonth = new Date(calculation.getFullYear(), calculation.getMonth(), 0);
            days += previousMonth.getDate();
        }

        // Ay negatifse, bir önceki yıldan ay çek
        if (months < 0) {
            years--;
            months += 12;
        }

        // Toplam gün sayısını hesapla
        const totalDays = Math.floor((calculation - birth) / (1000 * 60 * 60 * 24));
        
        // Toplam hafta sayısını hesapla
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

        // Toplam ay sayısını hesapla
        const totalMonths = years * 12 + months;

        // Bir sonraki doğum gününe kaç gün kaldığını hesapla
        let nextBirthday = new Date(calculation.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday <= calculation) {
            nextBirthday = new Date(calculation.getFullYear() + 1, birth.getMonth(), birth.getDate());
        }
        const daysToNextBirthday = Math.ceil((nextBirthday - calculation) / (1000 * 60 * 60 * 24));

        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            remainingDays,
            totalMonths,
            daysToNextBirthday,
            nextBirthday: nextBirthday.toLocaleDateString('tr-TR')
        };
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    getDayOfWeek(dateString) {
        const date = new Date(dateString);
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[date.getDay()];
    }

    initialize() {
        const birthDateInput = document.getElementById('birthDate');
        const calculationDateInput = document.getElementById('calculationDate');
        const hesaplaYasBtn = document.getElementById('hesaplaYasBtn');
        const temizleYasBtn = document.getElementById('temizleYasBtn');
        const yasResult = document.getElementById('yasResult');

        if (!birthDateInput || !calculationDateInput || !hesaplaYasBtn || !temizleYasBtn || !yasResult) {
            console.error('Required elements not found');
            return;
        }

        // Hesapla butonu
        hesaplaYasBtn.addEventListener('click', () => {
            const birthDate = birthDateInput.value;
            const calculationDate = calculationDateInput.value || this.getTodayString();

            if (!birthDate) {
                yasResult.innerHTML = '<div class="result-box error">Lütfen doğum tarihi seçiniz.</div>';
                return;
            }

            const result = this.calculateAge(birthDate, calculationDate);

            if (result.error) {
                yasResult.innerHTML = `<div class="result-box error">${result.error}</div>`;
                return;
            }

            const birthDayOfWeek = this.getDayOfWeek(birthDate);
            const calculationDayOfWeek = this.getDayOfWeek(calculationDate);

            yasResult.innerHTML = `
                <div class="tapu-hesaplama-sonuc" style="max-height: 500px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                    <h4>Yaş Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Doğum Tarihi:</span>
                            <span class="value">${this.formatDate(birthDate)} (${birthDayOfWeek})</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Hesaplama Tarihi:</span>
                            <span class="value">${this.formatDate(calculationDate)} (${calculationDayOfWeek})</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Yaşınız:</span>
                            <span class="value">${result.years} yıl ${result.months} ay ${result.days} gün</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Toplam Gün:</span>
                            <span class="value">${result.totalDays.toLocaleString('tr-TR')} gün</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Toplam Hafta:</span>
                            <span class="value">${result.totalWeeks.toLocaleString('tr-TR')} hafta ${result.remainingDays} gün</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Toplam Ay:</span>
                            <span class="value">${result.totalMonths} ay</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Sonraki Doğum Günü:</span>
                            <span class="value">${result.nextBirthday} (${result.daysToNextBirthday} gün sonra)</span>
                        </div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Hesaplama 01.01.1900 tarihinden itibaren yapılabilir. Artık yıllar ve farklı ay günleri dikkate alınarak hassas hesaplama yapılmıştır.</p>
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
        temizleYasBtn.addEventListener('click', () => {
            birthDateInput.value = '';
            calculationDateInput.value = this.getTodayString();
            yasResult.innerHTML = '';
        });

        // Enter tuşu ile hesaplama
        birthDateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaYasBtn.click();
            }
        });

        calculationDateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaYasBtn.click();
            }
        });
    }
}

// Export for use in main script
window.YasHesaplama = YasHesaplama;
