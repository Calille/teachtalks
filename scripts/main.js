// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced Newsletter form submission with validation
    const newsletterForm = document.querySelector('#newsletterForm');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('#newsletter-email');
        const submitButton = newsletterForm.querySelector('.newsletter-btn');
        const errorMessage = newsletterForm.querySelector('#email-error');
        const btnText = submitButton.querySelector('.btn-text');
        const btnLoading = submitButton.querySelector('.btn-loading');
        const btnSuccess = submitButton.querySelector('.btn-success');

        // Email validation function
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Show validation message
        function showValidationMessage(message) {
            errorMessage.textContent = message;
            errorMessage.classList.add('show');
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.setAttribute('aria-describedby', 'email-error');
        }

        // Hide validation message
        function hideValidationMessage() {
            errorMessage.classList.remove('show');
            emailInput.setAttribute('aria-invalid', 'false');
            emailInput.removeAttribute('aria-describedby');
        }

        // Real-time validation
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            
            if (email === '') {
                hideValidationMessage();
                return;
            }

            if (!validateEmail(email)) {
                showValidationMessage('Please enter a valid email address');
            } else {
                hideValidationMessage();
            }
        });

        // Enhanced form submission
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            
            // Validation
            if (!email) {
                showValidationMessage('Email address is required');
                emailInput.focus();
                return;
            }
            
            if (!validateEmail(email)) {
                showValidationMessage('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            // Hide any existing validation messages
            hideValidationMessage();
            
            // Disable form and show loading state
            submitButton.disabled = true;
            emailInput.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            
            // Simulate API call
            setTimeout(() => {
                // Show success state
                btnLoading.style.display = 'none';
                btnSuccess.style.display = 'inline-flex';
                
                // Add success animation to form
                newsletterForm.style.transform = 'scale(1.02)';
                newsletterForm.style.transition = 'transform 0.3s ease';
                
                // Reset form after delay
                setTimeout(() => {
                    // Reset button states
                    btnSuccess.style.display = 'none';
                    btnText.style.display = 'inline';
                    submitButton.disabled = false;
                    emailInput.disabled = false;
                    
                    // Clear form
                    emailInput.value = '';
                    
                    // Reset form animation
                    newsletterForm.style.transform = '';
                    
                    // Show thank you message
                    const thankYouMessage = document.createElement('div');
                    thankYouMessage.className = 'thank-you-message';
                    thankYouMessage.innerHTML = `
                        <div style="
                            background: rgba(81, 207, 102, 0.1);
                            color: #51cf66;
                            padding: 15px 20px;
                            border-radius: 8px;
                            margin-top: 15px;
                            text-align: center;
                            font-weight: 600;
                            animation: fadeInUp 0.5s ease-out;
                        ">
                            <i class="fas fa-check-circle"></i>
                            Welcome aboard! Check your email for a confirmation.
                        </div>
                    `;
                    
                    newsletterForm.parentNode.appendChild(thankYouMessage);
                    
                    // Remove thank you message after 5 seconds
                    setTimeout(() => {
                        if (thankYouMessage.parentNode) {
                            thankYouMessage.remove();
                        }
                    }, 5000);
                    
                }, 2000);
            }, 1500);
        });

        // Add focus enhancement
        emailInput.addEventListener('focus', function() {
            this.parentNode.parentNode.style.transform = 'scale(1.02)';
        });

        emailInput.addEventListener('blur', function() {
            this.parentNode.parentNode.style.transform = '';
        });
    }

    // Newsletter preview functionality
    const newsletterPreview = document.querySelector('.newsletter-preview .preview-content');
    if (newsletterPreview) {
        newsletterPreview.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // In a real implementation, you would open a modal or redirect
            setTimeout(() => {
                alert('Newsletter preview would open here. This is a demo implementation.');
            }, 200);
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .article-card, .benefit-item');
    animateElements.forEach(el => observer.observe(el));

    // Add keyboard navigation for newsletter benefits
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Benefit ${index + 1}: ${item.querySelector('h4').textContent}`);
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Add focus animation
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });

    // Add hover effects for social proof avatars
    const avatars = document.querySelectorAll('.avatar');
    avatars.forEach((avatar, index) => {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-2px)';
            this.style.zIndex = '10';
        });
        
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.zIndex = '';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const addScrollAnimations = () => {
        const elements = document.querySelectorAll('.feature-card, .article-card');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.2}s`;
        });
    };

    addScrollAnimations();

    // Add floating animation to hero cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add dynamic typing effect to hero title (optional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let index = 0;
        const typeSpeed = 50;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Uncomment the next line if you want the typing effect
        // setTimeout(typeWriter, 1000);
        
        // For now, just show the text normally
        heroTitle.innerHTML = text;
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroSection && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add click ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Apply ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(addRippleEffect);

    // Add search functionality (if search input exists)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const articles = document.querySelectorAll('.article-card');
            
            articles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const content = article.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    }

    // Add dark mode toggle (optional feature)
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Save preference
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Load dark mode preference
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // Add back to top button functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Console welcome message
    console.log('%c Welcome to Teach Talks! 🎓', 'color: #2E8B57; font-size: 16px; font-weight: bold;');
    console.log('%c Educational excellence through innovative teaching methods', 'color: #663399; font-size: 12px;');

    // Enhanced search and filtering functionality
    // Quick search functionality for homepage
    const quickSearch = document.querySelector('.quick-search');
    if (quickSearch) {
        quickSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    // Redirect to blog with search parameter
                    window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
                }
            }
        });

        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                const query = quickSearch.value.trim();
                if (query) {
                    window.location.href = `blog.html?search=${encodeURIComponent(query)}`;
                }
            });
        }
    }

    // Blog page filtering
    if (window.location.pathname.includes('blog.html')) {
        initializeBlogFiltering();
    }

    // Resources page filtering
    if (window.location.pathname.includes('resources.html')) {
        initializeResourcesFiltering();
    }

    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Load More Success Stories';
                this.disabled = false;
                // In a real implementation, you would load actual content here
            }, 1500);
        });
    }
});

