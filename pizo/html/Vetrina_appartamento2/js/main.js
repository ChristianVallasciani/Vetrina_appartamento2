(function () {
  "use strict";

  /* ── Navbar toggle (mobile) ── */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ── Navbar hide/show on scroll ── */
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;
  const SCROLL_THRESHOLD = 60;

  if (navbar) {
    window.addEventListener(
      "scroll",
      () => {
        const currentScroll = window.scrollY;
        if (currentScroll > SCROLL_THRESHOLD && currentScroll > lastScroll) {
          navbar.classList.add("nav-hidden");
        } else {
          navbar.classList.remove("nav-hidden");
        }
        lastScroll = currentScroll;
      },
      { passive: true }
    );
  }

  /* ── Lightbox (gallery page) ── */
  const lightbox = document.getElementById("lightbox");

  if (lightbox) {
    const lbImg = lightbox.querySelector(".lightbox-img");
    const lbClose = lightbox.querySelector(".lightbox-close");
    const lbPrev = lightbox.querySelector(".lightbox-prev");
    const lbNext = lightbox.querySelector(".lightbox-next");
    const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
    let currentIndex = 0;

    function openLightbox(index) {
      currentIndex = index;
      const img = galleryItems[index].querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function navigate(direction) {
      currentIndex =
        (currentIndex + direction + galleryItems.length) % galleryItems.length;
      const img = galleryItems[currentIndex].querySelector("img");
      lbImg.style.opacity = "0";
      setTimeout(() => {
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lbImg.style.opacity = "1";
      }, 150);
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener("click", () => openLightbox(i));
    });

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", () => navigate(-1));
    if (lbNext) lbNext.addEventListener("click", () => navigate(1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    });
  }

  /* ── Scroll reveal ── */
  const revealSections = document.querySelectorAll(
    "section, .gallery-cta-section"
  );

  if (revealSections.length) {
    revealSections.forEach((s) => s.classList.add("fade-in-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealSections.forEach((s) => observer.observe(s));
  }

  /* ── Lightbox image transition ── */
  const lbImgEl = document.querySelector(".lightbox-img");
  if (lbImgEl) {
    lbImgEl.style.transition = "opacity 0.15s ease";
  }
})();
