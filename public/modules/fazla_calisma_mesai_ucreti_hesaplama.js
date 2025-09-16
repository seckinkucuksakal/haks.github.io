class FazlaCalismaMessaiUcretiHesaplama {
    constructor() {
        console.log('FazlaCalismaMessaiUcretiHesaplama modülü yüklendi');
    }

    getTabContent() {
        return `
            <h3>Fazla Çalışma Mesai Ücreti Hesaplama (Aylık)</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="netMaasMesai">Aylık Net Maaş (TL):</label>
                    <input type="text" id="netMaasMesai" placeholder="1600" class="form-input">
                </div>
                <div class="form-group">
                    <label for="sozlesmeHaftalikSaat">İş Sözleşmesinde Kararlaştırılan Haftalık Çalışma Süresi (saat):</label>
                    <input type="number" id="sozlesmeHaftalikSaat" placeholder="40" min="1" max="45" class="form-input">
                </div>
                <div class="form-group">
                    <label>1. Hafta Çalışılan Süre (saat):</label>
                    <input type="number" id="hafta1Saat" placeholder="44" min="0" class="form-input">
                </div>
                <div class="form-group">
                    <label>2. Hafta Çalışılan Süre (saat):</label>
                    <input type="number" id="hafta2Saat" placeholder="46" min="0" class="form-input">
                </div>
                <div class="form-group">
                    <label>3. Hafta Çalışılan Süre (saat):</label>
                    <input type="number" id="hafta3Saat" placeholder="47" min="0" class="form-input">
                </div>
                <div class="form-group">
                    <label>4. Hafta Çalışılan Süre (saat):</label>
                    <input type="number" id="hafta4Saat" placeholder="42" min="0" class="form-input">
                </div>
                <div class="form-actions">
                    <button id="mesaiHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button id="mesaiTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                <div id="mesaiResult" class="tapu-result"></div>
            </div>
        `;
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
        console.log('Fazla Çalışma Mesai Ücreti Hesaplama modülü başlatıldı');
        setTimeout(() => {
            const netMaasInput = document.getElementById('netMaasMesai');
            const sozlesmeHaftalikSaatInput = document.getElementById('sozlesmeHaftalikSaat');
            const hafta1Input = document.getElementById('hafta1Saat');
            const hafta2Input = document.getElementById('hafta2Saat');
            const hafta3Input = document.getElementById('hafta3Saat');
            const hafta4Input = document.getElementById('hafta4Saat');
            const hesaplaBtn = document.getElementById('mesaiHesaplaBtn');
            const temizleBtn = document.getElementById('mesaiTemizleBtn');
            const resultDiv = document.getElementById('mesaiResult');

            if (!netMaasInput || !sozlesmeHaftalikSaatInput || !hafta1Input || !hafta2Input || !hafta3Input || !hafta4Input || !hesaplaBtn || !temizleBtn || !resultDiv) return;

            hesaplaBtn.onclick = () => {
                // Kullanıcıdan gelen değeri temizle ve sayıya çevir (binlik ayırıcıları kaldır)
                const netMaasRaw = netMaasInput.value.replace(/\./g, '').replace(',', '.');
                const netMaas = parseFloat(netMaasRaw);
                const sozlesmeSaat = parseFloat(sozlesmeHaftalikSaatInput.value);
                const haftalikSaatler = [
                    parseFloat(hafta1Input.value),
                    parseFloat(hafta2Input.value),
                    parseFloat(hafta3Input.value),
                    parseFloat(hafta4Input.value)
                ].filter(s => !isNaN(s));

                // Validasyon
                if (isNaN(netMaas) || netMaas <= 0) {
                    resultDiv.innerHTML = '<div class="result-box error">Geçerli bir aylık net maaş giriniz.</div>';
                    return;
                }
                if (isNaN(sozlesmeSaat) || sozlesmeSaat <= 0 || sozlesmeSaat > 45) {
                    resultDiv.innerHTML = '<div class="result-box error">İş sözleşmesinde kararlaştırılan haftalık çalışma süresi 1-45 saat arası olmalıdır.</div>';
                    return;
                }
                if (haftalikSaatler.length === 0) {
                    resultDiv.innerHTML = '<div class="result-box error">Lütfen en az bir haftalık çalışma süresi giriniz.</div>';
                    return;
                }

                // Hesaplama
                const haftalikUcret = netMaas / 4;
                const saatlikUcret = haftalikUcret / sozlesmeSaat;

                let toplamMesaiUcreti = 0;
                let toplamFazlaCalismaSaat = 0;
                let toplamFazlaSureSaat = 0;
                let detaylar = '';

                haftalikSaatler.forEach((haftaSaat, i) => {
                    let fazlaSureSaat = 0;
                    let fazlaCalismaSaat = 0;
                    let haftaUcret = 0;

                    if (haftaSaat > 45) {
                        fazlaSureSaat = 45 - sozlesmeSaat > 0 ? 45 - sozlesmeSaat : 0;
                        fazlaCalismaSaat = haftaSaat - 45;
                    } else if (haftaSaat > sozlesmeSaat) {
                        fazlaSureSaat = haftaSaat - sozlesmeSaat;
                        fazlaCalismaSaat = 0;
                    }

                    const fazlaSureUcret = fazlaSureSaat * saatlikUcret * 1.25;
                    const fazlaCalismaUcret = fazlaCalismaSaat * saatlikUcret * 1.5;
                    haftaUcret = fazlaSureUcret + fazlaCalismaUcret;

                    toplamMesaiUcreti += haftaUcret;
                    toplamFazlaCalismaSaat += fazlaCalismaSaat;
                    toplamFazlaSureSaat += fazlaSureSaat;

                    detaylar += `
                        <tr>
                            <td>${i + 1}. Hafta</td>
                            <td>${haftaSaat}</td>
                            <td>${fazlaSureSaat}</td>
                            <td>${fazlaCalismaSaat}</td>
                            <td>${haftaUcret.toFixed(2)} TL</td>
                        </tr>
                    `;
                });

                const toplamOdenecek = netMaas + toplamMesaiUcreti;

                resultDiv.innerHTML = `
                    <div class="tapu-hesaplama-sonuc">
                        <h4>Fazla Çalışma Mesai Ücreti (Aylık) Sonucu</h4>
                        <div class="sonuc-satir"><span class="label">Toplam Fazla Sürelerle Çalışma:</span> <span class="value">${toplamFazlaSureSaat} saat</span></div>
                        <div class="sonuc-satir"><span class="label">Toplam Fazla Çalışma:</span> <span class="value">${toplamFazlaCalismaSaat} saat</span></div>
                        <div class="sonuc-satir"><span class="label">Toplam Mesai Ücreti:</span> <span class="value">${this.formatCurrency(toplamMesaiUcreti)}</span></div>
                        <div class="sonuc-satir toplam" style="font-weight:bold;"><span class="label">Toplam Ödenecek (Maaş + Mesai):</span> <span class="value">${this.formatCurrency(toplamOdenecek)}</span></div>
                        <div class="uyari" style="margin-top:20px;">
                        <p style="text-align: center;"><strong>Önemli Hususlar:</strong></p>
                            <ul>
                                <li><strong>Not:</strong> Fazla çalışma, Kanunda yazılı koşullar çerçevesinde, haftalık kırkbeş saati aşan çalışmalardır.</li>
                                <li><strong>Not:</strong> Haftalık çalışma süresinin sözleşmelerle kırkbeş saatin altında belirlendiği durumlarda ortalama haftalık çalışma süresini aşan ve kırkbeş saate kadar yapılan çalışmalar fazla sürelerle çalışmalardır.</li>
                                <li><strong>Not:</strong> Fazla çalışma veya fazla sürelerle çalışma yapan işçi isterse, bu çalışmalar karşılığı zamlı ücret yerine, fazla çalıştığı her saat karşılığında bir saat otuz dakikayı, fazla sürelerle çalıştığı her saat karşılığında bir saat onbeş dakikayı serbest zaman olarak kullanabilir.</li>
                                <li><strong>Not:</strong> Yer altında maden işlerinde çalışan işçilere, zorunlu nedenlerle fazla çalışma ve olağanüstü hallerde fazla çalışma durumlarında haftalık otuz yedi buçuk saati aşan her bir saat fazla çalışma için verilecek ücret, normal çalışma ücretinin saat başına düşen miktarının yüzde yüzden az olmamak üzere arttırılması suretiyle ödenir. <strong>Bu konuda sabit bir oran bulunmadığından, hesaplayıcıya eklenmemiştir.</strong></li>
                            </ul>
                        </div>
                    </div>
                    <style>
                        .uyari ul {
                            color: black;
                            text-align: left;
                        }  
                        .uyari li {
                            color: black;
                            text-align: left;
                        }  
                    </syle>
                `;
            };

            temizleBtn.onclick = () => {
                netMaasInput.value = '';
                sozlesmeHaftalikSaatInput.value = '';
                hafta1Input.value = '';
                hafta2Input.value = '';
                hafta3Input.value = '';
                hafta4Input.value = '';
                resultDiv.innerHTML = '';
            };

            // Otomatik para formatı (cursor pozisyonunu korur)
            if (netMaasInput) {
                netMaasInput.addEventListener('input', (e) => {
                    const input = e.target;
                    let raw = input.value.replace(/[^\d,]/g, '');
                    // Virgülden sonrası varsa ayır
                    let [tam, ondalik] = raw.split(',');
                    // Baştaki sıfırları kaldır
                    tam = tam ? tam.replace(/^0+/, '') : '';
                    if (tam === '') tam = '0';
                    // Noktalama (binlik ayırıcı)
                    let formattedTam = tam.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                    let formatted = ondalik !== undefined ? `${formattedTam},${ondalik}` : formattedTam;
                    // Cursor pozisyonunu korumak için eski pozisyonu bul
                    const prevLen = input.value.length;
                    const prevPos = input.selectionStart;
                    input.value = formatted;
                    // Yeni pozisyonu hesapla
                    const newLen = formatted.length;
                    let newPos = prevPos + (newLen - prevLen);
                    // Eğer kullanıcı silme yaptıysa ve bir nokta silindiyse, pozisyonu düzelt
                    if (formatted[newPos - 1] === '.' && raw.length < prevLen) {
                        newPos++;
                    }
                    setTimeout(() => {
                        input.setSelectionRange(newPos, newPos);
                    }, 0);
                });
            }
        }, 100);
    }
}

window.FazlaCalismaMessaiUcretiHesaplama = FazlaCalismaMessaiUcretiHesaplama;

