// Product data
const products = [
    { id: 1, name: 'Modern Sofa', price: 27999.99, category: 'sofas', description: 'This comfortable modern sofa is perfect for your living room. Made with high-quality materials and available in various colors.', image: 'sofa.jpg', rating: 5.0, reviews: 120, specs: { dimensions: '220cm (L) x 95cm (W) x 85cm (H)', material: 'Solid wood frame with premium fabric upholstery', seatingCapacity: '3-4 persons', colorOptions: 'Black, White, Gray, Blue', warranty: '2 years on frame, 1 year on upholstery' } },
    { id: 2, name: 'Dining Table', price: 16799.99, category: 'tables', description: 'A sturdy dining table that seats up to 6 people. Perfect for family meals.', image: 'diningtable.jpg', rating: 4.8, reviews: 85, specs: { dimensions: '180cm (L) x 90cm (W) x 75cm (H)', material: 'Solid oak wood with varnish finish', seatingCapacity: '6 persons', colorOptions: 'Natural Oak, Dark Brown', warranty: '3 years on structure' } },
    { id: 3, name: 'Bedroom Set', price: 44799.99, category: 'beds', description: 'Complete bedroom set including bed, nightstands, and dresser. Elegant and functional.', image: 'bedroomset.jpg', rating: 4.9, reviews: 95, specs: { dimensions: 'King size bed: 200cm (L) x 180cm (W) x 90cm (H)', material: 'MDF with veneer finish', piecesIncluded: 'Bed frame, 2 nightstands, dresser', colorOptions: 'White, Black, Walnut', warranty: '2 years on all pieces' } },
    { id: 4, name: 'Office Chair', price: 8399.99, category: 'chairs', description: 'Ergonomic office chair with adjustable height and lumbar support.', image: 'officechair.jpg', rating: 4.7, reviews: 150, specs: { dimensions: '65cm (W) x 60cm (D) x 100-110cm (H)', material: 'Mesh fabric and metal frame', adjustments: 'Height, lumbar support, tilt', weightCapacity: '120kg', warranty: '1 year on parts' } },
    { id: 5, name: 'Coffee Table', price: 11199.99, category: 'tables', description: 'Modern coffee table with storage space underneath.', image: 'coffeetable.jpg', rating: 4.6, reviews: 70, specs: { dimensions: '120cm (L) x 60cm (W) x 45cm (H)', material: 'Glass top with metal legs', storage: '1 drawer and shelf underneath', colorOptions: 'Black, Silver', warranty: '2 years on frame' } },
    { id: 6, name: 'Loveseat', price: 22399.99, category: 'sofas', description: 'Cozy loveseat for two, perfect for small spaces.', image: 'loveseat.jpg', rating: 4.8, reviews: 110, specs: { dimensions: '150cm (L) x 85cm (W) x 80cm (H)', material: 'Wood frame with microfiber upholstery', seatingCapacity: '2 persons', colorOptions: 'Beige, Navy, Gray', warranty: '2 years on frame, 1 year on fabric' } },
    { id: 7, name: 'Recliner Chair', price: 19599.99, category: 'chairs', description: 'Comfortable recliner chair with adjustable positions.', image: 'reclinerchair.jpg', rating: 4.9, reviews: 130, specs: { dimensions: '90cm (W) x 95cm (D) x 105cm (H)', material: 'Leather upholstery with metal mechanism', positions: 'Multiple recline positions', weightCapacity: '100kg', warranty: '2 years on mechanism' } },
    { id: 8, name: 'Bookshelf', price: 7279.99, category: 'storage', description: 'Tall bookshelf with multiple shelves for organization.', image: 'bookshelf.jpg', rating: 4.5, reviews: 60, specs: { dimensions: '80cm (W) x 30cm (D) x 180cm (H)', material: 'Particle board with laminate finish', shelves: '5 adjustable shelves', weightCapacity: '50kg per shelf', warranty: '1 year on structure' } },
    { id: 9, name: 'King Bed Frame', price: 33599.99, category: 'beds', description: 'Solid wood king bed frame with storage drawers.', image: 'kingbedframe.jpg', rating: 4.7, reviews: 75, specs: { dimensions: '200cm (L) x 180cm (W) x 90cm (H)', material: 'Solid pine wood', storage: '4 drawers under bed', colorOptions: 'Natural Pine, Stained Walnut', warranty: '3 years on frame' } },
    { id: 10, name: 'Dining Chairs (Set of 4)', price: 13999.99, category: 'chairs', description: 'Set of 4 matching dining chairs.', image: 'diningchairs.jpg', rating: 4.6, reviews: 90, specs: { dimensions: '45cm (W) x 50cm (D) x 85cm (H) each', material: 'Upholstered seat with wooden legs', seatingCapacity: '4 chairs', colorOptions: 'Black, Brown, White', warranty: '1 year on upholstery' } }
];

// User data (in a real app, this would be on a server)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Orders data
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Reviews data
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

// Cart functionality using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalItems);
}

// Add item to cart
function addToCart(productId, name, price, quantity = 1, replace = false) {
    productId = parseInt(productId);
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (replace) {
            existingItem.quantity = quantity;
        } else {
            existingItem.quantity += quantity;
        }
    } else {
        const product = products.find(p => p.id === productId);
        const image = product ? product.image : 'placeholder.jpg';
        cart.push({ id: productId, name, price: parseFloat(price), quantity, image });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Remove item from cart
function removeFromCart(productId) {
    productId = parseInt(productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    // Re-fetch cart from localStorage to ensure global state is updated
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    displayCart();
}

// Update item quantity in cart
function updateQuantity(productId, newQuantity) {
    productId = parseInt(productId);
    const qty = parseInt(newQuantity);
    if (isNaN(qty)) return; // Ignore invalid quantity input
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = qty;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            // Re-fetch cart from localStorage to ensure global state is updated
            cart = JSON.parse(localStorage.getItem('cart')) || [];
            updateCartCount();
            displayCart();
        }
    }
}

