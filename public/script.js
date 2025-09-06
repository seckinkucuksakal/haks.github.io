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

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const rightContent = document.querySelector('.right-content');
    
    if (tabButtons.length > 0 && rightContent) {
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
                    case 'tab1':
                        content = ibanSorgulamaModule.getTabContent();
                        break;
                    case 'tab2':
                        content = ikiTarihArasiFarkModule.getTabContent();
                        break;
                    case 'tab3':
                        content = mirasHesaplamaModule.getTabContent();
                        break;
                    case 'tab4':
                        content = ilSorgulamaModule.getTabContent();
                        break;
                    case 'tab5':
                        content = tapuHarciHesaplamaModule.getTabContent();
                        break;
                    case 'tab6':
                        content = telefonAlanSorgulamaModule.getTabContent();
                        break;
                    case 'tab7':
                        content = limanSorgulamaModule.getTabContent();
                        break;
                    case 'tab8':
                        content = havalimaniSorgulamaModule.getTabContent();
                        break;
                    case 'tab9':
                        content = yasHesaplamaModule.getTabContent();
                        break;
                    default:
                        content = '<p>İçerik bulunamadı.</p>';
                }
                
                rightContent.innerHTML = content;
                
                // Initialize module functionality based on selected tab
                if (targetTab === 'tab1') {
                    ibanSorgulamaModule.initialize();
                } else if (targetTab === 'tab2') {
                    ikiTarihArasiFarkModule.initialize();
                } else if (targetTab === 'tab3') {
                    mirasHesaplamaModule.initialize();
                } else if (targetTab === 'tab4') {
                    ilSorgulamaModule.initialize();
                } else if (targetTab === 'tab5') {
                    tapuHarciHesaplamaModule.initialize();
                } else if (targetTab === 'tab6') {
                    telefonAlanSorgulamaModule.initialize();
                } else if (targetTab === 'tab7') {
                    limanSorgulamaModule.initialize();
                } else if (targetTab === 'tab8') {
                    havalimaniSorgulamaModule.initialize();
                } else if (targetTab === 'tab9') {
                    yasHesaplamaModule.initialize();
                }
                
                console.log('Tab switched to:', targetTab);
            });
        });
        
        // Initialize with first tab content (İban Sorgulama)
        rightContent.innerHTML = ibanSorgulamaModule.getTabContent();
        ibanSorgulamaModule.initialize();
    }
});