/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

window.FAH = window.FAH || {};

/**
 * Gestion des animations au scroll (slide, fade, zoom)
 */
window.FAH.initScrollAnimations = function() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '30px 0px 30px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.slide-left, .slide-right, .slide-up, .fade-in, .zoom-in'
  );
  
  animatedElements.forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Animer immédiatement les éléments déjà visibles au chargement
  setTimeout(() => {
    animatedElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight;
      
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }, 100);
};

/**
 * Animation des highlights (mots surlignés)
 */
window.FAH.initHighlightAnimations = function() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const animateHighlights = (element) => {
    const highlights = element.querySelectorAll('[class*="highlight-word"]');
    
    highlights.forEach((highlight, index) => {
      setTimeout(() => {
        highlight.classList.add('visible');
      }, index * 200);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateHighlights(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  // Forcer l'animation des éléments visibles après un court délai
  setTimeout(() => {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.top < window.innerHeight;
      
      if (isVisible && !element.dataset.animated) {
        element.dataset.animated = 'true';
        animateHighlights(element);
      }
    });
  }, 100);
};

/**
 * Animation des stickers (yellow section)
 */
window.FAH.initStickerAnimations = function() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
  };

  const observerStickers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const stickers = entry.target.querySelectorAll('.floating-sticker');
      
      if (entry.isIntersecting) {
        stickers.forEach((sticker, index) => {
          setTimeout(() => {
            sticker.classList.add('animate');
          }, index * 150);
        });
      } else {
        stickers.forEach(sticker => {
          sticker.classList.remove('animate');
        });
      }
    });
  }, observerOptions);

  const yellowSection = document.querySelector('.yellow-section');
  if (yellowSection) {
    observerStickers.observe(yellowSection);
  }
};

/**
 * Gestion du scroll pour les images flottantes du hero
 */
