// Stripe Payment Integration for Hadal Store with Crypto Support
// Supports: Credit/Debit Cards + Crypto (USDC, USDP on multiple chains)

// Your Stripe Test Publishable Key
const STRIPE_PUBLIC_KEY = 'pk_test_51Sul0VKDx6h62u8fUwdo2lhnB9NdoizewCUnmXdDQSUldr1r3uuXKUlJ6ngEX4EQZEVCagtqNQmumy2SvpmCIcWg00SFhY8L7D';

// Initialize Stripe
let stripe = null;

// Supported crypto currencies and networks
const CRYPTO_OPTIONS = {
    usdc: {
        name: 'USDC',
        networks: ['ethereum', 'solana', 'polygon', 'base'],
        icon: '🪙',
        description: 'USD Coin - Stablecoin pegged to US Dollar'
    },
    usdp: {
        name: 'USDP',
        networks: ['ethereum', 'solana'],
        icon: '💵',
        description: 'Pax Dollar - Regulated stablecoin'
    }
};

// Initialize Stripe when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load Stripe.js if not already loaded
    if (typeof Stripe === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://js.stripe.com/v3/';
        script.onload = function() {
            stripe = Stripe(STRIPE_PUBLIC_KEY);
            console.log('✅ Stripe initialized with crypto support');
        };
        document.head.appendChild(script);
    } else {
        stripe = Stripe(STRIPE_PUBLIC_KEY);
        console.log('✅ Stripe initialized with crypto support');
    }
    
    // Set up invest now buttons
    setupInvestButtons();
});

// Set up all invest buttons on the page
function setupInvestButtons() {
    // Find all invest buttons
    const investButtons = document.querySelectorAll('.btn-invest, .btn-purchase, [data-action="invest"], a[href*="coin-detail"]');
    
    investButtons.forEach(button => {
        // Only add click handler to "Invest Now" buttons
        if (button.textContent.includes('Invest Now') || button.classList.contains('btn-invest')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get coin data from button or parent element
                const coinCard = this.closest('[data-coin-id]');
                if (coinCard) {
                    const coinId = coinCard.getAttribute('data-coin-id');
                    const coinData = getCoinDataById(coinId);
                    
                    if (coinData) {
                        openPaymentModal(coinData);
                    }
                } else {
                    // Try to get from URL if on detail page
                    const urlParams = new URLSearchParams(window.location.search);
                    const coinId = urlParams.get('id');
                    if (coinId) {
                        const coinData = getCoinDataById(coinId);
                        if (coinData) {
                            openPaymentModal(coinData);
                        }
                    }
                }
            });
        }
    });
}

// Get coin data by ID
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

