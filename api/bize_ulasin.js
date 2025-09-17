const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email, message } = req.body;
    if (!email || !message) return res.status(400).json({ error: 'Eksik veri' });

    // SMTP ayarları (örnek: Gmail)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'caissalabs@gmail.com',
            pass: 'GMAIL_APP_PASSWORD' // Gmail için uygulama şifresi kullanın
        }
    });

    try {
        await transporter.sendMail({
            from: email,
            to: 'caissalabs@gmail.com',
            subject: 'e-HAKS Kullanıcı Mesajı',
            text: `Gönderen: ${email}\n\n${message}`
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Mail gönderilemedi' });
    }
});

module.exports = router;