window.FAH.initHeroScrollEffects = function() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // Gestion des images flottantes
        document.querySelectorAll('.floating-img').forEach((img) => {
          const direction = img.classList.contains('float-left')
            ? 'left'
            : img.classList.contains('float-right')
            ? 'right'
            : img.classList.contains('float-down')
            ? 'down'
            : null;

          if (scrollY > windowHeight * 0.005) {
            if (direction === 'left') {
              img.classList.add('hide-left');
              img.classList.remove('hide-right', 'hide-down');
            } else if (direction === 'right') {
              img.classList.add('hide-right');
              img.classList.remove('hide-left', 'hide-down');
            } else if (direction === 'down') {
              img.classList.add('hide-down');
              img.classList.remove('hide-left', 'hide-right');
            }
          } else {
            img.classList.remove('hide-left', 'hide-right', 'hide-down');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
};

/**
 * Animation GSAP des mots qui apparaissent au scroll
 * NE PAS UTILISER sur les pages avec scroll horizontal
 */
window.FAH.initGSAPTextAnimation = function() {
  // Vérifier que GSAP est chargé
  if (typeof gsap === 'undefined') {
    console.error('❌ GSAP non chargé');
    return;
  }
  
  if (typeof ScrollTrigger === 'undefined') {
    console.error('❌ ScrollTrigger non chargé');
    return;
  }

  if (typeof Lenis === 'undefined') {
    console.error('❌ Lenis non chargé');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const animeTextParagraphs = document.querySelectorAll(".anime-text p");

  const wordHighlightBgColor = "220, 220, 220";

  const keywords = [
    "vibrant",
    "living",
    "clarity",
    "expression",
    "shape",
    "intuitive",
    "storytelling",
    "interactive",
    "vision",
  ];

  animeTextParagraphs.forEach((paragraph) => {
    const text = paragraph.textContent;
    const words = text.split(/\s+/);
    paragraph.innerHTML = "";

    words.forEach((word) => {
      if (word.trim()) {
        const wordContainer = document.createElement("div");
        wordContainer.className = "word";

        const wordText = document.createElement("span");
        wordText.textContent = word;

        const normalizedWord = word.toLowerCase().replace(/[.,!?;:"]/g, "");
        if (keywords.includes(normalizedWord)) {
          wordContainer.classList.add("keyword-wrapper");
          wordText.classList.add("keyword", normalizedWord);
        }

        wordContainer.appendChild(wordText);
        paragraph.appendChild(wordContainer);
      }
    });
  });

  const animeTextContainers = document.querySelectorAll(".anime-text-container");

  animeTextContainers.forEach((container) => {
    ScrollTrigger.create({
      trigger: container,
      pin: container,
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pinSpacing: true,
    });

    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${window.innerHeight * 4}`,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const words = Array.from(container.querySelectorAll(".anime-text .word"));
        const totalWords = words.length;

        words.forEach((word, index) => {
          const wordText = word.querySelector("span");

          if (progress <= 0.5) {
            const revealProgress = progress / 0.5;
            const overlapWords = 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;
            const wordStart = index / totalWords;
            const wordEnd = wordStart + overlapWords / totalWords;
            const timelineScale = 1 / Math.min(totalAnimationLength, 1 + (totalWords - 1) / totalWords + overlapWords / totalWords);
            const adjustedStart = wordStart * timelineScale;
            const adjustedEnd = wordEnd * timelineScale;
            const duration = adjustedEnd - adjustedStart;
            const wordProgress = revealProgress <= adjustedStart ? 0 : revealProgress >= adjustedEnd ? 1 : (revealProgress - adjustedStart) / duration;

            word.style.opacity = wordProgress;
            const backgroundFadeStart = wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
            word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

            const textRevealThreshold = 0.9;
            const textRevealProgress = wordProgress >= textRevealThreshold ? (wordProgress - textRevealThreshold) / (1 - textRevealThreshold) : 0;
            wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
          } else {
            const reverseProgress = (progress - 0.5) / 0.5;
            word.style.opacity = 1;
            const targetTextOpacity = 1;
            const reverseOverlapWords = 5;
            const reverseWordStart = index / totalWords;
            const reverseWordEnd = reverseWordStart + reverseOverlapWords / totalWords;
            const reverseTimelineScale = 1 / Math.max(1, (totalWords - 1) / totalWords + reverseOverlapWords / totalWords);
            const reverseAdjustedStart = reverseWordStart * reverseTimelineScale;
            const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
            const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;
            const reverseWordProgress = reverseProgress <= reverseAdjustedStart ? 0 : reverseProgress >= reverseAdjustedEnd ? 1 : (reverseProgress - reverseAdjustedStart) / reverseDuration;

            if (reverseWordProgress > 0) {
              wordText.style.opacity = targetTextOpacity * (1 - reverseWordProgress);
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
            } else {
              wordText.style.opacity = targetTextOpacity;
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
            }
          }
        });
      },
    });
  });
};

/**
 * Animation GSAP - Scroll horizontal pour la page "Agir"
 * Cette fonction doit être appelée SANS Lenis
 */
window.FAH.initHorizontalScroll = function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.error('❌ GSAP ou ScrollTrigger non chargé');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const stepsHorizontal = document.querySelector('.steps-horizontal');
  const stepsTrack = document.getElementById('stepsTrack');

  if (!stepsHorizontal || !stepsTrack) {
    console.log('ℹ️ Éléments du scroll horizontal non trouvés (normal si pas sur la page Agir)');
    return;
  }

  // Réinitialiser ScrollTrigger pour éviter les conflits
  ScrollTrigger.refresh();

  gsap.to(stepsTrack, {
    x: () => -(stepsTrack.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: stepsHorizontal,
      start: 'top top',
      end: () => `+=${stepsHorizontal.offsetHeight}`,
      scrub: 1,
      pin: '.steps-container',
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  console.log('✅ Scroll horizontal initialisé');
};