// Open payment modal with crypto options
function openPaymentModal(coinData, initialQuantity) {
    // Get initial quantity from parameter or localStorage or default to 1
    let numShares = initialQuantity || 1;
    
    // Try to get from detail page calculator if available
    if (!initialQuantity) {
        const detailPageQuantity = document.getElementById('shareQuantity');
        if (detailPageQuantity) {
            numShares = parseInt(detailPageQuantity.value) || 1;
        }
    }
    
    // Create modal HTML with payment method selection
    const modalHTML = `
        <div class="payment-modal" id="paymentModal">
            <div class="payment-modal-overlay" onclick="closePaymentModal()"></div>
            <div class="payment-modal-content">
                <button class="modal-close" onclick="closePaymentModal()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                
                <div class="payment-header">
                    <h2>Invest in ${coinData.title}</h2>
                    <p class="payment-subtitle">${coinData.period} • ${coinData.caliph}</p>
                </div>
                
                <div class="payment-summary">
                    <div class="summary-row">
                        <span>Share Price</span>
                        <strong>$${coinData.sharePrice.toFixed(2)}</strong>
                    </div>
                    <div class="summary-row">
                        <span>Available Shares</span>
                        <strong>${coinData.availableShares}/${coinData.totalShares}</strong>
                    </div>
                    <div class="summary-row" style="border-top: 1px solid rgba(212, 175, 55, 0.3); padding-top: 15px; margin-top: 10px;">
                        <span style="color: rgba(255,255,255,0.9); font-size: 16px;">You will own</span>
                        <strong id="ownershipPercent" style="color: var(--gold); font-size: 20px;">${((numShares / coinData.totalShares) * 100).toFixed(2)}%</strong>
                    </div>
                    <div style="text-align: center; color: rgba(255,255,255,0.7); font-size: 14px; margin-top: 10px;">
                        of this historic coin
                    </div>
                </div>
                
                <form id="investmentForm" class="investment-form">
                    <!-- Ownership Percentage Slider -->
                    <div class="form-group">
                        <label for="ownershipSlider">
                            Own <span id="ownershipPercentDisplay">0.1%</span> of this Historic Coin
                        </label>
                        <input type="range" id="ownershipSlider" class="ownership-slider" 
                               min="0.1" max="10" step="0.1" value="0.1">
                        <div class="slider-labels">
                            <span>0.1%</span>
                            <span>5%</span>
                            <span>10%</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="numShares">Number of Shares (1000 shares = 100%)</label>
                        <div class="quantity-selector">
                            <button type="button" class="qty-btn" onclick="updateQuantity(-1)">−</button>
                            <input type="number" id="numShares" name="numShares" value="${numShares}" min="1" max="${coinData.availableShares}" readonly>
                            <button type="button" class="qty-btn" onclick="updateQuantity(1)">+</button>
                        </div>
                        <small class="input-hint">Shares auto-calculated from percentage slider</small>
                    </div>
                    
                    <div class="total-calculation">
                        <div class="calc-row">
                            <span>Subtotal</span>
                            <span id="subtotal">$${(coinData.sharePrice * numShares).toFixed(2)}</span>
                        </div>
                        <div class="calc-row">
                            <span>Processing Fee (2.9% + $0.30)</span>
                            <span id="processingFee">$${(coinData.sharePrice * numShares * 0.029 + 0.30).toFixed(2)}</span>
                        </div>
                        <div class="calc-row total">
                            <strong>Total Amount</strong>
                            <strong id="totalAmount">$${(coinData.sharePrice * numShares * 1.029 + 0.30).toFixed(2)}</strong>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="investorName">Full Name</label>
                        <input type="text" id="investorName" name="investorName" required placeholder="John Doe">
                    </div>
                    
                    <div class="form-group">
                        <label for="investorEmail">Email Address</label>
                        <input type="email" id="investorEmail" name="investorEmail" required placeholder="john@example.com">
                    </div>
                    
                    <div class="payment-method-section">
                        <label class="section-label">Choose Payment Method</label>
                        
                        <div class="payment-methods">
                            <button type="button" class="payment-method-btn active" data-method="card" onclick="selectPaymentMethod('card')">
                                <div class="method-icon">💳</div>
                                <div class="method-info">
                                    <div class="method-name">Credit / Debit Card</div>
                                    <div class="method-desc">Visa, Mastercard, Amex</div>
                                </div>
                            </button>
                            
                            <button type="button" class="payment-method-btn" data-method="crypto" onclick="selectPaymentMethod('crypto')">
                                <div class="method-icon">🪙</div>
                                <div class="method-info">
                                    <div class="method-name">Pay with Crypto</div>
                                    <div class="method-desc">USDC, USDP (Multi-chain)</div>
                                </div>
                            </button>
                        </div>
                        
                        <div id="cryptoOptions" class="crypto-options" style="display: none;">
                            <div class="crypto-currencies">
                                <label class="crypto-label">Select Cryptocurrency:</label>
                                <div class="crypto-currency-grid">
                                    <div class="crypto-currency-option" onclick="selectCrypto('usdc')">
                                        <input type="radio" name="crypto" value="usdc" id="usdc">
                                        <label for="usdc">
                                            <span class="crypto-icon">🪙</span>
                                            <span class="crypto-name">USDC</span>
                                            <span class="crypto-desc">USD Coin</span>
                                        </label>
                                    </div>
                                    <div class="crypto-currency-option" onclick="selectCrypto('usdp')">
                                        <input type="radio" name="crypto" value="usdp" id="usdp">
                                        <label for="usdp">
                                            <span class="crypto-icon">💵</span>
                                            <span class="crypto-name">USDP</span>
                                            <span class="crypto-desc">Pax Dollar</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            
                            <div id="networkOptions" class="network-options" style="display: none;">
                                <label class="crypto-label">Select Network:</label>
                                <div id="networkGrid" class="network-grid"></div>
                            </div>
                            
                            <div class="crypto-info">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                <span>Crypto payments are processed via Stripe. You'll be redirected to complete your payment securely.</span>
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary btn-full" id="checkoutButton">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        <span id="checkoutBtnText">Proceed to Payment</span>
                    </button>
                    
                    <p class="payment-note">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Secure payment powered by Stripe. Your payment information is encrypted and secure.
                    </p>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Store coin data for form submission
    document.getElementById('paymentModal').dataset.coinData = JSON.stringify(coinData);
    document.getElementById('paymentModal').dataset.paymentMethod = 'card';
    
    // Set up form handler
    document.getElementById('investmentForm').addEventListener('submit', handlePayment);
    
    // Update calculations when quantity changes
    document.getElementById('numShares').addEventListener('input', updateCalculations);
    
    // Initial calculation
    updateCalculations();
    
    // Show modal
    setTimeout(() => {
        document.getElementById('paymentModal').classList.add('show');
    }, 10);
}

// Select payment method
function selectPaymentMethod(method) {
    const modal = document.getElementById('paymentModal');
    modal.dataset.paymentMethod = method;
    
    // Update button states
    document.querySelectorAll('.payment-method-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-method="${method}"]`).classList.add('active');
    
    // Show/hide crypto options
    const cryptoOptions = document.getElementById('cryptoOptions');
    if (method === 'crypto') {
        cryptoOptions.style.display = 'block';
        document.getElementById('checkoutBtnText').textContent = 'Pay with Crypto';
    } else {
        cryptoOptions.style.display = 'none';
        document.getElementById('checkoutBtnText').textContent = 'Proceed to Payment';
    }
}

