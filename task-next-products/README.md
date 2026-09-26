# Ultimez Products List &bull; Next.js Server-Side Props (SSR)

> **Course**: Next JS Tutorial for Beginners  
> **Task**: Integrate the Products List API using Server-Side Props (`getServerSideProps`)  
> **Repository**: [https://github.com/Chinmaikpoal/ultimez_courses_tasks](https://github.com/Chinmaikpoal/ultimez_courses_tasks)  
> **Task Directory**: `task-next-products/`

---

## 📌 Task Description

Integrate the Products List API from Fake Store API using Next.js Server-Side Props (`getServerSideProps`). The data must be fetched exclusively on the server at request time and passed into the page component via props. The page renders a modern, responsive product catalog with robust error handling and clean UI states.

---

## 🚀 Project Overview

This project demonstrates Server-Side Rendering (SSR) in Next.js using the Pages Router. When a user requests the home page:
1. The Next.js server executes `getServerSideProps()`.
2. It fetches the product catalog from the Fake Store API.
3. The page HTML is populated with products on the server.
4. The fully populated HTML is sent to the client browser, delivering superior SEO, immediate content visibility, and optimal First Contentful Paint (FCP).

---

## 🌐 API Used

- **Source**: [Fake Store API](https://fakestoreapi.com/)
- **Endpoint**: `https://fakestoreapi.com/products/`
- **Method**: `GET`
- **Response Format**: JSON Array containing product objects with `id`, `title`, `price`, `description`, `category`, `image`, and `rating` (`rate`, `count`).

---

## 💻 Technologies Used

- **Next.js 14** (Pages Router)
- **React 18**
- **JavaScript (ES6+)**
- **Native CSS3** (CSS Variables, Flexbox, Responsive Grid)
- **Node.js runtime** for SSR

---

## ⚙️ How `getServerSideProps()` Works in this Project

In Next.js Pages Router, exporting an `async` function named `getServerSideProps` triggers server-side rendering for that page.

```javascript
export async function getServerSideProps() {
  try {
    const response = await fetch('https://fakestoreapi.com/products/');

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const products = await response.json();

    return {
      props: {
        products: Array.isArray(products) ? products : [],
        error: null,
      },
    };
  } catch (err) {
    console.error('[getServerSideProps Error]:', err.message);

    return {
      props: {
        products: [],
        error: 'Unable to load products right now. Please verify your network connection and reload.',
      },
    };
  }
}
```

### Key Characteristics:
- **Server Execution**: Runs strictly on the server for each incoming HTTP request.
- **No Client Fetch**: Eliminates `useEffect()` fetching on the client side, preventing loading spinners and layout shifts during initial render.
- **Dynamic & Fresh**: Unlike `getStaticProps()` which pre-renders at build time, `getServerSideProps()` fetches fresh data whenever the page is requested.
- **No Static Export**: The application intentionally does not use `output: 'export'` because static HTML cannot execute Node.js code at request time.
- **Error Resilience**: Any upstream network or API issue is caught on the server, returning a safe, structured fallback prop (`error`) without crashing the page or exposing sensitive server internals.

---

## ✨ Features

- **SSR Data Hydration**: Product catalog data is fetched and rendered before HTML reaches the browser.
- **Comprehensive Product Cards**:
  - High-resolution product image with `object-fit: contain`
  - Category badge
  - Clamped product title and descriptive text
  - Star rating with average score and review counts (`rating.rate` & `rating.count`)
  - Formatted currency price (`$XX.XX`)
  - Call to action ("Buy Now") button
- **Responsive Layout**:
  - **Desktop (>1024px)**: 4-column responsive grid
  - **Tablet (640px - 1024px)**: 2-column grid
  - **Mobile (<640px)**: Single-column full-width cards
- **Modern UI & Micro-interactions**:
  - Smooth card elevation and subtle shadow transitions on hover
  - Image scale effect within a constrained container
  - Clean brand navigation header with live SSR status badge
- **User-Friendly Error Handling**:
  - Graceful degradation when the API is down
  - Re-try mechanism with a clean alert component

---

## 📁 Project Structure

```
task-next-products/
├── components/
│   ├── ErrorMessage.js         # User-friendly error message alert
│   ├── Header.js               # Header navbar with SSR badge and branding
│   └── ProductCard.js          # Individual product card presentation
├── pages/
│   ├── _app.js                 # Global application setup & CSS imports
│   └── index.js                # Home page & getServerSideProps implementation
├── public/
│   └── favicon.svg             # Application favicon
├── styles/
│   └── globals.css             # Responsive styling, CSS variables, transitions
├── next.config.js              # Next.js config with remote image domains
├── package.json                # Project dependencies and scripts
└── README.md                   # Task documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: v18.17.0 or higher (v20+ / v22+ recommended)
- **npm**: v9+ or higher

### Step 1: Navigate to the task directory
```bash
cd task-next-products
```

### Step 2: Install dependencies
```bash
npm install
```

---

## 🏃 How to Run the Project

### Development Server
Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build & Run
To test the production build and verify server-side rendering:
```bash
npm run build
npm start
```

---

## 🚢 Deployment Notes

Because this task strictly requires `getServerSideProps()`, the project cannot be hosted on static-only hosting services like standard GitHub Pages (which only host static `.html` files without a Node.js backend).

### Recommended Deployment (Vercel)
Vercel provides native, zero-configuration support for Next.js SSR:
1. Push this repository to GitHub.
2. Visit [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import the `ultimez_courses_tasks` repository.
4. Set the **Root Directory** to `task-next-products`.
5. Click **Deploy**. Vercel will automatically provision serverless compute for `getServerSideProps()`.
