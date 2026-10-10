# Ultimez Courses Tasks

This repository contains all assignments, exercises, and tasks completed as part of the **Ultimez Frontend Developer Training Program**.

Each task is organized in its own self-contained folder to maintain modularity, independent dependency management, and clear progression.

## 🌐 Live GitHub Pages Demo

- **Course Tasks Hub**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/](https://chinmaikpoal.github.io/ultimez_courses_tasks/)
- **Task 1 (Products List SSR)**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/task-next-products/](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-next-products/)
- **Task 2 (Add To Cart PHP & MySQL)**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/)

---

## 📂 Repository Structure

```
ultimez_courses_tasks/
│
├── task-next-products/        # Task 1: Products List API using Server-Side Props (Next.js Pages Router)
│
├── task-add-to-cart/          # Task 2: Add To Cart E-Commerce Cart
│   ├── api/cart.php           # Asynchronous REST dispatcher (add, remove, clear, get)
│   ├── config/db.php          # Secure MySQL PDO connection
│   ├── assets/                # Responsive CSS, Fetch API client, product images
│   ├── schema.sql             # Database schema (ultimez_interview_tasks) & seeded products
│   ├── index.php              # Full PHP & MySQL session UI
│   └── README.md              # Complete task documentation & XAMPP guide
│
├── docs/                      # Live GitHub Pages Showcase
│   ├── index.html             # Central Tasks Hub
│   ├── task-next-products/    # Task 1 live preview
│   └── task-add-to-cart/      # Task 2 interactive live preview
│
├── task-next-.../             # (Future Next.js tasks)
├── task-react-.../            # (Future React tasks)
├── task-bootstrap-.../        # (Future Bootstrap tasks)
│
└── README.md                  # Repository documentation and task index
```

---

## 📋 Completed Tasks

| # | Task Directory | Course / Tech | Topic / Description | Live URL | Code | Status |
|---|----------------|---------------|---------------------|----------|------|--------|
| 1 | [`task-next-products/`](./task-next-products) | Next JS Tutorial for Beginners | Integrate Products List API using `getServerSideProps` | [Live Demo](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-next-products/) | [Source Code](./task-next-products) | ✅ Completed |
| 2 | [`task-add-to-cart/`](./task-add-to-cart) | PHP & MySQL Full-Stack | Asynchronous Add To Cart with PDO, session management & real-time totals | [Live Demo](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-add-to-cart/) | [Source Code](./task-add-to-cart) | ✅ Completed |

---

## 🛠️ Global Development Guidelines

1. **Independent Projects**: Each task directory maintains its own `package.json` and dependencies.
2. **Server-Side Rendering**: Server-side tasks (such as Next.js with `getServerSideProps`) are preserved without degrading to static exports.
3. **Clean Code**: Adherence to semantic markup, responsive design across mobile/tablet/desktop, and error handling.

---

## 👤 Author

- **GitHub Profile**: [@Chinmaikpoal](https://github.com/Chinmaikpoal)
- **Repository**: [https://github.com/Chinmaikpoal/ultimez_courses_tasks](https://github.com/Chinmaikpoal/ultimez_courses_tasks)
