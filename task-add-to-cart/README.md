# Ultimez Internship — Task 2: Add To Cart (PHP & MySQL)

> **Internship Assignment**: Task 2 — Add To Cart  
> **Course**: Ultimez Frontend Developer Training Program  
> **Repository**: [https://github.com/Chinmaikpoal/ultimez_courses_tasks](https://github.com/Chinmaikpoal/ultimez_courses_tasks)  
> **Task Directory**: `task-add-to-cart/`  
> **GitHub Pages Live Demo**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/)

---

## 📌 Task Overview

This assignment implements a complete, professional shopping cart web application using **PHP, MySQL, PHP Sessions, and the JavaScript Fetch API**. 

The application displays a dynamic product catalog from the database, allows users to asynchronously add products to their cart without full-page reloads, increments quantities when duplicate items are added, removes items smoothly, and automatically recalculates line subtotals and grand totals in real time.

---

## 🗄️ Database Architecture

- **Database Name**: `ultimez_interview_tasks`
- **Table Name**: `tbl_products`

### Schema:
```sql
CREATE TABLE `tbl_products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) NOT NULL,
  `product_price` DECIMAL(22,2) NOT NULL,
  `product_image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Official Seed Data (8 Products):
| ID | Product Name | Price (INR) | Image Filename |
|:--:|:-------------|:------------|:---------------|
| 1 | Men Solid Orange | Rs. 499.00 | `image1.jpeg` |
| 2 | Men Graphic Print | Rs. 451.00 | `image2.jpeg` |
| 3 | Men Graphic Print | Rs. 599.00 | `image3.jpeg` |
| 4 | Men Striped Polo | Rs. 479.00 | `image4.jpeg` |
| 5 | Striped Black | Rs. 349.00 | `image5.jpeg` |
| 6 | Typography | Rs. 600.00 | `image6.jpeg` |
| 7 | Men Printed Hooded | Rs. 334.00 | `image7.jpeg` |
| 8 | Embroidered Red Shirt | Rs. 453.00 | `image8.jpeg` |

---

## 🛠️ Technologies Used

- **Backend**: PHP 8.x (PDO with Prepared Statements, Native `$_SESSION`)
- **Database**: MySQL 8.x (`ultimez_interview_tasks`)
- **Frontend**: HTML5, Modern CSS3 (CSS Variables, Flexbox, CSS Grid)
- **Asynchronous Communication**: JavaScript Fetch API (JSON exchange, Zero full-page refreshes)

---

## ✨ Features

1. **Two-Column Responsive Layout**:
   - **Desktop**: Products catalog on the left, sticky shopping cart table on the right.
   - **Mobile / Tablet**: Stacks into an intuitive single-column view with responsive tables.
2. **Asynchronous Cart Operations (Fetch API)**:
   - Add to cart happens instantly without page reloads.
   - Adding the same product increases the existing item's quantity rather than duplicating rows.
   - Removing products recalculates item subtotals and grand totals dynamically.
3. **Server-Side Security & Price Integrity**:
   - Product prices are **always queried directly from the database** via prepared statements. The backend never trusts prices submitted from client requests.
   - Server-side input validation on `product_id`.
4. **Friendly UI Feedback**:
   - Toast notification alerts for user actions (added, removed, cleared).
   - Dedicated friendly empty-cart state when 0 items are present.
   - Clear Indian Rupee (`Rs. / ₹`) currency formatting.

---

## 🚀 Local Setup Guide (Using XAMPP)

Follow these steps to run the PHP/MySQL application locally:

### Step 1: Start Apache and MySQL
1. Open the **XAMPP Control Panel**.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.

### Step 2: Import the Database in phpMyAdmin
1. Open your browser and go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
2. Click on the **Import** tab at the top.
3. Choose the file: `task-add-to-cart/schema.sql` located inside your project folder.
4. Click **Go** at the bottom.
5. The database `ultimez_interview_tasks` and table `tbl_products` will be created and populated with all 8 products.

### Step 3: Place or Link the Project in XAMPP
Either:
- Copy the `task-add-to-cart` folder into `C:\xampp\htdocs\ultimez_courses_tasks\task-add-to-cart`
- OR run the PHP built-in server directly from this folder:
```bash
cd task-add-to-cart
php -S localhost:8000
```

### Step 4: Configure Database Connection (If Needed)
The database configuration in `config/db.php` uses standard XAMPP defaults:
- **Host**: `127.0.0.1` (or `localhost`)
- **Port**: `3306`
- **User**: `root`
- **Password**: *(empty)*
- **Database**: `ultimez_interview_tasks`

If your MySQL password is not empty, you can update `config/db.php` or set the environment variables `DB_USER`, `DB_PASS`.

### Step 5: Test the Application
1. Open [http://localhost/ultimez_courses_tasks/task-add-to-cart/](http://localhost/ultimez_courses_tasks/task-add-to-cart/) (or [http://localhost:8000](http://localhost:8000)).
2. Click **Add To Cart** on "Men Solid Orange" &rarr; Cart table updates to show 1 item with subtotal `Rs. 499.00`.
3. Click **Add To Cart** on "Men Solid Orange" again &rarr; Quantity increments to `2` and subtotal recalculates to `Rs. 998.00`.
4. Add another product (e.g., "Striped Black") &rarr; Grand total automatically sums both items.
5. Click **Remove** on an item &rarr; Item is removed and grand total updates immediately.
6. Click **Clear Cart** &rarr; The table disappears and the friendly empty cart notice is displayed.

---

## 📁 Project Structure

```
task-add-to-cart/
├── api/
│   └── cart.php              # RESTful API handler for get, add, remove, clear actions
├── assets/
│   ├── css/
│   │   └── style.css         # Modern, responsive two-column stylesheet
│   ├── images/               # Product image assets (image1.jpeg through image8.jpeg)
│   └── js/
│       └── cart.js           # Client-side Fetch API asynchronous controller
├── config/
│   └── db.php                # PDO MySQL connection with prepared statement security
├── index.php                 # Main application view rendering catalog & cart
├── schema.sql                # Complete SQL script to create DB and seed data
└── README.md                 # Complete documentation and setup manual
```

---

## 🌐 GitHub Pages Live Demo Notice

Because GitHub Pages only serves static files and does not execute PHP scripts or connect to a MySQL server, an interactive frontend demonstration is deployed in `docs/task-add-to-cart/`:
- **Live URL**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/)
- The static demo simulates the exact cart interactions (add, increment, remove, totals, empty view) client-side so evaluators can preview the user interface live on GitHub Pages.
- The full, production-ready PHP/MySQL backend is located in this directory (`task-add-to-cart/`).