// Display cart items
function displayCart() {
    // Always re-fetch cart from localStorage to ensure latest state
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    const emptyCartElement = document.getElementById('empty-cart');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutSection = document.getElementById('checkout-section');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartTotalElement.textContent = '₱0.00';
        if (emptyCartElement) emptyCartElement.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        if (checkoutSection) checkoutSection.style.display = 'none';
        return;
    }

    if (emptyCartElement) emptyCartElement.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'flex';
    if (checkoutSection) checkoutSection.style.display = 'flex';

    let total = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const productReviews = reviews.filter(r => r.productId === item.id);
        const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
        const reviewCount = productReviews.length;
        const stars = '★'.repeat(Math.floor(avgRating)) + (avgRating % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.floor(avgRating) - (avgRating % 1 >= 0.5 ? 1 : 0));

        return `
            <div class="cart-item" data-price="${item.price.toFixed(2)}" data-id="${item.id}">
                <div style="display: flex; align-items: flex-start; flex-grow: 1;">
                    <img src="${item.image || products.find(p => p.id === item.id)?.image || 'placeholder.jpg'}" alt="${item.name}" style="width: 5rem; height: 5rem; border-radius: 0.5rem; margin-right: 1rem; object-fit: cover;">
                    <div>
                        <h2 style="font-size: 1.125rem; font-weight: 600; color: #111827; margin-bottom: 0.5rem;">${item.name}</h2>
                        <div class="rating" style="font-size: 0.875rem; margin-bottom: 0.25rem;">
                            <span class="stars">${stars}</span> <span class="rating-text">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</span>
                        </div>
                        <p style="font-size: 0.875rem; color: #6b7280;">₱${item.price.toFixed(2)} each</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; margin-left: 1rem; gap: 1rem;">
                    <div style="display: flex; align-items: center; border: 1px solid #d1d5db; border-radius: 0.375rem; overflow: hidden;">
                        <button class="qty-btn quantity-btn" data-action="decrement">-</button>
                            <input type="number" value="${item.quantity}" min="1" style="width: 3rem; text-align: center; border: none; padding: 0.25rem; color: #1f2937;">
                            <button class="qty-btn quantity-btn" data-action="increment">+</button>
                    </div>
                    <span style="font-size: 1.125rem; font-weight: bold; color: #1f2937; width: 6rem; text-align: right;">₱${itemTotal.toFixed(2)}</span>
                    <button class="remove-item-btn remove-btn">Remove</button>
                </div>
            </div>
            ${index < cart.length - 1 ? '<div class="cart-item-separator"></div>' : ''}
        `;
    }).join('');

    cartTotalElement.textContent = `₱${total.toFixed(2)}`;
}

// Display order summary in checkout
function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalElement = document.getElementById('order-total');

    if (!orderItemsContainer || !orderTotalElement) return;

    let total = 0;
    orderItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `<div class="order-item"><span>${item.name} x${item.quantity}</span><span>₱${itemTotal.toFixed(2)}</span></div>`;
    }).join('');

    orderTotalElement.textContent = total.toFixed(2);
}

// Load product details on product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-image').alt = product.name;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `₱${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;

        // Load rating
        const productReviews = reviews.filter(r => r.productId === productId);
        const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
        const reviewCount = productReviews.length;

        const starsElement = document.querySelector('.stars');
        const ratingTextElement = document.querySelector('.rating-text');
        if (starsElement && ratingTextElement) {
            const fullStars = Math.floor(avgRating);
            const hasHalfStar = avgRating % 1 >= 0.5;
            starsElement.textContent = '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
            ratingTextElement.innerHTML = `<a href="productreviews.html?id=${productId}" style="color: #666; text-decoration: none;">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</a>`;
        }

        // Load specifications
        const specsDiv = document.querySelector('.product-specs');
        if (specsDiv && product.specs) {
            let specsHtml = '<h3>Specifications</h3><ul>';
            for (const [key, value] of Object.entries(product.specs)) {
                const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                specsHtml += `<li><strong>${label}:</strong> ${value}</li>`;
            }
            specsHtml += '</ul>';
            specsDiv.innerHTML = specsHtml;
        }

        const btn = document.querySelector('.add-to-cart-btn');
        btn.dataset.id = product.id;
        btn.dataset.name = product.name;
        btn.dataset.price = product.price.toFixed(2);
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = document.getElementById('product-name').textContent;
            const productPrice = document.getElementById('product-price').textContent.replace('₱', '');
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            addToCart(productId, productName, productPrice, quantity, true);
        });
    }
}

// Display search results
function displaySearchResults() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const searchQueryElement = document.getElementById('search-query');
    const resultsList = document.getElementById('search-results-list');
    const noResults = document.getElementById('no-results');

    if (!query) return;

    searchQueryElement.textContent = query;
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length === 0) {
        resultsList.innerHTML = '';
        noResults.style.display = 'block';
        return;
    }

    noResults.style.display = 'none';
    resultsList.innerHTML = filteredProducts.map(product => {
        const productReviews = reviews.filter(r => r.productId === product.id);
        const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
        const reviewCount = productReviews.length;
        const stars = '★'.repeat(Math.floor(avgRating)) + (avgRating % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.floor(avgRating) - (avgRating % 1 >= 0.5 ? 1 : 0));

        return `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${product.price.toFixed(2)}</p>
                <div class="rating">
                    <span class="stars">${stars}</span> <span class="rating-text">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</span>
                </div>
                <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;
    }).join('');

    // Attach event listeners to the newly added buttons
    document.querySelectorAll('#search-results-list .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const quantity = 1;
            addToCart(productId, productName, productPrice, quantity);
        });
    });
}

// Display featured products on index.html
function displayFeaturedProducts() {
    const featuredContainer = document.querySelector('#products .product-grid');
    if (!featuredContainer) return;

    const featuredProducts = products.slice(0, 3); // First 3 products

    featuredContainer.innerHTML = featuredProducts.map(product => {
        const productReviews = reviews.filter(r => r.productId === product.id);
        const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
        const reviewCount = productReviews.length;
        const stars = '★'.repeat(Math.floor(avgRating)) + (avgRating % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.floor(avgRating) - (avgRating % 1 >= 0.5 ? 1 : 0));

        return `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${product.price.toFixed(2)}</p>
                <div class="rating">
                    <span class="stars">${stars}</span> <span class="rating-text">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</span>
                </div>
                <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;
    }).join('');
}

