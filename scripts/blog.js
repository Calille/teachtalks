// Blog-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Search functionality
    const searchInput = document.querySelector('.search-input');
    const articles = document.querySelectorAll('.article-card');
    const noResultsMessage = createNoResultsMessage();

    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value.toLowerCase());
            }, 300); // Debounce search
        });
    }

    function performSearch(searchTerm) {
        let visibleCount = 0;
        
        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.article-category').textContent.toLowerCase();
            const author = article.querySelector('.fa-user').parentElement.textContent.toLowerCase();
            
            const isMatch = title.includes(searchTerm) || 
                          content.includes(searchTerm) || 
                          category.includes(searchTerm) ||
                          author.includes(searchTerm);
            
            if (isMatch || searchTerm === '') {
                article.style.display = 'block';
                article.style.animation = 'fadeInUp 0.5s ease';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount === 0 && searchInput.value !== '');
    }

    // Category filtering
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all filters
            categoryFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterByCategory(category);
        });
    });

    function filterByCategory(category) {
        let visibleCount = 0;
        
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            
            if (category === 'all' || articleCategory === category) {
                article.style.display = 'block';
                article.style.animation = 'fadeInUp 0.5s ease';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        toggleNoResultsMessage(visibleCount === 0);
        
        // Clear search when filtering by category
        if (searchInput) {
            searchInput.value = '';
        }
    }

    function createNoResultsMessage() {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <div class="no-results-content">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--medium-gray); margin-bottom: 20px;"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or browse our categories.</p>
            </div>
        `;
        message.style.cssText = `
            display: none;
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
            color: var(--medium-gray);
        `;
        
        const articlesGrid = document.querySelector('.articles-grid');
        if (articlesGrid) {
            articlesGrid.appendChild(message);
        }
        
        return message;
    }

    function toggleNoResultsMessage(show) {
        if (noResultsMessage) {
            noResultsMessage.style.display = show ? 'block' : 'none';
        }
    }

    // Tag filtering
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const tagText = this.textContent.toLowerCase();
            
            // Use the search functionality to filter by tag
            if (searchInput) {
                searchInput.value = tagText;
                performSearch(tagText);
            }
        });
    });

    // Recent posts click handling
    const recentPosts = document.querySelectorAll('.recent-post');
    recentPosts.forEach(post => {
        post.style.cursor = 'pointer';
        post.addEventListener('click', function() {
            // In a real application, this would navigate to the specific post
            console.log('Navigate to:', this.querySelector('h4').textContent);
        });
    });

    // Pagination functionality
    const paginationLinks = document.querySelectorAll('.pagination-link');
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link (unless it's "Next")
            if (!this.textContent.includes('Next')) {
                this.classList.add('active');
            }
            
            // Scroll to top of articles
            document.querySelector('.blog-content').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced article card interactions
    articles.forEach(article => {
        const readMoreBtn = article.querySelector('.read-more');
        
        // Add click tracking
        readMoreBtn.addEventListener('click', function(e) {
            const articleTitle = article.querySelector('h3').textContent;
            console.log('Article clicked:', articleTitle);
            
            // Add a loading state
            this.innerHTML = 'Loading... <i class="fas fa-spinner fa-spin"></i>';
            
            // Simulate loading
            setTimeout(() => {
                this.innerHTML = 'Read More <i class="fas fa-arrow-right"></i>';
            }, 1000);
        });

        // Add bookmark functionality
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
        bookmarkBtn.title = 'Bookmark this article';
        
        bookmarkBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.title = 'Remove bookmark';
                showToast('Article bookmarked!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.title = 'Bookmark this article';
                showToast('Bookmark removed');
            }
        });

        article.querySelector('.article-content').appendChild(bookmarkBtn);
    });

    // Reading time estimation
    articles.forEach(article => {
        const content = article.querySelector('p').textContent;
        const wordCount = content.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute
        
        const timeElement = article.querySelector('.fa-clock').parentElement;
        timeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
    });

    // Smooth scroll for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-widget a');
    sidebarLinks.forEach(link => {
        if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // Toast notification system
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // Trigger animation
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Article view tracking
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const articleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const articleTitle = entry.target.querySelector('h3').textContent;
                console.log('Article viewed:', articleTitle);
                
                // In a real application, you would send this data to analytics
            }
        });
    }, observerOptions);

    articles.forEach(article => {
        articleObserver.observe(article);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Focus search with Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Clear search with Escape
        if (e.key === 'Escape' && searchInput === document.activeElement) {
            searchInput.value = '';
            performSearch('');
            searchInput.blur();
        }
    });

    // Load more articles functionality
    function setupLoadMore() {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn btn-secondary load-more-btn';
        loadMoreBtn.textContent = 'Load More Articles';
        loadMoreBtn.style.margin = '40px auto';
        loadMoreBtn.style.display = 'block';
        
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Simulate loading more articles
            setTimeout(() => {
                this.textContent = 'Load More Articles';
                showToast('More articles loaded!');
            }, 1500);
        });
        
        const pagination = document.querySelector('.pagination');
        if (pagination) {
            pagination.parentNode.insertBefore(loadMoreBtn, pagination);
        }
    }

    // setupLoadMore(); // Uncomment if you want the load more functionality

    console.log('Blog functionality initialized');
});

// Add CSS for blog-specific elements
const blogStyles = `
    .bookmark-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
        color: var(--medium-gray);
    }

    .bookmark-btn:hover {
        background: white;
        color: var(--primary-green);
        transform: scale(1.1);
    }

    .article-card {
        position: relative;
    }

    .no-results-content h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: var(--dark-gray);
    }

    .load-more-btn {
        min-width: 200px;
    }

    .recent-post:hover {
        background: rgba(46, 139, 87, 0.05);
        padding: 10px;
        margin: -10px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .tag:hover {
        transform: translateY(-2px);
    }

    .category-filter:hover {
        padding-left: 10px;
    }

    .search-input:focus + .search-suggestions {
        display: block;
    }
`;

// Inject blog-specific styles
const blogStyleSheet = document.createElement('style');
blogStyleSheet.textContent = blogStyles;
document.head.appendChild(blogStyleSheet); 