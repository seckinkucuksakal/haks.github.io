document.addEventListener('DOMContentLoaded', function() {
    console.log('HAKS loaded successfully');
    
    // Get DOM elements once
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const leftContainer = document.getElementById('leftContainer');
    const backBtn = document.getElementById('backBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const forwardOverlay = document.getElementById('forwardOverlay');
    const resizer = document.querySelector('.resizer');
    const rightContainer = document.querySelector('.right-container');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const homeBtn = document.getElementById('homeBtn');
    const hakkimizdaBtn = document.getElementById('hakkimizdaBtn');
    const infoBtn = document.getElementById('infoBtn');
    const flagBtn = document.getElementById('flagBtn');
    
    // State variables
    let isMobileMenuOpen = false;
    let isLeftContainerVisible = true;
    let isResizing = false;
    
    // Mobile menu functionality
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            isMobileMenuOpen = !isMobileMenuOpen;
            
            if (isMobileMenuOpen) {
                leftContainer.classList.add('mobile-open');
                mobileMenuBtn.classList.add('active');
            } else {
                leftContainer.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
    
    // Forward and back button functionality (desktop only)
    if (backBtn && forwardBtn && window.innerWidth > 768) {
        backBtn.addEventListener('click', function() {
            console.log('Back button clicked - hiding left container');
            leftContainer.style.transform = 'translateX(-100%)';
            leftContainer.style.opacity = '0';
            leftContainer.style.position = 'absolute';
            resizer.style.display = 'none';
            rightContainer.style.width = '100%';
            rightContainer.style.flex = 'none';
            forwardOverlay.classList.add('show');
            isLeftContainerVisible = false;
            document.querySelector('.left-content').style.pointerEvents = 'none';
            document.querySelector('.left-content').style.opacity = '0.3';
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.style.pointerEvents = 'none';
                btn.style.opacity = '0.3';
            });
            document.querySelector('.scrollable-container').style.overflowY = 'hidden';
        });
        
        forwardBtn.addEventListener('click', function() {
            console.log('Forward button clicked - showing left container');
            leftContainer.style.transform = 'translateX(0)';
            leftContainer.style.opacity = '1';
            leftContainer.style.position = 'static';
            resizer.style.display = 'block';
            rightContainer.style.width = '';
            rightContainer.style.flex = '1';
            forwardOverlay.classList.remove('show');
            isLeftContainerVisible = true;
            document.querySelector('.left-content').style.pointerEvents = '';
            document.querySelector('.left-content').style.opacity = '';
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.style.pointerEvents = '';
                btn.style.opacity = '';
            });
            document.querySelector('.scrollable-container').style.overflowY = 'auto';
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && isMobileMenuOpen) {
            if (!leftContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                leftContainer.classList.remove('mobile-open');
                mobileMenuBtn.classList.remove('active');
                isMobileMenuOpen = false;
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            leftContainer.classList.remove('mobile-open');
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
            isMobileMenuOpen = false;
        }
    });
    
    // Resizer functionality (desktop only)
    if (resizer && window.innerWidth > 768) {
        resizer.addEventListener('mousedown', function(e) {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isResizing || window.innerWidth <= 768) return;
            
            const containerRect = document.querySelector('.main-content').getBoundingClientRect();
            const leftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
            
            if (leftWidth >= 15 && leftWidth <= 70) {
                leftContainer.style.width = leftWidth + '%';
            }
        });
        
        document.addEventListener('mouseup', function() {
            isResizing = false;
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        });
    }
    
    // Search functionality
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            console.log('Searching for:', searchTerm);
            
            if (searchTerm) {
                filterTabs(searchTerm);
            } else {
                showAllTabs();
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
        
        // Real-time search as user types with Turkish character support
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm === '') {
                showAllTabs();
            } else {
                filterTabs(searchTerm);
            }
        });
    }
    
    // Turkish character normalization function
    function normalizeTurkish(text) {
        return text.toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/İ/g, 'i')  // Büyük İ harfi
            .replace(/Ğ/g, 'g')
            .replace(/Ü/g, 'u')
            .replace(/Ş/g, 's')
            .replace(/Ö/g, 'o')
            .replace(/Ç/g, 'c');
    }

    // Enhanced Turkish search function
    function createSearchVariants(text) {
        const normalized = normalizeTurkish(text);
        const variants = [
            text.toLowerCase(),
            normalized,
            text.toLowerCase().replace(/i/g, 'İ').toLowerCase(), // i -> İ -> i conversion
            text.toLowerCase().replace(/i/g, 'ı'), // i -> ı conversion
        ];
        return [...new Set(variants)]; // Remove duplicates
    }

    // Search filter functions
    function filterTabs(searchTerm) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const leftContent = document.querySelector('.left-content');
        let foundMatch = false;
        let matchingContent = '';
        
        // Create search variants for comprehensive matching
        const searchVariants = createSearchVariants(searchTerm);
        
        tabButtons.forEach(button => {
            const tabText = button.textContent;
            const tabVariants = createSearchVariants(tabText);
            
            // Check if any search variant matches any tab text variant
            let isMatch = false;
            for (const searchVariant of searchVariants) {
                for (const tabVariant of tabVariants) {
                    if (tabVariant.includes(searchVariant) || searchVariant.includes(tabVariant)) {
                        isMatch = true;
                        break;
                    }
                }
                if (isMatch) break;
            }
            
            // Additional check for direct substring matching
            if (!isMatch) {
                const normalizedTabText = normalizeTurkish(tabText);
                const normalizedSearchTerm = normalizeTurkish(searchTerm);
                isMatch = normalizedTabText.includes(normalizedSearchTerm) || 
                         tabText.toLowerCase().includes(searchTerm.toLowerCase());
            }
            
            if (isMatch) {
                button.style.display = 'block';
                foundMatch = true;
                
                // Add matching content to left container
                const tabName = button.textContent;
                matchingContent += `<div style="margin-bottom: 10px; padding: 8px; background: rgba(106, 176, 251, 0.1); border-radius: 4px; text-align: left; cursor: pointer;" onclick="document.querySelector('[data-tab=\\"${button.getAttribute('data-tab')}\\"]').click()">${tabName}</div>`;
            } else {
                button.style.display = 'none';
            }
        });
        
        // Show matching content in left container
        if (!matchingContent) {
            leftContent.innerHTML = '<div style="text-align: center;"><h4 style="color: #666;">Eşleşen sekme bulunamadı</h4></div>';
        }
    }
    
    function showAllTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const leftContent = document.querySelector('.left-content');
        
        tabButtons.forEach(button => {
            button.style.display = 'block';
        });
        
        // Clear left container content when showing all tabs
        leftContent.innerHTML = '';
    }

    // Initialize modules
    const ilSorgulamaModule = new IlSorgulama();
    const limanSorgulamaModule = new LimanSorgulama();
    const havalimaniSorgulamaModule = new HavalimaniSorgulama();
    const telefonAlanSorgulamaModule = new TelefonAlanSorgulama();
    const ibanSorgulamaModule = new IbanSorgulama();
    const tapuHarciHesaplamaModule = new TapuHarciHesaplama();
    const yasHesaplamaModule = new YasHesaplama();
    const ikiTarihArasiFarkModule = new IkiTarihArasiFark();
    const mirasHesaplamaModule = new MirasHesaplama();
    const cezaeviSorgulamaModule = new CezaeviSorgulama();
    const icraMudurluguSorgulamaModule = new IcraMudurluguSorgulama();
    const noterSorgulamaModule = new NoterSorgulama();
    const yillikIzinHesaplamaModule = new YillikIzinHesaplama();
    const damgaVergisiHesaplamaModule = new DamgaVergisiHesaplama();
    const yetkiliMahkemeSorgulamaModule = new YetkiliMahkemeSorgulama();
    const kiraArtisOraniHesaplamaModule = new KiraArtisOraniHesaplama();
    const ihbarTazminatiHesaplamaModule = new IhbarTazminatiHesaplama();
    const kidemTazminatiHesaplamaModule = new KidemTazminatiHesaplama();
    const fazlaCalismaMessaiUcretiHesaplamaModule = new FazlaCalismaMessaiUcretiHesaplama();
    const verasetIntikatUcretiHesaplamaModule = new VerasetIntikatUcretiHesaplama();
    const vadeliMevduatFaiziHesaplamaModule = new VadeliMevduatFaiziHesaplama();
    const gelirVergisiHesaplamaModule = new GelirVergisiHesaplama();
    const vekaletUcretiHesaplamaModule = new VekaletUcretiHesaplama();
    const postaKoduSorgulamaModule = new PostaKoduSorgulama(); // EKLENDİ
    const hakkimizdaModule = new Hakkimizda();
    const bizeUlasinModule = new BizeUlasin(); // EKLENDİ
    const anaSayfaModule = new AnaSayfa(); // EKLENDİ

    // Make cezaeviSorgulamaModule globally accessible for PDF download
    window.cezaeviSorgulamaModule = cezaeviSorgulamaModule;

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const rightContent = document.querySelector('.right-content');
    
    // Tab id ve route eşleşmesi
    const tabRoutes = {
        tab1: 'cezaevi-sorgulama',
        tab2: 'damga-vergisi-hesaplama',
        tab3: 'fazla-calisma-mesai-ucreti-hesaplama',
        tab4: 'gelir-vergisi-hesaplama',
        tab5: 'iban-sorgulama',
        tab6: 'icra-mudurlugu-sorgulama',
        tab7: 'ihbar-tazminati-hesaplama',
        tab8: 'iki-tarih-arasi-fark-hesaplama',
        tab9: 'kidem-tazminati-hesaplama',
        tab10: 'kira-artis-orani-hesaplama',
        tab11: 'miras-hesaplama',
        tab12: 'noter-sorgulama',
        tab13: 'plaka-sorgulama',
        tab14: 'posta-kodu-sorgulama',
        tab15: 'tapu-harci-hesaplama',
        tab16: 'telefon-alan-kodu-sorgulama',
        tab17: 'turkiye-liman-sorgulama',
        tab18: 'uluslararasi-havalimani-sorgulama',
        tab19: 'vadeli-mevduat-faizi-hesaplama',
        tab20: 'vekalet-ucreti-hesaplama',
        tab21: 'veraset-intikal-ucreti-hesaplama',
        tab22: 'yas-hesaplama',
        tab23: 'yetkili-mahkeme-sorgulama',
        tab24: 'yillik-izin-hesaplama'
    };

    // Route -> tab id eşleşmesi
    const routeTabs = {};
    Object.entries(tabRoutes).forEach(([tab, route]) => {
        routeTabs[route] = tab;
    });

    if (tabButtons.length > 0 && rightContent) {
        // Tab click handler
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Update right container content based on selected tab
                let content = '';
                switch(targetTab) {
                    case 'tab1': content = cezaeviSorgulamaModule.getTabContent(); break;
                    case 'tab2': content = damgaVergisiHesaplamaModule.getTabContent(); break;
                    case 'tab3': content = fazlaCalismaMessaiUcretiHesaplamaModule.getTabContent(); break;
                    case 'tab4': content = gelirVergisiHesaplamaModule.getTabContent(); break;
                    case 'tab5': content = ibanSorgulamaModule.getTabContent(); break;
                    case 'tab6': content = icraMudurluguSorgulamaModule.getTabContent(); break;
                    case 'tab7': content = ihbarTazminatiHesaplamaModule.getTabContent(); break;
                    case 'tab8': content = ikiTarihArasiFarkModule.getTabContent(); break;
                    case 'tab9': content = kidemTazminatiHesaplamaModule.getTabContent(); break;
                    case 'tab10': content = kiraArtisOraniHesaplamaModule.getTabContent(); break;
                    case 'tab11': content = mirasHesaplamaModule.getTabContent(); break;
                    case 'tab12': content = noterSorgulamaModule.getTabContent(); break;
                    case 'tab13': content = ilSorgulamaModule.getTabContent(); break;
                    case 'tab14': content = postaKoduSorgulamaModule.getTabContent(); break;
                    case 'tab15': content = tapuHarciHesaplamaModule.getTabContent(); break;
                    case 'tab16': content = telefonAlanSorgulamaModule.getTabContent(); break;
                    case 'tab17': content = limanSorgulamaModule.getTabContent(); break;
                    case 'tab18': content = havalimaniSorgulamaModule.getTabContent(); break;
                    case 'tab19': content = vadeliMevduatFaiziHesaplamaModule.getTabContent(); break;
                    case 'tab20': content = vekaletUcretiHesaplamaModule.getTabContent(); break;
                    case 'tab21': content = verasetIntikatUcretiHesaplamaModule.getTabContent(); break;
                    case 'tab22': content = yasHesaplamaModule.getTabContent(); break;
                    case 'tab23': content = yetkiliMahkemeSorgulamaModule.getTabContent(); break;
                    case 'tab24': content = yillikIzinHesaplamaModule.getTabContent(); break;
                    default: content = '<p>İçerik bulunamadı.</p>';
                }
                rightContent.innerHTML = content;
                // Initialize module functionality based on selected tab
                if (targetTab === 'tab1') {
                    cezaeviSorgulamaModule.initialize();
                } else if (targetTab === 'tab2') {
                    damgaVergisiHesaplamaModule.initialize();
                } else if (targetTab === 'tab3') {
                    fazlaCalismaMessaiUcretiHesaplamaModule.initialize();
                } else if (targetTab === 'tab4') {
                    gelirVergisiHesaplamaModule.initialize();
                } else if (targetTab === 'tab5') {
                    ibanSorgulamaModule.initialize();
                } else if (targetTab === 'tab6') {
                    icraMudurluguSorgulamaModule.initialize();
                } else if (targetTab === 'tab7') {
                    ihbarTazminatiHesaplamaModule.initialize();
                } else if (targetTab === 'tab8') {
                    ikiTarihArasiFarkModule.initialize();
                } else if (targetTab === 'tab9') {
                    kidemTazminatiHesaplamaModule.initialize();
                } else if (targetTab === 'tab10') {
                    kiraArtisOraniHesaplamaModule.initialize();
                } else if (targetTab === 'tab11') {
                    mirasHesaplamaModule.initialize();
                } else if (targetTab === 'tab12') {
                    noterSorgulamaModule.initialize();
                } else if (targetTab === 'tab13') {
                    ilSorgulamaModule.initialize();
                } else if (targetTab === 'tab14') {
                    postaKoduSorgulamaModule.initialize();
                } else if (targetTab === 'tab15') {
                    tapuHarciHesaplamaModule.initialize();
                } else if (targetTab === 'tab16') {
                    telefonAlanSorgulamaModule.initialize();
                } else if (targetTab === 'tab17') {
                    limanSorgulamaModule.initialize();
                } else if (targetTab === 'tab18') {
                    havalimaniSorgulamaModule.initialize();
                } else if (targetTab === 'tab19') {
                    vadeliMevduatFaiziHesaplamaModule.initialize();
                } else if (targetTab === 'tab20') {
                    vekaletUcretiHesaplamaModule.initialize();
                } else if (targetTab === 'tab21') {
                    verasetIntikatUcretiHesaplamaModule.initialize();
                } else if (targetTab === 'tab22') {
                    yasHesaplamaModule.initialize();
                } else if (targetTab === 'tab23') {
                    yetkiliMahkemeSorgulamaModule.initialize();
                } else if (targetTab === 'tab24') {
                    yillikIzinHesaplamaModule.initialize();
                }
                
                // URL güncelle
                const route = tabRoutes[targetTab];
                if (route) {
                    window.history.pushState({ tab: targetTab }, '', '/' + route);
                }
            });
        });
        
        // Sayfa ilk açıldığında veya yenilendiğinde route'a göre tab aç
        function openTabFromRoute() {
            const path = window.location.pathname.replace(/^\//, '');
            const tabId = routeTabs[path];
            if (tabId) {
                const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
                if (btn) btn.click();
            } else {
                // Hiçbir tab seçili olmasın, sağ container boş kalsın
                tabButtons.forEach(btn => btn.classList.remove('active'));
                rightContent.innerHTML = '';
            }
        }

        window.addEventListener('popstate', openTabFromRoute);
        openTabFromRoute();
    }
    
    const marquee = document.getElementById('exchangeMarquee');
    const marqueeContainer = document.querySelector('.exchange-marquee-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (marqueeContainer && marquee) {
        // Double marquee content for seamless scroll (only if not already doubled)
        if (!marquee.__doubled) {
            marquee.innerHTML = marquee.innerHTML + marquee.innerHTML;
            marquee.__doubled = true;
        }

        // Scrollbar'ı gizle
        marqueeContainer.style.overflowX = 'auto';
        marqueeContainer.style.scrollbarWidth = 'none'; // Firefox
        marqueeContainer.style.msOverflowStyle = 'none'; // IE/Edge
        
        // Webkit için CSS ekle
        const style = document.createElement('style');
        style.innerHTML = `
            .exchange-marquee-container::-webkit-scrollbar { 
                display: none !important; 
                width: 0 !important; 
                height: 0 !important; 
            }
            .exchange-marquee-container {
                cursor: grab;
            }
            .exchange-marquee-container.active {
                cursor: grabbing;
            }
            .exchange-marquee-container * {
                user-select: none;
            }
        `;
        document.head.appendChild(style);

        // Mouse olayları
        marqueeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            marqueeContainer.classList.add('active');
            startX = e.pageX - marqueeContainer.offsetLeft;
            scrollLeft = marqueeContainer.scrollLeft;
            e.preventDefault(); // Varsayılan davranışı engelle
        });

        marqueeContainer.addEventListener('mouseleave', () => {
            isDown = false;
            marqueeContainer.classList.remove('active');
        });

        marqueeContainer.addEventListener('mouseup', () => {
            isDown = false;
            marqueeContainer.classList.remove('active');
        });

        marqueeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - marqueeContainer.offsetLeft;
            const walk = (x - startX) * 2; // Hızı artır (2 çarpanı)
            marqueeContainer.scrollLeft = scrollLeft - walk; // Yön düzeltmesi
        });

        // Touch olayları (mobil destek)
        marqueeContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - marqueeContainer.offsetLeft;
            scrollLeft = marqueeContainer.scrollLeft;
        });

        marqueeContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        marqueeContainer.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - marqueeContainer.offsetLeft;
            const walk = (x - startX) * 2;
            marqueeContainer.scrollLeft = scrollLeft - walk;
        });

        // Scroll sınırlarını kontrol et
        marqueeContainer.addEventListener('scroll', () => {
            const maxScroll = marqueeContainer.scrollWidth - marqueeContainer.clientWidth;
            
            if (marqueeContainer.scrollLeft < 0) {
                marqueeContainer.scrollLeft = 0;
            }
            if (marqueeContainer.scrollLeft > maxScroll) {
                marqueeContainer.scrollLeft = maxScroll;
            }
        });

        // Auto-scroll functionality (endless)
        let marqueeAutoScroll;
        function startMarqueeAutoScroll() {
            stopMarqueeAutoScroll();
            marqueeAutoScroll = setInterval(() => {
                marqueeContainer.scrollLeft += 1;
                // When scroll passes the original content, reset to start
                if (marqueeContainer.scrollLeft >= marqueeContainer.scrollWidth / 2) {
                    marqueeContainer.scrollLeft = 0;
                }
            }, 35); // Hızı azaltmak için 35ms yaptık
        }
        function stopMarqueeAutoScroll() {
            if (marqueeAutoScroll) clearInterval(marqueeAutoScroll);
        }

        // Start auto-scroll on load
        startMarqueeAutoScroll();

        // Pause auto-scroll on mouse enter or drag, resume on leave
        marqueeContainer.addEventListener('mouseenter', stopMarqueeAutoScroll);
        marqueeContainer.addEventListener('mouseleave', startMarqueeAutoScroll);
        marqueeContainer.addEventListener('mousedown', stopMarqueeAutoScroll);
        marqueeContainer.addEventListener('mouseup', startMarqueeAutoScroll);
        marqueeContainer.addEventListener('touchstart', stopMarqueeAutoScroll);
        marqueeContainer.addEventListener('touchend', startMarqueeAutoScroll);
    }

    if (homeBtn && rightContent) {
        homeBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            window.history.pushState({}, '', '/');
            rightContent.innerHTML = await anaSayfaModule.getContent();
        });
    }

    if (hakkimizdaBtn && rightContent && typeof hakkimizdaModule !== 'undefined') {
        hakkimizdaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.pushState({}, '', '/hakkimizda');
            rightContent.innerHTML = hakkimizdaModule.getContent();
        });
    }

    // Bize Ulaşın SPA
    const bizeUlasinLink = document.querySelector('a[href="/bize-ulasin"]');
    if (bizeUlasinLink && rightContent) {
        bizeUlasinLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.history.pushState({}, '', '/bize-ulasin');
            rightContent.innerHTML = bizeUlasinModule.getContent();
        });
    }

    // SPA: Sayfa yenilendiğinde route'a göre right-content'i göster
    async function showHeaderPageFromRoute() {
        const path = window.location.pathname.replace(/^\//, '');
        if (path === '' || path === 'ana-sayfa') {
            rightContent.innerHTML = await anaSayfaModule.getContent();
        } else if (path === 'hakkimizda') {
            if (hakkimizdaBtn) hakkimizdaBtn.click();
        } else if (path === 'bize-ulasin') {
            rightContent.innerHTML = bizeUlasinModule.getContent();
        }
        // ...diğer route kontrolleri...
    }
    window.addEventListener('popstate', showHeaderPageFromRoute);
    showHeaderPageFromRoute();
    
    hakkimizdaBtn.addEventListener('click', function() {
        window.history.pushState({}, '', '/hakkimizda');
        rightContent.innerHTML = hakkimizdaModule.getContent();
    });
});