// Display products on products page with filters
function displayProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;

    let filteredProducts = products;

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(p => p === '+' ? Infinity : parseFloat(p));
        filteredProducts = filteredProducts.filter(product => {
            if (max === Infinity) return product.price >= min;
            return product.price >= min && product.price <= max;
        });
    }

    productList.innerHTML = filteredProducts.map(product => {
        const productReviews = reviews.filter(r => r.productId === product.id);
        const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
        const reviewCount = productReviews.length;
        const stars = '★'.repeat(Math.floor(avgRating)) + (avgRating % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.floor(avgRating) - (avgRating % 1 >= 0.5 ? 1 : 0));

        return `
            <div class="product" data-category="${product.category}" data-price="${product.price}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₱${product.price.toFixed(2)}</p>
                <div class="rating">
                    <span class="stars">${stars}</span> <span class="rating-text">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</span>
                </div>
                <a href="product-detail.html?id=${product.id}" class="btn">View Details</a>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price.toFixed(2)}">Add to Cart</button>
            </div>
        `;
    }).join('');

    // Attach event listeners to the newly added buttons
    document.querySelectorAll('#product-list .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const quantity = 1;
            addToCart(productId, productName, productPrice, quantity);
        });
    });
}

// User authentication functions
function loginUser(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        return true;
    }
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    // Redirect to index.html
    window.location.href = 'index.html';
}

function signupUser(firstName, lastName, email, phone, address, password) {
    if (users.find(u => u.email === email)) {
        return false; // User already exists
    }
    const newUser = { firstName, lastName, email, phone, address, password, addresses: [] };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function updateAuthUI() {
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (currentUser) {
            authLink.innerHTML = `<a href="account.html">Account</a> | <a href="orders.html">Orders</a> | <a href="#" onclick="logoutUser()">Logout</a>`;
        } else {
            authLink.innerHTML = '<a href="login.html">Login</a>';
        }
    }
}

// Display user orders
function displayOrders() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    const ordersList = document.getElementById('orders-list');
    const noOrders = document.getElementById('no-orders');

    const userOrders = orders.filter(order => order.userEmail === currentUser.email);

    if (userOrders.length === 0) {
        ordersList.innerHTML = '';
        noOrders.style.display = 'block';
        return;
    }

    noOrders.style.display = 'none';
    ordersList.innerHTML = userOrders.map(order => {
        const isPickup = !!order.pickupBranch;
        let buttons = '';

        if (order.status === 'Processing') {
            buttons += `<button class="btn cancel-order-btn" data-order-id="${order.id}" style="background-color: #f39c12; margin-left: 10px;">Cancel Order</button>`;
            if (isPickup) {
                buttons += `<button class="btn ready-pickup-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Ready for Pickup</button>`;
            } else {
                buttons += `<button class="btn ship-order-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Shipped</button>`;
            }
        } else if (order.status === 'Shipped') {
            if (isPickup) {
                buttons += `<button class="btn pickup-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Picked Up</button>`;
            } else {
                buttons += `<button class="btn complete-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Completed</button>`;
            }
        } else if (order.status === 'Ready for Pickup') {
            buttons += `<button class="btn pickup-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Picked Up</button>`;
        } else if (order.status === 'Completed') {
            buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button><button class="btn add-review-btn" data-order-id="${order.id}" style="background-color: #9b59b6; margin-left: 10px;">Add Reviews</button><button class="btn return-order-btn" data-order-id="${order.id}" style="background-color: #f39c12; margin-left: 10px;">Return Order</button>`;
        } else if (order.status === 'Ongoing Return Process') {
            buttons += `<button class="btn mark-returned-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Returned</button><button class="btn mark-failed-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Mark as Failed</button>`;
        } else if (order.status === 'Returned') {
            buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button>`;
        } else if (order.status === 'Completed (Failed Return)') {
            buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button><button class="btn add-review-btn" data-order-id="${order.id}" style="background-color: #9b59b6; margin-left: 10px;">Add Reviews</button>`;
        } else if (order.status === 'Cancelled') {
            buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button>`;
        }

        return `
            <div class="order-card">
                <h3>Order #${order.id}</h3>
                <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
                <p>Total: ₱${order.total.toFixed(2)}</p>
                <p>Payment: ${order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</p>
                <p>Status: ${order.status}</p>
                <p>Delivery Address: ${order.deliveryAddress || 'Not specified'}</p>
                <p>Pickup Branch: ${order.pickupBranch || 'N/A'}</p>
                <h4>Items:</h4>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
                </ul>
                <a href="order-detail.html?id=${order.id}" class="btn">View Details</a>
                ${buttons}
            </div>
        `;
    }).join('');

    // Add event listeners for cancel buttons
    document.querySelectorAll('.cancel-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Are you sure you want to cancel this order?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Cancelled';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for ship buttons
    document.querySelectorAll('.ship-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as shipped?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Shipped';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for ready pickup buttons
    document.querySelectorAll('.ready-pickup-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as ready for pickup?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Ready for Pickup';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for pickup buttons
    document.querySelectorAll('.pickup-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as picked up?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for complete buttons
    document.querySelectorAll('.complete-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as completed?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for add review buttons
    document.querySelectorAll('.add-review-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            window.location.href = `addreviews.html?id=${orderId}`;
        });
    });

    // Add event listeners for return order buttons
    document.querySelectorAll('.return-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            window.location.href = `returnitems.html?id=${orderId}`;
        });
    });

    // Add event listeners for mark returned buttons
    document.querySelectorAll('.mark-returned-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this return as completed?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Returned';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    let refundMessage = '';
                    if (order.paymentMethod === 'card') {
                        refundMessage = 'Refund will be processed back to your credit/debit card within 5-7 business days.';
                    } else if (order.paymentMethod === 'gcash') {
                        refundMessage = 'Refund will be processed back to your GCash account within 3-5 business days.';
                    } else if (order.paymentMethod === 'cod') {
                        refundMessage = `Refund will be available for pickup at ${order.returnBranch} within 7-10 business days.`;
                    }
                    alert('Return completed. ' + refundMessage);
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for mark failed buttons
    document.querySelectorAll('.mark-failed-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this return as failed? This will prevent further returns for this order.')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed (Failed Return)';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    alert('Return marked as failed. No further returns allowed for this order.');
                    displayOrders(); // Refresh the list
                }
            }
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                orders = orders.filter(o => o.id !== orderId);
                localStorage.setItem('orders', JSON.stringify(orders));
                displayOrders(); // Refresh the list
            }
        });
    });
}

