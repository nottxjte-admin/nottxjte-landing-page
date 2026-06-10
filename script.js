document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.getElementById('nav-list');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });
  }
});