// Select cryptocurrency
function selectCrypto(crypto) {
    document.getElementById(crypto).checked = true;
    
    // Show network options
    const networkOptions = document.getElementById('networkOptions');
    const networkGrid = document.getElementById('networkGrid');
    
    const networks = CRYPTO_OPTIONS[crypto].networks;
    
    networkGrid.innerHTML = networks.map(network => `
        <div class="network-option">
            <input type="radio" name="network" value="${network}" id="${network}" required>
            <label for="${network}">
                <span class="network-icon">${getNetworkIcon(network)}</span>
                <span class="network-name">${network.charAt(0).toUpperCase() + network.slice(1)}</span>
            </label>
        </div>
    `).join('');
    
    networkOptions.style.display = 'block';
}

// Get network icon
function getNetworkIcon(network) {
    const icons = {
        ethereum: '⟠',
        solana: '◎',
        polygon: '⬡',
        base: '🔵'
    };
    return icons[network] || '🔗';
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Update quantity
function updateQuantity(change) {
    const input = document.getElementById('numShares');
    const current = parseInt(input.value) || 1;
    const max = parseInt(input.max);
    const newValue = Math.max(1, Math.min(max, current + change));
    input.value = newValue;
    updateCalculations();
}

// Update price calculations
function updateCalculations() {
    const modal = document.getElementById('paymentModal');
    if (!modal) return;
    
    const coinData = JSON.parse(modal.dataset.coinData);
    const numShares = parseInt(document.getElementById('numShares').value) || 1;
    
    const subtotal = coinData.sharePrice * numShares;
    const processingFee = subtotal * 0.029 + 0.30;
    const total = subtotal + processingFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('processingFee').textContent = `$${processingFee.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    
    // Update ownership percentage
    const ownershipPercent = (numShares / coinData.totalShares) * 100;
    const ownershipEl = document.getElementById('ownershipPercent');
    if (ownershipEl) {
        ownershipEl.textContent = ownershipPercent.toFixed(2) + '%';
    }
}

// Handle payment submission
async function handlePayment(e) {
    e.preventDefault();
    
    if (!stripe) {
        alert('Payment system is loading. Please try again in a moment.');
        return;
    }
    
    const button = document.getElementById('checkoutButton');
    const originalHTML = button.innerHTML;
    
    // Get payment method and crypto details
    const modal = document.getElementById('paymentModal');
    const paymentMethod = modal.dataset.paymentMethod;
    
    // Validate crypto selections if paying with crypto
    if (paymentMethod === 'crypto') {
        const selectedCrypto = document.querySelector('input[name="crypto"]:checked');
        const selectedNetwork = document.querySelector('input[name="network"]:checked');
        
        if (!selectedCrypto) {
            alert('Please select a cryptocurrency (USDC or USDP)');
            return;
        }
        
        if (!selectedNetwork) {
            alert('Please select a network');
            return;
        }
    }
    
    // Disable button and show loading
    button.disabled = true;
    button.innerHTML = `
        <svg class="btn-icon spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
        </svg>
        Processing...
    `;
    
    try {
        // Get form data
        const coinData = JSON.parse(modal.dataset.coinData);
        const numShares = parseInt(document.getElementById('numShares').value);
        const investorName = document.getElementById('investorName').value;
        const investorEmail = document.getElementById('investorEmail').value;
        
        const subtotal = coinData.sharePrice * numShares;
        const processingFee = subtotal * 0.029 + 0.30;
        const totalAmount = subtotal + processingFee;
        
        // Get crypto details if applicable
        let cryptoCurrency = null;
        let cryptoNetwork = null;
        
        if (paymentMethod === 'crypto') {
            cryptoCurrency = document.querySelector('input[name="crypto"]:checked').value;
            cryptoNetwork = document.querySelector('input[name="network"]:checked').value;
        }
        
        // Prepare payment data
        const paymentData = {
            coinId: coinData.id,
            coinTitle: `${coinData.title} (${coinData.period})`,
            coinPeriod: coinData.period,
            coinCaliph: coinData.caliph,
            numShares: numShares,
            sharePrice: coinData.sharePrice,
            subtotal: subtotal,
            processingFee: processingFee,
            totalAmount: totalAmount,
            investorName: investorName,
            investorEmail: investorEmail,
            paymentMethod: paymentMethod,
            cryptoCurrency: cryptoCurrency,
            cryptoNetwork: cryptoNetwork
        };
        
        // Stripe Payment Links (from your Stripe Dashboard)
        const paymentLinks = {
            'abbasid-dinar-773': 'https://buy.stripe.com/test_eVadTQ2ztaI8cQ85km',
            'abbasid-dinar-780': 'https://buy.stripe.com/test_8wM6roeifaI88zS7su',
            'abbasid-dinar-800': 'https://buy.stripe.com/test_8wM3eC8PJ00wfo46ot',
            'abbasid-dinar-920': 'https://buy.stripe.com/test_28o2b66Hx6rS1Xq8wB'
        };
        
        // Get the payment link for this coin
        let checkoutUrl = paymentLinks[coinData.id];
        
        if (!checkoutUrl) {
            throw new Error('Payment link not found for this coin');
        }
        
        // Add quantity parameter to Stripe Payment Link
        checkoutUrl += `?quantity=${numShares}`;
        
        // Add prefill parameters for name and email
        checkoutUrl += `&prefilled_email=${encodeURIComponent(investorEmail)}`;
        
        // For crypto payments, Stripe will show crypto options in checkout
        // The payment methods are already configured in your Stripe Payment Links
        
        // Redirect to Stripe Checkout
        window.location.href = checkoutUrl;
        
        // Checkout will redirect automatically via window.location.href
        
    } catch (error) {
        console.error('Payment error:', error);
        
        // Show simple error message
        alert(`Unable to process payment: ${error.message}\n\nPlease try again or contact support.`);
        
        // Reset button
        button.disabled = false;
        button.innerHTML = originalHTML;
    }
}

// Remove the showPaymentError function as it's no longer needed
// We're using Stripe Payment Links which don't require backend setup

// Add modal styles
const modalStyles = `
<style>
:root {
    --gold: #D4AF37;
    --dark-bg: rgba(10, 25, 47, 0.98);
    --teal-bg: rgba(26, 77, 92, 0.98);
}

.payment-modal, .error-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.payment-modal.show, .error-modal.show {
    opacity: 1;
    visibility: visible;
}

.payment-modal-overlay, .error-modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
}

.payment-modal-content, .error-modal-content {
    position: relative;
    max-width: 600px;
    margin: 50px auto;
    background: linear-gradient(135deg, var(--dark-bg) 0%, var(--teal-bg) 100%);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(212, 175, 55, 0.3);
    max-height: 90vh;
    overflow-y: auto;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.modal-close:hover {
    background: rgba(255, 0, 0, 0.2);
    transform: rotate(90deg);
}

.modal-close svg {
    width: 20px;
    height: 20px;
}

.payment-header {
    margin-bottom: 30px;
}

.payment-header h2 {
    color: var(--gold);
    font-family: 'Cormorant Garamond', serif;
    font-size: 32px;
    margin-bottom: 10px;
}

.payment-subtitle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
}

.payment-summary {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 30px;
}

.summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}

