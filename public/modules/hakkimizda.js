class Hakkimizda {
    getContent() {
        return `
            <div class="hakkimizda-container" style="max-width:700px;margin:auto;padding:40px 24px 32px 24px;background:rgba(255,255,255,0.95);border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
                <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;">
                    <h2 style="font-size:2rem;color:#007bff;margin:0;text-align:center;font-weight:600;">Hakkımızda</h2>
                </div>
                <div class="hakkimizda-text" style="text-align:left;">
                    <p>
                        <strong>e-HAKS</strong> (e-Hesaplayıcı ve Açık Kaynak Sorgulayıcısı), özellikle hukuki ve kamusal alanda ihtiyaç duyulan çeşitli hesaplamalar ve sorgulamalar üzerine yoğunlaşır. Açık kaynaklarda dağınık halde bulunan işlemler, kullanıcıda kafa karışıklığı yaratabilir. <strong>e-HAKS</strong>, bu hesaplama ve sorgulama kalemlerini tek çatı altında toplayarak kafa karışıklığını engellemeyi ve özellikle hukuk/kamu alanında görev alan kişiler başta olmak üzere tüm vatandaşlara kolaylık sağlamayı amaçlar.
                    </p>
                    <p>
                        Ülkemizde bu alanlarda sürekli değişiklik yapılması, <strong>e-HAKS</strong>'ın da hata yapabilmesi ihtimalini doğurur. Bu sebeple kullanıcıların, <strong>e-HAKS</strong> hesaplama ve sorgulamalarının teyide muhtaç olduğunu bilmesi önemlidir.
                    </p>
                    <p>
                        <strong>e-HAKS</strong>, yapılan hesaplama ve sorgulamalarda en doğru sonucu vermek üzere optimize edilmiştir. Örneğin; internet üzerindeki tapu harcı hesaplamalarının çoğunda döner sermaye ücreti hesaba katılmaz. Oysa <strong>e-HAKS</strong>, kullanıcıya döner sermaye harcını ve miktarını da gösterir. Ancak ani değişimlerde <strong>e-HAKS</strong> da yanılabilir.
                    </p>
                    <p>
                        Sorgulamalar ise internette dağınık şekilde olan bilgilerin derlenip, kullanıcıya sade ve anlaşılır biçimde sunulmasını sağlar. Hesaplama işlemi içermeyen, genellikle bilgi çıktısı sunan sorgulamalar da günlük hayatta sıkça kullanılır.
                    </p>
                    <div style="background:rgba(106,176,251,0.08);padding:18px 16px;border-radius:10px;margin:24px 0;">
                        <span style="color:#007bff;font-weight:500;">Geri Bildirim:</span>
                        <span style="color:#222;font-weight:500;">
                            Hesaplama ve sorgulama sonuçlarında hata olduğunu düşünüyorsanız, lütfen bize
                        </span>
                        <a href="mailto:caissalabs@gmail.com" style="color:#007bff;text-decoration:underline;font-weight:500;">caissalabs@gmail.com</a>
                        <span style="color:#222;font-weight:500;"> mail adresimizden veya </span>
                        <a href="/bize-ulasin" style="color:#007bff;text-decoration:underline;font-weight:500;">Bize Ulaşın</a>
                        <span style="color:#222;font-weight:500;"> linkinden ulaşabilirsiniz.</span>
                    </div>
                </div>
                <div style="margin-top:32px;text-align:left;color:#222;font-size:1rem;font-weight:500;text-align:center;">
                    e-HAKS Geliştirme Ekibi
                </div>
            </div>
            <style>
                .hakkimizda-text p {
                    color: #222;
                    text-align: justify;
                    font-weight: 500;
                    margin-bottom: 18px;
                }
                .hakkimizda-container h2 {
                    text-align: center;
                    font-weight: 600;
                }
            </style>
        `;
    }
}

window.Hakkimizda = Hakkimizda;