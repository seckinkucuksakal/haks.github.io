class YillikIzinHesaplama {
    constructor() {
        this.minDate = new Date('1900-01-01');
        this.maxDate = new Date('2100-12-31');
    }

    getTabContent() {
        return `
            <h3>Yıllık İzin Süresi ve Ücreti Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="iseBaslamaTarihi">İşe Başlama Tarihi:</label>
                    <input type="date" id="iseBaslamaTarihi" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="hesaplamaTarihi">Hesaplama Tarihi:</label>
                    <input type="date" id="hesaplamaTarihi" class="form-input" value="${this.getTodayString()}">
                </div>
                
                <div class="form-group">
                    <label for="dogumTarihi">Doğum Tarihi:</label>
                    <input type="date" id="dogumTarihi" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="brutMaas">Brüt Aylık Maaş (TL):</label>
                    <input type="text" id="brutMaas" placeholder="15000.50" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="yerAltiIsi">Yer Altı İşinde Çalışıyor:</label>
                    <select id="yerAltiIsi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="hayir">Hayır</option>
                        <option value="evet">Evet</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button id="izinHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="izinTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="izinResult" class="tapu-result"></div>
            </div>
            
            <style>
                .form-select {
                    width: 100%;
                    padding: 10px;
                    border: 2px solid #ddd;
                    border-radius: 5px;
                    font-size: 14px;
                    background-color: white;
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                    padding-right: 40px;
                    cursor: pointer;
                }

                .form-select:focus {
                    outline: none;
                    border-color: #007bff;
                    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
                }
            </style>
        `;
    }

    getTodayString() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    parseDate(dateString) {
        return new Date(dateString);
    }

    calculateKidem(iseBaslamaTarihi, hesaplamaTarihi) {
        const baslamaDate = this.parseDate(iseBaslamaTarihi);
        const hesaplamaDate = this.parseDate(hesaplamaTarihi);
        
        if (baslamaDate > hesaplamaDate) {
            return { error: "İşe başlama tarihi hesaplama tarihinden sonra olamaz!" };
        }

        if (baslamaDate < this.minDate || hesaplamaDate > this.maxDate) {
            return { error: "Tarihler 01.01.1900 - 31.12.2100 aralığında olmalıdır!" };
        }

        // Kıdem hesaplama
        let years = hesaplamaDate.getFullYear() - baslamaDate.getFullYear();
        let months = hesaplamaDate.getMonth() - baslamaDate.getMonth();
        let days = hesaplamaDate.getDate() - baslamaDate.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(hesaplamaDate.getFullYear(), hesaplamaDate.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const totalDays = Math.floor((hesaplamaDate - baslamaDate) / (1000 * 60 * 60 * 24));
        const totalYears = years + (months / 12) + (days / 365);

        return {
            years,
            months,
            days,
            totalDays,
            totalYears
        };
    }

    calculateAge(dogumTarihi, hesaplamaTarihi) {
        const birth = this.parseDate(dogumTarihi);
        const calculation = this.parseDate(hesaplamaTarihi);
        
        if (birth > calculation) {
            return { error: "Doğum tarihi hesaplama tarihinden sonra olamaz!" };
        }

        let years = calculation.getFullYear() - birth.getFullYear();
        let months = calculation.getMonth() - birth.getMonth();
        let days = calculation.getDate() - birth.getDate();

        if (days < 0) {
            months--;
            const previousMonth = new Date(calculation.getFullYear(), calculation.getMonth(), 0);
            days += previousMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    calculateIzinSuresi(kidemYillari, yas, yerAltiIsi = false) {
        let izinGunleri = 0;
        
        // 4857 sayılı İş Kanunu md. 53 - Kıdeme göre izin süresi
        if (kidemYillari < 5) {
            izinGunleri = 14;
        } else if (kidemYillari >= 5 && kidemYillari < 15) {
            izinGunleri = 20;
        } else {
            izinGunleri = 26;
        }

        // Yaş kontrolü - 18 yaş altı ve 50 yaş üstü için minimum 20 gün
        if (yas <= 18 || yas >= 50) {
            if (izinGunleri < 20) {
                izinGunleri = 20;
            }
        }

        // Yer altı işleri için +4 gün
        if (yerAltiIsi) {
            izinGunleri += 4;
        }

        return izinGunleri;
    }

    calculateIzinUcreti(brutMaas, izinGunleri) {
        if (!brutMaas || brutMaas <= 0) {
            return { error: "Geçerli bir brüt maaş giriniz!" };
        }

        // Günlük brüt ücret (30 güne böl)
        const gunlukBrutUcret = brutMaas / 30;
        
        // İzin ücreti (brüt)
        const izinUcreti = gunlukBrutUcret * izinGunleri;

        // 2025 yılı gelir vergisi hesaplaması (yıllık tutar olarak hesaplanır)
        const yillikIzinUcreti = izinUcreti * 12; // Yıllık tutara çevir
        let gelirVergisi = 0;
        let gelirVergisiText = '';
        
        if (yillikIzinUcreti <= 158000) {
            gelirVergisi = yillikIzinUcreti * 0.15;
            gelirVergisiText = '15%';
        } else if (yillikIzinUcreti <= 330000) {
            gelirVergisi = 23700 + (yillikIzinUcreti - 158000) * 0.20;
            gelirVergisiText = '20%';
        } else if (yillikIzinUcreti <= 800000) {
            gelirVergisi = 58100 + (yillikIzinUcreti - 330000) * 0.27;
            gelirVergisiText = '27%';
        } else if (yillikIzinUcreti <= 4300000) {
            gelirVergisi = 185000 + (yillikIzinUcreti - 800000) * 0.35;
            gelirVergisiText = '35%';
        } else {
            gelirVergisi = 1410000 + (yillikIzinUcreti - 4300000) * 0.40;   
            gelirVergisiText = '40%';
        }
        
        // Aylık gelir vergisine çevir
        gelirVergisi = gelirVergisi / 12;
        
        const damgaVergisi = izinUcreti * 0.00759; // %0.759 damga vergisi
        const sgkIsciPayi = izinUcreti * 0.1575; // %15.75 SGK işçi payı (2025)

        const toplamKesinti = gelirVergisi + damgaVergisi + sgkIsciPayi;
        const netIzinUcreti = izinUcreti - toplamKesinti;

        return {
            gunlukBrutUcret,
            izinUcreti,
            gelirVergisi,
            damgaVergisi,
            sgkIsciPayi,
            toplamKesinti,
            netIzinUcreti,
            gelirVergisiText
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: 'TRY',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    initialize() {
        console.log('Yıllık İzin Hesaplama modülü başlatıldı');
        
        setTimeout(() => {
            const iseBaslamaTarihiInput = document.getElementById('iseBaslamaTarihi');
            const hesaplamaTarihiInput = document.getElementById('hesaplamaTarihi');
            const dogumTarihiInput = document.getElementById('dogumTarihi');
            const brutMaasInput = document.getElementById('brutMaas');
            const yerAltiIsiSelect = document.getElementById('yerAltiIsi');
            const izinHesaplaBtn = document.getElementById('izinHesaplaBtn');
            const izinTemizleBtn = document.getElementById('izinTemizleBtn');
            const izinResult = document.getElementById('izinResult');

            if (!izinHesaplaBtn || !izinTemizleBtn || !izinResult) {
                console.error('Yıllık izin hesaplama elementleri bulunamadı');
                return;
            }

            // Para formatı için input maskesi
            brutMaasInput?.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^\d.,]/g, '');
                value = value.replace(',', '.');
                e.target.value = value;
            });

            // Hesapla butonu
            izinHesaplaBtn.addEventListener('click', () => {
                this.hesapla();
            });

            // Temizle butonu
            izinTemizleBtn.addEventListener('click', () => {
                this.temizle();
            });

            // Enter tuşları
            [iseBaslamaTarihiInput, hesaplamaTarihiInput, dogumTarihiInput, brutMaasInput].forEach(input => {
                input?.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        izinHesaplaBtn.click();
                    }
                });
            });

        }, 100);
    }

    hesapla() {
        const iseBaslamaTarihi = document.getElementById('iseBaslamaTarihi').value;
        const hesaplamaTarihi = document.getElementById('hesaplamaTarihi').value;
        const dogumTarihi = document.getElementById('dogumTarihi').value;
        const brutMaasValue = document.getElementById('brutMaas').value.trim();
        const yerAltiIsiValue = document.getElementById('yerAltiIsi').value;
        const yerAltiIsi = yerAltiIsiValue === 'evet';
        const resultDiv = document.getElementById('izinResult');

        // Validasyonlar
        if (!iseBaslamaTarihi) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen işe başlama tarihini giriniz.</div>';
            return;
        }

        if (!hesaplamaTarihi) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen hesaplama tarihini giriniz.</div>';
            return;
        }

        if (!dogumTarihi) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen doğum tarihini giriniz.</div>';
            return;
        }

        if (!brutMaasValue) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen brüt maaş tutarını giriniz.</div>';
            return;
        }

        if (!yerAltiIsiValue) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen yer altı işinde çalışma durumunu seçiniz.</div>';
            return;
        }

        const brutMaas = parseFloat(brutMaasValue.replace(',', '.'));
        if (isNaN(brutMaas) || brutMaas <= 0) {
            resultDiv.innerHTML = '<div class="result-box error">Lütfen geçerli bir brüt maaş tutarı giriniz.</div>';
            return;
        }

        // Kıdem hesaplama
        const kidemResult = this.calculateKidem(iseBaslamaTarihi, hesaplamaTarihi);
        if (kidemResult.error) {
            resultDiv.innerHTML = `<div class="result-box error">${kidemResult.error}</div>`;
            return;
        }

        // Yaş hesaplama
        const yasResult = this.calculateAge(dogumTarihi, hesaplamaTarihi);
        if (yasResult.error) {
            resultDiv.innerHTML = `<div class="result-box error">${yasResult.error}</div>`;
            return;
        }

        // En az 1 yıl çalışma kontrolü
        if (kidemResult.totalYears < 1) {
            resultDiv.innerHTML = `
                <div class="result-box">
                    <h4>Yıllık İzin Hesaplama Sonucu</h4>
                    <p><strong>Yıllık izin hakkı henüz kazanılmamıştır.</strong></p>
                    <p>4857 sayılı İş Kanunu'na göre, yıllık ücretli izin hakkı için en az 1 yıl çalışma şartı bulunmaktadır.</p>
                    <p>Kıdem: ${kidemResult.years} yıl ${kidemResult.months} ay ${kidemResult.days} gün</p>
                    <p>Yıllık izin hakkı kazanılacak tarih: ${new Date(new Date(iseBaslamaTarihi).getTime() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR')}</p>
                </div>
            `;
            return;
        }

        // İzin süresini hesapla
        const izinGunleri = this.calculateIzinSuresi(kidemResult.totalYears, yasResult.years, yerAltiIsi);
        
        // İzin ücretini hesapla
        const ucretResult = this.calculateIzinUcreti(brutMaas, izinGunleri);
        if (ucretResult.error) {
            resultDiv.innerHTML = `<div class="result-box error">${ucretResult.error}</div>`;
            return;
        }

        this.showSonuc(kidemResult, yasResult, izinGunleri, ucretResult, yerAltiIsi);
    }

    showSonuc(kidemResult, yasResult, izinGunleri, ucretResult, yerAltiIsi) {
        const resultDiv = document.getElementById('izinResult');
        
        let yasKriteriAciklama = '';
        if (yasResult.years <= 18) {
            yasKriteriAciklama = ' (18 yaş ve altı için minimum 20 gün)';
        } else if (yasResult.years >= 50) {
            yasKriteriAciklama = ' (50 yaş ve üstü için minimum 20 gün)';
        }

        const html = `
            <div class="tapu-hesaplama-sonuc">
                <h4>Yıllık İzin Hesaplama Sonucu</h4>
                
                <!-- Kıdem Bilgileri -->
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">Kıdem Bilgileri</h5>
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Toplam Kıdem:</span>
                            <span class="value">${kidemResult.years} yıl ${kidemResult.months} ay ${kidemResult.days} gün</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Toplam Çalışma Günü:</span>
                            <span class="value">${kidemResult.totalDays.toLocaleString('tr-TR')} gün</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Yaş:</span>
                            <span class="value">${yasResult.years} yaşında</span>
                        </div>
                        ${yerAltiIsi ? `
                        <div class="sonuc-satir">
                            <span class="label">Çalışma Türü:</span>
                            <span class="value">Yer altı işi (+4 gün ek izin)</span>
                        </div>` : ''}
                    </div>
                </div>

                <!-- İzin Süresi -->
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">İzin Süresi Hesaplama</h5>
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Yıllık İzin Hakkı:</span>
                            <span class="value">${izinGunleri} gün${yasKriteriAciklama}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Yasal Dayanak:</span>
                            <span class="value">4857 sayılı İş Kanunu md. 53</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Kıdem Kriteri:</span>
                            <span class="value">
                                ${kidemResult.totalYears < 5 ? '1-5 yıl arası (14 gün)' : 
                                  kidemResult.totalYears < 15 ? '5-15 yıl arası (20 gün)' : 
                                  '15+ yıl (26 gün)'}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- İzin Ücreti -->
                <div class="il-grup" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <h5 style="color: #007bff; margin-bottom: 15px; border-bottom: 2px solid #007bff; padding-bottom: 5px;">İzin Ücreti Hesaplama</h5>
                    <div class="kurum-detay" style="margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px;">
                        <div class="sonuc-satir">
                            <span class="label">Günlük Brüt Ücret:</span>
                            <span class="value">${this.formatCurrency(ucretResult.gunlukBrutUcret)}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Brüt İzin Ücreti:</span>
                            <span class="value">${this.formatCurrency(ucretResult.izinUcreti)}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Gelir Vergisi (${ucretResult.gelirVergisiText}):</span>
                            <span class="value">-${this.formatCurrency(ucretResult.gelirVergisi)}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">Damga Vergisi (%0.759):</span>
                            <span class="value">-${this.formatCurrency(ucretResult.damgaVergisi)}</span>
                        </div>
                        <div class="sonuc-satir">
                            <span class="label">SGK İşçi Payı (%15.75):</span>
                            <span class="value">-${this.formatCurrency(ucretResult.sgkIsciPayi)}</span>
                        </div>
                        <div class="sonuc-satir" style="border-top: 2px solid #007bff; padding-top: 10px; margin-top: 10px; font-weight: bold;">
                            <span class="label">Net İzin Ücreti:</span>
                            <span class="value" style="color: #28a745; font-size: 18px;">${this.formatCurrency(ucretResult.netIzinUcreti)}</span>
                        </div>
                    </div>
                </div>

                <div class="uyari">
                    <p><strong>Önemli Notlar:</strong></p>
                    <ul style="margin: 10px 0; padding-left: 20px;">
                        <li>Yıllık izin ücreti, işçinin izine başlamadan önce peşin olarak ödenmelidir.</li>
                        <li>Gelir vergisi 2025 yılı dilimli tarifesine göre hesaplanmıştır.</li>
                        <li>SGK işçi payı %15.75 olarak hesaplanmıştır (2025).</li>
                        <li>Yıllık izin hakkından vazgeçilemez (İş Kanunu md. 53/2).</li>
                        <li>İş sözleşmesi sona erdiğinde kullanılmayan izin günlerinin ücreti ödenir.</li>
                        <li>Hafta tatili, ulusal bayram ve genel tatil ücretleri ayrıca ödenir.</li>
                    </ul>
                </div>
                <style>
                    .uyari {
                        text-align: left;
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

        resultDiv.innerHTML = html;
    }

    temizle() {
        document.getElementById('iseBaslamaTarihi').value = '';
        document.getElementById('hesaplamaTarihi').value = this.getTodayString();
        document.getElementById('dogumTarihi').value = '';
        document.getElementById('brutMaas').value = '';
        document.getElementById('yerAltiIsi').value = '';
        document.getElementById('izinResult').innerHTML = '';
    }
}

// Export for use in main script
window.YillikIzinHesaplama = YillikIzinHesaplama;