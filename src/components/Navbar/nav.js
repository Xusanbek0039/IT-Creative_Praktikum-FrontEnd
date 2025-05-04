/**
 * iOS-style Bottom Navigation Bar
 * This script handles all the interactive functionality of the navigation bar
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar into the page
  injectNavbar();

  // Initialize navbar functionality once injected
  initializeNavbar();
});

/**
 * Injects the navbar HTML into the current page
 */
async function injectNavbar() {
  try {
    // Fetch the navbar HTML content
    const response = await fetch('/src/components/Navbar/nav.html');
    if (!response.ok) {
      throw new Error(`Failed to load navbar: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Create a container for the navbar if it doesn't exist
    let navContainer = document.getElementById('navbar-container');
    if (!navContainer) {
      navContainer = document.createElement('div');
      navContainer.id = 'navbar-container';
      document.body.appendChild(navContainer);
    }
    
    // Insert the navbar HTML
    navContainer.innerHTML = html;
    
    // **Keyingilikni to'g'ri ishlash uchun delay qo'shish:**
    setTimeout(() => {
      // Initialize the navbar after the DOM is rendered
      initializeNavbar();
    }, 0);
  } catch (error) {
    console.error('Error injecting navbar:', error);
  }
}



/**
 * Initializes all navbar functionality
 */
function initializeNavbar() {
  // Get navbar elements
  const navbar = document.getElementById('ios-navbar');
  if (!navbar) return; // Exit if navbar isn't loaded yet
  
  // Initialize all navbar features
  initializeTabs();
  initializeDropdowns();
  initializeModeToggle();
  initializeLanguageSwitcher();
  initializeProfileDropdown();
  
  // Check if there's a preferred tab in localStorage
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab) {
    setActiveTab(savedTab);
  }
  
  // Check if there's a preferred theme in localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateModeToggleIcon(savedTheme);
  } else {
    // Set default theme based on user's system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    updateModeToggleIcon(defaultTheme);
  }
}

/**
 * Initializes the tab functionality
 */
function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const dropdownTabs = document.querySelectorAll('.dropdown-tab');
  
  // Add click event to main tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      setActiveTab(tabId);
      
      // Simulate page navigation
      simulatePageNavigation(tabId);
    });
  });
  
  // Add click event to dropdown tabs
  dropdownTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      setActiveTab(tabId);
      
      // Close the dropdown
      const moreTab = document.querySelector('.more-tab');
      if (moreTab) {
        moreTab.classList.remove('active');
      }
      
      // Simulate page navigation
      simulatePageNavigation(tabId);
    });
  });
  
  // Handle "More" tab separately
  const moreTab = document.querySelector('.more-tab');
  if (moreTab) {
    moreTab.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent propagation to document
      moreTab.classList.toggle('active');
    });
  }
}

/**
 * Sets the active tab
 */
function setActiveTab(tabId) {
  // Remove active class from all tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Add active class to the selected tab
  const selectedTab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  if (selectedTab) {
    selectedTab.classList.add('active');
    
    // Save the active tab to localStorage
    localStorage.setItem('activeTab', tabId);
  }
}

/**
 * Simulates page navigation (for demo purposes)
 * In a real application, this would navigate to the actual page
 */
function simulatePageNavigation(tabId) {
  // For demo purposes, we just log the navigation
  console.log(`Navigating to: ${tabId}`);
  
  // In a real app, you would navigate to the page:
  // window.location.href = `/${tabId}.html`;
}

/**
 * Initializes all dropdown functionality
 */
function initializeDropdowns() {
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    const moreTab = document.querySelector('.more-tab');
    const profileDropdown = document.querySelector('.profile');
    const languageDropdown = document.querySelector('.language-switcher');
    
    // Close "More" dropdown if clicked outside
    if (moreTab && !moreTab.contains(e.target)) {
      moreTab.classList.remove('active');
    }
    
    // Close profile dropdown if clicked outside
    if (profileDropdown && !profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove('active');
    }
    
    // Close language dropdown if clicked outside
    if (languageDropdown && !languageDropdown.contains(e.target)) {
      languageDropdown.classList.remove('active');
    }
  });
}

/**
 * Initializes the dark/light mode toggle
 */
function initializeModeToggle() {
  const modeToggle = document.querySelector('.mode-toggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      // Apply the new theme
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Update the toggle icon
      updateModeToggleIcon(newTheme);
      
      // Save the theme preference
      localStorage.setItem('theme', newTheme);
    });
  }
}

/**
 * Updates the mode toggle icon based on the current theme
 */
function updateModeToggleIcon(theme) {
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // Faqat ikonlar DOM’da bo‘lsa, keyin ishlatamiz
  if (!sunIcon || !moonIcon) {
    console.warn('⚠️ Mode toggle icons not found in DOM.');
    return;
  }

  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}


/**
 * Initializes the language switcher
 */
function initializeLanguageSwitcher() {
  const languageSwitcher = document.querySelector('.language-switcher');
  if (languageSwitcher) {
    languageSwitcher.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent propagation to document
      languageSwitcher.classList.toggle('active');
    });
    
    // Handle language option selection
    const languageOptions = document.querySelectorAll('.language-option');
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        const lang = option.getAttribute('data-lang');
        const flag = option.querySelector('.flag').textContent;
        const name = lang.toUpperCase();
        
        // Update the selected language display
        const selectedLang = document.querySelector('.selected-language');
        if (selectedLang) {
          selectedLang.querySelector('.flag').textContent = flag;
          selectedLang.querySelector('.lang-name').textContent = name;
        }
        
        // Update active class
        languageOptions.forEach(opt => {
          opt.classList.remove('active');
        });
        option.classList.add('active');
        
        // Save the language preference
        localStorage.setItem('language', lang);
        
        // Close the dropdown
        languageSwitcher.classList.remove('active');
      });
    });
  }
}

/**
 * Initializes the profile dropdown
 */
function initializeProfileDropdown() {
  const profile = document.querySelector('.profile');
  if (profile) {
    profile.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent propagation to document
      profile.classList.toggle('active');
    });
    
    // Handle profile options
    const profileOptions = document.querySelectorAll('.profile-option');
    profileOptions.forEach(option => {
      option.addEventListener('click', () => {
        const action = option.getAttribute('data-action');
        handleProfileAction(action);
        
        // Close the dropdown
        profile.classList.remove('active');
      });
    });
  }
}

/**
 * Handles profile actions
 */
function handleProfileAction(action) {
  switch (action) {
    case 'settings':
      console.log('Opening profile settings');
      // In a real app: window.location.href = '/profile/settings';
      break;
    case 'certificates':
      console.log('Opening certificates');
      // In a real app: window.location.href = '/profile/certificates';
      break;
    case 'logout':
      console.log('Logging out');
      // In a real app: performLogout();
      break;
    default:
      console.log(`Unknown profile action: ${action}`);
  }
}