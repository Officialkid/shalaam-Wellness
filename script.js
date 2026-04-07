/* ============================================
   SHALAM WELLNESS — script.js
   Animations, Interactions & Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // === MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');

  function openNav() {
    document.body.classList.add('nav-open');
    navToggle && navToggle.classList.add('active');
  }
  function closeNav() {
    document.body.classList.remove('nav-open');
    navToggle && navToggle.classList.remove('active');
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
  }
  navOverlay && navOverlay.addEventListener('click', closeNav);

  // Close nav when any nav link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // === BOOKING FORM LOGIC WILL BE ADDED HERE ===

  // === FAQ ACCORDION ===
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
      });
      // Open clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-a').style.maxHeight = item.querySelector('.faq-a').scrollHeight + 'px';
      }
    });
  });

  // === BOOKING FORM LOGIC ===
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccess');
  if (bookingForm) {
    // Set min date to today for date input
    const dateInput = document.getElementById('fdate');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    // === FORMAT PRICE NOTICE ===
    const formatNotice = document.getElementById('formatNotice');
    if (formatNotice) {
      const formatRadios = bookingForm.querySelectorAll('input[name="format"]');
      formatRadios.forEach(radio => {
        radio.addEventListener('change', () => {
          if (radio.value === 'online') {
            formatNotice.innerHTML = 'ℹ️ By choosing <strong>Online</strong>, you agree to a session rate of <strong>KES 1,500</strong>.';
            formatNotice.className = 'format-notice show';
          } else if (radio.value === 'inperson') {
            formatNotice.innerHTML = 'ℹ️ By choosing <strong>In-Person</strong>, you agree to a session rate of <strong>KES 2,500</strong>.';
            formatNotice.className = 'format-notice show';
          } else {
            const label = radio.value === 'custom' ? 'Custom' : 'Either';
            formatNotice.innerHTML = `📋 For <strong>${label}</strong>, your session rate will be advised by your counsellor.`;
            formatNotice.className = 'format-notice show advisory';
          }
        });
      });
    }

    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const email = document.getElementById('femail').value.trim();
      const service = document.getElementById('fservice').value;
      const formatRadio = bookingForm.querySelector('input[name="format"]:checked');
      const format = formatRadio ? formatRadio.value : '';
      const date = document.getElementById('fdate').value;
      const time = document.getElementById('ftime').value;
      const message = document.getElementById('fmessage').value.trim();

      // Validate required fields
      if (!name || !phone || !service || !format || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }

      // Format the date for readability
      const dateFormatted = date ? new Date(date + 'T00:00').toLocaleDateString('en-KE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : date;

      // Compose well-spaced WhatsApp message
      let waMsg = `Hello Shalam Wellness, I would love to book a session with you! 🌿\n\n`;
      waMsg += `Here are my details:\n\n`;
      waMsg += `📌 Name: ${name}\n`;
      waMsg += `📞 Phone: ${phone}\n`;
      if (email) waMsg += `📧 Email: ${email}\n`;
      waMsg += `🩺 Service: ${service}\n`;
      waMsg += `📍 Format: ${format.charAt(0).toUpperCase() + format.slice(1)}\n`;
      waMsg += `📅 Preferred Date: ${dateFormatted}\n`;
      waMsg += `⏰ Preferred Time: ${time}\n`;
      if (message) waMsg += `\n💬 Note: ${message}`;

      // WhatsApp API link
      const waNumber = '254797431765';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

      // Open WhatsApp and show success — hide the form
      window.open(waUrl, '_blank');
      bookingForm.style.display = 'none';
      if (formSuccess) {
        formSuccess.style.display = 'flex';
      }
    });
  }

  // === COOKIE BANNER ===
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  if (cookieBanner) {
    if (localStorage.getItem('sw_cookie_consent')) {
      cookieBanner.classList.add('hidden');
    }
    cookieAccept && cookieAccept.addEventListener('click', () => {
      localStorage.setItem('sw_cookie_consent', 'accepted');
      cookieBanner.classList.add('hidden');
    });
    cookieDecline && cookieDecline.addEventListener('click', () => {
      localStorage.setItem('sw_cookie_consent', 'declined');
      cookieBanner.classList.add('hidden');
    });
  }

  // === PRIVACY POLICY MODAL ===
  const privacyOverlay = document.getElementById('privacyOverlay');
  const openPrivacyBtns = [
    document.getElementById('openPrivacy'),
    document.getElementById('cookieOpenPrivacy')
  ];
  const closePrivacy = document.getElementById('closePrivacy');

  function openPrivacyModal() {
    privacyOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePrivacyModal() {
    privacyOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  openPrivacyBtns.forEach(btn => {
    btn && btn.addEventListener('click', openPrivacyModal);
  });
  closePrivacy && closePrivacy.addEventListener('click', closePrivacyModal);
  privacyOverlay && privacyOverlay.addEventListener('click', (e) => {
    if (e.target === privacyOverlay) closePrivacyModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && privacyOverlay.classList.contains('open')) closePrivacyModal();
  });

});