// Display account info
function displayAccount() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('account-info').innerHTML = `
        <div class="account-details">
            <h3>Profile Information</h3>
            <p><strong>Name:</strong> ${currentUser.firstName} ${currentUser.lastName}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <p><strong>Phone:</strong> ${currentUser.phone || 'Not provided'}</p>
            <p><strong>Address:</strong> ${currentUser.address || 'Not provided'}</p>
            <a href="accountedit.html" class="btn">Edit Profile</a>
            <h3>My Addresses</h3>
            <p>${currentUser.addresses && currentUser.addresses.length > 0 ? currentUser.addresses.join('<br>') : 'No additional addresses'}</p>
            <a href="addnewaddresses.html" class="btn">Manage Addresses</a>
            <a href="orders.html" class="btn">View My Orders</a>
            <a href="updatepassword.html" class="btn">Update Password</a>
            <button id="delete-account-btn" style="background-color: #dc2626; color: #fff; padding: 0.5rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer; margin-left: 1rem;">Delete Account</button>
        </div>
    `;

    document.getElementById('delete-account-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            users = users.filter(u => u.email !== currentUser.email);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.removeItem('currentUser');
            currentUser = null;
            alert('Account deleted.');
            window.location.href = 'index.html';
        }
    });
}

// Display account edit
function displayAccountEdit() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('account-info').innerHTML = `
        <div class="account-details">
            <h3>Edit Profile</h3>
            <form id="profile-form">
                <div class="form-group">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" value="${currentUser.firstName}" required>
                </div>
                <div class="form-group">
                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" value="${currentUser.lastName}" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" value="${currentUser.email}" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="tel" id="phone" value="${currentUser.phone || ''}">
                </div>
                <div class="form-group">
                    <label for="address">Address</label>
                    <input type="text" id="address" value="${currentUser.address || ''}">
                </div>
                <button type="submit" class="btn">Save Changes</button>
                <a href="account.html" class="btn secondary">Cancel</a>
            </form>
        </div>
    `;

    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const newEmail = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        if (phone && !/^\d{11}$/.test(phone) && !/^\+63\d{10}$/.test(phone)) {
            alert('Phone number must be 11 digits or +63 followed by 10 digits.');
            return;
        }

        const oldEmail = currentUser.email;

        // Update currentUser
        currentUser.firstName = firstName;
        currentUser.lastName = lastName;
        currentUser.email = newEmail;
        currentUser.phone = phone;
        currentUser.address = address;

        // Update in users array
        const userIndex = users.findIndex(u => u.email === oldEmail);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }

        // Update orders if email changed
        if (oldEmail !== newEmail) {
            orders.forEach(order => {
                if (order.userEmail === oldEmail) {
                    order.userEmail = newEmail;
                }
            });
            localStorage.setItem('orders', JSON.stringify(orders));
        }

        alert('Profile updated successfully!');
        updateAuthUI(); // Update nav if name changed
        window.location.href = 'account.html'; // Redirect back
    });
}

// Display manage addresses
function displayManageAddresses() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    let addressesHtml = '';
    if (currentUser.addresses && currentUser.addresses.length > 0) {
        addressesHtml = '<ul>' + currentUser.addresses.map((addr, index) => `<li>${addr} <button class="delete-addr-btn" data-index="${index}" style="background-color: #dc2626; color: #fff; border: none; padding: 0.25rem 0.5rem; border-radius: 0.25rem; cursor: pointer;">Delete</button></li>`).join('') + '</ul>';
    } else {
        addressesHtml = '<p>No additional addresses</p>';
    }

    document.getElementById('account-info').innerHTML = `
        <div class="account-details">
            <h3>My Addresses</h3>
            ${addressesHtml}
            <div class="form-group">
                <label for="new-address">Add New Address</label>
                <input type="text" id="new-address" placeholder="Enter new address">
                <button id="add-address-btn" class="btn" style="margin-left: 0.5rem;">Add Address</button>
            </div>
            <a href="account.html" class="btn secondary">Back to Account</a>
        </div>
    `;

    document.getElementById('add-address-btn').addEventListener('click', function() {
        const newAddress = document.getElementById('new-address').value.trim();
        if (newAddress) {
            if (!currentUser.addresses) currentUser.addresses = [];
            currentUser.addresses.push(newAddress);
            // Update in users array
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            document.getElementById('new-address').value = '';
            displayManageAddresses(); // Refresh display
        }
    });

    document.querySelectorAll('.delete-addr-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            currentUser.addresses.splice(index, 1);
            // Update in users array
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            displayManageAddresses(); // Refresh display
        });
    });
}

