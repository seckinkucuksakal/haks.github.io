// PDF Olarak Kaydet modülü - fonksiyonlar daha sonra eklenecek
class PdfCikar {
    static showPdfModal(htmlContent, sorgulamaTarihi = '') {
        // Modalı oluştur
        let modal = document.getElementById('pdfModal');
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = 'pdfModal';
        modal.innerHTML = `
            <div class="pdf-modal-overlay"></div>
            <div class="pdf-modal-content">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <h3 style="margin:0;color:#007bff;">PDF Önizleme</h3>
                    <button id="pdfModalCloseBtn" style="background:none;border:none;font-size:1.5rem;cursor:pointer;">×</button>
                </div>
                <div id="pdfModalTable" style="margin-top:18px;">${htmlContent}</div>
                <div style="margin-top:18px;text-align:right;font-size:0.95rem;color:#333;">
                    Sorgulama tarihi: ${sorgulamaTarihi}
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
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head>
                    <title>e-HAKS Hesaplama/Sorgulama Raporu</title>
                    <style>
                        body { background: #fff; font-family: Arial, sans-serif; position: relative; }
                        .tapu-hesaplama-sonuc { background: #fff; border-radius: 10px; border: 1px solid #007bff; box-shadow: 0 3px 10px rgba(0,0,0,0.1); padding: 20px; }
                        .cezaevi-sonuc-container { max-height: none !important; overflow: visible !important; }
                        .il-grup { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                        .kurum-detay { margin-bottom: 15px; padding: 10px; background-color: #f8f9fa; border-radius: 4px; }
                        .sonuc-satir { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #eee; }
                        .sonuc-satir .label { font-weight: bold; color: #333; }
                        .sonuc-satir .value { color: #007bff; }
                        h4, h5 { color: #007bff; }
                        .uyari { margin-top: 10px; font-size: 0.95rem; color: #333; }
                        .ehaks-filigran {
                            position: fixed;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%) rotate(-30deg);
                            font-size: 6rem;
                            color: rgba(0,0,0,0.10);
                            font-weight: bold;
                            z-index: 9999;
                            pointer-events: none;
                            user-select: none;
                            white-space: nowrap;
                        }
                        @media print {
                            .ehaks-filigran {
                                position: fixed !important;
                                top: 50% !important;
                                left: 50% !important;
                                transform: translate(-50%, -50%) rotate(-30deg) !important;
                                font-size: 6rem !important;
                                color: rgba(0,0,0,0.10) !important;
                                font-weight: bold !important;
                                z-index: 9999 !important;
                                pointer-events: none !important;
                                user-select: none !important;
                                white-space: nowrap !important;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="ehaks-filigran">ehaks.com</div>
                    ${fullContent}
                    <div class="uyari">Sorgulama tarihi: ${sorgulamaTarihi}</div>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        };
    }
}

window.PdfCikar = PdfCikar;
