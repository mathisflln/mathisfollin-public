/* ============================================
   NAVBAR COMPONENT LOGIC
   ============================================ */

// Créer le namespace FAH s'il n'existe pas
window.FAH = window.FAH || {};

/**
 * Gestion du menu burger mobile
 */
let scrollPosition = 0;

window.FAH.toggleMobileMenu = function() {
  const menu = document.getElementById('mobileMenu');
  const burger = document.querySelector('.burger-btn');
  
  if (!menu || !burger) return;
  
  menu.classList.toggle('active');
  burger.classList.toggle('active');
  
  if (menu.classList.contains('active')) {
    // Sauvegarder la position actuelle du scroll
    scrollPosition = window.pageYOffset;
    
    // Bloquer le scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  } else {
    // Débloquer le scroll
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    
    // Restaurer la position du scroll
    window.scrollTo(0, scrollPosition);
  }
};

/**
 * Initialiser la navigation
 */
window.FAH.initNavbar = function() {
  // Gestion des dropdowns (si nécessaire pour le futur)
  const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

  dropdownTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();

      const parent = trigger.closest('.nav-item.dropdown');

      // Ferme les autres menus ouverts
      document.querySelectorAll('.nav-item.dropdown.active').forEach(item => {
        if (item !== parent) item.classList.remove('active');
      });

      // Bascule l'état actif de celui-ci
      parent.classList.toggle('active');
    });
  });

  // Ferme le menu si on clique en dehors
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.dropdown')) {
      document.querySelectorAll('.nav-item.dropdown.active').forEach(item => {
        item.classList.remove('active');
      });
    }
  });

  // Fermer le menu mobile automatiquement au redimensionnement
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 900) {
      const menu = document.getElementById('mobileMenu');
      const burger = document.querySelector('.burger-btn');
      
      if (menu) menu.classList.remove('active');
      if (burger) burger.classList.remove('active');
      
      // Débloquer le scroll
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
    }
  });

  // Fermer le menu mobile quand on clique sur les liens
  document.querySelectorAll('.mobile-menu-overlay .nav-link, .mobile-menu-overlay .nav-link-login').forEach(link => {
    link.addEventListener('click', () => {
      window.FAH.toggleMobileMenu();
    });
  });

  // Exposer toggleMobileMenu globalement pour l'attribut onclick dans le HTML
  window.toggleMobileMenu = window.FAH.toggleMobileMenu;
};