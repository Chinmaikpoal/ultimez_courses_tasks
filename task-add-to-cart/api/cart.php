<?php
/**
 * Shopping Cart API Endpoint
 * Handles asynchronous cart operations (add, remove, get, clear) using PHP Sessions & MySQL
 * Ultimez Frontend Developer Internship — Task 2: Add To Cart
 */

// Start session if not already active
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Set JSON response header
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config/db.php';

// Initialize session cart structure if not present
if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

/**
 * Calculates subtotals and grand total, returning structured cart data.
 *
 * @return array
 */
function getCartSummary() {
    $items = [];
    $grandTotal = 0.0;
    $totalQuantity = 0;

    foreach ($_SESSION['cart'] as $productId => $item) {
        $price = (float)$item['price'];
        $quantity = (int)$item['quantity'];
        $subtotal = $price * $quantity;
        $grandTotal += $subtotal;
        $totalQuantity += $quantity;

        $items[] = [
            'id'                     => (int)$productId,
            'name'                   => $item['name'],
            'price'                  => $price,
            'formatted_price'        => 'Rs. ' . number_format($price, 2),
            'image'                  => $item['image'],
            'quantity'               => $quantity,
            'subtotal'               => $subtotal,
            'formatted_subtotal'     => 'Rs. ' . number_format($subtotal, 2),
        ];
    }

    return [
        'items'                  => $items,
        'item_count'             => count($items),
        'total_quantity'         => $totalQuantity,
        'grand_total'            => $grandTotal,
        'formatted_grand_total'  => 'Rs. ' . number_format($grandTotal, 2),
    ];
}

// Parse request payload (supports JSON and application/x-www-form-urlencoded)
$rawInput = file_get_contents('php://input');
$jsonData = json_decode($rawInput, true);

$action = $_GET['action'] ?? ($jsonData['action'] ?? ($_POST['action'] ?? 'get'));
$productId = isset($jsonData['product_id']) ? (int)$jsonData['product_id'] : (isset($_POST['product_id']) ? (int)$_POST['product_id'] : 0);

try {
    switch ($action) {
        case 'get':
            echo json_encode([
                'success' => true,
                'cart'    => getCartSummary(),
            ]);
            break;

        case 'add':
            if ($productId <= 0) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid product ID supplied.',
                ]);
                exit;
            }

            // Always fetch price and details from database via Prepared Statement
            $pdo = getDbConnection();
            $stmt = $pdo->prepare("SELECT id, product_name, product_price, product_image FROM tbl_products WHERE id = :id LIMIT 1");
            $stmt->execute(['id' => $productId]);
            $product = $stmt->fetch();

            if (!$product) {
                http_response_code(404);
                echo json_encode([
                    'success' => false,
                    'message' => 'Product does not exist in database.',
                ]);
                exit;
            }

            // If product already exists in cart, increment quantity; otherwise add new item
            if (isset($_SESSION['cart'][$productId])) {
                $_SESSION['cart'][$productId]['quantity'] += 1;
            } else {
                $_SESSION['cart'][$productId] = [
                    'name'     => $product['product_name'],
                    'price'    => (float)$product['product_price'],
                    'image'    => $product['product_image'],
                    'quantity' => 1,
                ];
            }

            echo json_encode([
                'success' => true,
                'message' => htmlspecialchars($product['product_name']) . ' added to cart.',
                'cart'    => getCartSummary(),
            ]);
            break;

        case 'remove':
            if ($productId <= 0) {
                http_response_code(400);
                echo json_encode([
                    'success' => false,
                    'message' => 'Invalid product ID supplied.',
                ]);
                exit;
            }

            $productName = 'Item';
            if (isset($_SESSION['cart'][$productId])) {
                $productName = $_SESSION['cart'][$productId]['name'];
                unset($_SESSION['cart'][$productId]);
            }

            echo json_encode([
                'success' => true,
                'message' => htmlspecialchars($productName) . ' removed from cart.',
                'cart'    => getCartSummary(),
            ]);
            break;

        case 'clear':
            $_SESSION['cart'] = [];
            echo json_encode([
                'success' => true,
                'message' => 'Cart has been cleared.',
                'cart'    => getCartSummary(),
            ]);
            break;

        default:
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'message' => 'Unknown action: ' . htmlspecialchars($action),
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
    ]);
}
