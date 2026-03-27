// Shared site functionality

// Set current year in footer
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile menu toggle
let menuOpen = false;
function toggleMenu() {
  menuOpen = !menuOpen;
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  if (!menu) return;
  if (menuOpen) {
    menu.classList.remove('hidden-menu');
    menu.classList.add('visible-menu');
    if (icon) icon.textContent = 'close';
    document.body.style.overflow = 'hidden';
  } else {
    menu.classList.remove('visible-menu');
    menu.classList.add('hidden-menu');
    if (icon) icon.textContent = 'menu';
    document.body.style.overflow = '';
  }
}

// Smooth scroll to section
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  if (menuOpen) toggleMenu();
}
