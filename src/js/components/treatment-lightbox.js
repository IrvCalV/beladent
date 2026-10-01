// Quick view modal for a treatment/service card.
//
// Markup contract:
//   <article class="service-card" role="button" tabindex="0"
//     data-name="Blanqueamiento Dental"
//     data-meta="Desde $2,400 MXN · 60 min"
//     data-desc="..."
//     data-img="https://.../foto-tratamiento.jpg"
//     data-detail-img="https://.../detalle-clinica.jpg"
//     data-detail-caption="Nuestro consultorio">
//     ...
//   </article>
//
// The whole card is the tap/click target (not a button that only shows
// on hover) -- on touch devices there's no hover, so a hover-revealed
// button was effectively unreachable.
// One shared #service-modal in the page gets its text/images filled in
// from whichever card was clicked. The two images inside the modal
// cross-fade automatically (setInterval + an `is-active` class whose
// opacity transition is defined in lightbox.css) and can also be
// switched by hand with the dots.
export function initTreatmentLightbox() {
  const modal = document.querySelector('#service-modal');
  if (!modal) return;

  const panel = modal.querySelector('.service-modal-panel');
  const slides = modal.querySelectorAll('.service-modal-slide');
  const dots = modal.querySelectorAll('.service-modal-dot');
  const caption = modal.querySelector('.service-modal-caption');
  const nameEl = modal.querySelector('.service-modal-name');
  const metaEl = modal.querySelector('.service-modal-meta');
  const descEl = modal.querySelector('.service-modal-desc');
  const ctaEl = modal.querySelector('.service-modal-cta');

  let autoplay = null;
  let activeIndex = 0;

  const setActive = (index) => {
    activeIndex = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplay = window.setInterval(() => setActive((activeIndex + 1) % slides.length), 3500);
  };

  const stopAutoplay = () => {
    if (autoplay) window.clearInterval(autoplay);
    autoplay = null;
  };

  const open = (card) => {
    const { name, meta, desc, img, detailImg, detailCaption } = card.dataset;

    slides[0].querySelector('img').src = img;
    slides[0].querySelector('img').alt = name;
    slides[1].querySelector('img').src = detailImg;
    slides[1].querySelector('img').alt = detailCaption || 'Nuestro consultorio';
    caption.textContent = detailCaption || 'Nuestro consultorio';
    nameEl.textContent = name;
    metaEl.textContent = meta;
    descEl.textContent = desc;
    const whatsappText = encodeURIComponent(`Hola, quisiera agendar una cita para: ${name}`);
    ctaEl.href = `https://wa.me/527224191013?text=${whatsappText}`;
    ctaEl.target = '_blank';
    ctaEl.rel = 'noopener';

    setActive(0);
    modal.dataset.open = 'true';
    document.body.classList.add('modal-open');
    startAutoplay();
  };

  const close = () => {
    modal.dataset.open = 'false';
    document.body.classList.remove('modal-open');
    stopAutoplay();
  };

  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('click', () => open(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(card);
      }
    });
  });

  modal.querySelector('.service-modal-close')?.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (!panel.contains(event.target)) close();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setActive(i);
      startAutoplay();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.dataset.open === 'true') close();
  });
}