// Display order details
function displayOrderDetail() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Re-fetch orders from localStorage to ensure latest data
    orders = JSON.parse(localStorage.getItem('orders')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        // Use a default order for demonstration
        order = {
            id: '123456',
            items: [],
            total: 0,
            date: new Date().toISOString(),
            status: 'Processing',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            paymentMethod: 'cod',
            deliveryAddress: 'N/A',
            pickupBranch: 'N/A'
        };
    }

    const isPickup = !!order.pickupBranch;
    let buttons = '';

    if (order.status === 'Processing') {
        buttons += `<button class="btn cancel-order-btn" data-order-id="${order.id}" style="background-color: #f39c12; margin-left: 10px;">Cancel Order</button>`;
        if (isPickup) {
            buttons += `<button class="btn ready-pickup-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Ready for Pickup</button>`;
        } else {
            buttons += `<button class="btn ship-order-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Shipped</button>`;
        }
    } else if (order.status === 'Shipped') {
        if (isPickup) {
            buttons += `<button class="btn pickup-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Picked Up</button>`;
        } else {
            buttons += `<button class="btn complete-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Completed</button>`;
        }
    } else if (order.status === 'Ready for Pickup') {
        buttons += `<button class="btn pickup-order-btn" data-order-id="${order.id}" style="background-color: #3498db; margin-left: 10px;">Mark as Picked Up</button>`;
    } else if (order.status === 'Completed') {
        buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button><button class="btn add-review-btn" data-order-id="${order.id}" style="background-color: #9b59b6; margin-left: 10px;">Add Reviews</button><button class="btn return-order-btn" data-order-id="${order.id}" style="background-color: #f39c12; margin-left: 10px;">Return Order</button>`;
    } else if (order.status === 'Ongoing Return Process') {
        buttons += `<button class="btn mark-returned-btn" data-order-id="${order.id}" style="background-color: #27ae60; margin-left: 10px;">Mark as Returned</button><button class="btn mark-failed-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Mark as Failed</button>`;
    } else if (order.status === 'Returned') {
        buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button>`;
    } else if (order.status === 'Completed (Failed Return)') {
        buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button><button class="btn add-review-btn" data-order-id="${order.id}" style="background-color: #9b59b6; margin-left: 10px;">Add Reviews</button>`;
    } else if (order.status === 'Cancelled') {
        buttons += `<button class="btn delete-order-btn" data-order-id="${order.id}" style="background-color: #e74c3c; margin-left: 10px;">Delete Order</button>`;
    }

    document.getElementById('order-info').innerHTML = `
        <div class="order-card">
            <h3>Order #${order.id}</h3>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ₱${order.total.toFixed(2)}</p>
            <p>Payment: ${order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</p>
            <p>Status: ${order.status}</p>
            <p>Delivery Address: ${order.deliveryAddress || 'Not specified'}</p>
            <p>Pickup Branch: ${order.pickupBranch || 'N/A'}</p>
            <h4>Items:</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
            ${buttons}
            <a href="order-tracking.html?id=${order.id}" class="btn" style="margin-left: 10px;">Track Order</a>
        </div>
    `;

    // Add event listeners for cancel buttons
    document.querySelectorAll('.cancel-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Are you sure you want to cancel this order?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Cancelled';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for ship buttons
    document.querySelectorAll('.ship-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as shipped?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Shipped';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for ready pickup buttons
    document.querySelectorAll('.ready-pickup-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as ready for pickup?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Ready for Pickup';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for pickup buttons
    document.querySelectorAll('.pickup-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as picked up?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for complete buttons
    document.querySelectorAll('.complete-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this order as completed?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for add review buttons
    document.querySelectorAll('.add-review-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            window.location.href = `addreviews.html?id=${orderId}`;
        });
    });

    // Add event listeners for return order buttons
    document.querySelectorAll('.return-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            window.location.href = `returnitems.html?id=${orderId}`;
        });
    });

    // Add event listeners for mark returned buttons
    document.querySelectorAll('.mark-returned-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this return as completed?')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Returned';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    let refundMessage = '';
                    if (order.paymentMethod === 'card') {
                        refundMessage = 'Refund will be processed back to your credit/debit card within 5-7 business days.';
                    } else if (order.paymentMethod === 'gcash') {
                        refundMessage = 'Refund will be processed back to your GCash account within 3-5 business days.';
                    } else if (order.paymentMethod === 'cod') {
                        refundMessage = `Refund will be available for pickup at ${order.returnBranch} within 7-10 business days.`;
                    }
                    alert('Return completed. ' + refundMessage);
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for mark failed buttons
    document.querySelectorAll('.mark-failed-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Mark this return as failed? This will prevent further returns for this order.')) {
                const order = orders.find(o => o.id === orderId);
                if (order) {
                    order.status = 'Completed (Failed Return)';
                    localStorage.setItem('orders', JSON.stringify(orders));
                    alert('Return marked as failed. No further returns allowed for this order.');
                    displayOrderDetail(); // Refresh the page
                }
            }
        });
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-order-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const orderId = this.dataset.orderId;
            if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
                orders = orders.filter(o => o.id !== orderId);
                localStorage.setItem('orders', JSON.stringify(orders));
                window.location.href = 'orders.html'; // Redirect to orders page
            }
        });
    });

}

// Display add reviews
function displayAddReviews() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Re-fetch orders from localStorage to ensure latest data
    orders = JSON.parse(localStorage.getItem('orders')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    const order = orders.find(o => o.id === orderId);

    if (!order || order.status !== 'Completed') {
        document.getElementById('review-form').innerHTML = '<p>Order not found or not completed.</p>';
        return;
    }

    let formHtml = `<h3>Review Order #${order.id}</h3><form id="review-submit-form">`;

    order.items.forEach((item, index) => {
        formHtml += `
            <div class="review-item">
                <h4><input type="checkbox" name="select-${index}" checked> ${item.name}</h4>
                <div class="form-group">
                    <label>Rating:</label>
                    <select name="rating-${index}">
                        <option value="">Select Rating</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Comment:</label>
                    <textarea name="comment-${index}" rows="3" placeholder="Write your review..."></textarea>
                </div>
            </div>
        `;
    });

    formHtml += '<button type="submit" class="btn">Submit Reviews</button></form>';

    document.getElementById('review-form').innerHTML = formHtml;

    document.getElementById('review-submit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const orderItems = order.items;
        let submitted = false;
        for (let i = 0; i < orderItems.length; i++) {
            const selected = this.elements[`select-${i}`].checked;
            const rating = this.elements[`rating-${i}`].value;
            const comment = this.elements[`comment-${i}`].value;
            if (selected && rating && comment.trim()) {
                const review = {
                    productId: orderItems[i].id,
                    userEmail: currentUser.email,
                    rating: parseInt(rating),
                    comment: comment.trim(),
                    date: new Date().toISOString()
                };
                reviews.push(review);
                submitted = true;
            }
        }
        if (submitted) {
            localStorage.setItem('reviews', JSON.stringify(reviews));
            alert('Reviews submitted successfully!');
        } else {
            alert('Please select at least one product and fill in the rating and comment.');
            return;
        }
        window.location.href = 'orders.html';
    });
}

// Display return items form
function displayReturnItems() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Re-fetch orders from localStorage to ensure latest data
    orders = JSON.parse(localStorage.getItem('orders')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    const order = orders.find(o => o.id === orderId);

    if (!order || order.status !== 'Completed') {
        document.getElementById('order-info').innerHTML = '<p>Order not found or not eligible for return.</p>';
        return;
    }

    document.getElementById('order-info').innerHTML = `
        <p><strong>Order #${order.id}</strong></p>
        <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
        <p>Total: ₱${order.total.toFixed(2)}</p>
    `;

    document.getElementById('return-order-items').innerHTML = `<ul>${order.items.map(item => `<li>${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}</li>`).join('')}</ul>`;

    document.getElementById('return-order-total').textContent = order.total.toFixed(2);

    document.getElementById('return-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const reason = document.getElementById('return-reason').value;
        const branch = document.getElementById('return-branch').value;
        const message = document.getElementById('return-message').value;

        if (!reason || !branch) {
            alert('Please select a reason and branch.');
            return;
        }

        // Update order status
        order.status = 'Ongoing Return Process';
        order.returnReason = reason;
        order.returnBranch = branch;
        order.returnMessage = message;
        localStorage.setItem('orders', JSON.stringify(orders));

        // Redirect to success page
        window.location.href = `returnitems-success.html?id=${orderId}`;
    });
}

