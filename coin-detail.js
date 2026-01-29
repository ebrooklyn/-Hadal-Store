// ================================================
// COIN DETAIL PAGE JAVASCRIPT
// ================================================

// Investment Calculator
let sharePrice = 87.00;
let platformFeePercent = 0.025;

function updateInvestment() {
    const shares = parseInt(document.getElementById('shareQuantity').value) || 0;
    const subtotal = shares * sharePrice;
    const platformFee = subtotal * platformFeePercent;
    const total = subtotal + platformFee;
    const ownershipPercent = (shares / 1000) * 100;
    
    document.getElementById('sharesCount').textContent = shares;
    document.getElementById('platformFee').textContent = '$' + platformFee.toFixed(2);
    document.getElementById('totalAmount').textContent = '$' + total.toFixed(2);
    document.getElementById('ownershipPercent').textContent = ownershipPercent.toFixed(2) + '%';
}

function adjustShares(amount) {
    const input = document.getElementById('shareQuantity');
    let currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + amount;
    
    // Keep within bounds
    if (newValue < 1) newValue = 1;
    if (newValue > 287) newValue = 287;
    
    input.value = newValue;
    updateInvestment();
}

function proceedToCheckout() {
    const shares = parseInt(document.getElementById('shareQuantity').value) || 0;
    
    if (shares < 1) {
        alert('Please select at least 1 share.');
        return;
    }
    
    // Get the coin ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get('id') || 'abbasid-dinar-773';
    
    // Get coin data based on URL parameter
    const coinData = getCoinDataById(coinId);
    
    if (coinData && typeof openPaymentModal === 'function') {
        // Open Stripe payment modal from stripe-payment.js
        openPaymentModal(coinData);
    } else {
        // Fallback: Store in localStorage and show message
        localStorage.setItem('investmentCoinId', coinId);
        localStorage.setItem('investmentShares', shares);
        localStorage.setItem('investmentAmount', document.getElementById('totalAmount').textContent);
        alert('Please ensure stripe-payment.js is loaded. Check the console for errors.');
    }
}

// Tab Switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Set button active
    event.target.classList.add('active');
    
    // Scroll to tabs section
    document.querySelector('.coin-details-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// 3D Viewer Controls
function resetCoinCamera() {
    const modelViewer = document.getElementById('coinViewer');
    if (modelViewer) {
        modelViewer.resetTurntableRotation();
        modelViewer.cameraOrbit = 'auto auto auto';
        modelViewer.fieldOfView = '45deg';
    }
}

function toggleCoinRotation() {
    const modelViewer = document.getElementById('coinViewer');
    if (modelViewer) {
        modelViewer.autoRotate = !modelViewer.autoRotate;
        
        // Visual feedback
        const button = event.currentTarget;
        if (modelViewer.autoRotate) {
            button.style.background = 'var(--hadal-gold)';
            button.style.color = 'var(--hadal-deep)';
        } else {
            button.style.background = '';
            button.style.color = '';
        }
    }
}

function toggleCoinFullscreen() {
    const container = document.querySelector('.coin-viewer-container');
    if (!container) return;
    
    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Projection Calculator
function updateProjections() {
    const amount = parseFloat(document.getElementById('projectionAmount').value) || 0;
    const years = parseInt(document.getElementById('projectionYears').value) || 10;
    const annualReturn = 0.08; // 8%
    
    const futureValue = amount * Math.pow(1 + annualReturn, years);
    
    document.getElementById('projectedValue').textContent = '$' + futureValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateInvestment();
    updateProjections();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        
        switch(e.key.toLowerCase()) {
            case 'r':
                resetCoinCamera();
                break;
            case ' ':
                e.preventDefault();
                toggleCoinRotation();
                break;
            case 'f':
                toggleCoinFullscreen();
                break;
            case '+':
            case '=':
                adjustShares(1);
                break;
            case '-':
                adjustShares(-1);
                break;
        }
    });
    
    console.log('Coin Detail Page Initialized');
    console.log('Keyboard shortcuts: R (reset), Space (rotate), F (fullscreen), +/- (adjust shares)');
});

// Helper function to get coin data - mirrors the one in stripe-payment.js
// This ensures compatibility if stripe-payment.js isn't loaded yet
function getCoinDataById(coinId) {
    const coins = {
        'abbasid-dinar-773': {
            id: 'abbasid-dinar-773',
            title: 'Abbasid Gold Dinar',
            period: '157 AH / 773 CE',
            caliph: 'Caliph al-Manṣūr',
            sharePrice: 87.00,
            totalValue: 87000,
            availableShares: 287,
            totalShares: 1000
        },
        'abbasid-dinar-780': {
            id: 'abbasid-dinar-780',
            title: 'Abbasid Gold Dinar',
            period: '164 AH / 780 CE',
            caliph: 'Caliph al-Mahdi',
            sharePrice: 92.50,
            totalValue: 92500,
            availableShares: 412,
            totalShares: 1000
        },
        'abbasid-dinar-800': {
            id: 'abbasid-dinar-800',
            title: 'Abbasid Gold Dinar',
            period: '786–809 CE',
            caliph: 'Harun al-Rashid',
            sharePrice: 105.00,
            totalValue: 105000,
            availableShares: 523,
            totalShares: 1000
        },
        'abbasid-dinar-920': {
            id: 'abbasid-dinar-920',
            title: 'Abbasid Gold Dinar',
            period: 'AH 310 / 920 CE',
            caliph: 'Al-Muqtadir',
            sharePrice: 78.00,
            totalValue: 78000,
            availableShares: 523,
            totalShares: 1000
        }
    };
    
    return coins[coinId];
}

// ============================================
// MOBILE MENU TOGGLE (Coin Detail Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navActions = document.querySelector('.nav-actions');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            navActions.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navActions.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
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

console.log('📱 Mobile menu initialized (coin detail)');

// ============================================
// KEYBOARD SHORTCUTS DISPLAY (Under Buttons)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const viewerControls = document.querySelector('.viewer-controls');
    
    if (viewerControls) {
        // Create centered keyboard shortcuts hint
        const shortcutsHint = document.createElement('div');
        shortcutsHint.className = 'viewer-keyboard-shortcuts';
        shortcutsHint.innerHTML = 'Press R to reset • Space to toggle rotation • F for fullscreen';
        
        // Add it after the controls
        viewerControls.appendChild(shortcutsHint);
        
        console.log('✅ Keyboard shortcuts positioned under buttons');
    }
});
