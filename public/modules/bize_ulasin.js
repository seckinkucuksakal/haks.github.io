class BizeUlasin {
    getContent() {
        return `
            <div class="bize-ulasin-container" style="max-width:500px;margin:auto;padding:40px 24px 32px 24px;background:rgba(255,255,255,0.98);border-radius:20px;box-shadow:0 6px 32px rgba(0,123,255,0.08);">
                <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:24px;">
                    <h2 style="font-size:1.7rem;color:#007bff;margin:0;text-align:center;font-weight:600;">Bize Ulaşın</h2>
                </div>
                <form id="bizeUlasinForm" style="margin-top:16px;display:flex;flex-direction:column;gap:18px;">
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        <label for="userEmail" style="font-weight:500;color:#222;">E-posta Adresiniz</label>
                        <input type="email" id="userEmail" required placeholder="ornek@eposta.com" style="width:100%;padding:12px;border-radius:8px;border:1px solid #cfd8dc;font-size:1rem;background:#f7fafd;">
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        <label for="userPhone" style="font-weight:500;color:#222;">Telefon Numaranız</label>
                        <input type="tel" id="userPhone" required pattern="^\\+?\\d{10,15}$" placeholder="+90 5xx xxx xx xx" style="width:100%;padding:12px;border-radius:8px;border:1px solid #cfd8dc;font-size:1rem;background:#f7fafd;">
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px;">
                        <label for="userMessage" style="font-weight:500;color:#222;">Mesajınız</label>
                        <textarea id="userMessage" required placeholder="Mesajınızı buraya yazınız..." style="width:100%;height:110px;padding:12px;border-radius:8px;border:1px solid #cfd8dc;font-size:1rem;background:#f7fafd;resize:vertical;"></textarea>
                    </div>
                    <button type="submit" style="width:100%;padding:14px;background:linear-gradient(90deg,#007bff 60%,#6ab0fb 100%);color:white;border:none;border-radius:8px;font-size:1.08rem;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(0,123,255,0.08);transition:background 0.2s;">Gönder</button>
                </form>
                <div id="bizeUlasinSuccess" style="display:none;margin-top:22px;color:#28a745;font-weight:500;text-align:center;font-size:1.1rem;">
                    Mesajınız için teşekkürler! En kısa sürede dönüş yapılacaktır.
                </div>
            </div>
            <script>
                document.getElementById('bizeUlasinForm').onsubmit = function(e) {
                    e.preventDefault();
                    var email = document.getElementById('userEmail').value.trim();
                    var phone = document.getElementById('userPhone').value.trim();
                    var message = document.getElementById('userMessage').value.trim();
                    if (!email || !phone || !message) return;
                    var mailBody = 'Gönderen: ' + email + '\\nTelefon: ' + phone + '\\n\\n' + message;
                    var mailto = 'mailto:caissalabs@gmail.com'
                        + '?subject=' + encodeURIComponent('e-HAKS Kullanıcı Mesajı')
                        + '&body=' + encodeURIComponent(mailBody);
                    window.location.href = mailto;
                    document.getElementById('bizeUlasinSuccess').style.display = 'block';
                };
            </script>
        `;
    }
}
window.BizeUlasin = BizeUlasin;