// Display return success
function displayReturnSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');
    if (orderId) {
        document.getElementById('order-number').textContent = '#' + orderId;

        // Find the order to get payment method
        const order = orders.find(o => o.id === orderId);
        if (order) {
            let refundMessage = '';
            if (order.paymentMethod === 'card') {
                refundMessage = 'Your refund will be processed back to your credit/debit card within 5-7 business days.';
            } else if (order.paymentMethod === 'gcash') {
                refundMessage = 'Your refund will be processed back to your GCash account within 3-5 business days.';
            } else if (order.paymentMethod === 'cod') {
                refundMessage = `Your refund will be available for pickup at ${order.returnBranch} within 7-10 business days.`;
            }
            const successSection = document.querySelector('.success');
            if (successSection) {
                const p = document.createElement('p');
                p.textContent = refundMessage;
                successSection.appendChild(p);
            }
        }
    }
}

// Display product reviews
function displayProductReviews() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);

    if (!product) {
        document.getElementById('review-form').innerHTML = '<p>Product not found.</p>';
        return;
    }

    const productReviews = reviews.filter(r => r.productId === productId);
    const avgRating = productReviews.length > 0 ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length : 0;
    const reviewCount = productReviews.length;

    let html = `
        <div class="product-detail-content">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h2>${product.name}</h2>
                <p class="price">₱${product.price.toFixed(2)}</p>
                <div class="rating">
                    <span class="stars">${'★'.repeat(Math.floor(avgRating)) + (avgRating % 1 >= 0.5 ? '☆' : '') + '☆'.repeat(5 - Math.floor(avgRating) - (avgRating % 1 >= 0.5 ? 1 : 0))}</span>
                    <span class="rating-text">(${avgRating.toFixed(1)}/5) - ${reviewCount} reviews</span>
                </div>
                <p>${product.description}</p>
                <a href="product-detail.html?id=${productId}" class="btn">Back to Product Details</a>
            </div>
        </div>
        <h3>Customer Reviews</h3>
    `;

    if (productReviews.length === 0) {
        html += '<p>No reviews yet.</p>';
    } else {
        html += '<div class="reviews-list">';
        productReviews.forEach(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            const canDelete = currentUser && currentUser.email === review.userEmail;
            html += `
                <div class="review-item">
                    <div class="review-header">
                        <span class="stars">${stars}</span>
                        <span class="review-date">${new Date(review.date).toLocaleDateString()}</span>
                        ${canDelete ? `<button class="delete-review-btn" data-review-id="${reviews.indexOf(review)}">Delete</button>` : ''}
                    </div>
                    <p class="review-comment">${review.comment}</p>
                </div>
            `;
        });
        html += '</div>';
    }

    document.getElementById('review-form').innerHTML = html;

    // Add delete event listeners
    document.querySelectorAll('.delete-review-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const reviewId = parseInt(this.dataset.reviewId);
            if (confirm('Are you sure you want to delete this review?')) {
                reviews.splice(reviewId, 1);
                localStorage.setItem('reviews', JSON.stringify(reviews));
                displayProductReviews(); // Refresh
            }
        });
    });
}

