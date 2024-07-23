const products = [
  { id: 1, name: "Product 1", price: 19.99, image: "product1.jpg" },
  { id: 2, name: "Product 2", price: 29.99, image: "product2.jpg" },
  { id: 3, name: "Product 3", price: 39.99, image: "product3.jpg" },
  { id: 4, name: "Product 4", price: 49.99, image: "product4.jpg" },
  { id: 5, name: "Product 5", price: 59.99, image: "product5.jpg" },
  { id: 6, name: "Product 6", price: 69.99, image: "product6.jpg" },
  { id: 7, name: "Product 7", price: 79.99, image: "product7.jpg" },
  { id: 8, name: "Product 8", price: 89.99, image: "product8.jpg" },
  { id: 9, name: "Product 9", price: 99.99, image: "product9.jpg" },
  { id: 10, name: "Product 10", price: 109.99, image: "product10.jpg" },
  { id: 11, name: "Product 11", price: 119.99, image: "product11.jpg" },
  { id: 12, name: "Product 12", price: 129.99, image: "product12.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded and parsed");
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
      console.log("Product grid found");
      products.forEach(product => {
          const productElement = document.createElement('div');
          productElement.classList.add('product');
          productElement.innerHTML = `
              <img src="${product.image}" alt="${product.name}">
              <h2>${product.name}</h2>
              <p>$${product.price.toFixed(2)}</p>
              <button onclick="addToCart(${product.id})">Add to Cart</button>
          `;
          productGrid.appendChild(productElement);
      });
  } else {
      console.error("Product grid not found");
  }
  loadCart();
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Cart loaded from localStorage:", cart);

function addToCart(productId) {
  const product = cart.find(item => item.id === productId);
  if (product) {
      product.quantity++;
  } else {
      const product = products.find(item => item.id === productId);
      if (product) {
          cart.push({ ...product, quantity: 1 });
      }
  }
  saveCart();
  loadCart();
  const productName = products.find(item => item.id === productId)?.name || 'Product';
  alert(`${productName} has been added to your cart.`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  loadCart();
}

function updateQuantity(productId, quantity) {
  const product = cart.find(item => item.id === productId);
  if (product) {
      product.quantity += quantity;
      if (product.quantity <= 0) {
          if (confirm('Do you want to remove this item from the cart?')) {
              removeFromCart(productId);
          } else {
              product.quantity = 1;
          }
      }
      saveCart();
      loadCart();
  }
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Cart saved to localStorage:", cart);
}

function loadCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalBillContainer = document.getElementById('total-bill');

  console.log("Loading cart...");
  
  if (cartItemsContainer) {
      console.log("Cart items container found");
      cartItemsContainer.innerHTML = '';
      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
          totalBillContainer.innerHTML = '<h2>Total: $0.00</h2>';
          return;
      }
      let total = 0;
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}">
              <h2>${item.name}</h2>
              <p>$${item.price.toFixed(2)}</p>
              <div class="quantity">
                  <button onclick="updateQuantity(${item.id}, -1)">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>
              <button onclick="removeFromCart(${item.id})">Remove</button>
          `;
          cartItemsContainer.appendChild(cartItem);
          total += item.price * item.quantity;
      });

      totalBillContainer.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;
  } else {
      console.error("Cart items container not found");
  }
}

function clearCart() {
  if (confirm('Are you sure you want to clear the cart?')) {
      cart = [];
      saveCart();
      loadCart();
  }
}
