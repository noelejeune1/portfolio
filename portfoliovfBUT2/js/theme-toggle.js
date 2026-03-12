// =========================================
// THEME TOGGLE - DARK/LIGHT MODE
// =========================================

class ThemeToggle {
    constructor() {
        this.theme = this.getStoredTheme() || this.getPreferredTheme();
        this.init();
    }

    init() {
        // Apply theme immediately to prevent flash
        this.applyTheme(this.theme);

        // Create toggle button
        this.createToggleButton();

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-preference')) {
                this.toggleTheme();
            }
        });
    }

    getPreferredTheme() {
        // Default to dark theme (night mode)
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    getStoredTheme() {
        return localStorage.getItem('theme-preference');
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.theme = theme;
        localStorage.setItem('theme-preference', theme);

        // Update button icon if it exists
        if (this.toggleBtn) {
            this.updateButtonIcon();
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    createToggleButton() {
        // Create toggle button
        this.toggleBtn = document.createElement('button');
        this.toggleBtn.className = 'theme-toggle-btn';
        this.toggleBtn.setAttribute('aria-label', 'Toggle theme');
        this.toggleBtn.setAttribute('title', 'Toggle dark/light mode');

        this.updateButtonIcon();

        // Add click handler
        this.toggleBtn.addEventListener('click', () => {
            this.toggleTheme();

            // Add ripple effect
            this.toggleBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.toggleBtn.style.transform = 'scale(1)';
            }, 150);
        });

        // Insert into header - will be inserted before language toggle
        const header = document.getElementById('main-header');
        const headerRight = header.querySelector('.header-right');

        // Create language toggle first, then insert theme button before it
        this.createLanguageToggle(header, headerRight);
    }

    createLanguageToggle(header, headerRight) {
        // Create a wrapper for theme button + language selector + CV
        const rightControls = document.createElement('div');
        rightControls.className = 'header-controls';

        // Create container for language toggle
        const langContainer = document.createElement('div');
        langContainer.className = 'lang-toggle-container';

        // Create FR option
        const frOption = document.createElement('span');
        frOption.className = 'lang-option';
        frOption.textContent = 'FR';
        frOption.setAttribute('data-lang', 'fr');

        // Create separator
        const separator = document.createElement('span');
        separator.className = 'lang-separator';
        separator.textContent = '|';

        // Create EN option
        const enOption = document.createElement('span');
        enOption.className = 'lang-option';
        enOption.textContent = 'EN';
        enOption.setAttribute('data-lang', 'en');

        // Append elements to language container
        langContainer.appendChild(frOption);
        langContainer.appendChild(separator);
        langContainer.appendChild(enOption);

        // Add theme button and language selector to the wrapper
        rightControls.appendChild(this.toggleBtn);
        rightControls.appendChild(langContainer);

        // Move header-right into the wrapper
        if (headerRight) {
            // Remove header-right from header
            headerRight.remove();
            // Add it to the wrapper
            rightControls.appendChild(headerRight);
        }

        // Function to update active state
        const updateActiveLanguage = () => {
            const currentLang = localStorage.getItem('preferredLanguage') || 'fr';
            frOption.classList.toggle('active', currentLang === 'fr');
            enOption.classList.toggle('active', currentLang === 'en');
        };

        // Initialize active state
        updateActiveLanguage();

        // Add click handlers
        const switchLanguage = (newLang) => {
            localStorage.setItem('preferredLanguage', newLang);
            updateActiveLanguage();
            // Call the translatePage function from i18n.js if it exists
            if (typeof translatePage === 'function') {
                translatePage(newLang);
            } else {
                console.warn('translatePage function not found. Make sure i18n.js is loaded.');
            }
        };

        frOption.addEventListener('click', () => switchLanguage('fr'));
        enOption.addEventListener('click', () => switchLanguage('en'));

        // Add wrapper to header
        header.appendChild(rightControls);
    }

    updateButtonIcon() {
        const isDark = this.theme === 'dark';

        // Moon icon for dark mode (reflects current mode)
        // Sun icon for light mode (reflects current mode)
        this.toggleBtn.innerHTML = isDark
            ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
               </svg>`
            : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
               </svg>`;
    }
}

// Initialize theme toggle when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});
