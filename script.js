// CRAFTED SPACE - Production Slider Core & Formspree SDK Controller
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PORTFOLIO SLIDERS ENGINE
  // ==========================================
  const cards = document.querySelectorAll('.project-row-card');

  cards.forEach(card => {
    const slider = card.querySelector('.project-row-slider');
    const track = card.querySelector('.project-slide-track');
    const nextBtn = card.querySelector('.next-btn');
    const prevBtn = card.querySelector('.prev-btn');
    const dots = card.querySelectorAll('.dot');
    const totalSlides = card.querySelectorAll('.project-row-image').length;

    function updateSlider(index) {
      track.style.transform = `translateX(-${index * 33.333}%)`;
      slider.setAttribute('data-current-index', index);

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    }

    if (nextBtn && prevBtn) {
      nextBtn.addEventListener('click', () => {
        let currentIndex = parseInt(slider.getAttribute('data-current-index'), 10);
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(currentIndex);
      });

      prevBtn.addEventListener('click', () => {
        let currentIndex = parseInt(slider.getAttribute('data-current-index'), 10);
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(currentIndex);
      });
    }

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        updateSlider(index);
      });
    });

    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches.clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches.clientX;
      const swipeDistance = startX - endX;
      let currentIndex = parseInt(slider.getAttribute('data-current-index'), 10);

      if (swipeDistance > 50) {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider(currentIndex);
      } else if (swipeDistance < -50) {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider(currentIndex);
      }
    }, { passive: true });
  });

  // ==========================================
  // 2. FORMSPREE NATIVE SDK INITIALIZATION
  // ==========================================
  const formElement = document.querySelector('#html-contact-form');

  if (formElement) {
    // Inject success interceptor handlers directly into Formspree framework pipeline
    window.formspree = window.formspree || function () { 
      (formspree.q = formspree.q || []).push(arguments); 
    };

    // Instantiate and bind your specific form schema to the endpoint tracker
    formspree('initForm', { 
      formElement: '#html-contact-form', 
      formId: 'mjybeddr',
      onSuccess: function() {
        const nameVal = document.getElementById('name').value || 'Klijent';
        alert(`Hvala Vam, ${nameVal}! Uspešno ste poslali zahtev. Kontaktiraćemo vas u najkraćem roku.`);
        formElement.reset(); // Wipe all fields clean upon verified transmission
      }
    });

    // Handle button visual states while processing live validation
    formElement.addEventListener('submit', () => {
      const submitBtn = formElement.querySelector('[data-fs-submit-btn]');
      if (submitBtn) {
        submitBtn.textContent = 'SLANJE UPITA...';
      }
    });
  }
});
