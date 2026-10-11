/**
 * Ultimez Internship — Task 3: ARSHA Website Homepage Recreation
 * JavaScript Controller for Mobile Navigation & Interactions
 */

(function () {
  'use strict';

  // Helper selector
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // Helper event listener
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // Header scroll state
  const header = select('#header');
  if (header) {
    const headerScrolled = () => {
      if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    window.addEventListener('scroll', headerScrolled);
  }

  // Mobile navigation toggle
  const navbar = select('#navbar');
  const mobileNavToggle = select('.mobile-nav-toggle');

  if (mobileNavToggle && navbar) {
    mobileNavToggle.addEventListener('click', function (e) {
      navbar.classList.toggle('navbar-mobile');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });

    // Mobile nav dropdowns
    on('click', '.navbar .dropdown > a', function (e) {
      if (navbar.classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    }, true);

    // Close mobile nav when clicking a nav item (except dropdown trigger)
    on('click', '.navbar-mobile a:not(.dropdown > a)', function (e) {
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    }, true);
  }

  // Watch Video Modal
  const watchVideoBtn = select('#watchVideoBtn');
  const videoModal = select('#videoModal');
  const videoModalClose = select('#videoModalClose');
  const videoIframe = select('#videoIframe');
  const VIDEO_URL = 'https://www.youtube.com/embed/Y7f98aduVJ8?autoplay=1';

  if (watchVideoBtn && videoModal && videoIframe) {
    watchVideoBtn.addEventListener('click', function (e) {
      e.preventDefault();
      videoIframe.src = VIDEO_URL;
      videoModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
      videoModal.classList.remove('show');
      videoIframe.src = '';
      document.body.style.overflow = '';
    };

    if (videoModalClose) {
      videoModalClose.addEventListener('click', closeModal);
    }

    videoModal.addEventListener('click', function (e) {
      if (e.target === videoModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && videoModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

})();
