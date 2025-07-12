/**
 * Animations Module
 * Handles all animations and transitions
 */

export const Animations = (() => {
  // Animation duration in milliseconds
  const ANIMATION_DURATION = 300;
  
  /**
   * Initialize animations
   */
  const init = () => {
    // Add animation classes to elements that should animate on scroll
    setupScrollAnimations();
    
    // Add loading animation to elements with the loading class
    setupLoadingAnimations();
  };
  
  /**
   * Set up scroll animations
   */
  const setupScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    // Create intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          // Unobserve after animation starts to improve performance
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };
  
  /**
   * Set up loading animations
   */
  const setupLoadingAnimations = () => {
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach(element => {
      // Add loading spinner
      const spinner = document.createElement('div');
      spinner.className = 'loading-spinner';
      element.appendChild(spinner);
      
      // Add loading text if not already present
      if (!element.querySelector('.loading-text')) {
        const text = document.createElement('span');
        text.className = 'loading-text';
        text.textContent = 'Loading...';
        element.appendChild(text);
      }
    });
  };
  
  /**
   * Fade in an element
   * @param {HTMLElement} element - The element to fade in
   * @param {number} delay - Delay before starting the animation in milliseconds
   * @returns {Promise} A promise that resolves when the animation is complete
   */
  const fadeIn = (element, delay = 0) => {
    return new Promise(resolve => {
      if (!element) {
        resolve();
        return;
      }
      
      element.style.opacity = '0';
      element.style.transition = `opacity ${ANIMATION_DURATION}ms ease-in-out`;
      
      setTimeout(() => {
        element.style.opacity = '1';
        
        // Resolve the promise when the transition ends
        const onTransitionEnd = () => {
          element.removeEventListener('transitionend', onTransitionEnd);
          resolve();
        };
        
        element.addEventListener('transitionend', onTransitionEnd);
      }, delay);
    });
  };
  
  /**
   * Fade out an element
   * @param {HTMLElement} element - The element to fade out
   * @returns {Promise} A promise that resolves when the animation is complete
   */
  const fadeOut = (element) => {
    return new Promise(resolve => {
      if (!element) {
        resolve();
        return;
      }
      
      element.style.opacity = '1';
      element.style.transition = `opacity ${ANIMATION_DURATION}ms ease-in-out`;
      element.style.opacity = '0';
      
      // Resolve the promise when the transition ends
      const onTransitionEnd = () => {
        element.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };
      
      element.addEventListener('transitionend', onTransitionEnd);
    });
  };
  
  /**
   * Animate an element with a bounce effect
   * @param {HTMLElement} element - The element to animate
   * @param {number} duration - Duration of the animation in milliseconds
   */
  const bounce = (element, duration = 600) => {
    if (!element) return;
    
    element.style.animation = `bounce ${duration}ms ease-in-out`;
    
    // Remove animation after it completes
    setTimeout(() => {
      element.style.animation = '';
    }, duration);
  };
  
  /**
   * Add a pulse effect to an element
   * @param {HTMLElement} element - The element to animate
   * @param {number} count - Number of times to pulse
   * @param {number} duration - Duration of each pulse in milliseconds
   */
  const pulse = (element, count = 3, duration = 500) => {
    if (!element) return;
    
    // Add pulse animation
    const keyframes = `
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
    `;
    
    // Add keyframes if they don't exist
    if (!document.getElementById('pulse-animation')) {
      const style = document.createElement('style');
      style.id = 'pulse-animation';
      style.textContent = keyframes;
      document.head.appendChild(style);
    }
    
    // Apply animation
    element.style.animation = `pulse ${duration}ms ease-in-out ${count}`;
    
    // Clean up after animation
    setTimeout(() => {
      element.style.animation = '';
    }, duration * count);
  };
  
  // Public API
  return {
    init,
    fadeIn,
    fadeOut,
    bounce,
    pulse
  };
})();