// Display order tracking
function displayOrderTracking() {
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Re-fetch orders from localStorage to ensure latest data
    orders = JSON.parse(localStorage.getItem('orders')) || [];

    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    const order = orders.find(o => o.id === orderId);

    if (!order) {
        // Use a default order for demonstration
        order = {
            id: '123456',
            items: [],
            total: 0,
            date: new Date().toISOString(),
            status: 'Processing',
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            paymentMethod: 'cod',
            deliveryAddress: 'N/A',
            pickupBranch: 'N/A'
        };
    }

    document.getElementById('order-info').innerHTML = `
        <div class="order-card">
            <h3>Order #${order.id}</h3>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
            <p>Total: ₱${order.total.toFixed(2)}</p>
            <p>Payment: ${order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Delivery'}</p>
            <p>Status: ${order.status}</p>
            <p>Delivery Address: ${order.deliveryAddress || 'Not specified'}</p>
            <p>Pickup Branch: ${order.pickupBranch || 'N/A'}</p>
            <h4>Items:</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name} x${item.quantity} - ₱${(item.price * item.quantity).toFixed(2)}</li>`).join('')}
            </ul>
        </div>
    `;

    // Generate timeline based on status
    let timelineHtml = '<h3>Order Processing Timeline</h3><div class="timeline">';
    const orderDate = new Date(order.date);
    const isPickup = !!order.pickupBranch;

    let steps;
    if (isPickup) {
        steps = [
            { step: 'Order Placed', date: orderDate.toLocaleDateString(), completed: true },
            { step: 'Processing', date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status !== 'Cancelled' },
            { step: 'Ready for Pickup', date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status === 'Completed' || order.status === 'Ready for Pickup' },
            { step: 'Picked Up', date: order.estimatedDelivery || new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status === 'Completed' }
        ];
    } else {
        steps = [
            { step: 'Order Placed', date: orderDate.toLocaleDateString(), completed: true },
            { step: 'Processing', date: new Date(orderDate.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status !== 'Cancelled' },
            { step: 'Shipped', date: new Date(orderDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status === 'Completed' || order.status === 'Shipped' },
            { step: 'Delivered', date: order.estimatedDelivery || new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(), completed: order.status === 'Completed' }
        ];
    }

    // Add return steps if applicable
    if (order.status === 'Ongoing Return Process') {
        steps.push({ step: 'Return Requested', date: new Date().toLocaleDateString(), completed: true });
        steps.push({ step: 'Return Processing', date: new Date().toLocaleDateString(), completed: false });
    } else if (order.status === 'Returned') {
        steps.push({ step: 'Return Requested', date: new Date().toLocaleDateString(), completed: true });
        steps.push({ step: 'Return Processed', date: new Date().toLocaleDateString(), completed: true });
    } else if (order.status === 'Completed (Failed Return)') {
        steps.push({ step: 'Return Requested', date: new Date().toLocaleDateString(), completed: true });
        steps.push({ step: 'Return Failed', date: new Date().toLocaleDateString(), completed: true });
    }

    if (order.status === 'Cancelled') {
        timelineHtml += '<div class="timeline-item cancelled"><div class="timeline-marker"></div><div class="timeline-content"><h4>Order Cancelled</h4><p>' + new Date().toLocaleDateString() + '</p></div></div>';
    } else {
        steps.forEach(step => {
            const statusClass = step.completed ? 'completed' : 'pending';
            timelineHtml += `<div class="timeline-item ${statusClass}"><div class="timeline-marker"></div><div class="timeline-content"><h4>${step.step}</h4><p>${step.date}</p></div></div>`;
        });
    }
    timelineHtml += '</div>';

    document.getElementById('order-timeline').innerHTML = timelineHtml;
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateAuthUI();

    // Add to cart buttons for static pages (index.html)
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            const productName = this.dataset.name;
            const productPrice = this.dataset.price;
            const quantity = 1;
            addToCart(productId, productName, productPrice, quantity);
        });
    });

    // Display cart if on cart page
    if (document.getElementById('cart-items')) {
        displayCart();

        // Check login for checkout
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
                if (!currentUser) {
                    e.preventDefault();
                    alert('Please log in to proceed with checkout.');
                    window.location.href = 'login.html';
                    return false;
                }
            });
        }

        // Add event listeners for cart functionality
        const cartItemsContainer = document.getElementById('cart-items');
        const cartTotalElement = document.getElementById('cart-total');

        // Event delegation for remove buttons
        cartItemsContainer.addEventListener('click', (event) => {
            const removeBtn = event.target.closest('.remove-item-btn');
            if (removeBtn) {
                const itemToRemove = removeBtn.closest('.cart-item');
                if (itemToRemove) {
                    const itemId = parseInt(itemToRemove.dataset.id);
                    removeFromCart(itemId);
                }
            }

            // Handle quantity buttons
            const qtyBtn = event.target.closest('.qty-btn');
            if (qtyBtn) {
                const itemElement = qtyBtn.closest('.cart-item');
                const input = itemElement.querySelector('input[type="number"]');
                const action = qtyBtn.getAttribute('data-action');
                let quantity = parseInt(input.value, 10);

                if (action === 'increment') {
                    quantity += 1;
                } else if (action === 'decrement' && quantity > 1) {
                    quantity -= 1;
                }

                input.value = quantity;
                updateQuantity(parseInt(itemElement.dataset.id), quantity);
            }
        });

        // Handle input changes
        cartItemsContainer.addEventListener('change', (event) => {
            if (event.target.type === 'number') {
                const itemElement = event.target.closest('.cart-item');
                updateQuantity(parseInt(itemElement.dataset.id), event.target.value);
            }
        });

        // Handle clear cart button
        const clearCartBtn = document.getElementById('clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartCount();
                displayCart();
            });
        }
    }

    // Display order summary if on checkout page
    if (document.getElementById('order-items')) {
        displayOrderSummary();

        // Populate user info
        if (currentUser) {
            document.getElementById('user-info').innerHTML = `
                <p><strong>Name:</strong> ${currentUser.firstName} ${currentUser.lastName}</p>
                <p><strong>Email:</strong> ${currentUser.email}</p>
                <p><strong>Phone:</strong> ${currentUser.phone || 'Not provided'}</p>
            `;
            const addressSelect = document.getElementById('selected-address');
            if (currentUser.address) {
                const option = document.createElement('option');
                option.value = currentUser.address;
                option.textContent = currentUser.address;
                addressSelect.appendChild(option);
            }
            if (currentUser.addresses && currentUser.addresses.length > 0) {
                currentUser.addresses.forEach(addr => {
                    const option = document.createElement('option');
                    option.value = addr;
                    option.textContent = addr;
                    addressSelect.appendChild(option);
                });
            }

            // Populate branch select
            const branchSelect = document.getElementById('selected-branch');
            const branches = [
                { name: 'Main Branch - Quezon City', address: 'Barangay Culiat, Quezon City, Philippines' },
                { name: 'Novaliches Branch', address: 'Barangay San Bartolome, Novaliches, Quezon City, Philippines' },
                { name: 'San Mateo Rizal Branch', address: 'Barangay Ampid I, San Mateo Rizal, Philippines' },
                { name: 'Valenzuela Branch', address: 'Malanday, Valenzuela City, Philippines' },
                { name: 'Pasay Branch', address: 'SM Mall of Asia, Pasay City, Philippines' },
                { name: 'Dasmarinas Cavite Branch', address: 'Barangay Burol, Dasmarinas Cavite, Philippines' },
                { name: 'San Fernando Pampanga Branch', address: 'Barangay Sindalan, San Fernando Pampanga, Philippines' },
                { name: 'Gerona Tarlac Branch', address: 'Barangay Pinasling, Gerona Tarlac, Philippines' },
                { name: 'Bicol Branch', address: 'Triangulo, Naga City Camarines Sur, Philippines' }
            ];
            branches.forEach(branch => {
                const option = document.createElement('option');
                option.value = branch.name;
                option.textContent = branch.name;
                branchSelect.appendChild(option);
            });
        }

        // Payment method toggle
        const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
        const cardFields = document.getElementById('card-fields');
        const gcashFields = document.getElementById('gcash-fields');
        paymentMethodRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const cardInputs = cardFields.querySelectorAll('input');
                const gcashInputs = gcashFields.querySelectorAll('input');
                if (this.value === 'card') {
                    cardFields.style.display = 'block';
                    gcashFields.style.display = 'none';
                    cardInputs.forEach(input => input.required = true);
                    gcashInputs.forEach(input => input.required = false);
                } else if (this.value === 'gcash') {
                    cardFields.style.display = 'none';
                    gcashFields.style.display = 'block';
                    cardInputs.forEach(input => input.required = false);
                    gcashInputs.forEach(input => input.required = true);
                } else {
                    cardFields.style.display = 'none';
                    gcashFields.style.display = 'none';
                    cardInputs.forEach(input => input.required = false);
                    gcashInputs.forEach(input => input.required = false);
                }
            });
        });
    }

    // Load product detail if on product detail page
    if (document.getElementById('product-name')) {
        loadProductDetail();
    }

    // Display search results if on search results page
    if (document.getElementById('search-results-list')) {
        displaySearchResults();
    }

    // Display products and setup filters if on products page
    if (document.getElementById('product-list')) {
        displayProducts();
        document.getElementById('category-filter').addEventListener('change', displayProducts);
        document.getElementById('price-filter').addEventListener('change', displayProducts);
        document.getElementById('sort-filter').addEventListener('change', displayProducts);
    }

    // Display featured products if on index page
    if (document.querySelector('#products .product-grid')) {
        displayFeaturedProducts();
    }

    // Display orders if on orders page
    if (document.getElementById('orders-list')) {
        displayOrders();
    }

    // Display account if on account page
    if (document.getElementById('account-info')) {
        if (window.location.pathname.includes('accountedit.html')) {
            displayAccountEdit();
        } else if (window.location.pathname.includes('addnewaddresses.html')) {
            displayManageAddresses();
        } else {
            displayAccount();
        }
    }

    // Display order detail if on order detail page
    if (document.getElementById('order-info')) {
        displayOrderDetail();
    }

    // Display order tracking if on order tracking page
    if (document.getElementById('order-timeline')) {
        displayOrderTracking();
    }

    // Display add reviews if on add reviews page
    if (document.getElementById('review-form')) {
        if (window.location.pathname.includes('addreviews.html')) {
            displayAddReviews();
        } else if (window.location.pathname.includes('productreviews.html')) {
            displayProductReviews();
        }
    }

    // Display return items if on return items page
    if (document.getElementById('return-form')) {
        displayReturnItems();
    }

    // Display return success if on return success page
    if (document.querySelector('.success') && window.location.pathname.includes('returnitems-success.html')) {
        displayReturnSuccess();
    }

    // Display checkout success if on checkout success page
    if (document.querySelector('.success')) {
        const urlParams = new URLSearchParams(window.location.search);
        const orderId = urlParams.get('id');
        if (orderId) {
            document.getElementById('order-number').textContent = '#' + orderId;
        }
    }

    // Handle checkout form submission
    const checkoutForm = document.querySelector('.checkout form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!currentUser) {
                alert('Please log in to proceed with checkout.');
                window.location.href = 'login.html';
                return;
            }
            // Get payment method, delivery address, and pickup branch
            const paymentMethodElement = document.querySelector('input[name="payment-method"]:checked');
            if (!paymentMethodElement) {
                alert('Please select a payment method.');
                return;
            }
            const paymentMethod = paymentMethodElement.value;
            const deliveryAddress = document.getElementById('selected-address').value;
            const pickupBranch = document.getElementById('selected-branch').value;

            // Validate payment details
            if (paymentMethod === 'card') {
                const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
                const expiry = document.getElementById('expiry').value;
                const cvv = document.getElementById('cvv').value;
                if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
                    alert('Please enter a valid 16-digit card number.');
                    return;
                }
                if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                    alert('Please enter expiry date in MM/YY format.');
                    return;
                }
                if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
                    alert('Please enter a valid 3-digit CVV.');
                    return;
                }
            } else if (paymentMethod === 'gcash') {
                const gcashNumber = document.getElementById('gcash-number').value;
                if (!/^09\d{9}$/.test(gcashNumber)) {
                    alert('Please enter a valid GCash number starting with 09 and 11 digits total.');
                    return;
                }
            }

            // Create order
            const orderId = Date.now().toString();
            const orderTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const newOrder = {
                id: orderId,
                userEmail: currentUser.email,
                items: [...cart],
                total: orderTotal,
                date: new Date().toISOString(),
                status: 'Processing',
                trackingNumber: 'TRK' + orderId,
                estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                paymentMethod: paymentMethod,
                deliveryAddress: deliveryAddress,
                pickupBranch: pickupBranch
            };
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Clear cart after successful submission
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            // Redirect to checkout success page with order ID
            window.location.href = 'checkout-success.html?id=' + orderId;
        });
    }

    // Handle login form
    const loginForm = document.querySelector('.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            if (loginUser(email, password)) {
                alert('Login successful!');
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password.');
            }
        });
    }

    // Handle signup form
    const signupForm = document.querySelector('.signup form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            if (!/^\d{11}$/.test(phone) && !/^\+63\d{10}$/.test(phone)) {
                alert('Phone number must be 11 digits or +63 followed by 10 digits.');
                return;
            }
            if (signupUser(firstName, lastName, email, phone, address, password)) {
                // Log the user in immediately after signup
                currentUser = users.find(u => u.email === email);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateAuthUI();
                alert('Signup successful! You are now logged in.');
                window.location.href = 'signup-success.html';
            } else {
                alert('Email already exists.');
            }
        });
    }

    // Handle forgot password form
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const user = users.find(u => u.email === email);
            if (user) {
                window.location.href = 'forgotpassword2.html?email=' + encodeURIComponent(email);
            } else {
                alert('Email not found.');
            }
        });
    }

    // Handle update password form
    const updatePasswordForm = document.getElementById('update-password-form');
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!currentUser) {
                window.location.href = 'login.html';
                return;
            }
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            if (currentPassword !== currentUser.password) {
                alert('Current password is incorrect.');
                return;
            }
            if (newPassword.length < 6) {
                alert('New password must be at least 6 characters long.');
                return;
            }
            if (newPassword !== confirmNewPassword) {
                alert('New passwords do not match.');
                return;
            }
            // Update password
            currentUser.password = newPassword;
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = currentUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }
            // Logout after password change
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateAuthUI();
            alert('Password updated successfully! Please log in with your new password.');
            window.location.href = 'login.html';
        });
    }

    // Handle reset password form
    const resetPasswordForm = document.getElementById('reset-password-form');
    if (resetPasswordForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');
        if (!email) {
            alert('Invalid reset link.');
            window.location.href = 'login.html';
            return;
        }
        resetPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            if (newPassword.length < 6) {
                alert('New password must be at least 6 characters long.');
                return;
            }
            if (newPassword !== confirmNewPassword) {
                alert('New passwords do not match.');
                return;
            }
            // Update password
            const userIndex = users.findIndex(u => u.email === email);
            if (userIndex !== -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Password reset successfully! Please log in with your new password.');
                window.location.href = 'login.html';
            } else {
                alert('User not found.');
                window.location.href = 'login.html';
            }
        });
    }

    // Search functionality
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = document.getElementById('search-input').value.trim();
            if (query) {
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        });
    }

    // Password toggle functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('password-toggle')) {
            const targetId = e.target.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (input) {
                if (input.type === 'password') {
                    input.type = 'text';
                    e.target.textContent = '🙈';
                } else {
                    input.type = 'password';
                    e.target.textContent = '👁️';
                }
            }
        }
    });

});