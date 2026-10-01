// Formulario de cita -- en vez de enviar a un backend (no hay uno), arma
// un mensaje de WhatsApp con el nombre, el servicio de interes (si se
// eligio) y el mensaje libre (si se escribio), y abre WhatsApp con ese
// texto ya cargado al numero de la clinica.
const WHATSAPP_NUMBER = '527224191013';

export function initAppointmentForm() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = form.querySelector('#nombre')?.value.trim();
    const servicioSelect = form.querySelector('#servicio');
    const servicioTexto = servicioSelect?.value
      ? servicioSelect.options[servicioSelect.selectedIndex].text
      : '';
    const mensaje = form.querySelector('#mensaje')?.value.trim();

    const lineas = [`Hola, soy ${nombre}. Quisiera agendar una cita en Bela Dent.`];
    if (servicioTexto) lineas.push(`Servicio de interés: ${servicioTexto}`);
    if (mensaje) lineas.push(`Mensaje: ${mensaje}`);

    const texto = encodeURIComponent(lineas.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`, '_blank', 'noopener');
  });
}
