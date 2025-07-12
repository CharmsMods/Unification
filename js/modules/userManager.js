/**
 * User Manager Module
 * Handles user-related functionality
 */

import { DataService } from './dataService.js';

export const UserManager = (() => {
  // DOM Elements
  let memberButtonsContainer;
  let selectedUserNameSpan;
  let userContentArea;
  let scrollHint;
  
  // State
  let currentUser = null;
  
  /**
   * Initialize the user manager
   * @param {Object} elements - DOM elements needed for user management
   */
  const init = (elements) => {
    // Store DOM references
    memberButtonsContainer = elements.memberButtonsContainer;
    selectedUserNameSpan = elements.selectedUserNameSpan;
    userContentArea = elements.userContentArea;
    scrollHint = elements.scrollHint;
    
    // Set up event listeners
    setupEventListeners();
  };
  
  /**
   * Set up event listeners
   */
  const setupEventListeners = () => {
    // Delegate click events for user buttons
    if (memberButtonsContainer) {
      memberButtonsContainer.addEventListener('click', handleUserButtonClick);
    }
  };
  
  /**
   * Handle user button click
   * @param {Event} event - The click event
   */
  const handleUserButtonClick = async (event) => {
    const button = event.target.closest('.user-button');
    if (!button) return;
    
    event.preventDefault();
    const userId = button.dataset.userId;
    await selectUser(userId);
  };
  
  /**
   * Select and display a user
   * @param {string} userId - The ID of the user to select
   */
  const selectUser = async (userId) => {
    try {
      // Show loading state
      userContentArea.innerHTML = '<div class="loading-spinner"></div>';
      
      // Get user data
      const user = await DataService.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Update current user
      currentUser = user;
      
      // Update UI
      updateUserUI(user);
      updateActiveButton(userId);
      updateUserBackground(user);
      
    } catch (error) {
      console.error('Error selecting user:', error);
      userContentArea.innerHTML = `
        <div class="error-message">
          <p>Error loading user. Please try again later.</p>
        </div>
      `;
    }
  };
  
  /**
   * Update the UI with user data
   * @param {Object} user - The user data to display
   */
  const updateUserUI = (user) => {
    // Update user name
    if (selectedUserNameSpan) {
      selectedUserNameSpan.textContent = user.name;
    }
    
    // Create user content HTML
    const socialLinksHtml = user.social?.websites 
      ? user.social.websites.map(site => `
          <a href="${site.url}" class="tool-link" target="_blank" rel="noopener noreferrer" 
             aria-label="Visit ${site.name}">
            ${site.icon} ${site.name}
          </a>
        `).join('')
      : '';
    
    // Create profile image HTML with WebP fallback
    const profileImageHtml = user.profileImage
      ? `
        <div class="profile-image-container">
          <picture>
            <source type="image/webp" srcset="images/profiles/webp/${user.profileImage}.webp">
            <img 
              src="images/profiles/${user.profileImage}.jpg" 
              alt="${user.name}'s profile picture"
              loading="lazy"
              class="profile-image"
              width="150"
              height="150">
          </picture>
        </div>
      `
      : '';
    
    // Update user content area
    userContentArea.innerHTML = `
      <div class="user-content fade-in">
        ${profileImageHtml}
        <div class="user-details">
          <h3>${user.name}</h3>
          <p>${user.content}</p>
          ${socialLinksHtml ? `<div class="social-links">${socialLinksHtml}</div>` : ''}
        </div>
      </div>
    `;
  };
  
  /**
   * Update the active button state
   * @param {string} userId - The ID of the selected user
   */
  const updateActiveButton = (userId) => {
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.user-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected button
    const selectedButton = document.querySelector(`.user-button[data-user-id="${userId}"]`);
    if (selectedButton) {
      selectedButton.classList.add('active');
    }
  };
  
  /**
   * Update the background for the user content section with responsive images and smooth loading
   * @param {Object} user - The user data
   */
  const updateUserBackground = (user) => {
    const userContentSection = document.getElementById('user-content-display-section');
    if (!userContentSection || !user.background) return;
    
    // Remove any existing background elements
    const existingBg = document.getElementById('bg-overlay');
    if (existingBg) {
      existingBg.remove();
    }
    
    const backgroundName = user.background.split('.')[0];
    const backgroundExt = user.background.split('.').pop();
    const isVideo = user.backgroundType === 'video' || 
                   backgroundExt === 'mp4' || 
                   backgroundExt === 'webm';
    
    // Create container for background with loading state
    const bgContainer = document.createElement('div');
    bgContainer.id = 'bg-overlay';
    bgContainer.className = 'bg-loading';
    bgContainer.style.position = 'absolute';
    bgContainer.style.top = '0';
    bgContainer.style.left = '0';
    bgContainer.style.width = '100%';
    bgContainer.style.height = '100%';
    bgContainer.style.zIndex = '0';
    bgContainer.style.overflow = 'hidden';
    
    // Create a function to handle when the background is fully loaded
    const handleBackgroundLoaded = (element) => {
      element.classList.add('loaded');
      bgContainer.classList.remove('bg-loading');
    };
    
    if (isVideo) {
      // For video backgrounds
      const videoBg = document.createElement('video');
      videoBg.className = 'bg-image bg-transition';
      videoBg.autoplay = true;
      videoBg.muted = true;
      videoBg.loop = true;
      videoBg.playsInline = true;
      videoBg.style.width = '100%';
      videoBg.style.height = '100%';
      videoBg.style.objectFit = 'cover';
      
      // Add WebM source if available (better compression)
      if (backgroundExt === 'webm' || backgroundExt === 'mp4') {
        const source = document.createElement('source');
        source.src = `backgrounds/usersbackgrounds/${user.background}`;
        source.type = `video/${backgroundExt}`;
        videoBg.appendChild(source);
      }
      
      // Add fallback to WebP image if specified
      if (user.fallbackImage) {
        const fallbackSource = document.createElement('source');
        fallbackSource.srcset = `backgrounds/usersbackgrounds/${user.fallbackImage}`;
        fallbackSource.type = 'image/webp';
        videoBg.appendChild(fallbackSource);
      }
      
      // Handle when video is ready to play
      videoBg.addEventListener('loadeddata', () => {
        handleBackgroundLoaded(videoBg);
      }, { once: true });
      
      // Fallback in case loadeddata doesn't fire
      setTimeout(() => {
        if (!videoBg.classList.contains('loaded')) {
          handleBackgroundLoaded(videoBg);
        }
      }, 1000);
      
      bgContainer.appendChild(videoBg);
    } else {
      // For image backgrounds - use picture element with responsive sources
      const picture = document.createElement('picture');
      
      // Add WebP source if available (better compression)
      if (backgroundExt === 'webp' || backgroundExt === 'jpg' || backgroundExt === 'jpeg' || backgroundExt === 'png') {
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = `backgrounds/usersbackgrounds/${backgroundName}.webp`;
        picture.appendChild(webpSource);
      }
      
      // Original format as fallback
      const img = document.createElement('img');
      img.className = 'bg-image bg-transition';
      img.src = `backgrounds/usersbackgrounds/${user.background}`;
      img.alt = `${user.name}'s background`;
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      
      // Handle when image is loaded
      if (img.complete) {
        handleBackgroundLoaded(img);
      } else {
        img.addEventListener('load', () => {
          handleBackgroundLoaded(img);
        }, { once: true });
        
        // Fallback in case load event doesn't fire
        setTimeout(() => {
          if (!img.classList.contains('loaded')) {
            handleBackgroundLoaded(img);
          }
        }, 1000);
      }
      
      picture.appendChild(img);
      bgContainer.appendChild(picture);
    }
    
    userContentSection.insertBefore(bgContainer, userContentSection.firstChild);
  };
  
  /**
   * Render user buttons
   */
  const renderUserButtons = async () => {
    try {
      const users = await DataService.getAllUsers();
      
      // Clear existing buttons
      memberButtonsContainer.innerHTML = '';
      
      // Create and append user buttons
      users.forEach(user => {
        const button = document.createElement('button');
        button.className = 'user-button';
        button.dataset.userId = user.id;
        button.textContent = user.name;
        
        // Add ARIA attributes for accessibility
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', `View ${user.name}'s profile`);
        
        memberButtonsContainer.appendChild(button);
      });
      
      // Show scroll hint if needed
      if (memberButtonsContainer.scrollHeight > memberButtonsContainer.clientHeight + 10) {
        scrollHint.style.display = 'block';
      } else {
        scrollHint.style.display = 'none';
      }
      
    } catch (error) {
      console.error('Error rendering user buttons:', error);
      memberButtonsContainer.innerHTML = `
        <div class="error-message">
          <p>Error loading users. Please refresh the page to try again.</p>
        </div>
      `;
    }
  };
  
  /**
   * Get the currently selected user
   * @returns {Object|null} The current user or null if none selected
   */
  const getCurrentUser = () => currentUser;
  
  // Public API
  return {
    init,
    renderUserButtons,
    selectUser,
    getCurrentUser
  };
})();
