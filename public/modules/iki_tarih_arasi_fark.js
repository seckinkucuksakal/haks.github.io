class IkiTarihArasiFark {
    constructor() {
        this.minDate = new Date(1900, 0, 1); // 01.01.1900
        this.maxDate = new Date(2100, 11, 31); // 31.12.2100
    }

    getTabContent() {
        return `
            <h3>İki Tarih Arası Fark Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="startDate">Başlangıç Tarihi:</label>
                    <input type="date" id="startDate" class="form-input" min="1900-01-01" max="2100-12-31">
                </div>
                
                <div class="form-group">
                    <label for="endDate">Bitiş Tarihi:</label>
                    <input type="date" id="endDate" class="form-input" min="1900-01-01" max="2100-12-31" value="${this.getTodayString()}">
                </div>
                
                <div class="form-actions">
                    <button id="hesaplaFarkBtn" class="hesapla-btn">Fark Hesapla</button>
                    <button id="temizleFarkBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="farkResult" class="tapu-result"></div>
            </div>
        `;
    }

    getTodayString() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    calculateDifference(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (start > end) {
            return { error: "Başlangıç tarihi bitiş tarihinden sonra olamaz!" };
        }

        if (start < this.minDate || end > this.maxDate) {
            return { error: "Tarihler 01.01.1900 - 31.12.2100 aralığında olmalıdır!" };
        }

        // Tam tarih farkı hesaplama
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        // Gün negatifse, bir önceki aydan gün çek
        if (days < 0) {
            months--;
            const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += previousMonth.getDate();
        }

        // Ay negatifse, bir önceki yıldan ay çek
        if (months < 0) {
            years--;
            months += 12;
        }

        // Toplam hesaplamalar
        const totalMilliseconds = end - start;
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;

        // Hafta ve kalan gün hesaplama
        const remainingDaysFromWeeks = totalDays % 7;

        // Saat, dakika, saniye hesaplama
        const remainingHours = totalHours % 24;
        const remainingMinutes = totalMinutes % 60;
        const remainingSeconds = totalSeconds % 60;

        // Çalışma günleri hesaplama (Pazartesi-Cuma)
        let workDays = 0;
        const currentDate = new Date(start);
        while (currentDate <= end) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Pazartesi(1) - Cuma(5)
                workDays++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Hafta sonu günleri
        const weekendDays = totalDays - workDays + 1; // +1 başlangıç günü dahil

        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            remainingDaysFromWeeks,
            totalHours,
            remainingHours,
            totalMinutes,
            remainingMinutes,
            totalSeconds,
            remainingSeconds,
            totalMonths,
            workDays: workDays > 0 ? workDays - 1 : 0, // -1 başlangıç günü hariç
            weekendDays: weekendDays > 0 ? weekendDays - 1 : 0,
            totalMilliseconds
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

    formatDuration(hours, minutes, seconds) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    initialize() {
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const hesaplaFarkBtn = document.getElementById('hesaplaFarkBtn');
        const temizleFarkBtn = document.getElementById('temizleFarkBtn');
        const farkResult = document.getElementById('farkResult');

        if (!startDateInput || !endDateInput || !hesaplaFarkBtn || !temizleFarkBtn || !farkResult) {
            console.error('Required elements not found');
            return;
        }

        // Hesapla butonu
        hesaplaFarkBtn.addEventListener('click', () => {
            const startDate = startDateInput.value;
            const endDate = endDateInput.value;

            if (!startDate) {
                farkResult.innerHTML = '<div class="result-box error">Lütfen başlangıç tarihi seçiniz.</div>';
                return;
            }

            if (!endDate) {
                farkResult.innerHTML = '<div class="result-box error">Lütfen bitiş tarihi seçiniz.</div>';
                return;
            }

            const result = this.calculateDifference(startDate, endDate);

            if (result.error) {
                farkResult.innerHTML = `<div class="result-box error">${result.error}</div>`;
                return;
            }

            const startDayOfWeek = this.getDayOfWeek(startDate);
            const endDayOfWeek = this.getDayOfWeek(endDate);

            farkResult.innerHTML = `
                <div class="tapu-hesaplama-sonuc" style="max-height: 600px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                    <h4>Tarih Farkı Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Başlangıç Tarihi:</span>
                            <span class="value">${this.formatDate(startDate)} (${startDayOfWeek})</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Bitiş Tarihi:</span>
                            <span class="value">${this.formatDate(endDate)} (${endDayOfWeek})</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Toplam Süre:</span>
                            <span class="value">${result.years} yıl ${result.months} ay ${result.days} gün</span>
                        </div>
                        
                        <div class="detail-toggle" id="detailToggleBtn" style="cursor: pointer; padding: 10px; margin: 10px 0; background: rgba(106, 176, 251, 0.1); border-radius: 5px; text-align: center; border: 1px solid #6ab0fb;">
                            <span id="detailToggleText">🔽 Detaylı Bilgileri Göster</span>
                        </div>
                        
                        <div id="detailedInfo" style="max-height: 0; overflow: hidden; transition: max-height 0.5s ease-in-out;">
                            <div style="padding-top: 10px;">
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Gün:</span>
                                    <span class="value">${result.totalDays.toLocaleString('tr-TR')} gün</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Hafta:</span>
                                    <span class="value">${result.totalWeeks.toLocaleString('tr-TR')} hafta ${result.remainingDaysFromWeeks} gün</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Ay:</span>
                                    <span class="value">${result.totalMonths} ay</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Saat:</span>
                                    <span class="value">${result.totalHours.toLocaleString('tr-TR')} saat</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Dakika:</span>
                                    <span class="value">${result.totalMinutes.toLocaleString('tr-TR')} dakika</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Toplam Saniye:</span>
                                    <span class="value">${result.totalSeconds.toLocaleString('tr-TR')} saniye</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Çalışma Günleri:</span>
                                    <span class="value">${result.workDays.toLocaleString('tr-TR')} gün (Pazartesi-Cuma)</span>
                                </div>
                                <div class="sonuc-satir">
                                    <span class="label">Hafta Sonu Günleri:</span>
                                    <span class="value">${result.weekendDays.toLocaleString('tr-TR')} gün (Cumartesi-Pazar)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uyari">
                        <p><strong>Not:</strong> Hesaplama hassas olarak yapılmış olup, artık yıllar ve farklı ay günleri dikkate alınmıştır. Çalışma günleri Pazartesi-Cuma arası günlerdir.</p>
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
                        .detail-toggle:hover {
                            background: rgba(106, 176, 251, 0.2) !important;
                        }
                    </style>
                </div>
            `;

            // Add event listener for the toggle button after the HTML is inserted
            setTimeout(() => {
                const toggleBtn = document.getElementById('detailToggleBtn');
                if (toggleBtn) {
                    toggleBtn.addEventListener('click', () => {
                        const detailedInfo = document.getElementById('detailedInfo');
                        const toggleText = document.getElementById('detailToggleText');
                        
                        if (detailedInfo.style.maxHeight === '0px' || detailedInfo.style.maxHeight === '') {
                            detailedInfo.style.maxHeight = detailedInfo.scrollHeight + 'px';
                            toggleText.innerHTML = '🔼 Detaylı Bilgileri Gizle';
                        } else {
                            detailedInfo.style.maxHeight = '0px';
                            toggleText.innerHTML = '🔽 Detaylı Bilgileri Göster';
                        }
                    });
                }
            }, 100);
        });

        // Temizle butonu
        temizleFarkBtn.addEventListener('click', () => {
            startDateInput.value = '';
            endDateInput.value = this.getTodayString();
            farkResult.innerHTML = '';
        });

        // Enter tuşu ile hesaplama
        startDateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaFarkBtn.click();
            }
        });

        endDateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaFarkBtn.click();
            }
        });
    }
}

// Export for use in main script
window.IkiTarihArasiFark = IkiTarihArasiFark;
