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
    
    // Store investment details in localStorage
    localStorage.setItem('investmentCoinId', 'abbasid-dinar-773');
    localStorage.setItem('investmentShares', shares);
    localStorage.setItem('investmentAmount', document.getElementById('totalAmount').textContent);
    
    // Redirect to checkout (or show modal)
    alert('Checkout functionality coming soon!\n\nYour investment:\n' + shares + ' shares\nTotal: ' + document.getElementById('totalAmount').textContent);
    
    // In production, redirect to:
    // window.location.href = 'checkout.html?coin=abbasid-dinar-773&shares=' + shares;
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
