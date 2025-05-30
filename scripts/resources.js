// Resources page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Category filtering
    const categoryCards = document.querySelectorAll('.category-card');
    const resourceCards = document.querySelectorAll('.resource-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterResources(category);
            
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    function filterResources(category) {
        resourceCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Download simulation
    const downloadBtns = document.querySelectorAll('.download-btn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resource = this.getAttribute('data-resource');
            simulateDownload(this, resource);
        });
    });

    function simulateDownload(button, resource) {
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
            button.style.background = 'var(--success)';
            
            // Show success notification
            showNotification(`Successfully downloaded ${resource.replace('-', ' ')}!`, 'success');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 1500);
    }

    // Preview functionality
    const previewBtns = document.querySelectorAll('.preview-btn');
    
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const resourceCard = this.closest('.resource-card');
            const title = resourceCard.querySelector('h3').textContent;
            showPreviewModal(title);
        });
    });

    function showPreviewModal(title) {
        const modal = document.createElement('div');
        modal.className = 'preview-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Preview: ${title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="preview-placeholder">
                        <i class="fas fa-file-alt" style="font-size: 4rem; color: var(--primary-green); margin-bottom: 20px;"></i>
                        <p>This is a preview of the resource. In a real application, you would see the actual content here.</p>
                        <p><strong>Sample Content:</strong></p>
                        <ul>
                            <li>Detailed lesson plans with step-by-step instructions</li>
                            <li>Interactive activities and exercises</li>
                            <li>Assessment rubrics and guidelines</li>
                            <li>Additional resources and references</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary">Download Full Resource</button>
                    <button class="btn btn-secondary close-modal">Close Preview</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeBtns = modal.querySelectorAll('.close-modal');
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });
        
        // Close on outside click
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Rating system
    const resourceCards2 = document.querySelectorAll('.resource-card');
    resourceCards2.forEach(card => {
        const rating = card.querySelector('.fa-star').parentElement;
        if (rating) {
            rating.style.cursor = 'pointer';
            rating.addEventListener('click', function() {
                showNotification('Thank you for your rating!', 'success');
            });
        }
    });

    // Animated statistics counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            const suffix = text.replace(/[\d]/g, '');
            
            if (number > 0) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        stat.textContent = number + suffix;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + suffix;
                    }
                }, 50);
            }
        });
    }

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.resource-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--${type === 'success' ? 'success' : 'primary-green'});
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    console.log('Resources functionality initialized');
});

// CSS for modal and notifications
const resourcesStyles = `
    .preview-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    }

    .modal-content {
        background: white;
        border-radius: var(--border-radius);
        width: 90%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        animation: slideUp 0.3s ease;
    }

    .modal-header {
        padding: 20px;
        border-bottom: 1px solid var(--light-gray);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-body {
        padding: 20px;
    }

    .modal-footer {
        padding: 20px;
        border-top: 1px solid var(--light-gray);
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--medium-gray);
    }

    .close-modal:hover {
        color: var(--dark-gray);
    }

    .preview-placeholder {
        text-align: center;
        padding: 40px 20px;
    }

    .preview-placeholder ul {
        text-align: left;
        max-width: 400px;
        margin: 0 auto;
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const resourcesStyleSheet = document.createElement('style');
resourcesStyleSheet.textContent = resourcesStyles;
document.head.appendChild(resourcesStyleSheet); 