.summary-row span {
    color: rgba(255, 255, 255, 0.7);
}

.summary-row strong {
    color: var(--gold);
    font-size: 18px;
}

.investment-form {
    margin-top: 30px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label, .section-label, .crypto-label {
    display: block;
    color: var(--gold);
    margin-bottom: 8px;
    font-weight: 600;
}

.form-group input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: white;
    font-size: 16px;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: var(--gold);
    background: rgba(255, 255, 255, 0.08);
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 10px;
}

.qty-btn {
    width: 40px;
    height: 40px;
    border: 1px solid var(--gold);
    background: rgba(212, 175, 55, 0.1);
    color: var(--gold);
    border-radius: 8px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.qty-btn:hover {
    background: rgba(212, 175, 55, 0.2);
    transform: scale(1.05);
}

.quantity-selector input {
    flex: 1;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
}

.total-calculation {
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 12px;
    padding: 20px;
    margin: 30px 0;
}

.calc-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    color: rgba(255, 255, 255, 0.8);
}

.calc-row.total {
    border-top: 2px solid rgba(212, 175, 55, 0.3);
    margin-top: 10px;
    padding-top: 15px;
}

.calc-row.total strong {
    color: var(--gold);
    font-size: 20px;
}

/* Payment Method Selection */
.payment-method-section {
    margin: 30px 0;
}

