// ================================================
// THE HADAL STORE - MAIN JAVASCRIPT
// Enhanced 3D Coin Interactions & Platform Features
// ================================================

// Particle Background Animation
function initParticles() {
    const particleContainer = document.getElementById('particles');
    if (!particleContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size (2-6px)
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particleContainer.appendChild(particle);
    }
}

// 3D Coin Controls
function resetCamera() {
    const modelViewer = document.getElementById('featuredCoin3D');
    if (modelViewer) {
        modelViewer.resetTurntableRotation();
        modelViewer.cameraOrbit = 'auto auto auto';
        modelViewer.fieldOfView = '45deg';
    }
}

function toggleAutoRotate() {
    const modelViewer = document.getElementById('featuredCoin3D');
    if (modelViewer) {
        const isRotating = modelViewer.autoRotate;
        modelViewer.autoRotate = !isRotating;
        
        // Visual feedback
        const button = event.currentTarget;
        if (!isRotating) {
            button.style.background = 'var(--hadal-gold)';
            button.style.color = 'var(--hadal-deep)';
        } else {
            button.style.background = 'rgba(10, 25, 47, 0.9)';
            button.style.color = 'var(--hadal-gold)';
        }
    }
}

function toggleFullscreen() {
    const showcase = document.querySelector('.coin-showcase-3d');
    if (!showcase) return;
    
    if (!document.fullscreenElement) {
        showcase.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.querySelectorAll('.coin-card, .heritage-card, .feature-card, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Email Form Handling
const emailForm = document.getElementById('emailCaptureForm');
if (emailForm) {
    emailForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        // Show loading state
        button.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
            </svg>
            Submitting...
        `;
        button.disabled = true;
        
        try {
            // Replace with your actual form endpoint
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                button.innerHTML = `
                    <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Success! Check Your Email
                `;
                button.style.background = '#10b981';
                
                // Reset form
                this.reset();
                
                // Show confirmation
                showNotification('Thank you! Check your email for exclusive early access.', 'success');
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            button.innerHTML = originalText;
            button.disabled = false;
            showNotification('Something went wrong. Please try again.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Progress Bar Animations
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = targetWidth;
                }, 200);
                
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isNumber = /^\$?[\d,]+\.?\d*[KM+]?$/.test(target);
        
        if (!isNumber) return;
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue(counter, target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counterObserver.observe(counter);
    });
}

function animateValue(element, target) {
    const hasPrefix = target.startsWith('$');
    const hasSuffix = target.match(/[KM+]$/);
    const suffix = hasSuffix ? hasSuffix[0] : '';
    
    let numericValue = parseFloat(target.replace(/[$,KM+]/g, ''));
    
    if (suffix === 'K') numericValue *= 1000;
    if (suffix === 'M') numericValue *= 1000000;
    
    const duration = 2000;
    const steps = 60;
    const stepValue = numericValue / steps;
    const stepDuration = duration / steps;
    
    let current = 0;
    
    const timer = setInterval(() => {
        current += stepValue;
        
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        
        if (suffix === 'K') displayValue = (displayValue / 1000).toFixed(1);
        if (suffix === 'M') displayValue = (displayValue / 1000000).toFixed(1);
        
        if (displayValue >= 1000 && !suffix) {
            displayValue = displayValue.toLocaleString();
        }
        
        element.textContent = `${hasPrefix ? '$' : ''}${displayValue}${suffix}`;
    }, stepDuration);
}

// 3D Model Loading States
document.querySelectorAll('model-viewer').forEach(viewer => {
    viewer.addEventListener('load', () => {
        const loadingIndicator = viewer.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.opacity = '0';
            setTimeout(() => loadingIndicator.style.display = 'none', 300);
        }
    });
    
    viewer.addEventListener('error', (event) => {
        console.error('Error loading 3D model:', event);
        const loadingIndicator = viewer.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.innerHTML = `
                <p style="color: var(--hadal-gray-400);">
                    Unable to load 3D model<br>
                    <small>Image preview available</small>
                </p>
            `;
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = 'none';
    }
    
    // Update active section
    updateActiveSection();
    
    lastScroll = currentScroll;
});

function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Menu Toggle (for responsive implementation)
function initMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
    `;
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--hadal-gold);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Mobile menu styles
    if (window.innerWidth <= 768) {
        menuButton.style.display = 'block';
        const navActions = document.querySelector('.nav-actions');
        navActions.insertBefore(menuButton, navActions.firstChild);
        
        menuButton.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('mobile-open');
        });
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add keyboard controls for 3D viewer
document.addEventListener('keydown', (e) => {
    const modelViewer = document.getElementById('featuredCoin3D');
    if (!modelViewer) return;
    
    switch(e.key) {
        case 'r':
        case 'R':
            resetCamera();
            break;
        case ' ':
            e.preventDefault();
            toggleAutoRotate();
            break;
        case 'f':
        case 'F':
            toggleFullscreen();
            break;
    }
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
}, false);

function handleSwipe(startX, startY, endX, endY) {
    const diffX = endX - startX;
    const diffY = endY - startY;
    
    // Horizontal swipe (navigate sections)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
            // Swipe right
            console.log('Swipe right detected');
        } else {
            // Swipe left
            console.log('Swipe left detected');
        }
    }
}

