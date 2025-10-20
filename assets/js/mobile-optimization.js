/**
 * Mobile Optimization JavaScript
 * Constitutional Requirements: Mobile-First Design, 44px Touch Targets, Performance
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile-specific optimizations
  const isMobile = window.innerWidth < 768;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Add mobile/touch classes to body
  if (isMobile) {
    document.body.classList.add('mobile-device');
  }
  
  if (isTouch) {
    document.body.classList.add('touch-device');
  }
  
  // Touch target enhancements for mobile
  if (isTouch) {
    enhanceTouchTargets();
  }
  
  // Mobile-specific performance optimizations
  if (isMobile) {
    optimizeForMobile();
  }
  
  // Responsive image loading
  setupResponsiveImages();
  
  // Mobile contact app integration
  setupMobileContactIntegration();
  
  // Viewport height fix for mobile browsers
  setupViewportHeightFix();
  
  // Touch gesture support
  setupTouchGestures();
});

/**
 * Ensure all interactive elements meet 44px minimum touch target
 */
function enhanceTouchTargets() {
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  
  interactiveElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const minSize = 44;
    
    // Add touch-target class if element is too small
    if (rect.width < minSize || rect.height < minSize) {
      element.classList.add('touch-target-enhanced');
    }
  });
}

/**
 * Mobile-specific performance optimizations
 */
function optimizeForMobile() {
  // Reduce animation complexity on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      *, *::before, *::after {
        animation-duration: 0.1s !important;
        animation-delay: 0s !important;
        transition-duration: 0.1s !important;
      }
      
      .card:hover {
        transform: none !important;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Disable hover effects on touch devices
  if ('ontouchstart' in window) {
    document.body.classList.add('no-hover');
  }
  
  // Optimize scroll performance
  document.addEventListener('touchstart', function() {}, { passive: true });
  document.addEventListener('touchmove', function() {}, { passive: true });
}

/**
 * Setup responsive image loading with mobile optimization
 */
function setupResponsiveImages() {
  const images = document.querySelectorAll('img[data-mobile-src], img[data-desktop-src]');
  
  images.forEach(img => {
    const isMobile = window.innerWidth < 768;
    const mobileSrc = img.dataset.mobileSrc;
    const desktopSrc = img.dataset.desktopSrc;
    
    if (isMobile && mobileSrc) {
      img.src = mobileSrc;
    } else if (!isMobile && desktopSrc) {
      img.src = desktopSrc;
    }
  });
  
  // Update images on orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(() => {
      setupResponsiveImages();
    }, 100);
  });
}

/**
 * Mobile app integration for contact methods
 */
function setupMobileContactIntegration() {
  // Phone number links
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add analytics tracking for phone calls
      if (window.gtag) {
        gtag('event', 'phone_call', {
          'event_category': 'contact',
          'event_label': 'mobile_phone_tap'
        });
      }
    });
  });
  
  // Email links
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add analytics tracking for email
      if (window.gtag) {
        gtag('event', 'email_compose', {
          'event_category': 'contact',
          'event_label': 'mobile_email_tap'
        });
      }
    });
  });
  
  // Add mobile contact hints
  const contactSection = document.querySelector('.contact-info');
  if (contactSection && window.innerWidth < 768) {
    const hint = document.createElement('p');
    hint.className = 'mobile-contact-hint';
    hint.textContent = 'Tap phone numbers to call or email addresses to compose messages';
    hint.style.fontSize = 'var(--font-size-sm)';
    hint.style.color = 'var(--color-text-light)';
    hint.style.fontStyle = 'italic';
    contactSection.appendChild(hint);
  }
}

/**
 * Fix viewport height issues on mobile browsers
 */
function setupViewportHeightFix() {
  // Set CSS custom property for actual viewport height
  function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  setViewportHeight();
  
  // Update on resize and orientation change
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', () => {
    setTimeout(setViewportHeight, 100);
  });
}

/**
 * Basic touch gesture support
 */
function setupTouchGestures() {
  let startY = 0;
  let startX = 0;
  
  document.addEventListener('touchstart', function(e) {
    startY = e.touches[0].clientY;
    startX = e.touches[0].clientX;
  }, { passive: true });
  
  document.addEventListener('touchend', function(e) {
    if (!startY || !startX) return;
    
    const endY = e.changedTouches[0].clientY;
    const endX = e.changedTouches[0].clientX;
    
    const diffY = startY - endY;
    const diffX = startX - endX;
    
    // Simple swipe detection for navigation hints
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      // Horizontal swipe detected
      if (diffX > 0) {
        // Swipe left
        console.log('Swipe left detected');
      } else {
        // Swipe right  
        console.log('Swipe right detected');
      }
    }
    
    startY = 0;
    startX = 0;
  }, { passive: true });
}

// Orientation change handling
window.addEventListener('orientationchange', function() {
  // Force layout recalculation after orientation change
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 100);
});

// Mobile-specific accessibility enhancements
if (window.innerWidth < 768) {
  // Increase focus visible styling on mobile
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 767px) {
      *:focus {
        outline-width: 3px !important;
        outline-offset: 3px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Export for other scripts
window.MobileOptimization = {
  enhanceTouchTargets,
  optimizeForMobile,
  setupResponsiveImages,
  setupMobileContactIntegration
};