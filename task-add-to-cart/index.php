<?php
/**
 * Ultimez Frontend Developer Internship — Task 2: Add To Cart
 * Main Application View (PHP & MySQL)
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/config/db.php';

$products = [];
$dbError = null;

try {
    $pdo = getDbConnection();
    $stmt = $pdo->query("SELECT id, product_name, product_price, product_image FROM tbl_products ORDER BY id ASC");
    $products = $stmt->fetchAll();
} catch (Exception $e) {
    $dbError = $e->getMessage();
    // Fallback seed data so interface renders gracefully during initial local setup
    $products = [
        ['id' => 1, 'product_name' => 'Men Solid Orange', 'product_price' => 499.00, 'product_image' => 'image1.jpeg'],
        ['id' => 2, 'product_name' => 'Men Graphic Print', 'product_price' => 451.00, 'product_image' => 'image2.jpeg'],
        ['id' => 3, 'product_name' => 'Men Graphic Print', 'product_price' => 599.00, 'product_image' => 'image3.jpeg'],
        ['id' => 4, 'product_name' => 'Men Striped Polo', 'product_price' => 479.00, 'product_image' => 'image4.jpeg'],
        ['id' => 5, 'product_name' => 'Striped Black', 'product_price' => 349.00, 'product_image' => 'image5.jpeg'],
        ['id' => 6, 'product_name' => 'Typography', 'product_price' => 600.00, 'product_image' => 'image6.jpeg'],
        ['id' => 7, 'product_name' => 'Men Printed Hooded', 'product_price' => 334.00, 'product_image' => 'image7.jpeg'],
        ['id' => 8, 'product_name' => 'Embroidered Red Shirt', 'product_price' => 453.00, 'product_image' => 'image8.jpeg'],
    ];
}

// Calculate initial session cart state
$sessionCart = $_SESSION['cart'] ?? [];
$cartGrandTotal = 0.0;
$totalItemsCount = 0;
foreach ($sessionCart as $item) {
    $cartGrandTotal += ((float)$item['price'] * (int)$item['quantity']);
    $totalItemsCount += (int)$item['quantity'];
}
$isCartEmpty = empty($sessionCart);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ultimez Add To Cart | PHP & MySQL Session Cart</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%232563eb'/><text x='16' y='22' font-size='18' font-family='sans-serif' font-weight='bold' fill='%23ffffff' text-anchor='middle'>U</text></svg>">
</head>
<body>

    <!-- Header Navigation -->
    <header class="app-header">
        <div class="header-container">
            <div class="brand-wrapper">
                <div class="brand-logo">U</div>
                <div>
                    <h1 class="brand-title">Ultimez Store</h1>
                    <p class="brand-subtitle">Internship Task 2 &bull; Add To Cart (PHP &amp; MySQL)</p>
                </div>
            </div>
            <div class="header-badge">
                <span class="dot"></span>
                <span>PHP Session &amp; Fetch API Active</span>
            </div>
        </div>
    </header>

    <!-- Main Container -->
    <main class="main-wrapper">
        <?php if ($dbError): ?>
            <div style="background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:1rem 1.5rem; border-radius:10px; margin-bottom:1.5rem; font-size:0.875rem;">
                <strong>Database Notice:</strong> <?= htmlspecialchars($dbError) ?>. (Displaying local product catalog. Please import <code>schema.sql</code> into phpMyAdmin for live database operations).
            </div>
        <?php endif; ?>

        <div class="content-grid">
            
            <!-- Left Column: Products Catalog -->
            <section class="section-card">
                <div class="section-header">
                    <div>
                        <h2 class="section-title">Products Catalog</h2>
                        <p class="section-subtitle">Showing <?= count($products) ?> available items</p>
                    </div>
                </div>

                <div class="products-grid">
                    <?php foreach ($products as $p): ?>
                        <article class="product-item">
                            <div class="product-img-box">
                                <img 
                                    src="assets/images/<?= htmlspecialchars($p['product_image']) ?>" 
                                    alt="<?= htmlspecialchars($p['product_name']) ?>" 
                                    class="product-img"
                                    loading="lazy"
                                    onerror="this.src='https://via.placeholder.com/300?text=Product+<?= $p['id'] ?>'"
                                >
                            </div>
                            <div class="product-info">
                                <h3 class="product-name" title="<?= htmlspecialchars($p['product_name']) ?>">
                                    <?= htmlspecialchars($p['product_name']) ?>
                                </h3>
                                <div class="product-price">
                                    Rs. <?= number_format((float)$p['product_price'], 2) ?>
                                </div>
                                <button 
                                    type="button" 
                                    class="btn-add" 
                                    data-product-id="<?= (int)$p['id'] ?>"
                                    aria-label="Add <?= htmlspecialchars($p['product_name']) ?> to cart"
                                >
                                    <span>&#43;</span> Add To Cart
                                </button>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Right Column: Shopping Cart (Sticky) -->
            <aside class="cart-column">
                <section class="section-card">
                    <div class="section-header">
                        <div>
                            <h2 class="section-title">
                                <span>🛒</span> Shopping Cart
                            </h2>
                            <p class="section-subtitle">Real-time asynchronous updates</p>
                        </div>
                        <span class="cart-qty-badge" id="cartCountBadge">
                            <?= $totalItemsCount ?> Item<?= $totalItemsCount !== 1 ? 's' : '' ?>
                        </span>
                    </div>

                    <!-- Cart Table Wrapper -->
                    <div class="cart-table-wrapper" id="cartTableWrapper" style="<?= $isCartEmpty ? 'display:none;' : '' ?>">
                        <table class="cart-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="cartTableBody">
                                <?php foreach ($sessionCart as $pId => $item): ?>
                                    <?php 
                                        $subtotal = (float)$item['price'] * (int)$item['quantity']; 
                                    ?>
                                    <tr data-product-id="<?= (int)$pId ?>">
                                        <td>
                                            <div class="cart-item-preview">
                                                <img 
                                                    src="assets/images/<?= htmlspecialchars($item['image']) ?>" 
                                                    alt="<?= htmlspecialchars($item['name']) ?>" 
                                                    class="cart-item-thumb"
                                                >
                                                <span class="cart-item-name"><?= htmlspecialchars($item['name']) ?></span>
                                            </div>
                                        </td>
                                        <td>Rs. <?= number_format((float)$item['price'], 2) ?></td>
                                        <td>
                                            <span class="cart-qty-badge"><?= (int)$item['quantity'] ?></span>
                                        </td>
                                        <td>
                                            <span class="cart-subtotal">Rs. <?= number_format($subtotal, 2) ?></span>
                                        </td>
                                        <td>
                                            <button 
                                                type="button" 
                                                class="btn-remove" 
                                                data-product-id="<?= (int)$pId ?>"
                                            >
                                                &times; Remove
                                            </button>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>

                    <!-- Empty State -->
                    <div class="cart-empty-view" id="cartEmptyView" style="<?= !$isCartEmpty ? 'display:none;' : '' ?>">
                        <div class="cart-empty-icon">🛒</div>
                        <h3 class="cart-empty-title">Your Cart is Empty</h3>
                        <p class="cart-empty-desc">Explore the catalog on the left and click "Add To Cart" to start shopping.</p>
                    </div>

                    <!-- Cart Footer -->
                    <div class="cart-footer" id="cartFooter" style="<?= $isCartEmpty ? 'display:none;' : '' ?>">
                        <div>
                            <span class="grand-total-label">Grand Total</span>
                            <div class="grand-total-value" id="grandTotalValue">
                                Rs. <?= number_format($cartGrandTotal, 2) ?>
                            </div>
                        </div>
                        <button type="button" class="btn-clear" id="clearCartBtn">
                            Clear Cart
                        </button>
                    </div>
                </section>
            </aside>

        </div>
    </main>

    <!-- JavaScript Controller -->
    <script src="assets/js/cart.js"></script>
</body>
</html>
