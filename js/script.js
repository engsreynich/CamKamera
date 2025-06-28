// Camera Shop Website JavaScript

// Global variables
let cart = [];
let currentFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website functionality
function initializeWebsite() {
    setupEventListeners();
    updateCartDisplay();
    setupScrollEffects();
    setupProductFiltering();
    setupSearch();
    displayCurrentYear();
    loadCartFromStorage();
}

// Event Listeners
function setupEventListeners() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', showCart);
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            addToCart(this);
        });
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            filterProducts(this.dataset.filter);
            updateFilterButtons(this);
        });
    });
    
    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Contact form
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
    
    // Smooth scrolling for navigation links
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
}

// Shopping Cart Functions
function addToCart(button) {
    const product = {
        id: Date.now() + Math.random(),
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image,
        quantity: 1
    };
    
    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.name === product.name);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showAddToCartAnimation(button);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
    renderCartItems();
}

function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            product.quantity = newQuantity;
            updateCartDisplay();
            saveCartToStorage();
            renderCartItems();
        }
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Add animation class
    cartCount.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => {
        cartCount.classList.remove('animate__animated', 'animate__pulse');
    }, 1000);
}

function showCart() {
    renderCartItems();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = total.toFixed(2);
}

function showAddToCartAnimation(button) {
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span>';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-check"></i> Added!';
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1000);
    }, 500);
}

// Product Filtering
function filterProducts(filter) {
    currentFilter = filter;
    const brandSections = document.querySelectorAll('.brand-section');
    
    brandSections.forEach(section => {
        if (filter === 'all') {
            section.style.display = 'block';
            section.classList.remove('hidden');
        } else {
            if (section.dataset.brand === filter) {
                section.style.display = 'block';
                section.classList.remove('hidden');
            } else {
                section.style.display = 'none';
                section.classList.add('hidden');
            }
        }
    });
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function updateFilterButtons(activeButton) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Search Functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (!searchTerm) {
        // Reset to current filter if search is empty
        filterProducts(currentFilter);
        return;
    }
    
    const allProducts = document.querySelectorAll('.product-card');
    const brandSections = document.querySelectorAll('.brand-section');
    
    // Hide all brand sections first
    brandSections.forEach(section => {
        section.style.display = 'none';
    });
    
    let hasResults = false;
    
    allProducts.forEach(product => {
        const productTitle = product.querySelector('.product-title').textContent.toLowerCase();
        const productDescription = product.querySelector('.text-muted').textContent.toLowerCase();
        const brandSection = product.closest('.brand-section');
        
        if (productTitle.includes(searchTerm) || productDescription.includes(searchTerm)) {
            product.style.display = 'block';
            brandSection.style.display = 'block';
            hasResults = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (!hasResults) {
        showNoResultsMessage();
    }
    
    // Scroll to products section
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showNoResultsMessage() {
    const productsSection = document.getElementById('products');
    const existingMessage = document.getElementById('noResultsMessage');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const noResultsDiv = document.createElement('div');
    noResultsDiv.id = 'noResultsMessage';
    noResultsDiv.className = 'text-center py-5';
    noResultsDiv.innerHTML = `
        <div class="alert alert-info">
            <h4>No products found</h4>
            <p>Try adjusting your search terms or browse our categories above.</p>
            <button class="btn btn-primary" onclick="clearSearch()">View All Products</button>
        </div>
    `;
    
    productsSection.appendChild(noResultsDiv);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    const noResultsMessage = document.getElementById('noResultsMessage');
    if (noResultsMessage) {
        noResultsMessage.remove();
    }
    filterProducts('all');
    
    // Reset filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Simulate form submission
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.innerHTML = '<span class="loading"></span> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        showSuccessMessage('Thank you for your message! We\'ll get back to you soon.');
        document.getElementById('contactForm').reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function showSuccessMessage(message) {
    const contactSection = document.getElementById('contact');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message fade-in';
    successDiv.textContent = message;
    
    contactSection.insertBefore(successDiv, contactSection.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

// Checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulate checkout process
    const checkoutBtn = document.getElementById('checkoutBtn');
    const originalText = checkoutBtn.textContent;
    
    checkoutBtn.innerHTML = '<span class="loading"></span> Processing...';
    checkoutBtn.disabled = true;
    
    setTimeout(() => {
        alert(`Thank you for your order! Total: $${total.toFixed(2)}\n\nThis is a demo - no actual payment was processed.`);
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        
        // Close modal
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();
        
        checkoutBtn.textContent = originalText;
        checkoutBtn.disabled = false;
    }, 2000);
}

// Scroll Effects
function setupScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .brand-card').forEach(el => {
        observer.observe(el);
    });
}

// Local Storage Functions
function saveCartToStorage() {
    localStorage.setItem('cameraShopCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cameraShopCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Utility Functions
function displayCurrentYear() {
    const yearElement = document.getElementById('displayYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Product filtering setup
function setupProductFiltering() {
    // Initially show all products
    filterProducts('all');
}

// Search setup
function setupSearch() {
    // Add search suggestions (optional enhancement)
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase();
        if (value.length > 2) {
            // Could implement search suggestions here
        }
    });
}

// Make functions globally available
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearSearch = clearSearch;

// Initialize AOS (Animate On Scroll) if available
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true
    });
}

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Performance optimization
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Responsive design helpers
function isMobile() {
    return window.innerWidth <= 768;
}

function isTablet() {
    return window.innerWidth > 768 && window.innerWidth <= 1024;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addToCart,
        removeFromCart,
        updateQuantity,
        filterProducts,
        performSearch
    };
}

