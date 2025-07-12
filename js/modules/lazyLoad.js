/**
 * Lazy Load Module
 * Handles lazy loading of images and iframes
 */

export const LazyLoad = (() => {
  // Configuration
  const config = {
    rootMargin: '200px 0px',
    threshold: 0.01,
    useNativeLoading: true, // Use native loading="lazy" where supported
  };

  // Elements to lazy load
  let lazyElements = [];
  let observer;

  /**
   * Initialize the lazy loading
   */
  const init = () => {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      loadAllImages();
      return;
    }

    // Set up the intersection observer
    observer = new IntersectionObserver(handleIntersect, {
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });

    // Start observing elements
    updateElements();
  };

  /**
   * Update the list of elements to observe
   */
  const updateElements = () => {
    // Find all elements with data-src or data-srcset
    const elements = document.querySelectorAll('[data-src], [data-srcset]');
    
    // Clear current observations
    lazyElements.forEach(element => {
      if (element) observer.unobserve(element);
    });
    
    // Add new elements to observe
    lazyElements = Array.from(elements);
    lazyElements.forEach(element => {
      if (element) observer.observe(element);
    });
  };

  /**
   * Handle intersection events
   * @param {Array} entries - Intersection observer entries
   * @param {Object} observer - Intersection observer instance
   */
  const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        loadElement(element);
        observer.unobserve(element);
      }
    });
  };

  /**
   * Load a single element
   * @param {HTMLElement} element - The element to load
   */
  const loadElement = (element) => {
    // Handle picture elements
    if (element.tagName === 'PICTURE') {
      const sources = element.querySelectorAll('source');
      sources.forEach(source => {
        if (source.dataset.srcset) {
          source.srcset = source.dataset.srcset;
          delete source.dataset.srcset;
        }
      });
    }

    // Handle img elements
    if (element.tagName === 'IMG') {
      if (element.dataset.src) {
        element.src = element.dataset.src;
        delete element.dataset.src;
      }
      
      if (element.dataset.srcset) {
        element.srcset = element.dataset.srcset;
        delete element.dataset.srcset;
      }

      // Handle image load event
      if (!element.complete) {
        element.addEventListener('load', () => {
          element.classList.add('loaded');
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(() => {
          if (!element.classList.contains('loaded')) {
            element.classList.add('loaded');
          }
        }, 1000);
      } else {
        element.classList.add('loaded');
      }
    }
  };

  /**
   * Load all images immediately (fallback)
   */
  const loadAllImages = () => {
    document.querySelectorAll('[data-src], [data-srcset]').forEach(element => {
      loadElement(element);
    });
  };

  // Public API
  return {
    init,
    update: updateElements
  };
})();
