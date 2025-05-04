document.addEventListener('DOMContentLoaded', function() {
  // Dynamic injection of navbar into other pages
  function injectNavbar() {
    // Only inject if we're not already on the nav.html page
    if (!window.location.pathname.includes('nav.html')) {
      fetch('nav.html')
        .then(response => response.text())
        .then(data => {
          // Extract just the navbar content
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const navbar = doc.getElementById('ios-navbar');
          
          if (navbar) {
            // Insert the navbar at the end of the body
            document.body.appendChild(navbar.cloneNode(true));
            
            // Initialize navbar functionality
            initializeNavbar();
            
            // Set active tab based on current page
            setActiveTab();
          }
        })
        .catch(error => console.error('Error injecting navbar:', error));
    } else {
      // If we're on nav.html directly, still initialize the functionality
      initializeNavbar();
    }
  }
  
  // Initialize navbar functionality
  function initializeNavbar() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
      
      // Set initial theme based on user preference or previous selection
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
    
    // Language switcher functionality
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
      languageToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const languageSwitcher = this.closest('.language-switcher');
        languageSwitcher.classList.toggle('active');
      });
      
      const languageOptions = document.querySelectorAll('.language-option');
      languageOptions.forEach(option => {
        option.addEventListener('click', function() {
          const lang = this.getAttribute('data-lang');
          const flag = this.querySelector('.flag').textContent;
          const langName = lang.toUpperCase();
          
          // Update selected language display
          const selectedLang = document.querySelector('.selected-language');
          selectedLang.querySelector('.flag').textContent = flag;
          selectedLang.querySelector('.language-name').textContent = langName;
          
          // Save language preference
          localStorage.setItem('language', lang);
          
          // Close dropdown
          this.closest('.language-switcher').classList.remove('active');
        });
      });
    }
    
    // Profile dropdown functionality
    const profileToggle = document.getElementById('profile-toggle');
    if (profileToggle) {
      profileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const profileDropdown = this.closest('.profile-dropdown');
        profileDropdown.classList.toggle('active');
      });
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      const languageSwitcher = document.querySelector('.language-switcher');
      const profileDropdown = document.querySelector('.profile-dropdown');
      
      if (languageSwitcher && !languageSwitcher.contains(e.target)) {
        languageSwitcher.classList.remove('active');
      }
      
      if (profileDropdown && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('active');
      }
    });
    
    // Tab click animation
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(tab => {
      tab.addEventListener('click', function(e) {
        // Don't prevent default so the link still works
        
        // Add tap animation
        this.classList.add('tab-clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          this.classList.remove('tab-clicked');
        }, 300);
      });
    });
  }
  
  // Set active tab based on current URL
  function setActiveTab() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop() || 'index.html';
    
    // Remove active class from all tabs
    const allTabs = document.querySelectorAll('.tab-item');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // Find and activate the tab that matches the current page
    const matchingTab = document.querySelector(`.tab-item[href="${fileName}"]`);
    if (matchingTab) {
      matchingTab.classList.add('active');
    } else {
      // If no exact match, try to determine the section
      const pageSection = fileName.split('-')[0];
      const sectionTab = document.querySelector(`.tab-item[data-page="${pageSection}"]`);
      if (sectionTab) {
        sectionTab.classList.add('active');
      } else {
        // Default to home if no match found
        const homeTab = document.querySelector('.tab-item[data-page="home"]');
        if (homeTab) homeTab.classList.add('active');
      }
    }
  }
  
  // Toggle between light and dark theme
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply smooth transition
    document.documentElement.classList.add('theme-transition');
    
    // Change theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Store preference
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 500);
  }
  
  // Apply saved language
  function applyLanguagePreference() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      const selectedLang = document.querySelector('.selected-language');
      if (selectedLang) {
        const flag = savedLanguage === 'uz' ? '🇺🇿' : '🇷🇺';
        const langName = savedLanguage.toUpperCase();
        
        selectedLang.querySelector('.flag').textContent = flag;
        selectedLang.querySelector('.language-name').textContent = langName;
      }
    }
  }
  
  // Handle tab transitions
  function setupTabTransitions() {
    const tabs = document.querySelectorAll('.tab-item');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        // Allow the default navigation to happen
        // We're just adding a visual effect
        
        // Add a smooth slide transition effect
        const navbar = document.getElementById('ios-navbar');
        navbar.style.transform = 'translateY(100%)';
        
        setTimeout(() => {
          navbar.style.transform = 'translateY(0)';
        }, 300);
      });
    });
  }
  
  // Initialize everything
  injectNavbar();
  applyLanguagePreference();
  setupTabTransitions();
  
  // Add theme transition class to html element
  document.documentElement.classList.add('theme-transition');
  
  // Add CSS for tab click animation
  const style = document.createElement('style');
  style.textContent = `
    .tab-clicked {
      transform: scale(0.9);
      transition: transform 0.1s ease-in-out;
    }
    
    .theme-transition {
      transition: background-color 0.5s ease, color 0.5s ease;
    }
  `;
  document.head.appendChild(style);
});