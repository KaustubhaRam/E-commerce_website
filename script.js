// Sample product data
const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      price: 10.99
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is product 2',
      price: 19.99
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is product 3',
      price: 15.99
    }
  ];
  
  // Fetch product data from server and display on products.html
  document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
      productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <span>$${product.price}</span>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productCard);
    });
  });
  
  // Add product to shopping cart
  function addToCart(productId) {
    const cartItems = document.getElementById('cart-items');
    const product = products.find(product => product.id === productId);
  
    const cartItem = document.createElement('div');
    cartItem.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
    `;
    cartItems.appendChild(cartItem);
  }
  