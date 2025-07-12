/**
 * UI Manager Module
 * Handles UI interactions and updates
 */

export const UIManager = (() => {
  // DOM Elements
  let menuToggle;
  let dropdownMenu;
  let themeToggle;
  
  /**
   * Initialize the UI manager
   */
  const init = () => {
    // Get DOM elements
    menuToggle = document.getElementById('menu-toggle');
    dropdownMenu = document.querySelector('.dropdown-menu');
    themeToggle = document.getElementById('theme-toggle');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize tooltips
    initTooltips();
    
    // Initialize theme
    initTheme();
  };
  
  /**
   * Set up event listeners
   */
  const setupEventListeners = () => {
    // Mobile menu toggle
    if (menuToggle) {
      menuToggle.addEventListener('change', toggleMobileMenu);
    }
    
    // Theme toggle
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (dropdownMenu && !e.target.closest('.menu-container') && !e.target.closest('.hamburger')) {
        closeMobileMenu();
      }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', smoothScroll);
    });
  };
  
  /**
   * Toggle mobile menu
   */
  const toggleMobileMenu = () => {
    if (menuToggle.checked) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  };
  
  /**
   * Open mobile menu
   */
  const openMobileMenu = () => {
    if (dropdownMenu) {
      dropdownMenu.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  };
  
  /**
   * Close mobile menu
   */
  const closeMobileMenu = () => {
    if (menuToggle) {
      menuToggle.checked = false;
    }
    if (dropdownMenu) {
      dropdownMenu.style.display = 'none';
      document.body.style.overflow = '';
    }
  };
  
  /**
   * Smooth scroll to anchor
   * @param {Event} e - The click event
   */
  const smoothScroll = (e) => {
    e.preventDefault();
    
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Scroll to target
    window.scrollTo({
      top: targetElement.offsetTop - 80, // Adjust for fixed header
      behavior: 'smooth'
    });
    
    // Update URL without page jump
    history.pushState(null, null, targetId);
  };
  
  /**
   * Initialize tooltips
   */
  const initTooltips = () => {
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
      const tooltipText = tooltip.querySelector('.tooltiptext');
      if (!tooltipText) return;
      
      // Position tooltip
      const position = tooltip.dataset.position || 'top';
      tooltipText.classList.add(`tooltip-${position}`);
      
      // Add event listeners for better accessibility
      tooltip.setAttribute('tabindex', '0');
      tooltip.setAttribute('role', 'tooltip');
      tooltip.setAttribute('aria-describedby', tooltip.id || '');
      
      tooltip.addEventListener('mouseenter', () => showTooltip(tooltip, tooltipText));
      tooltip.addEventListener('mouseleave', () => hideTooltip(tooltipText));
      tooltip.addEventListener('focus', () => showTooltip(tooltip, tooltipText));
      tooltip.addEventListener('blur', () => hideTooltip(tooltipText));
      tooltip.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          hideTooltip(tooltipText);
        }
      });
    });
  };
  
  /**
   * Show tooltip
   * @param {HTMLElement} tooltip - The tooltip element
   * @param {HTMLElement} tooltipText - The tooltip text element
   */
  const showTooltip = (tooltip, tooltipText) => {
    tooltipText.style.visibility = 'visible';
    tooltipText.style.opacity = '1';
  };
  
  /**
   * Hide tooltip
   * @param {HTMLElement} tooltipText - The tooltip text element
   */
  const hideTooltip = (tooltipText) => {
    tooltipText.style.visibility = 'hidden';
    tooltipText.style.opacity = '0';
  };
  
  /**
   * Initialize theme
   */
  const initTheme = () => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };
  
  /**
   * Toggle between light and dark theme
   */
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  
  /**
   * Set the theme
   * @param {string} theme - The theme to set ('light' or 'dark')
   */
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle button
    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      }
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  };
  
  /**
   * Show loading state
   * @param {HTMLElement} element - The element to show loading state in
   */
  const showLoading = (element) => {
    if (!element) return;
    element.innerHTML = '<div class="loading-spinner"></div>';
  };
  
  /**
   * Show error message
   * @param {HTMLElement} element - The element to show error in
   * @param {string} message - The error message to display
   */
  const showError = (element, message = 'An error occurred. Please try again.') => {
    if (!element) return;
    element.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
      </div>
    `;
  };
  
  // Public API
  return {
    init,
    showLoading,
    showError,
    closeMobileMenu
  };
})();
