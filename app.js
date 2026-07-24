document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLiveCalculator();
  initServiceTabs();
  initBeforeAfterSlider();
  initFaqAccordion();
  initBookingForm();
  initScrollAnimations();
  initActiveNavTracking();
  initBackToTop();
});

/* --- MOBILE NAVIGATION TOGGLE --- */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.querySelector('.nav-links');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
    });
  });
}

/* --- DYNAMIC LIVE APP CALCULATOR --- */
function initLiveCalculator() {
  const serviceSelect = document.getElementById('form-service');
  const priceDisplay = document.getElementById('calc-price');
  const timeDisplay = document.getElementById('calc-time');

  if (!serviceSelect || !priceDisplay || !timeDisplay) return;

  serviceSelect.addEventListener('change', () => {
    const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    const time = selectedOption.getAttribute('data-time');

    if (price && time) {
      priceDisplay.textContent = `AED ${price}`;
      timeDisplay.textContent = time;
    }
  });
}

/* --- INTERACTIVE SERVICES CATEGORY TABS --- */
function initServiceTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-item-box');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });
}

/* --- BEFORE & AFTER SLIDER INTERACTION --- */
function initBeforeAfterSlider() {
  const container = document.getElementById('ba-slider-container');
  const afterLayer = document.getElementById('ba-after-layer');
  const handleLine = document.getElementById('ba-handle-line');

  if (!container || !afterLayer || !handleLine) return;

  let isDragging = false;

  function setSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    afterLayer.style.width = `${percentage}%`;
    handleLine.style.left = `${percentage}%`;
  }

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => isDragging = false);

  window.addEventListener('mousemove', (e) => {
    if (isDragging) setSliderPosition(e.clientX);
  });

  // Touch support for mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) setSliderPosition(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => isDragging = false);

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length > 0) {
      setSliderPosition(e.touches[0].clientX);
    }
  });
}

/* --- FAQ ACCORDION --- */
function initFaqAccordion() {
  const faqBoxes = document.querySelectorAll('.faq-box-outer');

  faqBoxes.forEach(box => {
    const trigger = box.querySelector('.faq-trigger');
    const body = box.querySelector('.faq-content-body');

    trigger.addEventListener('click', () => {
      const isActive = box.classList.contains('active');

      faqBoxes.forEach(b => {
        b.classList.remove('active');
        b.querySelector('.faq-content-body').style.maxHeight = '0px';
      });

      if (!isActive) {
        box.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* --- WHATSAPP FORM COMPILATION --- */
function initBookingForm() {
  const form = document.getElementById('booking-form-element');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const area = document.getElementById('form-area').value;
    const service = document.getElementById('form-service').value;

    const message = 
      `*AEROFOW DUBAI - SERVICE DISPATCH REQUEST*\n` +
      `----------------------------------------\n` +
      `👤 *Client Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `📍 *Location:* ${area}\n` +
      `🔧 *Selected Service:* ${service}\n` +
      `----------------------------------------\n` +
      `Please confirm technician arrival time. Thank you.`;

    const whatsappNumber = '971508775343';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  });
}

/* --- LIGHTWEIGHT SCROLL ANIMATIONS --- */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.bezel-card-outer, .timeline-step-card, .why-feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --- ACTIVE NAV LINK ON SCROLL --- */
function initActiveNavTracking() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = [];

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) sections.push({ id: href.slice(1), el: section, link: link });
    }
  });

  if (sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s.el));
}

/* --- BACK TO TOP BUTTON --- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