// Add CSS for additional animations and effects
const additionalStyles = `
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }

    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }

    .feature-card,
    .article-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }

    .feature-card.animate-in,
    .article-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .btn {
        position: relative;
        overflow: hidden;
    }

    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, var(--primary-green), var(--primary-purple));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    }

    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 100px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 20px 0;
            z-index: 999;
        }

        .nav-menu.active {
            left: 0;
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }

    body.loaded {
        animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Blog filtering functionality
function initializeBlogFiltering() {
    const gradeFilter = document.getElementById('grade-filter');
    const formatFilter = document.getElementById('format-filter');
    const subjectFilter = document.getElementById('subject-filter');
    const searchInput = document.querySelector('.search-input');
    const categoryFilters = document.querySelectorAll('.category-filter');

    // Filter articles based on current selections
    function filterArticles() {
        const articles = document.querySelectorAll('.article-card');
        const selectedGrade = gradeFilter ? gradeFilter.value : '';
        const selectedFormat = formatFilter ? formatFilter.value : '';
        const selectedSubject = subjectFilter ? subjectFilter.value : '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        articles.forEach(article => {
            let shouldShow = true;

            // Grade filter
            if (selectedGrade && !article.dataset.grade?.includes(selectedGrade)) {
                shouldShow = false;
            }

            // Format filter
            if (selectedFormat && !article.dataset.format?.includes(selectedFormat)) {
                shouldShow = false;
            }

            // Subject filter
            if (selectedSubject && !article.dataset.subject?.includes(selectedSubject)) {
                shouldShow = false;
            }

            // Search filter
            if (searchTerm) {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const content = article.querySelector('p').textContent.toLowerCase();
                if (!title.includes(searchTerm) && !content.includes(searchTerm)) {
                    shouldShow = false;
                }
            }

            article.style.display = shouldShow ? 'block' : 'none';
        });

        updateShowingCount();
    }

    // Add event listeners
    if (gradeFilter) gradeFilter.addEventListener('change', filterArticles);
    if (formatFilter) formatFilter.addEventListener('change', filterArticles);
    if (subjectFilter) subjectFilter.addEventListener('change', filterArticles);
    if (searchInput) searchInput.addEventListener('input', debounce(filterArticles, 300));

    // Category filter clicks
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter by category
            const category = this.dataset.category;
            const articles = document.querySelectorAll('.article-card');
            
            articles.forEach(article => {
                if (category === 'all' || article.dataset.category === category) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
            
            updateShowingCount();
        });
    });
}

// Resources filtering functionality
function initializeResourcesFiltering() {
    const gradeFilter = document.getElementById('grade-filter');
    const typeFilter = document.getElementById('type-filter');
    const subjectFilter = document.getElementById('subject-filter');
    const searchInput = document.querySelector('.search-input');

    function filterResources() {
        const resources = document.querySelectorAll('.resource-card');
        const selectedGrade = gradeFilter ? gradeFilter.value : '';
        const selectedType = typeFilter ? typeFilter.value : '';
        const selectedSubject = subjectFilter ? subjectFilter.value : '';
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

        resources.forEach(resource => {
            let shouldShow = true;

            // Grade filter
            if (selectedGrade && !resource.dataset.grade?.includes(selectedGrade)) {
                shouldShow = false;
            }

            // Type filter
            if (selectedType && !resource.dataset.category?.includes(selectedType)) {
                shouldShow = false;
            }

            // Subject filter
            if (selectedSubject && !resource.dataset.subject?.includes(selectedSubject)) {
                shouldShow = false;
            }

            // Search filter
            if (searchTerm) {
                const title = resource.querySelector('h3').textContent.toLowerCase();
                const content = resource.querySelector('p').textContent.toLowerCase();
                if (!title.includes(searchTerm) && !content.includes(searchTerm)) {
                    shouldShow = false;
                }
            }

            resource.style.display = shouldShow ? 'block' : 'none';
        });

        updateShowingCount();
    }

    // Add event listeners
    if (gradeFilter) gradeFilter.addEventListener('change', filterResources);
    if (typeFilter) typeFilter.addEventListener('change', filterResources);
    if (subjectFilter) subjectFilter.addEventListener('change', filterResources);
    if (searchInput) searchInput.addEventListener('input', debounce(filterResources, 300));

    // Download button functionality
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                this.style.background = 'var(--success)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.disabled = false;
                }, 2000);
            }, 1500);
        });
    });
}

// Update showing count
function updateShowingCount() {
    const showingCount = document.querySelector('.showing-count');
    if (showingCount) {
        const visibleItems = document.querySelectorAll('.article-card:not([style*="display: none"]), .resource-card:not([style*="display: none"])').length;
        const totalItems = document.querySelectorAll('.article-card, .resource-card').length;
        showingCount.textContent = `Showing ${visibleItems} of ${totalItems} items`;
    }
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation for better UX
function showLoading(element) {
    element.style.opacity = '0.7';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
} 