// PDF Olarak Kaydet modülü - fonksiyonlar daha sonra eklenecek
class PdfCikar {
    static showPdfModal(htmlContent, sorgulamaTarihi = '') {
        // Modalı oluştur
        let modal = document.getElementById('pdfModal');
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = 'pdfModal';
        // Tarih ve saat bilgisini oluştur
        const now = new Date();
        const tarihSaatStr = sorgulamaTarihi
            ? `${sorgulamaTarihi} ${now.toLocaleTimeString('tr-TR')}`
            : now.toLocaleString('tr-TR');
        modal.innerHTML = `
            <div class="pdf-modal-overlay"></div>
            <div class="pdf-modal-content">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <h3 style="margin:0;color:#007bff;">PDF Önizleme</h3>
                    <button id="pdfModalCloseBtn" style="background:none;border:none;font-size:1.5rem;cursor:pointer;">×</button>
                </div>
                <div id="pdfModalTable" style="margin-top:18px;">${htmlContent}</div>
                <div style="margin-top:18px;text-align:right;font-size:0.95rem;color:#333;">
                    Sorgulama tarihi ve saati: ${tarihSaatStr}
                </div>
                <div style="margin-top:24px;text-align:center;">
                    <button id="pdfPrintBtn" style="padding:10px 24px;font-size:1rem;background:#007bff;color:#fff;border:none;border-radius:6px;cursor:pointer;">PDF Olarak Yazdır / İndir</button>
                </div>
            </div>
            <style>
                #pdfModal {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pdf-modal-overlay {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.25);
                }
                .pdf-modal-content {
                    position: relative;
                    background: #fff;
                    border-radius: 18px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.13);
                    padding: 32px 28px 24px 28px;
                    max-width: 700px;
                    width: 95vw;
                    max-height: 90vh;
                    overflow-y: auto;
                }
            </style>
        `;
        document.body.appendChild(modal);

        document.getElementById('pdfModalCloseBtn').onclick = () => modal.remove();
        document.querySelector('.pdf-modal-overlay').onclick = () => modal.remove();

        document.getElementById('pdfPrintBtn').onclick = () => {
            let fullContent = htmlContent;
            // Saat ve tarih bilgisini al
            const now = new Date();
            const tarihSaat = now.toLocaleString('tr-TR');
            const filigranlar = `
                <div class="ehaks-filigran" style="top:20%;left:20%;">
                    ehaks.com<br>
                    <span style="font-size:1.2rem;">${tarihSaat}</span>
                </div>
                <div class="ehaks-filigran" style="top:80%;left:20%;">ehaks.com</div>
                <div class="ehaks-filigran" style="top:20%;left:80%;">ehaks.com</div>
                <div class="ehaks-filigran" style="top:80%;left:80%;">ehaks.com</div>
            `;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>e-HAKS Hesaplama/Sorgulama Raporu</title>
                    <style>
                        body { background: #fff; font-family: Arial, sans-serif; position: relative; }
                        .pdf-report-title {
                            text-align: center;
                            font-size: 2rem;
                            font-weight: bold;
                            color: #007bff;
                            margin-bottom: 32px;
                        }
                        .tapu-hesaplama-sonuc {
                            background: #fff;
                            border-radius: 10px;
                            border: 1px solid #007bff;
                            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                            padding: 20px;
                            margin-bottom: 48px; /* kutu ile footer arasında boşluk */
                        }
                        .cezaevi-sonuc-container { max-height: none !important; overflow: visible !important; }
                        .il-grup { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                        .kurum-detay { margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; page-break-inside: avoid; }
                        .sonuc-satir { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
                        .sonuc-satir .label { font-weight: bold; color: #333; }
                        .sonuc-satir .value { color: #007bff; }
                        h4, h5 { color: #007bff; }
                        .uyari { margin-top: 10px; font-size: 0.95rem; color: #333; }
                        .ehaks-filigran {
                            position: fixed;
                            transform: translate(-50%, -50%) rotate(-30deg);
                            font-size: 3rem;
                            color: rgba(0,0,0,0.10);
                            font-weight: bold;
                            z-index: 9999;
                            pointer-events: none;
                            user-select: none;
                            white-space: nowrap;
                            text-align: center;
                        }
                        footer {
                            position: relative;
                            margin: 0 auto;
                            max-width: 700px;
                            width: 95vw;
                            text-align: left;
                            font-size: 1rem;
                            color: #000;
                            background: transparent;
                            padding: 8px 24px 8px 24px;
                            z-index: 10000;
                            white-space: pre-line;
                            line-height: 1.5;
                        }
                        @media print {
                            .ehaks-filigran {
                                position: fixed !important;
                                transform: translate(-50%, -50%) rotate(-30deg) !important;
                                font-size: 3rem !important;
                                color: rgba(0,0,0,0.10) !important;
                                font-weight: bold !important;
                                z-index: 9999 !important;
                                pointer-events: none !important;
                                user-select: none !important;
                                white-space: nowrap !important;
                                text-align: center !important;
                            }
                            footer {
                                position: relative !important;
                                margin: 0 auto !important;
                                max-width: 700px !important;
                                width: 95vw !important;
                                text-align: left !important;
                                font-size: 1rem !important;
                                color: #000 !important;
                                background: transparent !important;
                                padding: 8px 24px 8px 24px !important;
                                z-index: 10000 !important;
                                white-space: pre-line !important;
                                line-height: 1.5 !important;
                                text-align: justify !important;
                            }
                            .kurum-detay {
                                page-break-inside: avoid !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <h1 class="pdf-report-title">e-HAKS Hesaplama/Sorgulama Raporu</h1>
                    ${filigranlar}
                    ${fullContent}
                    <div class="uyari">Sorgulama tarihi ve saati: ${tarihSaatStr}</div>
                    <footer>
                        <div style="font-weight:bold; text-align:left; margin-bottom:4px;">Önemli Uyarı:</div>
                        <div class="footer-content">
                            Sitemizde yer alan bilgiler sadece genel bilgilendirme amaçlıdır. Hesaplama veya sorgulama sonuçları profesyonel tavsiye veya hizmet niteliğinde değildir. Mali yahut hukuki durumunuzu etkileyecek kararlar almadan önce ilgili alanda danışma hizmeti veren profesyonel uzmanlara danışılması önemle tavsiye olunur. e-HAKS, bu sitede yer alan bilgilerin üçüncü kişiler tarafından kullanılması halinde ortaya çıkabilecek <strong>zarar veya ziyandan sorumlu değildir.</strong>
                        </div>
                    </footer>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.document.title = 'e-HAKS Hesaplama/Sorgulama Raporu';
            printWindow.focus();
            printWindow.print();
        };
    }
}

window.PdfCikar = PdfCikar;

// Not: PDF çıktısının en altında görünen "about:blank" yazısı tarayıcı veya yazıcı ayarlarından kaynaklanır.
// Bunu kod ile kaldırmak mümkün değildir. Yazdırma ekranında "Header/Footer" kapatılırsa görünmez.

