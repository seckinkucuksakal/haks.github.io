class Hakkimizda {
    getContent() {
        return `
            <div class="hakkimizda-container" style="max-width:700px;margin:auto;padding:40px 24px 32px 24px;background:rgba(255,255,255,0.95);border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);">
                <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;">
                    <h2 style="font-size:2rem;color:#007bff;margin:0;text-align:center;font-weight:600;">Hakkımızda</h2>
                </div>
                <div class="hakkimizda-text" style="text-align:left;">
                    <p>
                        <strong><strong>e-HAKS</strong></strong> (e-Hesaplayıcı ve Açık Kaynak Sorgulayıcısı), özellikle hukuki ve kamusal alanda ihtiyaç duyulan çeşitli hesaplamalar ve sorgulamalar üzerine yoğunlaşmaktadır. Söz konusu işlemler açık kaynaklarda bulunsa da dağınık halde olduğundan, kullanıcılarda çokça kafa karışıklığı yaratmaktadır. <strong>e-HAKS</strong>, bu hesaplama ve sorgulama kalemlerini tek çatı altına toplayarak kafa karışıklığını engelleme ve özelikle hukuk ve kamu alanında görev alan kişiler olmak üzere tüm vatandaşlara söz konusu hesaplamalar ve sorgulamaların yapımında kolaylık sağlamayı amaçlamaktadır. Fakat, ülkemizde bu alanlarda sürekli değişiklik yapılması <strong>e-HAKS</strong>'ın da hata yapabilmesi ihtimalini doğurmaktadır. Bu sebeple kullanıcıların, <strong>e-HAKS</strong> hesaplama ve sorgulamalarının teyide muhtaç olduğunu bilmesi önem arz etmektedir. 
                    </p>
                    <p>
                        Yukarıda da değinildiği gibi <strong>e-HAKS</strong>, yapılan hesaplama ve sorgulamalarda en doğru sonucu almak üzere optimize edilmiştir. Örneğin; internet üzerinde yapılan tapu harcı hesaplamalarının hemen hemen hiçbirinde döner sermaye ücreti hesaba dahil edilmez. Bunun sebebi döner sermaye harcının ülkemizin her ilçesi için farklı bir katsayı ile çarpılması suretiyle hesaplanmasıdır. Bu katsayılar belirli aralıklarla ve özellikle devlet politikasının gereklerine göre değiştiği için düzenli takibi zor olacaktır. <strong>e-HAKS</strong> bunun aksine, kullanıcıyı yaptığı hesaplamada döner sermaye harcının da olduğu ve bunun miktarının ne olduğu konusunda da bilgilendirmeyi amaçlamaktadır. Fakat yukarıda bahsettiğimiz sebeplerden dolayı ani değişimlerde <strong>e-HAKS</strong> da yanılabilir. 
                    </p>
                    <p>
                        <strong><strong>e-HAKS</strong></strong>, Sorgulamalar ise günlük hayatta çoğu kez araştırılan ancak internette dağınık şekilde olan bilgilerin yeknesaklaştırılarak kullanıcıya sunulmasını sağlar. Bunlar herhangi bir hesap işlemi içermemekle birlikte, genellikle kullanıcıların girdilerine göre aranılan bilgi çıktısını sunar. 
                    </p>
                    <div style="background:rgba(106,176,251,0.08);padding:18px 16px;border-radius:10px;margin:24px 0;">
                        <span style="color:#007bff;font-weight:500;">Geri Bildirim:</span>
                        <span style="color:#222;font-weight:500;">
                            Sayın kullanıcılarımızın geri bildirimlerinin bizim için çok önemli olduğunu belirtmek isteriz. Hesaplama ve sorgulama sonuçlarında hata olduğunu düşünüyorsanız, lütfen bize
                        </span>
                        <a href="mailto:caissalabs@gmail.com" style="color:#007bff;text-decoration:underline;font-weight:500;">caissalabs@gmail.com</a>
                        <span style="color:#222;font-weight:500;"> mail adresimizden veya </span>
                        <a href="/bize-ulasin" style="color:#007bff;text-decoration:underline;font-weight:500;">Bize Ulaşın</a>
                        <span style="color:#222;font-weight:500;"> linkinden ulaşınız.</span>
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