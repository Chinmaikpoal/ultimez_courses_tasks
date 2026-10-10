/**
 * Asynchronous Cart Controller using Fetch API
 * Ultimez Frontend Developer Internship — Task 2: Add To Cart
 */

document.addEventListener('DOMContentLoaded', () => {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartEmptyView = document.getElementById('cartEmptyView');
    const cartTableWrapper = document.getElementById('cartTableWrapper');
    const cartFooter = document.getElementById('cartFooter');
    const grandTotalEl = document.getElementById('grandTotalValue');
    const cartCountBadge = document.getElementById('cartCountBadge');
    const clearCartBtn = document.getElementById('clearCartBtn');

    // Base API URL
    const API_URL = 'api/cart.php';

    /**
     * Display a floating toast message
     * @param {string} message 
     * @param {string} type 'success' | 'danger'
     */
    function showToast(message, type = 'success') {
        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    /**
     * Render cart state into DOM
     * @param {Object} cartData 
     */
    function renderCart(cartData) {
        if (!cartData || !cartData.items || cartData.items.length === 0) {
            if (cartTableWrapper) cartTableWrapper.style.display = 'none';
            if (cartFooter) cartFooter.style.display = 'none';
            if (cartEmptyView) cartEmptyView.style.display = 'block';
            if (cartCountBadge) cartCountBadge.textContent = '0 Items';
            if (grandTotalEl) grandTotalEl.textContent = 'Rs. 0.00';
            return;
        }

        // Cart has items
        if (cartEmptyView) cartEmptyView.style.display = 'none';
        if (cartTableWrapper) cartTableWrapper.style.display = 'block';
        if (cartFooter) cartFooter.style.display = 'flex';

        if (cartCountBadge) {
            cartCountBadge.textContent = `${cartData.total_quantity} Item${cartData.total_quantity > 1 ? 's' : ''}`;
        }

        if (grandTotalEl) {
            grandTotalEl.textContent = cartData.formatted_grand_total;
        }

        if (cartTableBody) {
            cartTableBody.innerHTML = cartData.items.map(item => `
                <tr data-product-id="${item.id}">
                    <td>
                        <div class="cart-item-preview">
                            <img 
                                src="assets/images/${item.image}" 
                                alt="${escapeHtml(item.name)}" 
                                class="cart-item-thumb"
                                onerror="this.src='https://via.placeholder.com/48?text=Product'"
                            />
                            <span class="cart-item-name" title="${escapeHtml(item.name)}">
                                ${escapeHtml(item.name)}
                            </span>
                        </div>
                    </td>
                    <td>${item.formatted_price}</td>
                    <td>
                        <span class="cart-qty-badge">${item.quantity}</span>
                    </td>
                    <td>
                        <span class="cart-subtotal">${item.formatted_subtotal}</span>
                    </td>
                    <td>
                        <button 
                            type="button" 
                            class="btn-remove" 
                            data-product-id="${item.id}"
                            aria-label="Remove ${escapeHtml(item.name)} from cart"
                        >
                            &times; Remove
                        </button>
                    </td>
                </tr>
            `).join('');
        }
    }

    /**
     * Helper to escape HTML characters
     */
    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    /**
     * Fetch current cart on page load
     */
    async function loadCart() {
        try {
            const res = await fetch(`${API_URL}?action=get`);
            const data = await res.json();
            if (data.success && data.cart) {
                renderCart(data.cart);
            }
        } catch (err) {
            console.error('[Cart Load Error]:', err);
        }
    }

    /**
     * Add product to cart asynchronously
     * @param {number} productId 
     * @param {HTMLButtonElement} buttonEl 
     */
    async function addToCart(productId, buttonEl) {
        if (buttonEl) {
            buttonEl.classList.add('loading');
            buttonEl.disabled = true;
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'add',
                    product_id: productId
                })
            });

            const data = await res.json();

            if (data.success) {
                renderCart(data.cart);
                showToast(data.message || 'Added to cart!', 'success');
            } else {
                showToast(data.message || 'Failed to add item.', 'danger');
            }
        } catch (err) {
            console.error('[Add to Cart Error]:', err);
            showToast('Network error while adding to cart.', 'danger');
        } finally {
            if (buttonEl) {
                buttonEl.classList.remove('loading');
                buttonEl.disabled = false;
            }
        }
    }

    /**
     * Remove product from cart asynchronously
     * @param {number} productId 
     */
    async function removeFromCart(productId) {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'remove',
                    product_id: productId
                })
            });

            const data = await res.json();

            if (data.success) {
                renderCart(data.cart);
                showToast(data.message || 'Item removed from cart.', 'danger');
            } else {
                showToast(data.message || 'Failed to remove item.', 'danger');
            }
        } catch (err) {
            console.error('[Remove Cart Error]:', err);
            showToast('Network error while removing item.', 'danger');
        }
    }

    /**
     * Clear all items from cart
     */
    async function clearCart() {
        if (!confirm('Are you sure you want to clear your cart?')) return;

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'clear' })
            });

            const data = await res.json();

            if (data.success) {
                renderCart(data.cart);
                showToast('Cart cleared.', 'danger');
            }
        } catch (err) {
            console.error('[Clear Cart Error]:', err);
        }
    }

    // Event Delegation for "Add To Cart" buttons
    document.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.btn-add');
        if (addBtn) {
            const pid = parseInt(addBtn.getAttribute('data-product-id'), 10);
            if (pid > 0) {
                addToCart(pid, addBtn);
            }
            return;
        }

        const removeBtn = e.target.closest('.btn-remove');
        if (removeBtn) {
            const pid = parseInt(removeBtn.getAttribute('data-product-id'), 10);
            if (pid > 0) {
                removeFromCart(pid);
            }
            return;
        }
    });

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    // Initial load
    loadCart();
});
