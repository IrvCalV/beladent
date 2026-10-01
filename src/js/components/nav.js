// Toggles the mobile nav menu. Framework-agnostic: works on any page
// that has a `.nav` with a `.nav-toggle` button and a `.nav-links` list.
export function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.nav-toggle');
  const links = nav?.querySelectorAll('.nav-links a');

  if (!nav || !toggle) return;

  // Expuesto como variable CSS para que el modal de tratamientos sepa
  // cuanto espacio dejar libre arriba y no quede su boton de cerrar
  // tapado por la barra de navegacion sticky.
  const setNavHeightVar = () => {
    document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight}px`);
  };
  setNavHeightVar();
  window.addEventListener('resize', setNavHeightVar);

  const setOpen = (open) => {
    nav.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setOpen(nav.dataset.open !== 'true');
  });

  links?.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
}
