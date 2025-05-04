/**
 * iOS-style Bottom Navbar Implementation
 * Uzbek Style with Ko'proq App Icon
 */

// Initialize the navbar
function initNavbar(activePage) {
    // Load navbar content from nav.html
    fetchNavbarContent().then(() => {
      setupEventListeners();
      setActivePage(activePage);
    });
  }
  
  // Fetch navbar content
  async function fetchNavbarContent() {
    try {
      const response = await fetch('nav.html');
      if (!response.ok) {
        throw new Error('Navbar content failed to load');
      }
      const html = await response.text();
      document.getElementById('pastki-navbar-container').innerHTML = html;
    } catch (error) {
      console.error('Error loading navbar:', error);
    }
  }
  
  // Set up all event listeners for navbar functionality
  function setupEventListeners() {
    // Dark/Light mode toggle
    const themeToggleBtn = document.querySelector('.tungi-rejim-tugma');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
  
    // Ko'proq menu toggle
    const moreButton = document.querySelector('.koproq-tugma');
    if (moreButton) {
      moreButton.addEventListener('click', toggleMoreMenu);
    }
  
    // Profile dropdown toggle
    const profileButton = document.querySelector('.profil-tugma');
    if (profileButton) {
      profileButton.addEventListener('click', toggleProfileDropdown);
    }
  
    // Language selector toggle
    const langButton = document.querySelector('.til-tugma');
    if (langButton) {
      langButton.addEventListener('click', toggleLangDropdown);
    }
  
    // Language selection
    const langOptions = document.querySelectorAll('.til-variant');
    langOptions.forEach(option => {
      option.addEventListener('click', switchLanguage);
    });
  
    // Set up overlay for closing dropdowns
    const overlay = document.querySelector('.navbar-overlay');
    if (overlay) {
      overlay.addEventListener('click', closeAllDropdowns);
    }
  
    // Load theme preference from localStorage
    loadThemePreference();
  }
  
  // Toggle between light and dark theme
  function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains('tungi-rejim') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Toggle the class
    body.classList.toggle('tungi-rejim');
    body.classList.toggle('yorug-rejim');
    
    // Save preference
    localStorage.setItem('theme', newTheme);
  }
  
  // Load theme preference from localStorage
  function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    if (savedTheme === 'dark') {
      body.classList.remove('yorug-rejim');
      body.classList.add('tungi-rejim');
    } else {
      body.classList.remove('tungi-rejim');
      body.classList.add('yorug-rejim');
    }
  }
  
  // Toggle the "Ko'proq" menu
  function toggleMoreMenu(event) {
    event.stopPropagation();
    
    // Close other dropdowns
    closeDropdowns(['profil-dropdown', 'til-dropdown']);
    
    const moreMenu = document.querySelector('.koproq-menyu');
    const moreButton = document.querySelector('.koproq-tugma');
    const overlay = document.querySelector('.navbar-overlay');
    
    if (moreMenu) {
      const isOpen = moreMenu.classList.contains('ochiq');
      moreMenu.classList.toggle('ochiq');
      moreButton.classList.toggle('ochiq');
      toggleOverlay(!isOpen);
    }
  }
  
  // Toggle profile dropdown
  function toggleProfileDropdown(event) {
    event.stopPropagation();
    
    // Close other dropdowns
    closeDropdowns(['koproq-menyu', 'til-dropdown']);
    
    const profileDropdown = document.querySelector('.profil-dropdown');
    const moreButton = document.querySelector('.koproq-tugma');
    
    if (profileDropdown) {
      profileDropdown.classList.toggle('ochiq');
      moreButton.classList.remove('ochiq');
      toggleOverlay(profileDropdown.classList.contains('ochiq'));
    }
  }
  
  // Toggle language dropdown
  function toggleLangDropdown(event) {
    event.stopPropagation();
    
    // Close other dropdowns
    closeDropdowns(['koproq-menyu', 'profil-dropdown']);
    
    const langDropdown = document.querySelector('.til-dropdown');
    const moreButton = document.querySelector('.koproq-tugma');
    
    if (langDropdown) {
      langDropdown.classList.toggle('ochiq');
      moreButton.classList.remove('ochiq');
      toggleOverlay(langDropdown.classList.contains('ochiq'));
    }
  }
  
  // Switch language
  function switchLanguage(event) {
    const lang = event.currentTarget.dataset.lang;
    const currentLangElement = document.querySelector('.current-til');
    
    if (currentLangElement) {
      currentLangElement.textContent = lang === 'uz' ? 'UZ' : 'RU';
      document.body.classList.toggle('lang-uz', lang === 'uz');
      document.body.classList.toggle('lang-ru', lang === 'ru');
    }
    
    // Save language preference
    localStorage.setItem('language', lang);
    
    // Close the dropdown
    document.querySelector('.til-dropdown').classList.remove('ochiq');
    toggleOverlay(false);
  }
  
  // Close all dropdowns
  function closeAllDropdowns() {
    const moreButton = document.querySelector('.koproq-tugma');
    moreButton.classList.remove('ochiq');
    closeDropdowns(['koproq-menyu', 'profil-dropdown', 'til-dropdown']);
  }
  
  // Close specific dropdowns
  function closeDropdowns(dropdownClasses) {
    dropdownClasses.forEach(className => {
      const dropdown = document.querySelector(`.${className}`);
      if (dropdown && dropdown.classList.contains('ochiq')) {
        dropdown.classList.remove('ochiq');
      }
    });
    
    // Hide the overlay
    toggleOverlay(false);
  }
  
  // Toggle the overlay for closing dropdowns
  function toggleOverlay(show) {
    const overlay = document.querySelector('.navbar-overlay');
    if (overlay) {
      if (show) {
        overlay.classList.add('ochiq');
      } else {
        overlay.classList.remove('ochiq');
      }
    }
  }
  
  // Set active page in the navbar
  function setActivePage(activePage) {
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.classList.remove('aktiv');
    });
    
    // Add active class to the current page nav item
    const currentPageItem = document.querySelector(`.nav-item[data-page="${activePage}"]`);
    if (currentPageItem) {
      currentPageItem.classList.add('aktiv');
    }
  }
  
  // Expose the init function globally
  window.initNavbar = initNavbar;