// Performance Monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log('Page Load Time:', pageLoadTime + 'ms');
        
        // Log to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'page_load',
                'value': pageLoadTime,
                'event_category': 'Performance'
            });
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateProgressBars();
    animateCounters();
    initMobileMenu();
    initLazyLoading();
    
    // Log performance after everything loads
    window.addEventListener('load', logPerformance);
    
    console.log('The Hadal Store - Platform Initialized');
    console.log('Press R to reset camera, Space to toggle rotation, F for fullscreen');
});

// Export functions for external use
window.HadalStore = {
    resetCamera,
    toggleAutoRotate,
    toggleFullscreen,
    showNotification
};


// ======================
// FOMO FEATURES
// ======================

// Purchase Notifications
const purchaseNotifications = [
    { buyer: "Michael from London", action: "just purchased 5 shares of Harun al-Rashid coin", time: "2m ago" },
    { buyer: "Sarah from Dubai", action: "invested $2,175 in al-Mahdi coin", time: "5m ago" },
    { buyer: "James from New York", action: "bought 3 shares of al-Manṣūr coin", time: "8m ago" },
    { buyer: "Fatima from Cairo", action: "purchased 7 shares of Al-Muqtadir coin", time: "12m ago" },
    { buyer: "Robert from Singapore", action: "just invested $5,250 in Harun al-Rashid", time: "15m ago" },
    { buyer: "Aisha from Istanbul", action: "bought 4 shares of al-Mahdi coin", time: "18m ago" },
    { buyer: "David from Paris", action: "invested $1,740 in al-Manṣūr coin", time: "22m ago" },
    { buyer: "Maria from Barcelona", action: "purchased 6 shares of Al-Muqtadir", time: "25m ago" },
    { buyer: "Ahmed from Riyadh", action: "just bought 8 shares of Harun al-Rashid", time: "28m ago" },
    { buyer: "Emma from Toronto", action: "invested $3,150 in al-Mahdi coin", time: "32m ago" }
];

let notificationIndex = 0;

function showPurchaseNotification() {
    const notification = document.getElementById('purchase-notification');
    if (!notification) return;
    
    const data = purchaseNotifications[notificationIndex];
    
    notification.querySelector('.notification-buyer').textContent = data.buyer;
    notification.querySelector('.notification-action').innerHTML = `${data.action} <span class="time-ago">${data.time}</span>`;
    
    notification.classList.remove('hidden');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 300);
    }, 5000);
    
    notificationIndex = (notificationIndex + 1) % purchaseNotifications.length;
}

// Show first notification after 3 seconds, then every 15 seconds
setTimeout(() => {
    showPurchaseNotification();
    setInterval(showPurchaseNotification, 15000);
}, 3000);

// Price Ticker Animation
const ticker = document.querySelector('.ticker-content');
if (ticker) {
    // Clone content for seamless loop
    const tickerClone = ticker.cloneNode(true);
    ticker.parentElement.appendChild(tickerClone);
    
    // Simulate price updates every 10 seconds
    setInterval(() => {
        const priceChanges = document.querySelectorAll('.price-change');
        priceChanges.forEach(change => {
            const isUp = Math.random() > 0.4; // 60% chance of increase
            const percentage = (Math.random() * 4).toFixed(1);
            change.textContent = `${isUp ? '+' : '-'}${percentage}%`;
            change.className = `price-change ${isUp ? 'up' : 'down'}`;
        });
    }, 10000);
}

// Testimonials Scroll
const testimonialsTrack = document.querySelector('.testimonials-track');
if (testimonialsTrack) {
    // Clone testimonials for infinite scroll
    const testimonials = Array.from(testimonialsTrack.children);
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        testimonialsTrack.appendChild(clone);
    });
}

console.log('✅ FOMO features initialized');

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle) {
        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = event.target.closest('.navbar');
            
            if (!isClickInside && navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

console.log('📱 Mobile menu initialized');
