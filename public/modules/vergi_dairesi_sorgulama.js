class VergiDairesiSorgulama {
    constructor() {
        // Vergi dairesi sorgulama için gerekli veriler buraya eklenecek
    }

    getTabContent() {
        return `
            <h3>Vergi Dairesi Sorgulama</h3>
            <div class="plaka-container">
                <p style="text-align: center; color: #666; margin-top: 50px;">İçerik bulunamadı.</p>
            </div>
        `;
    }

    initialize() {
        console.log('Vergi Dairesi Sorgulama modülü başlatıldı');
    }
}

// Export for use in main script
window.VergiDairesiSorgulama = VergiDairesiSorgulama;
