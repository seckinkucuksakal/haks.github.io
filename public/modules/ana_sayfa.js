class AnaSayfa {
    async getContent() {
        let sorgulamaSayisi = '...';
        try {
            const res = await fetch('/api/sorgulama_sayisi');
            const data = await res.json();
            sorgulamaSayisi = data.toplam;
        } catch (err) {
            sorgulamaSayisi = '<span style="color:red;">Sorgulama sayısı alınamadı</span>';
        }
        return `
            <div class="ana-sayfa-container" style="max-width:600px;margin:auto;padding:40px 24px 32px 24px;background:rgba(255,255,255,0.97);border-radius:18px;box-shadow:0 4px 24px rgba(0,0,0,0.07);text-align:center;">
                <h2 style="color:#007bff;font-size:2rem;font-weight:600;margin-bottom:12px;">e-HAKS</h2>
                <h3 style="color:#007bff;font-size:2rem;font-weight:600;margin-bottom:12px;">Hoş Geldiniz</h3>
                <div style="font-size:1.15rem;color:#222;font-weight:500;margin-bottom:18px;">
                    <span style="font-style:italic;color:#007bff;">"AKILLI OLANLAR TÜRKİYE'Yİ TERK ETTİ GİTTİ, AKLI OLMAYANLAR BURADA TUZAĞA DÜŞTÜ..."<br></span>
                    <span style="font-style:italic;color:#007bff;">Not: Buraya Slogan Gelecek...</span>
                </div>
                <p style="font-size:1rem;color:black;margin-bottom:24px;">
                    Devam etmek için soldaki dilediğiniz kalemi seçerek hesaplama veya sorgu yapabilirsiniz.
                </p>
                <div style="margin-top:24px;display:flex;justify-content:center;align-items:center;">
                    <div class="bombeli-sorgu-box">
                        <span class="yesil-top"></span>
                        <span style="font-size:1.1rem;color:#007bff;font-weight:600;">e-HAKS Toplam Sorgulama Sayısı:</span>
                        <span id="sorgulamaSayisi" style="font-size:1.3rem;margin-left:8px;">${sorgulamaSayisi}</span>
                    </div>
                </div>
            </div>
            <style>
                .bombeli-sorgu-box {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: linear-gradient(90deg, #e3f6ff 0%, #f0fff0 100%);
                    border-radius: 32px;
                    border: 3px solid #007bff;
                    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
                    padding: 16px 32px;
                    margin-bottom: 0;
                    font-size: 1.15rem;
                    font-weight: 600;
                }
                .yesil-top {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #2ecc40;
                    margin-left: 8px;
                    box-shadow: 0 0 8px #2ecc40;
                    animation: yanipSonme 1.2s infinite;
                }
                @keyframes yanipSonme {
                    0% { opacity: 1; box-shadow: 0 0 8px #2ecc40; }
                    50% { opacity: 0.3; box-shadow: 0 0 18px #2ecc40; }
                    100% { opacity: 1; box-shadow: 0 0 8px #2ecc40; }
                }
            </style>
        `;
    }
}

window.AnaSayfa = AnaSayfa;

