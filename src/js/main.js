import '../css/main.css';
import { initNav } from './components/nav.js';
import { initScrollReveal } from './components/scroll-reveal.js';
import { initTreatmentLightbox } from './components/treatment-lightbox.js';
import { initAppointmentForm } from './components/appointment-form.js';
import { initServiceCardPhotoToggle } from './components/service-card-photo.js';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

initNav();
initScrollReveal();
initTreatmentLightbox();
initAppointmentForm();
initServiceCardPhotoToggle();