.payment-methods {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;
}

.payment-method-btn {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;
}

.payment-method-btn:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(212, 175, 55, 0.5);
}

.payment-method-btn.active {
    background: rgba(212, 175, 55, 0.15);
    border-color: var(--gold);
}

.method-icon {
    font-size: 32px;
}

.method-info {
    flex: 1;
    text-align: left;
}

.method-name {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 4px;
}

.method-desc {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
}

/* Crypto Options */
.crypto-options {
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.crypto-currency-grid, .network-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-bottom: 20px;
}

.crypto-currency-option, .network-option {
    position: relative;
}

.crypto-currency-option input[type="radio"],
.network-option input[type="radio"] {
    position: absolute;
    opacity: 0;
}

.crypto-currency-option label,
.network-option label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 15px;
    background: rgba(255, 255, 255, 0.05);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.crypto-currency-option input:checked + label,
.network-option input:checked + label {
    background: rgba(212, 175, 55, 0.15);
    border-color: var(--gold);
}

.crypto-icon, .network-icon {
    font-size: 32px;
}

.crypto-name, .network-name {
    font-weight: 600;
    font-size: 16px;
    color: white;
}

.crypto-desc {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
}

.crypto-info {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 15px;
    background: rgba(33, 150, 243, 0.1);
    border: 1px solid rgba(33, 150, 243, 0.3);
    border-radius: 8px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 15px;
}

.crypto-info svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    stroke: #2196f3;
}

.btn-full {
    width: 100%;
    padding: 16px;
    font-size: 18px;
    margin-top: 20px;
}

.payment-note {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    padding: 15px;
    background: rgba(16, 185, 129, 0.1);
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
}

.payment-note svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    stroke: #10b981;
}

.spinner {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

/* Error Modal Styles */
.error-modal-content {
    max-width: 700px;
}

.error-icon {
    font-size: 64px;
    text-align: center;
    margin-bottom: 20px;
}

.error-modal-content h3 {
    color: var(--gold);
    font-size: 28px;
    text-align: center;
    margin-bottom: 15px;
}

.error-modal-content p {
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
    margin-bottom: 25px;
}

.setup-steps, .alternative-option {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
}

.setup-steps h4, .alternative-option h4 {
    color: var(--gold);
    margin-bottom: 15px;
}

.setup-steps ol, .alternative-option ol {
    color: rgba(255, 255, 255, 0.8);
    margin-left: 20px;
}

.setup-steps li, .alternative-option li {
    margin-bottom: 10px;
    line-height: 1.6;
}

.setup-steps code {
    background: rgba(0, 0, 0, 0.3);
    padding: 2px 8px;
    border-radius: 4px;
    color: #4ade80;
    font-family: monospace;
}

.setup-steps ul {
    margin-left: 20px;
    margin-top: 8px;
}

@media (max-width: 768px) {
    .payment-modal-content, .error-modal-content {
        margin: 20px;
        padding: 30px 20px;
        max-height: calc(100vh - 40px);
    }
    
    .payment-header h2 {
        font-size: 24px;
    }
    
    .payment-methods {
        grid-template-columns: 1fr;
    }
    
    .crypto-currency-grid {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Add styles to head
if (!document.getElementById('stripe-payment-styles')) {
    const styleElement = document.createElement('div');
    styleElement.id = 'stripe-payment-styles';
    styleElement.innerHTML = modalStyles;
    document.head.appendChild(styleElement);
}

console.log('💳 Stripe payment module loaded with crypto support (USDC, USDP)');
