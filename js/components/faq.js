/* ============================================
   FAQ COMPONENT LOGIC
   ============================================ */

window.FAH = window.FAH || {};

/**
 * Gestion de l'accordéon FAQ
 */
window.FAH.initFAQ = function() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (!question) return;
    
    // Fonction pour gérer l'ouverture/fermeture
    const toggleFaq = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Ferme toutes les autres questions
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // Bascule la question cliquée
      item.classList.toggle('active');
    };
    
    // Écouter à la fois click et touchend pour mobile
    question.addEventListener('click', toggleFaq);
    question.addEventListener('touchend', toggleFaq);
  });
};