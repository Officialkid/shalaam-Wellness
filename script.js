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
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
    });
  }

  // === BOOKING FORM LOGIC WILL BE ADDED HERE ===

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

    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('fname').value.trim();
      const phone = document.getElementById('fphone').value.trim();
      const email = document.getElementById('femail').value.trim();
      const service = document.getElementById('fservice').value;
      const format = bookingForm.querySelector('input[name="format"]:checked')?.value || '';
      const date = document.getElementById('fdate').value;
      const time = document.getElementById('ftime').value;
      const message = document.getElementById('fmessage').value.trim();

      // Validate required fields
      if (!name || !phone || !service || !format || !date || !time) {
        alert('Please fill in all required fields.');
        return;
      }

      // Compose WhatsApp message
      let waMsg = `Hello Shalam Wellness, I would like to book a session.\n`;
      waMsg += `Name: ${name}\n`;
      waMsg += `Phone: ${phone}\n`;
      if (email) waMsg += `Email: ${email}\n`;
      waMsg += `Service: ${service}\n`;
      waMsg += `Format: ${format}\n`;
      waMsg += `Preferred Date: ${date}\n`;
      waMsg += `Preferred Time: ${time}\n`;
      if (message) waMsg += `Message: ${message}`;

      // WhatsApp API link
      const waNumber = '254797431765';
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

      // Show confirmation and open WhatsApp
      if (window.confirm('Send your booking request via WhatsApp?')) {
        window.open(waUrl, '_blank');
        // Optionally show success message in form
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
        }
        bookingForm.reset();
        // Restore default radio button (Either)
        const eitherRadio = bookingForm.querySelector('input[name="format"][value="either"]');
        if (eitherRadio) eitherRadio.checked = true;
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
