/* ============================================
   MAIN JAVASCRIPT - FAH Marie-Curie
   Point d'entrée principal de l'application
   
   NOTE: Les composants sont chargés depuis des fichiers séparés
   via des balises <script> dans le HTML dans cet ordre:
   1. components/navbar.js
   2. components/scroll-animations.js
   3. components/cards.js
   4. components/faq.js
   5. main.js (ce fichier)
   ============================================ */

/**
 * Initialisation de l'application au chargement du DOM
 */
function initApp() {
  console.log('🚀 Initialisation FAH Marie-Curie...');
  
  // Vérifier que les fonctions sont disponibles
  if (typeof window.FAH === 'undefined') {
    console.error('❌ FAH namespace non trouvé');
    return;
  }
  
  // Détecter la page actuelle
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const isAgirPage = currentPage === 'agir.html';
  
  console.log(`📄 Page actuelle: ${currentPage}`);
  
  // Navigation
  if (window.FAH.initNavbar) {
    window.FAH.initNavbar();
    console.log('✓ Navigation initialisée');
  }
  
  // Animations au scroll
  if (window.FAH.initScrollAnimations) {
    window.FAH.initScrollAnimations();
    console.log('✓ Animations scroll initialisées');
  }
  
  if (window.FAH.initHighlightAnimations) {
    window.FAH.initHighlightAnimations();
    console.log('✓ Highlights initialisés');
  }
  
  if (window.FAH.initStickerAnimations) {
    window.FAH.initStickerAnimations();
    console.log('✓ Stickers initialisés');
  }
  
  if (window.FAH.initHeroScrollEffects) {
    window.FAH.initHeroScrollEffects();
    console.log('✓ Effets hero initialisés');
  }

  // ⚠️ IMPORTANT: Lenis et scroll horizontal sont incompatibles
  if (isAgirPage) {
    // Sur la page Agir: scroll horizontal SANS Lenis
    console.log('🔄 Mode scroll horizontal activé (Lenis désactivé)');
    if (window.FAH.initHorizontalScroll) {
      window.FAH.initHorizontalScroll();
      console.log('✓ Scroll horizontal initialisé');
    }
  } else {
    // Sur les autres pages: GSAP avec Lenis
    console.log('🔄 Mode scroll normal activé (Lenis + GSAP)');
    if (window.FAH.initGSAPTextAnimation) {
      window.FAH.initGSAPTextAnimation();
      console.log('✓ Animation GSAP initialisée');
    }
  }
  
  // Cartes empilées
  if (window.FAH.initStackedCards) {
    window.FAH.initStackedCards();
    console.log('✓ Cartes empilées initialisées');
  }
  
  // FAQ
  if (window.FAH.initFAQ) {
    window.FAH.initFAQ();
    console.log('✓ FAQ initialisée');
  }
  
  console.log('✅ FAH Marie-Curie - Application initialisée avec succès');
}

// Lancer l'initialisation selon l'état du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}