class DamgaVergisiHesaplama {
    constructor() {
        console.log('DamgaVergisiHesaplama modülü yüklendi');
    }

    getTabContent() {
        // Damga vergisi oranları ve sabitleri
        const kagitlar = [
            { value: "mukavele", label: "Mukavelenameler, taahhütnameler ve temliknameler", oran: 0.00948, tip: "oran" },
            { value: "kira", label: "Kira mukavelenameleri", oran: 0.00189, tip: "oran" },
            { value: "kefalet", label: "Kefalet, teminat ve rehin senetleri", oran: 0.00948, tip: "oran" },
            { value: "tahkim", label: "Tahkimnameler ve sulhnameler", oran: 0.00948, tip: "oran" },
            { value: "fesih", label: "Fesihnameler", oran: 0.00189, tip: "oran" },
            { value: "arac_satis", label: "İkinci el araç satış/devri sözleşmeleri", oran: 0.00189, tip: "oran" },
            { value: "devlet_tasinmaz", label: "Devlet taşınmazları ön izin/irtifak/kullanma izni", oran: 0.00948, tip: "oran" },
            { value: "gayrimenkul_satis_vaadi", label: "Gayrimenkul satış vaadi sözleşmeleri", oran: 0, tip: "oran" },
            { value: "ihale_sozlesme", label: "Resmi daire ihale sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "taksitli_satis", label: "Taksitle satış sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "devre_tatil", label: "Devre tatil/uzun süreli tatil hizmeti sözleşmeleri", oran: 0, tip: "oran" },
            { value: "abonelik", label: "Abonelik sözleşmeleri", oran: 0, tip: "oran" },
            { value: "turist_rehberligi", label: "Turist rehberliği sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "elektrik_toptan", label: "Toptan elektrik satış sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "elektrik_perakende", label: "Perakende elektrik satış sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "dogalgaz_toptan", label: "Toptan doğal gaz satış sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "dogalgaz_tuketici", label: "Tüketiciye doğal gaz satış sözleşmeleri", oran: 0.00948, tip: "oran" },
            { value: "kat_karsiligi_insaat", label: "Kat karşılığı/hasılat paylaşımı inşaat sözleşmeleri", oran: 0, tip: "oran" },
            { value: "danismanlik", label: "Danışmanlık hizmet sözleşmeleri (kat karşılığı inşaat)", oran: 0, tip: "oran" },
            { value: "yapi_denetim", label: "Yapı denetimi hizmet sözleşmeleri", oran: 0, tip: "oran" },
            { value: "tahkim_maktu", label: "Tahkimnameler (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
            { value: "sulh_maktu", label: "Sulhnameler (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
            { value: "turizm_kontenjan", label: "Turizm kontenjan sözleşmeleri", oran: 3783.20, tip: "maktu" },
            { value: "meclis_karar_oran", label: "Meclis/hakem kararları (belli parayı ihtiva eden)", oran: 0.00948, tip: "oran" },
            { value: "meclis_karar_maktu", label: "Meclis/hakem kararları (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
            { value: "ihale_karar", label: "Resmi daire ihale kararları", oran: 0.00569, tip: "oran" },
            { value: "makbuz_mal_hizmet", label: "Mal/hizmet alımı makbuzları", oran: 0.00948, tip: "oran" },
            { value: "makbuz_ucret", label: "Ücret/maaş vb. makbuzlar", oran: 0.00759, tip: "oran" },
            { value: "makbuz_odunc", label: "Ödünç alınan para makbuzları", oran: 0.00759, tip: "oran" },
            { value: "makbuz_icra", label: "İcra dairesi makbuzları", oran: 0.00759, tip: "oran" },
            { value: "beyanname_gelir", label: "Yıllık gelir vergisi beyannamesi", oran: 672.40, tip: "maktu" },
            { value: "beyanname_kurum", label: "Kurumlar vergisi beyannamesi", oran: 898.20, tip: "maktu" },
            { value: "beyanname_kdv", label: "Katma değer vergisi beyannamesi", oran: 443.70, tip: "maktu" },
            { value: "beyanname_muhtasar", label: "Muhtasar beyannameler", oran: 443.70, tip: "maktu" },
            { value: "beyanname_diger", label: "Diğer vergi beyannameleri", oran: 443.70, tip: "maktu" },
            { value: "beyanname_gumruk", label: "Gümrük beyannameleri", oran: 898.20, tip: "maktu" },
            { value: "beyanname_belediye", label: "Belediye/il özel idare beyannameleri", oran: 329.30, tip: "maktu" },
            { value: "beyanname_sgk", label: "SGK prim bildirgeleri/birleşik beyannameler", oran: 526.00, tip: "maktu" },
            { value: "suret_tercume", label: "Özet, suret ve tercümeler", oran: 4.80, tip: "maktu" }
        ];

        // Form HTML
        return `
            <h3>Damga Vergisi Hesaplama</h3>
            <div class="plaka-container">
                <div class="form-group">
                    <label for="damgaKagitTuru">Kağıt Türü:</label>
                    <select id="damgaKagitTuru" class="form-select">
                        <option value="">Seçiniz...</option>
                        ${kagitlar.map(k => `<option value="${k.value}">${k.label}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group" id="damgaMatrahGroup">
                    <label for="damgaMatrah">Brüt Tutar (TL):</label>
                    <input type="number" id="damgaMatrah" placeholder="Örn: 10000" class="form-input" min="0" step="0.01">
                </div>
                <div class="form-actions" style="margin-bottom:32px;">
                    <button type="button" id="damgaHesaplaBtn" class="hesapla-btn">Hesapla</button>
                    <button type="button" id="damgaTemizleBtn" class="temizle-btn">Temizle</button>
                </div>
                <div id="pdfCikarBtnContainer" style="margin-bottom:24px;display:flex;justify-content:center;display:none;">
                    <button id="pdfCikarBtn" class="hesapla-btn" style="padding:10px 24px;font-size:1rem;">PDF Olarak Kaydet</button>
                </div>
                <div id="damgaResult"></div>
                <div id="damgaUyariContainer"></div>
            </div>
        `;
    }

    initialize() {
        console.log('Damga Vergisi Hesaplama modülü başlatıldı');
        // Initialize functionality here

        // Event binding (wait for DOM to be ready)
        setTimeout(() => {
            const kagitlar = [
                { value: "mukavele", label: "Mukavelenameler, taahhütnameler ve temliknameler", oran: 0.00948, tip: "oran" },
                { value: "kira", label: "Kira mukavelenameleri", oran: 0.00189, tip: "oran" },
                { value: "kefalet", label: "Kefalet, teminat ve rehin senetleri", oran: 0.00948, tip: "oran" },
                { value: "tahkim", label: "Tahkimnameler ve sulhnameler", oran: 0.00948, tip: "oran" },
                { value: "fesih", label: "Fesihnameler", oran: 0.00189, tip: "oran" },
                { value: "arac_satis", label: "İkinci el araç satış/devri sözleşmeleri", oran: 0.00189, tip: "oran" },
                { value: "devlet_tasinmaz", label: "Devlet taşınmazları ön izin/irtifak/kullanma izni", oran: 0.00948, tip: "oran" },
                { value: "gayrimenkul_satis_vaadi", label: "Gayrimenkul satış vaadi sözleşmeleri", oran: 0, tip: "oran" },
                { value: "ihale_sozlesme", label: "Resmi daire ihale sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "taksitli_satis", label: "Taksitle satış sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "devre_tatil", label: "Devre tatil/uzun süreli tatil hizmeti sözleşmeleri", oran: 0, tip: "oran" },
                { value: "abonelik", label: "Abonelik sözleşmeleri", oran: 0, tip: "oran" },
                { value: "turist_rehberligi", label: "Turist rehberliği sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "elektrik_toptan", label: "Toptan elektrik satış sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "elektrik_perakende", label: "Perakende elektrik satış sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "dogalgaz_toptan", label: "Toptan doğal gaz satış sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "dogalgaz_tuketici", label: "Tüketiciye doğal gaz satış sözleşmeleri", oran: 0.00948, tip: "oran" },
                { value: "kat_karsiligi_insaat", label: "Kat karşılığı/hasılat paylaşımı inşaat sözleşmeleri", oran: 0, tip: "oran" },
                { value: "danismanlik", label: "Danışmanlık hizmet sözleşmeleri (kat karşılığı inşaat)", oran: 0, tip: "oran" },
                { value: "yapi_denetim", label: "Yapı denetimi hizmet sözleşmeleri", oran: 0, tip: "oran" },
                { value: "tahkim_maktu", label: "Tahkimnameler (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
                { value: "sulh_maktu", label: "Sulhnameler (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
                { value: "turizm_kontenjan", label: "Turizm kontenjan sözleşmeleri", oran: 3783.20, tip: "maktu" },
                { value: "meclis_karar_oran", label: "Meclis/hakem kararları (belli parayı ihtiva eden)", oran: 0.00948, tip: "oran" },
                { value: "meclis_karar_maktu", label: "Meclis/hakem kararları (belli parayı ihtiva etmeyen)", oran: 672.40, tip: "maktu" },
                { value: "ihale_karar", label: "Resmi daire ihale kararları", oran: 0.00569, tip: "oran" },
                { value: "makbuz_mal_hizmet", label: "Mal/hizmet alımı makbuzları", oran: 0.00948, tip: "oran" },
                { value: "makbuz_ucret", label: "Ücret/maaş vb. makbuzlar", oran: 0.00759, tip: "oran" },
                { value: "makbuz_odunc", label: "Ödünç alınan para makbuzları", oran: 0.00759, tip: "oran" },
                { value: "makbuz_icra", label: "İcra dairesi makbuzları", oran: 0.00759, tip: "oran" },
                { value: "beyanname_gelir", label: "Yıllık gelir vergisi beyannamesi", oran: 672.40, tip: "maktu" },
                { value: "beyanname_kurum", label: "Kurumlar vergisi beyannamesi", oran: 898.20, tip: "maktu" },
                { value: "beyanname_kdv", label: "Katma değer vergisi beyannamesi", oran: 443.70, tip: "maktu" },
                { value: "beyanname_muhtasar", label: "Muhtasar beyannameler", oran: 443.70, tip: "maktu" },
                { value: "beyanname_diger", label: "Diğer vergi beyannameleri", oran: 443.70, tip: "maktu" },
                { value: "beyanname_gumruk", label: "Gümrük beyannameleri", oran: 898.20, tip: "maktu" },
                { value: "beyanname_belediye", label: "Belediye/il özel idare beyannameleri", oran: 329.30, tip: "maktu" },
                { value: "beyanname_sgk", label: "SGK prim bildirgeleri/birleşik beyannameler", oran: 526.00, tip: "maktu" },
                { value: "suret_tercume", label: "Özet, suret ve tercümeler", oran: 4.80, tip: "maktu" }
            ];

            const kagitTuruSelect = document.getElementById('damgaKagitTuru');
            const matrahGroup = document.getElementById('damgaMatrahGroup');
            const matrahInput = document.getElementById('damgaMatrah');
            const hesaplaBtn = document.getElementById('damgaHesaplaBtn');
            const temizleBtn = document.getElementById('damgaTemizleBtn');
            const resultDiv = document.getElementById('damgaResult');
            const uyariDiv = document.getElementById('damgaUyariContainer');
            const pdfBtnContainer = document.getElementById('pdfCikarBtnContainer');
            const pdfBtn = document.getElementById('pdfCikarBtn');

            if (!kagitTuruSelect || !matrahGroup || !matrahInput || !hesaplaBtn || !temizleBtn || !resultDiv) return;

            kagitTuruSelect.addEventListener('change', function() {
                const kagit = kagitlar.find(k => k.value === this.value);
                if (kagit && kagit.tip === 'maktu') {
                    matrahGroup.style.display = 'none';
                } else {
                    matrahGroup.style.display = '';
                }
            });

            hesaplaBtn.onclick = function() {
                const kagitTuru = kagitTuruSelect.value;
                const kagit = kagitlar.find(k => k.value === kagitTuru);
                const matrah = parseFloat(matrahInput.value);
                if (!kagitTuru) {
                    resultDiv.innerHTML = `
                        <div class="tapu-hesaplama-sonuc">
                            <div class="sonuc-detay">
                                <div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen kağıt türünü seçiniz.</span></div>
                            </div>
                        </div>
                    `;
                    uyariDiv.innerHTML = '';
                    return;
                }
                if (kagit.tip === 'maktu') {
                    resultDiv.innerHTML = `
                        <div class="tapu-hesaplama-sonuc" style="margin-bottom:24px;">
                            <h4>SADECE SONUÇ</h4>
                            <div class="sonuc-detay">
                                <div class="sonuc-satir"><span class="label">Kağıt Türü</span><span class="value">${kagit.label}</span></div>
                                <div class="sonuc-satir toplam"><span class="label">Damga Vergisi</span><span class="value">${kagit.oran.toLocaleString('tr-TR', {minimumFractionDigits:2})} TL</span></div>
                            </div>
                        </div>
                    `;
                } else {
                    if (isNaN(matrah) || matrah <= 0) {
                        resultDiv.innerHTML = `
                            <div class="tapu-hesaplama-sonuc">
                                <div class="sonuc-detay">
                                    <div class="sonuc-satir error"><span class="label">Hata</span><span class="value">Lütfen geçerli bir brüt tutar giriniz.</span></div>
                                </div>
                            </div>
                        `;
                        uyariDiv.innerHTML = '';
                        return;
                    }
                    const tutar = kagit.oran * matrah;
                    resultDiv.innerHTML = `
                        <div class="tapu-hesaplama-sonuc" style="margin-bottom:24px;">
                            <h4>Damga Vergisi Hesaplama Sonucu</h4>
                            <div class="sonuc-detay">
                                <div class="sonuc-satir"><span class="label">Kağıt Türü</span><span class="value">${kagit.label}</span></div>
                                <div class="sonuc-satir"><span class="label">Brüt Tutar</span><span class="value">${matrah.toLocaleString('tr-TR', {minimumFractionDigits:2})} TL</span></div>
                                <div class="sonuc-satir toplam"><span class="label">Damga Vergisi</span><span class="value">${tutar.toLocaleString('tr-TR', {minimumFractionDigits:2})} TL</span></div>
                            </div>
                            <div class="uyari" style="margin-top:0;">
                                <p>
                                    <strong>Not:</strong> Damga vergisi oran ve tutarları, <u>2025 yılı Damga Vergisi Kanunu Genel Tebliği</u> ve Resmi Gazete verilerine göre hesaplanmaktadır. Yasal değişiklikler ve güncellemeler için lütfen Resmi Gazete'yi ve Gelir İdaresi Başkanlığı'nı takip ediniz.
                                </p>
                            </div>
                        </div>
                        <style>
                            .uyari p {
                                text-align:left;
                                color: black;
                            }
                        </style>
                    `;
                }
                // PDF Olarak Kaydet butonunu göster
                if (pdfBtnContainer) pdfBtnContainer.style.display = 'flex';
            };

            temizleBtn.onclick = function() {
                kagitTuruSelect.value = '';
                matrahInput.value = '';
                resultDiv.innerHTML = '';
                uyariDiv.innerHTML = '';
                matrahGroup.style.display = '';
                if (pdfBtnContainer) pdfBtnContainer.style.display = 'none';
            };

            if (pdfBtn) {
                pdfBtn.onclick = () => {
                    const resultDiv = document.getElementById('damgaResult');
                    const htmlContent = resultDiv ? resultDiv.innerHTML : '';
                    const tarih = new Date().toLocaleDateString('tr-TR');
                    PdfCikar.showPdfModal(htmlContent, tarih);
                };
            }
        }, 0);
    }
}

window.DamgaVergisiHesaplama = DamgaVergisiHesaplama;
