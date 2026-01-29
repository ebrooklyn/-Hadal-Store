// Stripe Payment Module for Hadal Store
// Handles payment modal, crypto support, and share calculations

// Initialize Stripe with test key
const stripe = Stripe('pk_test_51Sul0VKDx6h62u8fUwdo2lhnB9NdoizewCUnmXdDQSUldr1r3uuXKUlJ6ngEX4EQZEVCagtqNQmumy2SvpmCIcWg00SFhY8L7D');

// Coin database with Stripe payment links
const coinsDatabase = {
    'abbasid-dinar-773': {
        id: 'abbasid-dinar-773',
        name: 'Abbasid Gold Dinar',
        year: '773 CE',
        sharePrice: 8.99,
        totalShares: 10000,
        availableShares: 2870,
        stripePaymentLink: 'https://buy.stripe.com/test_9AQ17e3Yl8cR3mg5kl'
    },
    'abbasid-dinar-780': {
        id: 'abbasid-dinar-780',
        name: 'Abbasid Gold Dinar',
        year: '780 CE',
        sharePrice: 9.99,
        totalShares: 10000,
        availableShares: 3200,
        stripePaymentLink: 'https://buy.stripe.com/test_5kA9DKaoBawZgb66op'
    },
    'abbasid-dinar-800': {
        id: 'abbasid-dinar-800',
        name: 'Abbasid Gold Dinar',
        year: '800 CE',
        sharePrice: 10.99,
        totalShares: 10000,
        availableShares: 4100,
        stripePaymentLink: 'https://buy.stripe.com/test_3cs9DK6gB2SxaiY4gh'
    },
    'abbasid-dinar-920': {
        id: 'abbasid-dinar-920',
        name: 'Abbasid Gold Dinar',
        year: '920 CE',
        sharePrice: 7.99,
        totalShares: 10000,
        availableShares: 5200,
        stripePaymentLink: 'https://buy.stripe.com/test_cN2cQW6gB1Ot06c28a'
    }
};

// Get coin data by ID
function getCoinDataById(coinId) {
    return coinsDatabase[coinId] || null;
}

// Open payment modal with slider
function openPaymentModal(coinData = null) {
    if (!coinData) {
        // Get from URL or default
        const urlParams = new URLSearchParams(window.location.search);
        const coinId = urlParams.get('id') || 'abbasid-dinar-773';
        coinData = getCoinDataById(coinId);
    }
    
    if (!coinData) {
        alert('Coin data not found');
        return;
    }
    
    // Create modal HTML with blue slider
    const modalHTML = `
        <div id="paymentModal" class="payment-modal" style="display: flex;">
            <div class="modal-content glass-card">
                <button class="modal-close" onclick="closePaymentModal()">&times;</button>
                
                <h2 style="color: #D4AF37; margin-bottom: 10px;">Invest in ${coinData.name}</h2>
                <p style="color: #888; margin-bottom: 20px;">${coinData.year}</p>
                
                <div class="ownership-section" style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <span style="color: #fff;">Share Price:</span>
                        <span style="color: #D4AF37; font-weight: 600;">$${coinData.sharePrice.toFixed(2)}</span>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <label style="color: #fff; display: block; margin-bottom: 10px;">
                            Ownership Percentage: <span id="ownershipPercent">0.1</span>%
                        </label>
                        <input type="range" 
                               id="ownershipSlider" 
                               class="ownership-slider" 
                               min="0.1" 
                               max="10" 
                               step="0.1" 
                               value="0.1"
                               style="width: 100%; height: 8px; background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%); border-radius: 5px; outline: none; -webkit-appearance: none;">
                        <div style="display: flex; justify-content: space-between; color: #888; font-size: 12px; margin-top: 5px;">
                            <span>0.1%</span>
                            <span>10%</span>
                        </div>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <span style="color: #fff;">Number of Shares:</span>
                        <span id="numShares" style="color: #D4AF37; font-weight: 600;">10</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.2);">
                        <span style="color: #fff; font-weight: 600;">Total Investment:</span>
                        <span id="totalAmount" style="color: #D4AF37; font-size: 20px; font-weight: 700;">$${(coinData.sharePrice * 10).toFixed(2)}</span>
                    </div>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <label style="color: #fff; display: block; margin-bottom: 8px;">Your Name</label>
                    <input type="text" id="investorName" placeholder="Enter your name" 
                           style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; color: #fff; font-size: 14px;">
                </div>
                
                <div style="margin-bottom: 25px;">
                    <label style="color: #fff; display: block; margin-bottom: 8px;">Email Address</label>
                    <input type="email" id="investorEmail" placeholder="Enter your email" 
                           style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(212,175,55,0.3); border-radius: 8px; color: #fff; font-size: 14px;">
                </div>
                
                <button onclick="proceedToStripeCheckout('${coinData.id}')" 
                        class="btn-primary btn-block" 
                        style="width: 100%; padding: 15px; font-size: 16px; font-weight: 600;">
                    <svg style="width: 20px; height: 20px; margin-right: 8px; vertical-align: middle;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    Proceed to Payment
                </button>
            </div>
        </div>
    `;
    
    // Remove existing modal
    const existingModal = document.getElementById('paymentModal');
    if (existingModal) existingModal.remove();
    
    // Insert modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Setup slider functionality
    const slider = document.getElementById('ownershipSlider');
    const percentSpan = document.getElementById('ownershipPercent');
    const sharesSpan = document.getElementById('numShares');
    const totalSpan = document.getElementById('totalAmount');
    
    slider.addEventListener('input', function() {
        const percentage = parseFloat(this.value);
        const shares = Math.round((percentage / 100) * coinData.totalShares);
        const total = shares * coinData.sharePrice;
        
        percentSpan.textContent = percentage.toFixed(1);
        sharesSpan.textContent = shares;
        totalSpan.textContent = '$' + total.toFixed(2);
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Close modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) modal.remove();
    document.body.style.overflow = '';
}

// Proceed to Stripe checkout
function proceedToStripeCheckout(coinId) {
    const name = document.getElementById('investorName').value.trim();
    const email = document.getElementById('investorEmail').value.trim();
    
    if (!name || !email) {
        alert('Please enter your name and email');
        return;
    }
    
    const coinData = getCoinDataById(coinId);
    if (!coinData || !coinData.stripePaymentLink) {
        alert('Payment link not configured');
        return;
    }
    
    // Redirect to Stripe checkout
    window.location.href = coinData.stripePaymentLink + '?prefilled_email=' + encodeURIComponent(email);
}

console.log('💳 Stripe payment module loaded with blue slider');
