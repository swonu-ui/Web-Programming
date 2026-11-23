const products = [
  { id: 1, name: 'Grid Notebook', price: 3500, sticker: '📓', bow: '🎀', color: '#fff0f5' },
  { id: 2, name: 'Wireless Earbuds', price: 89000, sticker: '🎧', bow: '💗', color: '#edf3ff' },
  { id: 3, name: 'Mechanical Keyboard', price: 120000, sticker: '⌨️', bow: '✨', color: '#edf8ef' },
  { id: 4, name: 'Laptop Backpack', price: 45000, sticker: '🎒', bow: '🌸', color: '#f4edff' },
  { id: 5, name: 'Water Bottle', price: 12000, sticker: '🧴', bow: '🫧', color: '#edfaff' },
  { id: 6, name: 'Desk Lamp', price: 28000, sticker: '💡', bow: '⭐', color: '#fff7d9' }
];

let cart = [];

const productList = document.getElementById('productList');
const cartItems = document.getElementById('cartItems');
const cartHeadingCount = document.getElementById('cartHeadingCount');
const cartTotal = document.getElementById('cartTotal');

const formatPrice = value => `₩${value.toLocaleString('en-US')}`;

function addItem(id) {
  const existing = cart.find(item => item.id === id);
  cart = existing
    ? cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...cart, { id, quantity: 1 }];
  render();
}

function decreaseItem(id) {
  cart = cart
    .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
    .filter(item => item.quantity > 0);
  render();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  render();
}

function renderProducts() {
  productList.innerHTML = products.map(product => {
    const quantity = cart.find(item => item.id === product.id)?.quantity || 0;
    return `
      <li class="product-card">
        <div class="product-visual" style="background:${product.color}">
          <span class="bow-sticker" aria-hidden="true">${product.bow}</span>
          <span class="product-sticker" role="img" aria-label="${product.name}">${product.sticker}</span>
        </div>
        <h3>${product.name}</h3>
        <p class="product-price">${formatPrice(product.price)}</p>
        <button type="button" class="add-button" data-add="${product.id}" aria-label="Add to cart: ${product.name}">
          Add to cart
        </button>
        <p class="in-cart">${quantity ? `${quantity} in cart` : ''}</p>
      </li>`;
  }).join('');

  productList.querySelectorAll('[data-add]').forEach(button => {
    button.addEventListener('click', () => addItem(Number(button.dataset.add)));
  });
}

function renderCart() {
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartHeadingCount.textContent = `(${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add something from the list.</p>';
  } else {
    cartItems.innerHTML = cart.map(item => {
      const product = products.find(productItem => productItem.id === item.id);
      return `
        <article class="cart-item">
          <div class="cart-product-icon" style="background:${product.color}" aria-hidden="true">${product.sticker}</div>
          <div>
            <h3>${item.quantity} × ${product.name}</h3>
            <p>${formatPrice(product.price * item.quantity)}</p>
          </div>
          <div class="cart-actions">
            <button type="button" data-decrease="${product.id}" aria-label="Decrease ${product.name}">−</button>
            <button type="button" data-increase="${product.id}" aria-label="Increase ${product.name}">+</button>
            <button type="button" class="remove-button" data-remove="${product.id}" aria-label="Remove ${product.name}">Remove</button>
          </div>
        </article>`;
    }).join('');

    cartItems.querySelectorAll('[data-decrease]').forEach(button => {
      button.addEventListener('click', () => decreaseItem(Number(button.dataset.decrease)));
    });
    cartItems.querySelectorAll('[data-increase]').forEach(button => {
      button.addEventListener('click', () => addItem(Number(button.dataset.increase)));
    });
    cartItems.querySelectorAll('[data-remove]').forEach(button => {
      button.addEventListener('click', () => removeItem(Number(button.dataset.remove)));
    });
  }

  const total = cart.reduce((sum, item) => {
    const product = products.find(productItem => productItem.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  cartTotal.textContent = formatPrice(total);
}

function render() {
  renderProducts();
  renderCart();
}

document.getElementById('clearCart').addEventListener('click', () => {
  cart = [];
  render();
});

render();
