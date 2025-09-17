class AnaSayfa {
    getContent() {
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
            </div>
        `;
    }
}
window.AnaSayfa = AnaSayfa;
