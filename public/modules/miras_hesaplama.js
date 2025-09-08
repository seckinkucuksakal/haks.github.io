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
            }
        };
    }

    getTabContent() {
        return `
            <h3>Miras Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="mirasVarligi">
                        Mirasbırakanın Malvarlığının Tahmini Parasal Değeri (TL):
                        <span class="info-icon" title="">ⓘ</span>
                    </label>
                    <div class="info-tooltip" id="mirasVarligiTooltip">
                        <p>Hesaplamanın sağlıklı şekilde yapılması için döviz-hisse senedi-taşınır-taşınmaz malvarlıklarının tahmini güncel piyasa değerlerinin toplamının girilmesi gereklidir. Bunlar sadece hesaplamanın kolaylığı için gerekli olup, uygulamada nakide çevirme gibi bir zorunluluk bulunmamaktadır.</p>
                    </div>
                    <input type="text" id="mirasVarligi" placeholder="1800000.25 TL" class="form-input">
                </div>
                
                <div class="form-group">
                    <label for="esSagMi">Mirasbırakan Öldüğünde Eşi Sağ mıydı:</label>
                    <select id="esSagMi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="evet">Evet</option>
                        <option value="hayir">Hayır</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cocukVarMi">Mirasbırakan Öldüğünde Sağ Çocuğu Var mıydı:</label>
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
                    <label for="torunVarMi">Mirasbırakanın Kendinden Önce Ölen Çocuklarından Torunu Olan Var mıydı:</label>
                    <select id="torunVarMi" class="form-select">
                        <option value="">Seçiniz...</option>
                        <option value="evet">Evet</option>
                        <option value="hayir">Hayır</option>
                    </select>
                </div>
                
                <div class="form-group" id="torunSayisiGroup" style="display: none;">
                    <label for="torunSayisi">Mirasbırakanın Kendinden Önce Ölen Çocuklarından Torunu Olan Kaç Çocuğu Vardı:</label>
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
                
                <div class="form-group" id="anaBabaGroup" style="display: none;">
                    <div class="form-group">
                        <label for="anaBabaDurumu">Mirasbırakan Öldüğünde Anne ve Baba Durumu:</label>
                        <select id="anaBabaDurumu" class="form-select">
                            <option value="">Seçiniz...</option>
                            <option value="ikisi-sag">İkisi de Sağ</option>
                            <option value="anne-sag">Anne Sağ, Baba Öldü</option>
                            <option value="baba-sag">Baba Sağ, Anne Öldü</option>
                            <option value="ikisi-olu">İkisi de Öldü</option>
                        </select>
                    </div>
                    
                    <div class="form-group" id="kardesGroup" style="display: none;">
                        <div class="form-group">
                            <label for="ozKardesVarMi">Anne-Baba Öz Kardeşlerinden Sağ Olan Var mıydı:</label>
                            <select id="ozKardesVarMi" class="form-select">
                                <option value="">Seçiniz...</option>
                                <option value="evet">Evet</option>
                                <option value="hayir">Hayır</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="ozKardesSayisiGroup" style="display: none;">
                            <label for="ozKardesSayisi">Kaç Tane Anne-Baba Öz Kardeş Vardı:</label>
                            <input type="number" id="ozKardesSayisi" class="form-input" min="1" max="20" value="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="anneUveyKardesVarMi">Annenin Diğer Evliliğinden Üvey Kardeşlerinden Sağ Olan Var mıydı:</label>
                            <select id="anneUveyKardesVarMi" class="form-select">
                                <option value="">Seçiniz...</option>
                                <option value="evet">Evet</option>
                                <option value="hayir">Hayır</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="anneUveyKardesSayisiGroup" style="display: none;">
                            <label for="anneUveyKardesSayisi">Annenin Diğer Evliliğinden Kaç Tane Üvey Kardeş Vardı:</label>
                            <input type="number" id="anneUveyKardesSayisi" class="form-input" min="1" max="20" value="1">
                        </div>
                        
                        <div class="form-group">
                            <label for="babaUveyKardesVarMi">Babanın Diğer Evliliğinden Üvey Kardeşlerinden Sağ Olan Var mıydı:</label>
                            <select id="babaUveyKardesVarMi" class="form-select">
                                <option value="">Seçiniz...</option>
                                <option value="evet">Evet</option>
                                <option value="hayir">Hayır</option>
                            </select>
                        </div>
                        
                        <div class="form-group" id="babaUveyKardesSayisiGroup" style="display: none;">
                            <label for="babaUveyKardesSayisi">Babanın Diğer Evliliğinden Kaç Tane Üvey Kardeş Vardı:</label>
                            <input type="number" id="babaUveyKardesSayisi" class="form-input" min="1" max="20" value="1">
                        </div>
                        
                        <div class="form-group" id="buyukAnaBabaGroup" style="display: none;">
                            <div class="form-group">
                                <label for="anneAnnesiBabasiVarMi">Mirasbırakanın Annesinin Annesi ve Babası Sağ mı:</label>
                                <select id="anneAnnesiBabasiVarMi" class="form-select">
                                    <option value="">Seçiniz...</option>
                                    <option value="ikisi-sag">İkisi de Sağ</option>
                                    <option value="annesi-sag">Sadece Annesi Sağ Baba Ölü</option>
                                    <option value="babasi-sag">Sadece Babası Sağ Anne Öldü</option>
                                    <option value="ikisi-olu">İkisi de Öldü</option>
                                </select>
                            </div>
                            
                            <!-- Anne tarafı büyük anne-baba öldüyse teyze/dayı soruları -->
                            <div id="anneTeyzeDayiGroup" style="display:none; margin-top: 12px; padding-top: 8px; border-top: 1px dashed #ccc;">
                                <div class="form-group">
                                    <label for="teyzeVarMi">Mirasbırakanın Teyzesi (Annenin Kız Kardeşi) Var mı:</label>
                                    <select id="teyzeVarMi" class="form-select">
                                        <option value="">Seçiniz...</option>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                                <div class="form-group" id="teyzeSayisiGroup" style="display:none;">
                                    <label for="teyzeSayisi">Teyze Sayısı:</label>
                                    <input type="number" id="teyzeSayisi" class="form-input" min="1" max="50" value="1">
                                </div>

                                <div class="form-group">
                                    <label for="dayiVarMi">Mirasbırakanın Dayısı (Annenin Erkek Kardeşi) Var mı:</label>
                                    <select id="dayiVarMi" class="form-select">
                                        <option value="">Seçiniz...</option>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                                <div class="form-group" id="dayiSayisiGroup" style="display:none;">
                                    <label for="dayiSayisi">Dayı Sayısı:</label>
                                    <input type="number" id="dayiSayisi" class="form-input" min="1" max="50" value="1">
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="babaAnnesiBabasiVarMi">Mirasbırakanın Babasının Annesi ve Babası Sağ mı:</label>
                                <select id="babaAnnesiBabasiVarMi" class="form-select">
                                    <option value="">Seçiniz...</option>
                                    <option value="ikisi-sag">İkisi de Sağ</option>
                                    <option value="annesi-sag">Sadece Annesi Sağ Baba Ölü</option>
                                    <option value="babasi-sag">Sadece Babası Sağ Anne Öldü</option>
                                    <option value="ikisi-olu">İkisi de Öldü</option>
                                </select>
                            </div>

                            <!-- Baba tarafı büyük anne-baba öldüyse hala/amca soruları -->
                            <div id="babaHalaAmcaGroup" style="display:none; margin-top: 12px; padding-top: 8px; border-top: 1px dashed #ccc;">
                                <div class="form-group">
                                    <label for="halaVarMi">Mirasbırakanın Halası (Babanın Kız Kardeşi) Var mı:</label>
                                    <select id="halaVarMi" class="form-select">
                                        <option value="">Seçiniz...</option>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                                <div class="form-group" id="halaSayisiGroup" style="display:none;">
                                    <label for="halaSayisi">Hala Sayısı:</label>
                                    <input type="number" id="halaSayisi" class="form-input" min="1" max="50" value="1">
                                </div>

                                <div class="form-group">
                                    <label for="amcaVarMi">Mirasbırakanın Amcası (Babanın Erkek Kardeşi) Var mı:</label>
                                    <select id="amcaVarMi" class="form-select">
                                        <option value="">Seçiniz...</option>
                                        <option value="evet">Evet</option>
                                        <option value="hayir">Hayır</option>
                                    </select>
                                </div>
                                <div class="form-group" id="amcaSayisiGroup" style="display:none;">
                                    <label for="amcaSayisi">Amca Sayısı:</label>
                                    <input type="number" id="amcaSayisi" class="form-input" min="1" max="50" value="1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button id="hesaplaMirasBtn" class="hesapla-btn">Hesapla</button>
                    <button id="temizleMirasBtn" class="temizle-btn">Temizle</button>
                </div>
                
                <div id="mirasResult" class="tapu-result"></div>
            </div>
            
            <style>
                .info-icon {
                    color: #007bff;
                    cursor: pointer;
                    font-size: 16px;
                    margin-left: 5px;
                    position: relative;
                    display: inline-block;
                }
                
                .info-tooltip {
                    display: none;
                    position: absolute;
                    background-color: #cbcacaff;
                    color: black;
                    padding: 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    line-height: 1.4;
                    width: 280px;
                    z-index: 1000;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                    top: 25px;
                    left: 50%;
                    transform: translateX(29%);
                }
                
                .info-tooltip::before {
                    content: '';
                    position: absolute;
                    top: -8px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-bottom: 8px solid #333;
                }
                
                .info-tooltip p {
                    margin: 0;
                    font-size: 12px;
                    color: black;
                }
                
                .form-group {
                    position: relative;
                }

                /* 📱 Küçük ekranlar (520px ve altı) için tıklamalı sistem */
                @media (max-width: 520px) {
                    .info-tooltip {
                        left: auto;
                        right: 0;
                        transform: translateX(0);
                    }

                    .info-tooltip::before {
                        display: none; /* Mobilde oku kaldır */
                    }
                }
                
                /* Desktop için ok göster */
                @media (min-width: 521px) {
                    .info-tooltip::before {
                        display: block;
                    }
                }
            </style>
        `;
    }

    calculateInheritance(toplamVarlik, esSag, cocukVar, torunVar, cocukSayisi, torunSayisi, torunDetaylari, anaBabaDurumu, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi, anneAnnesiBabasiDurumu, babaAnnesiBabasiDurumu, teyzeVar, teyzeSayisi, dayiVar, dayiSayisi, halaVar, halaSayisi, amcaVar, amcaSayisi) {
        const varlik = parseFloat(toplamVarlik);
        
        // TMK md. 495: Altsoyu kontrol et (çocuk veya torun)
        const altsoyVar = cocukVar || torunVar;
        
        // Anne-baba durumunu çözümle
        const anneSag = anaBabaDurumu === 'ikisi-sag' || anaBabaDurumu === 'anne-sag';
        const babaSag = anaBabaDurumu === 'ikisi-sag' || anaBabaDurumu === 'baba-sag';
        
        // Büyük anne-baba durumunu çözümle
        const anneAnnesiBabasiVar = anneAnnesiBabasiDurumu && anneAnnesiBabasiDurumu !== 'ikisi-olu';
        const babaAnnesiBabasiVar = babaAnnesiBabasiDurumu && babaAnnesiBabasiDurumu !== 'ikisi-olu';

        // Büyük anne-baba zümresini doğru şekilde hesapla
        const buyukAnaBabaZumresiVar = anneAnnesiBabasiVar || babaAnnesiBabasiVar || teyzeVar || dayiVar || halaVar || amcaVar;
        const anaBabaVar = anneSag || babaSag || ozKardesVar || anneUveyKardesVar || babaUveyKardesVar;

        let esPay = 0;
        let altsoyPay = 0;
        let annePay = 0;
        let babaPay = 0;
        let ozKardesPay = 0;
        let anneUveyKardesPay = 0;
        let babaUveyKardesPay = 0;
        let anneAnnesiBabasiPay = 0;
        let babaAnnesiBabasiPay = 0;
        let teyzePay = 0;
        let dayiPay = 0;
        let halaPay = 0;
        let amcaPay = 0;
        let esOrani = 0;
        let altsoyOrani = 0;
        let anneOrani = 0;
        let babaOrani = 0;

        if (esSag && altsoyVar) {
            // TMK md. 499/1: Eş altsoyu ile birlikte 1/4
            esPay = varlik * this.tmkOranlari.esPaylari.altsoyIle;
            altsoyPay = varlik - esPay;
            esOrani = 25;
            altsoyOrani = 75;
        } else if (esSag && !altsoyVar && anaBabaVar) {
            // TMK md. 499/2: Eş ana-baba zümresi ile 1/2
            esPay = varlik * this.tmkOranlari.esPaylari.anaBabaIle;
            const anaBabaToplam = varlik - esPay;
            esOrani = 50;
            
            // Ana-baba zümresi paylarını dağıt
            this.distributeAnaBabaZumresi(anaBabaToplam, anaBabaDurumu, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi, anneAnnesiBabasiDurumu, babaAnnesiBabasiDurumu, teyzeVar, teyzeSayisi, dayiVar, dayiSayisi, halaVar, halaSayisi, amcaVar, amcaSayisi);
            
            // Sonuçları al
            annePay = this.annePay || 0;
            babaPay = this.babaPay || 0;
            ozKardesPay = this.ozKardesPay || 0;
            anneUveyKardesPay = this.anneUveyKardesPay || 0;
            babaUveyKardesPay = this.babaUveyKardesPay || 0;
            anneAnnesiBabasiPay = this.anneAnnesiBabasiPay || 0;
            babaAnnesiBabasiPay = this.babaAnnesiBabasiPay || 0;
            teyzePay = this.teyzePay || 0;
            dayiPay = this.dayiPay || 0;
            halaPay = this.halaPay || 0;
            amcaPay = this.amcaPay || 0;
            
            // Oranları hesapla
            if (annePay > 0) anneOrani = (annePay / varlik) * 100;
            if (babaPay > 0) babaOrani = (babaPay / varlik) * 100;
        } else if (esSag && !altsoyVar && !anaBabaVar && buyukAnaBabaZumresiVar) {
            // TMK md. 499/3: Eş büyük ana-baba zümresi ile 3/4
            esPay = varlik * this.tmkOranlari.esPaylari.buyukAnaBabaIle;
            const buyukAnaBabaToplam = varlik - esPay;
            esOrani = 75;

            this.distributeBuyukAnaBabaPay(
                buyukAnaBabaToplam,
                anneAnnesiBabasiDurumu,
                babaAnnesiBabasiDurumu,
                { teyzeAdet: teyzeSayisi, dayiAdet: dayiSayisi, halaAdet: halaSayisi, amcaAdet: amcaSayisi }
            );
            
            anneAnnesiBabasiPay = this.anneAnnesiBabasiPay || 0;
            babaAnnesiBabasiPay = this.babaAnnesiBabasiPay || 0;
            teyzePay = this.teyzePay || 0;
            dayiPay = this.dayiPay || 0;
            halaPay = this.halaPay || 0;
            amcaPay = this.amcaPay || 0;
        } else if (esSag && !altsoyVar && !anaBabaVar && !buyukAnaBabaZumresiVar) {
            // Eş tek başına
            esPay = varlik * this.tmkOranlari.esPaylari.tekBasina;
            esOrani = 100;
        } else if (!esSag && altsoyVar) {
            // Eş yok, sadece altsoyu var
            altsoyPay = varlik;
            altsoyOrani = 100;
        } else if (!esSag && !altsoyVar && anaBabaVar) {
            // Eş yok, sadece ana-baba zümresi var
            this.distributeAnaBabaZumresi(varlik, anaBabaDurumu, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi, anneAnnesiBabasiDurumu, babaAnnesiBabasiDurumu, teyzeVar, teyzeSayisi, dayiVar, dayiSayisi, halaVar, halaSayisi, amcaVar, amcaSayisi);
            
            annePay = this.annePay || 0;
            babaPay = this.babaPay || 0;
            ozKardesPay = this.ozKardesPay || 0;
            anneUveyKardesPay = this.anneUveyKardesPay || 0;
            babaUveyKardesPay = this.babaUveyKardesPay || 0;
            anneAnnesiBabasiPay = this.anneAnnesiBabasiPay || 0;
            babaAnnesiBabasiPay = this.babaAnnesiBabasiPay || 0;
            teyzePay = this.teyzePay || 0;
            dayiPay = this.dayiPay || 0;
            halaPay = this.halaPay || 0;
            amcaPay = this.amcaPay || 0;
            
            if (annePay > 0) anneOrani = (annePay / varlik) * 100;
            if (babaPay > 0) babaOrani = (babaPay / varlik) * 100;
        } else if (!esSag && !altsoyVar && !anaBabaVar && buyukAnaBabaZumresiVar) {
            // Eş yok, sadece büyük ana-baba zümresi var
            this.distributeBuyukAnaBabaPay(
                varlik,
                anneAnnesiBabasiDurumu,
                babaAnnesiBabasiDurumu,
                { teyzeAdet: teyzeSayisi, dayiAdet: dayiSayisi, halaAdet: halaSayisi, amcaAdet: amcaSayisi }
            );
            
            anneAnnesiBabasiPay = this.anneAnnesiBabasiPay || 0;
            babaAnnesiBabasiPay = this.babaAnnesiBabasiPay || 0;
            teyzePay = this.teyzePay || 0;
            dayiPay = this.dayiPay || 0;
            halaPay = this.halaPay || 0;
            amcaPay = this.amcaPay || 0;
        } else {
            // TMK md. 501: Mirasçı bırakmaksızın ölen kimsenin mirası Devlete geçer
            // Hiç mirasçı yok - miras devlete geçer
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
        
        return {
            toplamVarlik: varlik,
            esPay,
            altsoyPay,
            annePay,
            babaPay,
            ozKardesPay,
            anneUveyKardesPay,
            babaUveyKardesPay,
            anneAnnesiBabasiPay,
            babaAnnesiBabasiPay,
            teyzePay,
            dayiPay,
            halaPay,
            amcaPay,
            teyzeSayisi,
            dayiSayisi,
            halaSayisi,
            amcaSayisi,
            esOrani,
            altsoyOrani,
            anneOrani,
            babaOrani,
            cocukPaylari,
            torunPaylari,
            ozKardesSayisi,
            anneUveyKardesSayisi,
            babaUveyKardesSayisi,
            anneAnnesiBabasiDurumu,
            babaAnnesiBabasiDurumu
        };
    }

    // Büyük anne-baba ve onların altsoyu (amca/hala/teyze/dayı) dağıtımı
    distributeBuyukAnaBabaPay(toplamPay, anneAnnesiBabasiDurumu, babaAnnesiBabasiDurumu, altsoy = {teyzeAdet:0, dayiAdet:0, halaAdet:0, amcaAdet:0}) {
        this.anneAnnesiBabasiPay = 0;
        this.babaAnnesiBabasiPay = 0;
        this.teyzePay = 0; this.dayiPay = 0; this.halaPay = 0; this.amcaPay = 0;

        // Pay yarıya bölünür: anne tarafı ve baba tarafı
        const anneTarafiPay = toplamPay / 2;
        const babaTarafiPay = toplamPay / 2;

        // Anne tarafı dağıtımı
        this.distributeAnneTarafiPay(anneTarafiPay, anneAnnesiBabasiDurumu, altsoy.teyzeAdet || 0, altsoy.dayiAdet || 0);
        
        // Baba tarafı dağıtımı
        this.distributeBabaTarafiPay(babaTarafiPay, babaAnnesiBabasiDurumu, altsoy.halaAdet || 0, altsoy.amcaAdet || 0);
    }

    // Anne tarafı pay dağıtımı
    distributeAnneTarafiPay(anneTarafiPay, anneAnnesiBabasiDurumu, teyzeAdet, dayiAdet) {
        if (anneAnnesiBabasiDurumu === 'ikisi-sag') {
            // İkisi de sağ - eşit paylaşım
            this.anneAnnesiBabasiPay = anneTarafiPay;
        } else if (anneAnnesiBabasiDurumu === 'annesi-sag') {
            // Sadece büyükanne sağ - büyükanne yarıyı alır, diğer yarısı teyze/dayılara
            this.anneAnnesiBabasiPay = anneTarafiPay / 2;
            const olunenPay = anneTarafiPay / 2;
            
            // Ölen büyükbabanın payı teyze/dayılara
            const toplamTeyzeDay = teyzeAdet + dayiAdet;
            if (toplamTeyzeDay > 0) {
                const kisiBasinaPay = olunenPay / toplamTeyzeDay;
                this.teyzePay = kisiBasinaPay * teyzeAdet;
                this.dayiPay = kisiBasinaPay * dayiAdet;
            }
        } else if (anneAnnesiBabasiDurumu === 'babasi-sag') {
            // Sadece büyükbaba sağ - büyükbaba yarıyı alır, diğer yarısı teyze/dayılara
            this.anneAnnesiBabasiPay = anneTarafiPay / 2;
            const olunenPay = anneTarafiPay / 2;
            
            // Ölen büyükannenin payı teyze/dayılara
            const toplamTeyzeDay = teyzeAdet + dayiAdet;
            if (toplamTeyzeDay > 0) {
                const kisiBasinaPay = olunenPay / toplamTeyzeDay;
                this.teyzePay = kisiBasinaPay * teyzeAdet;
                this.dayiPay = kisiBasinaPay * dayiAdet;
            }
        } else if (anneAnnesiBabasiDurumu === 'ikisi-olu') {
            // İkisi de ölü - tamamı teyze/dayılara
            const toplamTeyzeDay = teyzeAdet + dayiAdet;
            if (toplamTeyzeDay > 0) {
                const kisiBasinaPay = anneTarafiPay / toplamTeyzeDay;
                this.teyzePay = kisiBasinaPay * teyzeAdet;
                this.dayiPay = kisiBasinaPay * dayiAdet;
            }
        }
    }

    // Baba tarafı pay dağıtımı
    distributeBabaTarafiPay(babaTarafiPay, babaAnnesiBabasiDurumu, halaAdet, amcaAdet) {
        if (babaAnnesiBabasiDurumu === 'ikisi-sag') {
            // İkisi de sağ - eşit paylaşım
            this.babaAnnesiBabasiPay = babaTarafiPay;
        } else if (babaAnnesiBabasiDurumu === 'annesi-sag') {
            // Sadece büyükanne sağ - büyükanne yarıyı alır, diğer yarısı hala/amcalara
            this.babaAnnesiBabasiPay = babaTarafiPay / 2;
            const olunenPay = babaTarafiPay / 2;
            
            // Ölen büyükbabanın payı hala/amcalara
            const toplamHalaAmca = halaAdet + amcaAdet;
            if (toplamHalaAmca > 0) {
                const kisiBasinaPay = olunenPay / toplamHalaAmca;
                this.halaPay = kisiBasinaPay * halaAdet;
                this.amcaPay = kisiBasinaPay * amcaAdet;
            }
        } else if (babaAnnesiBabasiDurumu === 'babasi-sag') {
            // Sadece büyükbaba sağ - büyükbaba yarıyı alır, diğer yarısı hala/amcalara
            this.babaAnnesiBabasiPay = babaTarafiPay / 2;
            const olunenPay = babaTarafiPay / 2;
            
            // Ölen büyükannenin payı hala/amcalara
            const toplamHalaAmca = halaAdet + amcaAdet;
            if (toplamHalaAmca > 0) {
                const kisiBasinaPay = olunenPay / toplamHalaAmca;
                this.halaPay = kisiBasinaPay * halaAdet;
                this.amcaPay = kisiBasinaPay * amcaAdet;
            }
        } else if (babaAnnesiBabasiDurumu === 'ikisi-olu') {
            // İkisi de ölü - tamamı hala/amcalara
            const toplamHalaAmca = halaAdet + amcaAdet;
            if (toplamHalaAmca > 0) {
                const kisiBasinaPay = babaTarafiPay / toplamHalaAmca;
                this.halaPay = kisiBasinaPay * halaAdet;
                this.amcaPay = kisiBasinaPay * amcaAdet;
            }
        }
    }

    getBuyukAnaBabaIndividualPay(toplamPay, durum) {
        if (durum === 'ikisi-sag') {
            return toplamPay / 2; // İkisi sağ ise payı ikiye böl
        } else {
            return toplamPay; // Tek kişi sağ ise tamamını alır
        }
    }

    // Ana-baba zümresi dağıtımı
    distributeAnaBabaZumresi(toplamPay, anaBabaDurumu, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi, anneAnnesiBabasiDurumu, babaAnnesiBabasiDurumu, teyzeVar, teyzeSayisi, dayiVar, dayiSayisi, halaVar, halaSayisi, amcaVar, amcaSayisi) {
        // Başlangıç değerleri
        this.annePay = 0;
        this.babaPay = 0;
        this.ozKardesPay = 0;
        this.anneUveyKardesPay = 0;
        this.babaUveyKardesPay = 0;
        this.anneAnnesiBabasiPay = 0;
        this.babaAnnesiBabasiPay = 0;
        this.teyzePay = 0;
        this.dayiPay = 0;
        this.halaPay = 0;
        this.amcaPay = 0;

        // Anne ve baba durumunu çözümle
        const anneSag = anaBabaDurumu === 'ikisi-sag' || anaBabaDurumu === 'anne-sag';
        const babaSag = anaBabaDurumu === 'ikisi-sag' || anaBabaDurumu === 'baba-sag';

        if (anneSag && babaSag) {
            // Her ikisi de sağ - eşit paylaşım
            this.annePay = toplamPay / 2;
            this.babaPay = toplamPay / 2;
        } else if (anneSag || babaSag) {
            // Sadece birisi sağ
            if (anneSag) {
                // Anne sağ, baba ölü
                if (ozKardesVar || anneUveyKardesVar || babaUveyKardesVar) {
                    // Kardeşler varsa anne ile kardeşler arasında paylaşım
                    this.annePay = toplamPay / 2;
                    const kardesPay = toplamPay / 2;
                    
                    // Kardeşler arasında dağıtım
                    this.distributeKardesPay(kardesPay, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi);
                } else {
                    // Kardeş yoksa anne tamamını alır
                    this.annePay = toplamPay;
                }
            } else {
                // Baba sağ, anne ölü
                if (ozKardesVar || anneUveyKardesVar || babaUveyKardesVar) {
                    // Kardeşler varsa baba ile kardeşler arasında paylaşım
                    this.babaPay = toplamPay / 2;
                    const kardesPay = toplamPay / 2;
                    
                    // Kardeşler arasında dağıtım
                    this.distributeKardesPay(kardesPay, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi);
                } else {
                    // Kardeş yoksa baba tamamını alır
                    this.babaPay = toplamPay;
                }
            }
        } else {
            // İkisi de ölü - kardeşler veya büyük anne-baba zümresine geçer
            if (ozKardesVar || anneUveyKardesVar || babaUveyKardesVar) {
                // Kardeşler varsa onlara dağıt
                this.distributeKardesPay(toplamPay, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi);
            } else {
                // Kardeş yoksa büyük anne-baba zümresine geçer
                this.distributeBuyukAnaBabaPay(
                    toplamPay,
                    anneAnnesiBabasiDurumu,
                    babaAnnesiBabasiDurumu,
                    { teyzeAdet: teyzeSayisi, dayiAdet: dayiSayisi, halaAdet: halaSayisi, amcaAdet: amcaSayisi }
                );
            }
        }
    }

    // Kardeş payları dağıtımı
    distributeKardesPay(kardesPay, ozKardesVar, ozKardesSayisi, anneUveyKardesVar, anneUveyKardesSayisi, babaUveyKardesVar, babaUveyKardesSayisi) {
        // TMK md. 497: Öz kardeşler tam pay, üvey kardeşler yarım pay alır
        let toplamPay = 0;
        
        // Öz kardeşler tam pay
        if (ozKardesVar) {
            toplamPay += ozKardesSayisi * 1;
        }
        
        // Anne üvey kardeşler yarım pay
        if (anneUveyKardesVar) {
            toplamPay += anneUveyKardesSayisi * 1;
        }
        
        // Baba üvey kardeşler yarım pay
        if (babaUveyKardesVar) {
            toplamPay += babaUveyKardesSayisi * 1;
        }
        
        if (toplamPay > 0) {
            const birimPay = kardesPay / toplamPay;
            
            if (ozKardesVar) {
                this.ozKardesPay = birimPay * ozKardesSayisi * 1;
            }
            
            if (anneUveyKardesVar) {
                this.anneUveyKardesPay = birimPay * anneUveyKardesSayisi * 1;
            }
            
            if (babaUveyKardesVar) {
                this.babaUveyKardesPay = birimPay * babaUveyKardesSayisi * 1;
            }
        }
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
        const anaBabaGroup = document.getElementById('anaBabaGroup');
        const anaBabaDurumu = document.getElementById('anaBabaDurumu');
        const kardesGroup = document.getElementById('kardesGroup');
        const ozKardesVarMi = document.getElementById('ozKardesVarMi');
        const ozKardesSayisi = document.getElementById('ozKardesSayisi');
        const ozKardesSayisiGroup = document.getElementById('ozKardesSayisiGroup');
        const anneUveyKardesVarMi = document.getElementById('anneUveyKardesVarMi');
        const anneUveyKardesSayisi = document.getElementById('anneUveyKardesSayisi');
        const anneUveyKardesSayisiGroup = document.getElementById('anneUveyKardesSayisiGroup');
        const babaUveyKardesVarMi = document.getElementById('babaUveyKardesVarMi');
        const babaUveyKardesSayisi = document.getElementById('babaUveyKardesSayisi');
        const babaUveyKardesSayisiGroup = document.getElementById('babaUveyKardesSayisiGroup');
        const hesaplaMirasBtn = document.getElementById('hesaplaMirasBtn');
        const temizleMirasBtn = document.getElementById('temizleMirasBtn');
        const mirasResult = document.getElementById('mirasResult');
        const buyukAnaBabaGroup = document.getElementById('buyukAnaBabaGroup');
        const anneAnnesiBabasiVarMi = document.getElementById('anneAnnesiBabasiVarMi');
        const babaAnnesiBabasiVarMi = document.getElementById('babaAnnesiBabasiVarMi');

        // YENİ: Amca/Hala/Teyze/Dayı alanları
        let anneTeyzeDayiGroup, babaHalaAmcaGroup, teyzeVarMi, teyzeSayisi, teyzeSayisiGroup, dayiVarMi, dayiSayisi, dayiSayisiGroup, halaVarMi, halaSayisi, halaSayisiGroup, amcaVarMi, amcaSayisi, amcaSayisiGroup;

        // Hesapla/Temizle butonlarının üstünde oluşturulan HTML'den sonra initialize'da yakalanır
        setTimeout(() => {
            anneTeyzeDayiGroup = document.getElementById('anneTeyzeDayiGroup');
            babaHalaAmcaGroup = document.getElementById('babaHalaAmcaGroup');
            teyzeVarMi = document.getElementById('teyzeVarMi');
            teyzeSayisi = document.getElementById('teyzeSayisi');
            teyzeSayisiGroup = document.getElementById('teyzeSayisiGroup');
            dayiVarMi = document.getElementById('dayiVarMi');
            dayiSayisi = document.getElementById('dayiSayisi');
            dayiSayisiGroup = document.getElementById('dayiSayisiGroup');
            halaVarMi = document.getElementById('halaVarMi');
            halaSayisi = document.getElementById('halaSayisi');
            halaSayisiGroup = document.getElementById('halaSayisiGroup');
            amcaVarMi = document.getElementById('amcaVarMi');
            amcaSayisi = document.getElementById('amcaSayisi');
            amcaSayisiGroup = document.getElementById('amcaSayisiGroup');

            // Seçimlere göre sayı kutularını göster/gizle
            const bindToggle = (sel, grp, input) => {
                if (!sel) return;
                sel.addEventListener('change', () => {
                    if (sel.value === 'evet') {
                        grp.style.display = 'block';
                    } else {
                        grp.style.display = 'none';
                        if (input) input.value = '1';
                    }
                });
            };
            bindToggle(teyzeVarMi, teyzeSayisiGroup, teyzeSayisi);
            bindToggle(dayiVarMi, dayiSayisiGroup, dayiSayisi);
            bindToggle(halaVarMi, halaSayisiGroup, halaSayisi);
            bindToggle(amcaVarMi, amcaSayisiGroup, amcaSayisi);

            // Anne tarafı büyük anne-baba öldüyse veya sadece biri sağsa teyze/dayı soruları kontrol et
            const checkAnneTeyzeDayiVisibility = () => {
                if (!anneTeyzeDayiGroup) return;
                if (anneAnnesiBabasiVarMi.value === 'ikisi-olu' || anneAnnesiBabasiVarMi.value === 'babasi-sag' || anneAnnesiBabasiVarMi.value === 'annesi-sag') {
                    anneTeyzeDayiGroup.style.display = 'block';
                } else {
                    anneTeyzeDayiGroup.style.display = 'none';
                    if (teyzeVarMi) teyzeVarMi.value = '';
                    if (dayiVarMi) dayiVarMi.value = '';
                    if (teyzeSayisiGroup) teyzeSayisiGroup.style.display = 'none';
                    if (dayiSayisiGroup) dayiSayisiGroup.style.display = 'none';
                    if (teyzeSayisi) teyzeSayisi.value = '1';
                    if (dayiSayisi) dayiSayisi.value = '1';
                }
            };

            // Baba tarafı büyük anne-baba öldüyse veya sadece biri sağsa hala/amca soruları kontrol et
            const checkBabaHalaAmcaVisibility = () => {
                if (!babaHalaAmcaGroup) return;
                if (babaAnnesiBabasiVarMi.value === 'ikisi-olu' || babaAnnesiBabasiVarMi.value === 'babasi-sag' || babaAnnesiBabasiVarMi.value === 'annesi-sag') {
                    babaHalaAmcaGroup.style.display = 'block';
                } else {
                    babaHalaAmcaGroup.style.display = 'none';
                    if (halaVarMi) halaVarMi.value = '';
                    if (amcaVarMi) amcaVarMi.value = '';
                    if (halaSayisiGroup) halaSayisiGroup.style.display = 'none';
                    if (amcaSayisiGroup) amcaSayisiGroup.style.display = 'none';
                    if (halaSayisi) halaSayisi.value = '1';
                    if (amcaSayisi) amcaSayisi.value = '1';
                }
            };

            if (anneAnnesiBabasiVarMi) anneAnnesiBabasiVarMi.addEventListener('change', checkAnneTeyzeDayiVisibility);
            if (babaAnnesiBabasiVarMi) babaAnnesiBabasiVarMi.addEventListener('change', checkBabaHalaAmcaVisibility);
        }, 0);

        if (!mirasVarligiInput || !esSagMiSelect || !cocukVarMiSelect || !torunVarMiSelect || !hesaplaMirasBtn || !temizleMirasBtn || !mirasResult) {
            console.error('Required elements not found');
            return;
        }

        // Ana-baba sorusunu göster/gizle
        function checkAnaBabaVisibility() {
            const cocukVar = cocukVarMiSelect.value === 'evet';
            const torunVar = torunVarMiSelect.value === 'evet';
            
            if (!cocukVar && !torunVar && cocukVarMiSelect.value !== '' && torunVarMiSelect.value !== '') {
                anaBabaGroup.style.display = 'block';
            } else {
                anaBabaGroup.style.display = 'none';
                anaBabaDurumu.value = '';
            }
        }

        // Çocuk durumu değiştiğinde kontrol et
        cocukVarMiSelect.addEventListener('change', () => {
            if (cocukVarMiSelect.value === 'evet') {
                cocukSayisiGroup.style.display = 'block';
            } else {
                cocukSayisiGroup.style.display = 'none';
                cocukSayisiSelect.value = '1';
            }
            checkAnaBabaVisibility();
        });

        // Torun durumu değiştiğinde kontrol et
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
            checkAnaBabaVisibility();
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
            const anaBabaDurumuValue = anaBabaDurumu.value;
            const ozKardesVar = ozKardesVarMi.value === 'evet';
            const ozKardesSayisiValue = ozKardesVar ? parseInt(ozKardesSayisi.value) || 0 : 0;
            const anneUveyKardesVar = anneUveyKardesVarMi.value === 'evet';
            const anneUveyKardesSayisiValue = anneUveyKardesVar ? parseInt(anneUveyKardesSayisi.value) || 0 : 0;
            const babaUveyKardesVar = babaUveyKardesVarMi.value === 'evet';
            const babaUveyKardesSayisiValue = babaUveyKardesVar ? parseInt(babaUveyKardesSayisi.value) || 0 : 0;
            const anneAnnesiBabasiDurumuValue = anneAnnesiBabasiVarMi.value;
            const babaAnnesiBabasiDurumuValue = babaAnnesiBabasiVarMi.value;

            // Amca/Hala/Teyze/Dayı değerleri
            const teyzeVar = document.getElementById('teyzeVarMi')?.value === 'evet';
            const teyzeSayisiValue = teyzeVar ? (parseInt(document.getElementById('teyzeSayisi')?.value) || 0) : 0;
            const dayiVar = document.getElementById('dayiVarMi')?.value === 'evet';
            const dayiSayisiValue = dayiVar ? (parseInt(document.getElementById('dayiSayisi')?.value) || 0) : 0;
            const halaVar = document.getElementById('halaVarMi')?.value === 'evet';
            const halaSayisiValue = halaVar ? (parseInt(document.getElementById('halaSayisi')?.value) || 0) : 0;
            const amcaVar = document.getElementById('amcaVarMi')?.value === 'evet';
            const amcaSayisiValue = amcaVar ? (parseInt(document.getElementById('amcaSayisi')?.value) || 0) : 0;

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

            // Ana-baba sorusu görünürse validasyon yap
            if (anaBabaGroup.style.display === 'block') {
                if (anaBabaDurumu.value === '') {
                    mirasResult.innerHTML = '<div class="result-box error">Lütfen anne ve baba durumunu seçiniz.</div>';
                    return;
                }
                
                // Kardeş soruları için validasyon
                if (kardesGroup.style.display === 'block') {
                    const durum = anaBabaDurumu.value;
                    
                    if (durum === 'anne-sag') {
                        // Anne sağ baba ölü: sadece öz kardeş ve baba üvey kardeş sorularını kontrol et
                        if (ozKardesVarMi.value === '' || babaUveyKardesVarMi.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen kardeş durumlarını seçiniz.</div>';
                            return;
                        }
                    } else if (durum === 'baba-sag') {
                        // Baba sağ anne ölü: sadece öz kardeş ve anne üvey kardeş sorularını kontrol et
                        if (ozKardesVarMi.value === '' || anneUveyKardesVarMi.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen kardeş durumlarını seçiniz.</div>';
                            return;
                        }
                    } else {
                        // İkisi de ölü: tüm kardeş sorularını kontrol et
                        if (ozKardesVarMi.value === '' || anneUveyKardesVarMi.value === '' || babaUveyKardesVarMi.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen kardeş durumlarını seçiniz.</div>';
                            return;
                        }
                    }
                }
                
                // Büyük anne-baba soruları için validasyon
                if (buyukAnaBabaGroup.style.display === 'block') {
                    if (anneAnnesiBabasiVarMi.value === '' || babaAnnesiBabasiVarMi.value === '') {
                        mirasResult.innerHTML = '<div class="result-box error">Lütfen büyük anne-baba durumlarını seçiniz.</div>';
                        return;
                    }
                    
                    // Büyük anne-baba zümresi kontrolü - sadece form alanları doldurulmamışsa hata ver
                    // Eğer tüm alanlar "hayır" veya "ikisi de öldü" ise hesaplamaya devam et (Madde 501 için)
                    const buyukAnaBabaSag = (anneAnnesiBabasiVarMi.value !== 'ikisi-olu') || (babaAnnesiBabasiVarMi.value !== 'ikisi-olu');
                    const altsoyVar = teyzeVar || dayiVar || halaVar || amcaVar;
                    
                    // Sadece teyze/dayı/hala/amca soruları görünüyorsa ve cevaplanmamışsa hata ver
                    const anneTeyzeDayiGroup = document.getElementById('anneTeyzeDayiGroup');
                    const babaHalaAmcaGroup = document.getElementById('babaHalaAmcaGroup');
                    
                    if (anneTeyzeDayiGroup && anneTeyzeDayiGroup.style.display === 'block') {
                        const teyzeVarMiSelect = document.getElementById('teyzeVarMi');
                        const dayiVarMiSelect = document.getElementById('dayiVarMi');
                        if (teyzeVarMiSelect && teyzeVarMiSelect.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen teyze durumunu seçiniz.</div>';
                            return;
                        }
                        if (dayiVarMiSelect && dayiVarMiSelect.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen dayı durumunu seçiniz.</div>';
                            return;
                        }
                    }
                    
                    if (babaHalaAmcaGroup && babaHalaAmcaGroup.style.display === 'block') {
                        const halaVarMiSelect = document.getElementById('halaVarMi');
                        const amcaVarMiSelect = document.getElementById('amcaVarMi');
                        if (halaVarMiSelect && halaVarMiSelect.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen hala durumunu seçiniz.</div>';
                            return;
                        }
                        if (amcaVarMiSelect && amcaVarMiSelect.value === '') {
                            mirasResult.innerHTML = '<div class="result-box error">Lütfen amca durumunu seçiniz.</div>';
                            return;
                        }
                    }
                }
                
                // Bu kontrolü kaldırıyoruz - hiç mirasçı yoksa TMK 501'e göre devlete geçmeli
                // Sadece hiç mirasçı yoksa hata ver - büyük anne-baba zümresini de dahil et
                // const buyukAnaBabaZumresiVar = (anneAnnesiBabasiVarMi.value && anneAnnesiBabasiVarMi.value !== 'ikisi-olu') || 
                //                        (babaAnnesiBabasiVarMi.value && babaAnnesiBabasiVarMi.value !== 'ikisi-olu') ||
                //                        teyzeVar || dayiVar || halaVar || amcaVar;
        
                // if (anaBabaDurumu.value === 'ikisi-olu' && !ozKardesVar && !anneUveyKardesVar && !babaUveyKardesVar && !buyukAnaBabaZumresiVar) {
                //     mirasResult.innerHTML = '<div class="result-box error">En az bir mirasçı grubu bulunmalıdır.</div>';
                //     return;
                // }
            }

            const result = this.calculateInheritance(
                varlık, esSag, cocukVar, torunVar, cocukSayisi, torunSayisi, torunDetaylari,
                anaBabaDurumuValue, ozKardesVar, ozKardesSayisiValue, anneUveyKardesVar, anneUveyKardesSayisiValue,
                babaUveyKardesVar, babaUveyKardesSayisiValue, anneAnnesiBabasiDurumuValue, babaAnnesiBabasiDurumuValue,
                teyzeVar, teyzeSayisiValue, dayiVar, dayiSayisiValue, halaVar, halaSayisiValue, amcaVar, amcaSayisiValue
            );

            let cocukPayiLabel = '';
            let cocukPayiDetay = '';
            
            if (result.altsoyPay > 0) {
                if (cocukSayisi === 1 && torunSayisi === 0) {
                    cocukPayiLabel = 'Çocuğun Toplam Miras Payı:';
                } else {
                    cocukPayiLabel = 'Çocukların Toplam Miras Payı:';
                    if (cocukSayisi > 1) {
                        const cocukBasinaPay = result.cocukPaylari.length > 0 ? result.cocukPaylari[0].pay : 0;
                        cocukPayiDetay = `
                        <div class="sonuc-satir">
                            <span class="label">Her Bir Çocuğa Düşen Miras Payı:</span>
                            <span class="value">${cocukBasinaPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL</span>
                        </div>`;
                    }
                }
            }

            // Hiç mirasçı yoksa devlet mirası alır kontrolü
            const toplamMirasciPay = result.esPay + result.altsoyPay + result.annePay + result.babaPay + 
                                   result.ozKardesPay + result.anneUveyKardesPay + result.babaUveyKardesPay +
                                   result.anneAnnesiBabasiPay + result.babaAnnesiBabasiPay + result.teyzePay +
                                   result.dayiPay + result.halaPay + result.amcaPay;

            if (toplamMirasciPay === 0) {
                mirasResult.innerHTML = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Miras Hesaplama Sonucu</h4>
                        <div class="sonuc-detay">
                            <div class="sonuc-satir">
                                <span class="label">Toplam Tereke:</span>
                                <span class="value">${result.toplamVarlik.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%100)</span>
                            </div>
                            <div class="sonuc-satir toplam" style="background-color: #f8f9fa; border-left: 4px solid #dc3545;">
                                <span class="label" style="font-weight: bold; color: #dc3545;">Devlete Geçen Miras:</span>
                                <span class="value" style="font-weight: bold; color: #dc3545;">${result.toplamVarlik.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%100)</span>
                            </div>
                        </div>
                        <div class="uyari" style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin-top: 15px;">
                            <h5 style="color: #856404; margin-bottom: 10px;">TMK md. 501 - Devlet</h5>
                            <p style="color: #856404; margin-bottom: 0;"><strong>"Mirasçı bırakmaksızın ölen kimsenin mirası Devlete geçer."</strong></p>
                            <p style="color: #856404; margin-top: 8px; font-size: 14px;">Bu durumda tüm tereke, hiçbir yasal mirasçı bulunmadığı için Devlet Hazinesine intikal eder.</p>
                        </div>
                    </div>
                `;
                return;
            }

            mirasResult.innerHTML = `
                <div class="tapu-hesaplama-sonuc" style="max-height: 600px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: #007bff #f0f0f0;">
                    <h4>Miras Hesaplama Sonucu</h4>
                    <div class="sonuc-detay">
                        <div class="sonuc-satir">
                            <span class="label">Toplam Miras Varlığı:</span>
                            <span class="value">${result.toplamVarlik.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%100)</span>
                        </div>
                        ${result.esPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Eşin Miras Payı:</span>
                            <span class="value">${result.esPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.esOrani})</span>
                        </div>` : ''}
                        
                        ${result.annePay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Annesinin Miras Payı:</span>
                            <span class="value">${result.annePay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.anneOrani})</span>
                        </div>` : ''}
                        
                        ${result.babaPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Babasının Miras Payı:</span>
                            <span class="value">${result.babaPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.babaOrani})</span>
                        </div>` : ''}
                        
                        ${result.ozKardesPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Anne-Baba Öz Kardeşlerin Her Birine:</span>
                            <span class="value">${(result.ozKardesPay / result.ozKardesSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((result.ozKardesPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.anneUveyKardesPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Annenin Diğer Evliliğinden Üvey Kardeşlerin Her Birine:</span>
                            <span class="value">${(result.anneUveyKardesPay / result.anneUveyKardesSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((result.anneUveyKardesPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.babaUveyKardesPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Babanın Diğer Evliliğinden Üvey Kardeşlerin Her Birine:</span>
                            <span class="value">${(result.babaUveyKardesPay / result.babaUveyKardesSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((result.babaUveyKardesPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.altsoyPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">${cocukPayiLabel}</span>
                            <span class="value">${result.altsoyPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${result.altsoyOrani})</span>
                        </div>
                        ${cocukPayiDetay}
                        ${result.torunPaylari.map(torunGrubu => 
                            `<div class="sonuc-satir">
                                <span class="label">Muristen Önce Ölen ${torunGrubu.cocukSirano}. Çocuğun Sağ Olan Her Bir Çocuğuna:</span>
                                <span class="value">${torunGrubu.torunBasinaPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((torunGrubu.torunBasinaPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                            </div>`
                        ).join('')}` : ''}
                        
                        ${result.anneAnnesiBabasiPay > 0 ? `
                        ${result.anneAnnesiBabasiDurumu === 'ikisi-sag' ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Annesinin Annesine (Anneanne):</span>
                            <span class="value">${(result.anneAnnesiBabasiPay / 2).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.anneAnnesiBabasiPay / 2) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Annesinin Babasına (Dede):</span>
                            <span class="value">${(result.anneAnnesiBabasiPay / 2).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.anneAnnesiBabasiPay / 2) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Annesinin ${result.anneAnnesiBabasiDurumu === 'annesi-sag' ? 'Annesine (Anneanne)' : 'Babasına (Dede)'}:</span>
                            <span class="value">${result.anneAnnesiBabasiPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((result.anneAnnesiBabasiPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>`}` : ''}
                        
                        ${result.babaAnnesiBabasiPay > 0 ? `
                        ${result.babaAnnesiBabasiDurumu === 'ikisi-sag' ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Babasının Annesine (Büyükanne):</span>
                            <span class="value">${(result.babaAnnesiBabasiPay / 2).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.babaAnnesiBabasiPay / 2) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Babasının Babasına (Büyükbaba):</span>
                            <span class="value">${(result.babaAnnesiBabasiPay / 2).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.babaAnnesiBabasiPay / 2) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : `
                        <div class="sonuc-satir toplam">
                            <span class="label">Mirasbırakanın Babasının ${result.babaAnnesiBabasiDurumu === 'annesi-sag' ? 'Annesine (Büyükanne)' : 'Babasına (Büyükbaba)'}:</span>
                            <span class="value">${result.babaAnnesiBabasiPay.toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${((result.babaAnnesiBabasiPay / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>`}` : ''}
                        
                        ${result.teyzePay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Her Bir Teyzeye (Annenin Kız Kardeşi):</span>
                            <span class="value">${(result.teyzePay / result.teyzeSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.teyzePay / result.teyzeSayisi) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.dayiPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Her Bir Dayıya (Annenin Erkek Kardeşi):</span>
                            <span class="value">${(result.dayiPay / result.dayiSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.dayiPay / result.dayiSayisi) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.halaPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Her Bir Halaya (Babanın Kız Kardeşi):</span>
                            <span class="value">${(result.halaPay / result.halaSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.halaPay / result.halaSayisi) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                        
                        ${result.amcaPay > 0 ? `
                        <div class="sonuc-satir toplam">
                            <span class="label">Her Bir Amcaya (Babanın Erkek Kardeşi):</span>
                            <span class="value">${(result.amcaPay / result.amcaSayisi).toLocaleString('tr-TR', {minimumFractionDigits: 2})} TL (%${(((result.amcaPay / result.amcaSayisi) / result.toplamVarlik) * 100).toFixed(1)})</span>
                        </div>` : ''}
                    </div>
                    <div class="uyari">
                        <p>Bu hesaplama 4721 sayılı Türk Medeni Kanun'un 495 ve 513. maddeler arasındaki hükümlerine göre yapılmıştır.</p>
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
            anaBabaDurumu.value = '';
            anaBabaGroup.style.display = 'none';
            kardesGroup.style.display = 'none';
            ozKardesVarMi.value = '';
                       anneUveyKardesVarMi.value = '';
            babaUveyKardesVarMi.value = '';
            ozKardesSayisiGroup.style.display = 'none';
            anneUveyKardesSayisiGroup.style.display = 'none';
            babaUveyKardesSayisiGroup.style.display = 'none';
            ozKardesSayisi.value = '1';
            anneUveyKardesSayisi.value = '1';
            babaUveyKardesSayisi.value = '1';
            buyukAnaBabaGroup.style.display = 'none';
            anneAnnesiBabasiVarMi.value = '';
            babaAnnesiBabasiVarMi.value = '';
            
            // Tüm torun gruplarını gizle ve değerleri sıfırla
            for (let i = 1; i <= 10; i++) {
                const group = document.getElementById(`torun${i}Group`);
                const input = document.getElementById(`torun${i}`);
                if (group && i > 1) group.style.display = 'none';
                if (input) input.value = '1';
            }

            // Amca/Hala/Teyze/Dayı alanlarını sıfırla
            const anneTeyzeDayiGroup = document.getElementById('anneTeyzeDayiGroup');
            const babaHalaAmcaGroup = document.getElementById('babaHalaAmcaGroup');
            if (anneTeyzeDayiGroup) {
                anneTeyzeDayiGroup.style.display = 'none';
                ['teyzeVarMi','dayiVarMi'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
                ['teyzeSayisiGroup','dayiSayisiGroup'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
                ['teyzeSayisi','dayiSayisi'].forEach(id => { const el = document.getElementById(id); if (el) el.value = '1'; });
            }
            if (babaHalaAmcaGroup) {
                babaHalaAmcaGroup.style.display = 'none';
                ['halaVarMi','amcaVarMi'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
                ['halaSayisiGroup','amcaSayisiGroup'].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
                ['halaSayisi','amcaSayisi'].forEach(id => { const el = document.getElementById(id); if (el) el.value = '1'; });
            }
            
            mirasResult.innerHTML = '';
        });

        // Info tooltip functionality
        const infoIcon = document.querySelector('.info-icon');
        const tooltip = document.getElementById('mirasVarligiTooltip');
        
        if (infoIcon && tooltip) {
            // Mobil cihaz kontrolü
            const isMobile = window.innerWidth <= 520;
            
            if (isMobile) {
                // Mobil için tıklama sistemi
                infoIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
                });
                
                // Başka yere tıklayınca kapat
                document.addEventListener('click', (e) => {
                    if (!infoIcon.contains(e.target) && !tooltip.contains(e.target)) {
                        tooltip.style.display = 'none';
                    }
                });
            } else {
                // Desktop için hover sistemi
                infoIcon.addEventListener('mouseenter', () => {
                    tooltip.style.display = 'block';
                });
                
                infoIcon.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
            }
        }

        // Enter tuşu ile hesaplama
        mirasVarligiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                hesaplaMirasBtn.click();
            }
        });

        // Ana-baba durumu değiştiğinde kardeş sorularını göster/gizle
        anaBabaDurumu.addEventListener('change', () => {
            const durum = anaBabaDurumu.value;
            
            if (durum === 'anne-sag' || durum === 'baba-sag' || durum === 'ikisi-olu') {
                kardesGroup.style.display = 'block';
                
                // Anne sağ baba ölü durumunda annenin diğer evliliğinden üvey kardeşler miras alamaz
                if (durum === 'anne-sag') {
                    anneUveyKardesVarMi.value = 'hayir';
                    anneUveyKardesSayisiGroup.style.display = 'none';
                    anneUveyKardesVarMi.style.display = 'none';
                    anneUveyKardesVarMi.parentElement.style.display = 'none';
                } else if (durum === 'baba-sag') {
                    // Baba sağ anne ölü durumunda babanın diğer evliliğinden üvey kardeşler miras alamaz
                    babaUveyKardesVarMi.value = 'hayir';
                    babaUveyKardesSayisiGroup.style.display = 'none';
                    babaUveyKardesVarMi.style.display = 'none';
                    babaUveyKardesVarMi.parentElement.style.display = 'none';
                } else {
                    // İkisi de ölü: tüm kardeş türleri görünür
                    anneUveyKardesVarMi.style.display = 'block';
                    anneUveyKardesVarMi.parentElement.style.display = 'block';
                    babaUveyKardesVarMi.style.display = 'block';
                    babaUveyKardesVarMi.parentElement.style.display = 'block';
                }
            } else {
                kardesGroup.style.display = 'none';
                ozKardesVarMi.value = '';
                anneUveyKardesVarMi.value = '';
                babaUveyKardesVarMi.value = '';
                ozKardesSayisiGroup.style.display = 'none';
                anneUveyKardesSayisiGroup.style.display = 'none';
                babaUveyKardesSayisiGroup.style.display = 'none';
                ozKardesSayisi.value = '1';
                anneUveyKardesSayisi.value = '1';
                babaUveyKardesSayisi.value = '1';
                
                // Tüm üvey kardeş sorularını görünür yap
                anneUveyKardesVarMi.style.display = 'block';
                anneUveyKardesVarMi.parentElement.style.display = 'block';
                babaUveyKardesVarMi.style.display = 'block';
                babaUveyKardesVarMi.parentElement.style.display = 'block';
            }
        });

        // Öz kardeş durumu
        ozKardesVarMi.addEventListener('change', () => {
            if (ozKardesVarMi.value === 'evet') {
                ozKardesSayisiGroup.style.display = 'block';
            } else {
                ozKardesSayisiGroup.style.display = 'none';
                ozKardesSayisi.value = '1';
            }
            checkBuyukAnaBabaVisibility();
        });

        // Anne üvey kardeş durumu
        anneUveyKardesVarMi.addEventListener('change', () => {
            if (anneUveyKardesVarMi.value === 'evet') {
                anneUveyKardesSayisiGroup.style.display = 'block';
            } else {
                anneUveyKardesSayisiGroup.style.display = 'none';
                anneUveyKardesSayisi.value = '1';
            }
            checkBuyukAnaBabaVisibility();
        });

        // Baba üvey kardeş durumu
        babaUveyKardesVarMi.addEventListener('change', () => {
            if (babaUveyKardesVarMi.value === 'evet') {
                babaUveyKardesSayisiGroup.style.display = 'block';
            } else {
                babaUveyKardesSayisiGroup.style.display = 'none';
                babaUveyKardesSayisi.value = '1';
            }
            checkBuyukAnaBabaVisibility();
        });

        // Büyük anne-baba görünürlüğünü kontrol et
        function checkBuyukAnaBabaVisibility() {
            const ozKardesYok = ozKardesVarMi.value === 'hayir';
            const anneUveyKardesYok = anneUveyKardesVarMi.value === 'hayir';
            const babaUveyKardesYok = babaUveyKardesVarMi.value === 'hayir';
            
            if (ozKardesYok && anneUveyKardesYok && babaUveyKardesYok && 
                ozKardesVarMi.value !== '' && anneUveyKardesVarMi.value !== '' && babaUveyKardesVarMi.value !== '') {
                buyukAnaBabaGroup.style.display = 'block';
            } else {
                buyukAnaBabaGroup.style.display = 'none';
                anneAnnesiBabasiVarMi.value = '';
                babaAnnesiBabasiVarMi.value = '';
            }
        }
    }
}

// Export for use in main script
window.MirasHesaplama = MirasHesaplama;