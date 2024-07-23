document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10, img: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20, img: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30, img: 'https://via.placeholder.com/150' }
    ];

    const featuredProductsContainer = document.getElementById('featured-products');
    const productListContainer = document.getElementById('product-list');
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = [];

    function renderProducts(container, products) {
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
            cart.push(product);
            renderCartItems(cartItemsContainer, cart);
            alert(`${product.name} added to cart!`);
        }
    };

    function renderCartItems(container, cart) {
        container.innerHTML = '';
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            `;
            container.appendChild(cartItemDiv);
        });
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