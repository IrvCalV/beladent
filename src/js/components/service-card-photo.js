// Boton "Ver otra foto" en cada tarjeta de tratamiento -- alterna el
// thumbnail entre la foto del tratamiento (data-img) y la foto generica
// del consultorio (data-detail-img) sin necesidad de abrir el modal de
// detalle. stopPropagation evita que el click tambien dispare la
// apertura del modal (la tarjeta completa es clicable).
export function initServiceCardPhotoToggle() {
  document.querySelectorAll('.service-card').forEach((card) => {
    const button = card.querySelector('.service-photo-toggle');
    const img = card.querySelector('.service-photo img');
    const { detailImg, detailCaption, name } = card.dataset;

    if (!button || !img || !detailImg) return;

    // Guarda el thumbnail original (la version chica, w=700) en vez de
    // usar data-img (la version grande que usa el modal, w=900) para
    // que alternar de regreso no cambie el peso de la imagen cargada.
    const mainImg = img.src;
    const mainAlt = img.alt;
    let showingDetail = false;

    const toggle = (event) => {
      event.stopPropagation();
      showingDetail = !showingDetail;
      img.src = showingDetail ? detailImg : mainImg;
      img.alt = showingDetail ? detailCaption || 'Nuestro consultorio' : mainAlt || name || '';
    };

    button.addEventListener('click', toggle);
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation();
      }
    });
  });
}
