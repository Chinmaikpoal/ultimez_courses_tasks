/**
 * Ultimez Frontend Developer Internship — Task 2: Add To Cart
 * GitHub Pages Client Simulation Controller
 * 
 * NOTE FOR REVIEWERS:
 * This script powers the static GitHub Pages live demonstration.
 * The production PHP & MySQL backend with PDO prepared statements and native
 * $_SESSION cart management is located in the repository under /task-add-to-cart/.
 */

(function () {
  'use strict';

  // Master product data matching official database tbl_products
  const PRODUCTS = [
    { id: 1, name: 'Men Solid Orange', price: 499.00, image: 'image1.jpeg' },
    { id: 2, name: 'Men Graphic Print', price: 451.00, image: 'image2.jpeg' },
    { id: 3, name: 'Men Graphic Print', price: 599.00, image: 'image3.jpeg' },
    { id: 4, name: 'Men Striped Polo', price: 479.00, image: 'image4.jpeg' },
    { id: 5, name: 'Striped Black', price: 349.00, image: 'image5.jpeg' },
    { id: 6, name: 'Typography', price: 600.00, image: 'image6.jpeg' },
    { id: 7, name: 'Men Printed Hooded', price: 334.00, image: 'image7.jpeg' },
    { id: 8, name: 'Embroidered Red Shirt', price: 453.00, image: 'image8.jpeg' }
  ];

  // Cart state persisted to localStorage
  const STORAGE_KEY = 'ultimez_demo_cart_v2';

  function loadCart() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }

  let cart = loadCart();

  // DOM Elements
  const cartTableWrapper = document.getElementById('cartTableWrapper');
  const cartTableBody = document.getElementById('cartTableBody');
  const cartEmptyView = document.getElementById('cartEmptyView');
  const cartFooter = document.getElementById('cartFooter');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const grandTotalValue = document.getElementById('grandTotalValue');
  const clearCartBtn = document.getElementById('clearCartBtn');

  // Currency Formatter
  function formatCurrency(val) {
    return 'Rs. ' + parseFloat(val).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Toast Notification
  function showToast(message, type = 'success') {
    let toast = document.querySelector('.cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'cart-toast';
      document.body.appendChild(toast);
    }

    toast.className = `cart-toast cart-toast-${type}`;
    toast.textContent = message;

    // Trigger reflow & animate
    void toast.offsetWidth;
    toast.classList.add('active');

    if (toast.dataset.timeoutId) {
      clearTimeout(parseInt(toast.dataset.timeoutId, 10));
    }

    const tId = setTimeout(() => {
      toast.classList.remove('active');
    }, 2800);

    toast.dataset.timeoutId = tId.toString();
  }

  // Render Cart UI
  function renderCart() {
    const keys = Object.keys(cart);
    let totalItems = 0;
    let grandTotal = 0.0;

    cartTableBody.innerHTML = '';

    if (keys.length === 0) {
      cartTableWrapper.style.display = 'none';
      cartFooter.style.display = 'none';
      cartEmptyView.style.display = 'flex';
      cartCountBadge.textContent = '0 Items';
      return;
    }

    cartEmptyView.style.display = 'none';
    cartTableWrapper.style.display = 'block';
    cartFooter.style.display = 'flex';

    keys.forEach((pId) => {
      const item = cart[pId];
      const subtotal = item.price * item.quantity;
      totalItems += item.quantity;
      grandTotal += subtotal;

      const tr = document.createElement('tr');
      tr.dataset.productId = pId;

      tr.innerHTML = `
        <td>
          <div class="cart-item-preview">
            <img src="assets/images/${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-thumb">
            <span class="cart-item-name">${escapeHtml(item.name)}</span>
          </div>
        </td>
        <td>${formatCurrency(item.price)}</td>
        <td><span class="cart-qty-badge">${item.quantity}</span></td>
        <td><span class="cart-subtotal">${formatCurrency(subtotal)}</span></td>
        <td>
          <button type="button" class="btn-remove" data-product-id="${pId}">
            &times; Remove
          </button>
        </td>
      `;

      cartTableBody.appendChild(tr);
    });

    cartCountBadge.textContent = `${totalItems} Item${totalItems !== 1 ? 's' : ''}`;
    grandTotalValue.textContent = formatCurrency(grandTotal);
  }

  // Escape HTML helper
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Add Item to Cart
  function addToCart(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (cart[productId]) {
      cart[productId].quantity += 1;
      showToast(`Updated "${product.name}" quantity to ${cart[productId].quantity}`, 'success');
    } else {
      cart[productId] = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };
      showToast(`Added "${product.name}" to cart`, 'success');
    }

    saveCart(cart);
    renderCart();
  }

  // Remove Item from Cart
  function removeFromCart(productId) {
    const item = cart[productId];
    if (!item) return;

    const name = item.name;
    delete cart[productId];

    saveCart(cart);
    renderCart();
    showToast(`Removed "${name}" from cart`, 'error');
  }

  // Clear Entire Cart
  function clearCart() {
    if (Object.keys(cart).length === 0) return;

    cart = {};
    saveCart(cart);
    renderCart();
    showToast('Shopping cart cleared', 'error');
  }

  // Bind Event Listeners
  document.addEventListener('click', (e) => {
    // Add to cart button
    const addBtn = e.target.closest('.btn-add');
    if (addBtn) {
      e.preventDefault();
      const pId = parseInt(addBtn.dataset.productId, 10);
      if (pId) {
        addToCart(pId);
      }
      return;
    }

    // Remove from cart button
    const removeBtn = e.target.closest('.btn-remove');
    if (removeBtn) {
      e.preventDefault();
      const pId = parseInt(removeBtn.dataset.productId, 10);
      if (pId) {
        removeFromCart(pId);
      }
      return;
    }
  });

  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      clearCart();
    });
  }

  // Initial Render
  renderCart();
})();
