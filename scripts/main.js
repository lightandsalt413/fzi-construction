/* ===== FZI Construction — Main JS ===== */
(function(){
  'use strict';

  // === PAGE LOADER ===
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => { loader.classList.add('hidden'); }, 800);
  });
  // Fallback: hide after 3s max
  setTimeout(() => { if(loader) loader.classList.add('hidden'); }, 3000);
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // === HAMBURGER ===
  const hamburger = document.getElementById('hamburger');
  const mobMenu = document.getElementById('mobMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobMenu.classList.toggle('open');
    document.body.style.overflow = mobMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // === SCROLL REVEAL ===
  const revealEls = document.querySelectorAll('.rv');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  // Start observing only after loader is hidden
  setTimeout(() => {
    revealEls.forEach(el => observer.observe(el));
  }, 850); // Matches the loader timeout + slight buffer

  // === STAT COUNTER ===
  const counters = document.querySelectorAll('.stat-num');
  let countStarted = false;
  const startCounting = () => {
    if (countStarted) return;
    countStarted = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 2000;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });
  };
  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) {
    const statsObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { startCounting(); statsObs.disconnect(); }
    }, { threshold: 0.5 });
    statsObs.observe(statsEl);
  }

  // === HERO PARALLAX ===
  const heroBg = document.querySelector('.hero-bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1.05) translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }

  // === SMOOTH SCROLL FOR NAV ===
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // === CONTACT FORM ===
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const phone = form.querySelector('#phone').value;
      const type = form.querySelector('#projectType').value;
      const msg = form.querySelector('#message').value;
      const subject = encodeURIComponent('Project Inquiry from ' + name);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject Type: ${type}\n\nMessage:\n${msg}`
      );
      window.location.href = `mailto:fzi.const@yahoo.com.ph?subject=${subject}&body=${body}`;
    });
  }

  // === ACTIVE NAV LINK ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(l => {
      l.style.color = l.getAttribute('href') === '#' + current ? 'var(--green-light)' : '';
    });
  }, { passive: true });

})();
