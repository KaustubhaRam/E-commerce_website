document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10, img: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20, img: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30, img: 'https://via.placeholder.com/150' }
    ];

    const featuredProductsContainer = document.getElementById('featured-products');
    const productListContainer = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderProducts(container, products) {
        if (!container) return;
        container.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            container.appendChild(productDiv);
        });
    }

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.quantity += 1;
                cartItem.total = cartItem.quantity * cartItem.price;
            } else {
                cart.push({ ...product, quantity: 1, total: product.price });
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCartItems(cartItemsContainer, cart);
            alert(`${product.name} added to cart!`);
        }
    };

    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(cartItemsContainer, cart);
        alert('Item removed from cart!');
    };

    window.clearCart = function() {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems(cartItemsContainer, cart);
        alert('Cart cleared!');
    };

    function renderCartItems(container, cart) {
        if (!container) return;
        container.innerHTML = '';
        if (cart.length === 0) {
            container.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: $${item.total}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                `;
                container.appendChild(cartItemDiv);
            });
            const clearCartButton = document.createElement('button');
            clearCartButton.textContent = 'Clear Cart';
            clearCartButton.classList.add('clear-cart');
            clearCartButton.onclick = clearCart;
            document.body.appendChild(clearCartButton);  // Append the button to the body to ensure it's always fixed
        }
    }

    if (featuredProductsContainer) {
        renderProducts(featuredProductsContainer, products);
    }

    if (productListContainer) {
        renderProducts(productListContainer, products);
    }

    if (cartItemsContainer) {
        renderCartItems(cartItemsContainer, cart);
    }
});
