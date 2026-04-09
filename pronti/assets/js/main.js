'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────────────
   * 1. ACTIVE NAV LINK
   * ──────────────────────────────────────────────────────── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('nav-active');
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ────────────────────────────────────────────────────────
   * 2. NAVBAR — auto-hide & scrolled state
   * ──────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  let lastY   = 0;
  let ticking = false;

  function handleScroll() {
    const currentY = window.scrollY;

    if (currentY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentY > lastY && currentY > 80) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastY   = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  /* ────────────────────────────────────────────────────────
   * 3. MOBILE MENU
   * ──────────────────────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  function closeMenu() {
    navLinks?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    navToggle?.setAttribute('aria-label', 'Apri menu di navigazione');
  }

  navToggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu di navigazione');
  });

  // Close when a navigation link is clicked
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (
      navLinks?.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle?.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) {
      closeMenu();
      navToggle?.focus();
    }
  });

  /* ────────────────────────────────────────────────────────
   * 4. SCROLL REVEAL
   * ──────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
  );

  document.querySelectorAll('.fade-in-section').forEach(el => {
    revealObserver.observe(el);
  });

  /* ────────────────────────────────────────────────────────
   * 5. LIGHTBOX
   * ──────────────────────────────────────────────────────── */
  const lightbox       = document.getElementById('lightbox');
  if (!lightbox) return;   // Only runs on galleria.html

  const lbImg          = document.getElementById('lightbox-img');
  const lbCaption      = document.getElementById('lightbox-caption');
  const lbCounter      = document.getElementById('lightbox-counter');
  const lbClose        = document.getElementById('lightbox-close');
  const lbPrev         = document.getElementById('lightbox-prev');
  const lbNext         = document.getElementById('lightbox-next');

  let gallery = [];
  let current = 0;

  /** Build flat image array from all .gallery-item[data-src] */
  function buildGallery() {
    gallery = Array.from(
      document.querySelectorAll('.gallery-item[data-src]')
    ).map(el => ({
      src:     el.dataset.src,
      alt:     el.dataset.alt     || '',
      caption: el.dataset.caption || '',
    }));
  }

  function clamp(index) {
    return ((index % gallery.length) + gallery.length) % gallery.length;
  }

  function renderLightbox() {
    const { src, alt, caption } = gallery[current];
    lbImg.src                   = src;
    lbImg.alt                   = alt;
    lbCaption.textContent        = caption;
    lbCounter.textContent        = `${current + 1} / ${gallery.length}`;
  }

  function openLightbox(index) {
    current = clamp(index);
    renderLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose?.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    current = clamp(current + dir);
    renderLightbox();
  }

  buildGallery();

  // Attach click + keyboard to each item
  document.querySelectorAll('.gallery-item[data-src]').forEach((el, i) => {
    el.setAttribute('role',     'button');
    el.setAttribute('tabindex', '0');
    el.addEventListener('click', () => openLightbox(i));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click',  () => navigate(-1));
  lbNext?.addEventListener('click',  () => navigate(1));

  // Close on backdrop click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation inside lightbox
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   navigate(-1);
    if (e.key === 'ArrowRight')  navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
  }, { passive: true });

});
