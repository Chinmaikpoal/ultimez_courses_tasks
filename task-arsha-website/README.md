# Ultimez Internship — Task 3: ARSHA Website Homepage Recreation

## 📌 Project Overview
This project is an exact, high-fidelity recreation of the **ARSHA** corporate website homepage (focusing on the top navigation bar, the dark blue hero section, and the client logo strip) based on the official assignment specification for the Ultimez Frontend Developer Training Program.

---

## 🎨 Visual Reference & Design Elements
- **Logo**: Bold uppercase `ARSHA` brand logo on the left.
- **Navigation Items**:
  - `Home` (active with accent styling)
  - `About`
  - `Services`
  - `Portfolio`
  - `Team`
  - `Drop Down` (multi-level hover dropdown on desktop, accordion on mobile)
  - `Contact`
  - `Get Started` (accent bordered pill button)
- **Hero Section**:
  - **Background**: Deep signature dark blue (`#37517e`).
  - **Headings**:
    - Primary Heading: `Better Solutions For Your Business` (48px / 700 font-weight in Google Font *Jost*).
    - Supporting Subtitle: `We are team of talented designers making websites with Bootstrap` (24px / 400 font-weight).
  - **Call to Action Buttons**:
    - `Get Started` (cyan rounded pill button, background `#47b2e4`, hover `#209dd8`).
    - `Watch Video` (play circle icon button opening a responsive video modal lightbox).
  - **Hero Illustration**:
    - High-resolution technology isometric illustration (`hero-img.png`).
    - Floating keyframe animation (`@keyframes up-down 2s ease-in-out infinite alternate`).
- **Clients Logo Strip**:
  - Light-colored container (`#f3f5fa`) directly below the hero section.
  - 6 client brand logos (`myob`, `BELIEVE`, `LifeGroups`, `Grayscale`, `citrus`, `Trustee`).
  - Monochromatic grayscale filter that transitions to full clarity and scale on hover.

---

## 🛠️ Technologies Used
- **HTML5**: Semantic markup (`<header>`, `<nav>`, `<section id="hero">`, `<section id="clients">`).
- **CSS3**: Custom design matching Arsha's typography, color variables, floating keyframes, and transitions.
- **Bootstrap 5 (v5.3.3)**: Responsive grid system (`row`, `col-lg-6`) and utility classes.
- **Bootstrap Icons (v1.11.3)**: Play icon, dropdown chevrons, and mobile hamburger toggler.
- **Vanilla JavaScript**: Responsive mobile navigation drawer toggle, dropdown accordion, sticky header behavior on scroll, and video lightbox modal.

---

## 📱 Responsive Breakpoints
- **Desktop ($\ge 1200\text{px}$)**: Full horizontal 2-column hero with 48px heading and 6-column client logo strip.
- **Medium / Tablet ($768\text{px} - 991\text{px}$)**: Mobile navigation drawer with hamburger toggler, stacked hero illustration, client logos distributed across 3 columns.
- **Mobile ($\le 576\text{px}$)**: Scaled typography (30px heading, 18px subtitle), vertical button layout, client logos in 2 columns.

---

## 🌐 Live GitHub Pages Demo
- **Task 3 Live Link**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/task-arsha-website/](https://chinmaikpoal.github.io/ultimez_courses_tasks/task-arsha-website/)
- **Course Tasks Hub**: [https://chinmaikpoal.github.io/ultimez_courses_tasks/](https://chinmaikpoal.github.io/ultimez_courses_tasks/)
