/**
 * NexusPay - Landing Page JavaScript
 * Production-ready, accessible, and performant
 */

(function() {
    'use strict';

    // ============================================
    // Configuration
    // ============================================
    const CONFIG = {
        selectors: {
            mobileMenuBtn: '#mobile-menu-btn',
            mobileMenu: '#mobile-menu',
            navLinks: '.nav-link',
            smoothScrollLinks: 'a[href^="#"]'
        },
        classes: {
            isOpen: 'is-open',
            hidden: 'hidden'
        },
        breakpoints: {
            mobile: 768
        }
    };

    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Safely query DOM element
     * @param {string} selector - CSS selector
     * @returns {Element|null}
     */
    function $(selector) {
        return document.querySelector(selector);
    }

    /**
     * Safely query all DOM elements
     * @param {string} selector - CSS selector
     * @returns {NodeList}
     */
    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Check if user prefers reduced motion
     * @returns {boolean}
     */
    function prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Debounce function for performance
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    function debounce(func, wait = 100) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ============================================
    // Mobile Menu
    // ============================================
    
    /**
     * Initialize mobile menu functionality
     */
    function initMobileMenu() {
        const menuBtn = $(CONFIG.selectors.mobileMenuBtn);
        const menu = $(CONFIG.selectors.mobileMenu);

        if (!menuBtn || !menu) {
            console.warn('Mobile menu elements not found');
            return;
        }

        // Set initial ARIA state
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-controls', 'mobile-menu');
        menu.setAttribute('aria-hidden', 'true');

        // Toggle menu on button click
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMobileMenu(menuBtn, menu);
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen(menu)) {
                closeMobileMenu(menuBtn, menu);
                menuBtn.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen(menu) && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMobileMenu(menuBtn, menu);
            }
        });

        // Close menu on window resize (if transitioning to desktop)
        window.addEventListener('resize', debounce(function() {
            if (window.innerWidth >= CONFIG.breakpoints.mobile && isMenuOpen(menu)) {
                closeMobileMenu(menuBtn, menu);
            }
        }));

        // Close menu when clicking on a link
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMobileMenu(menuBtn, menu);
            });
        });
    }

    /**
     * Check if mobile menu is open
     * @param {Element} menu - Menu element
     * @returns {boolean}
     */
    function isMenuOpen(menu) {
        return !menu.classList.contains(CONFIG.classes.hidden);
    }

    /**
     * Toggle mobile menu state
     * @param {Element} btn - Menu button
     * @param {Element} menu - Menu element
     */
    function toggleMobileMenu(btn, menu) {
        if (isMenuOpen(menu)) {
            closeMobileMenu(btn, menu);
        } else {
            openMobileMenu(btn, menu);
        }
    }

    /**
     * Open mobile menu
     * @param {Element} btn - Menu button
     * @param {Element} menu - Menu element
     */
    function openMobileMenu(btn, menu) {
        menu.classList.remove(CONFIG.classes.hidden);
        menu.classList.add(CONFIG.classes.isOpen);
        btn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        
        // Focus first menu item for accessibility
        const firstLink = menu.querySelector('a');
        if (firstLink) {
            firstLink.focus();
        }
    }

    /**
     * Close mobile menu
     * @param {Element} btn - Menu button
     * @param {Element} menu - Menu element
     */
    function closeMobileMenu(btn, menu) {
        menu.classList.add(CONFIG.classes.hidden);
        menu.classList.remove(CONFIG.classes.isOpen);
        btn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }

    // ============================================
    // Smooth Scrolling
    // ============================================
    
    /**
     * Initialize smooth scrolling for anchor links
     */
    function initSmoothScroll() {
        // Skip if user prefers reduced motion (CSS handles it, but JS should respect too)
        if (prefersReducedMotion()) {
            return;
        }

        const links = $$(CONFIG.selectors.smoothScrollLinks);
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#" or external
                if (href === '#' || !href.startsWith('#')) {
                    return;
                }

                const target = $(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without scrolling
                    history.pushState(null, null, href);

                    // Focus target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                }
            });
        });
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    
    /**
     * Initialize scroll-triggered animations
     */
    function initScrollAnimations() {
        // Skip if user prefers reduced motion
        if (prefersReducedMotion()) {
            return;
        }

        // Check for IntersectionObserver support
        if (!('IntersectionObserver' in window)) {
            return;
        }

        const animatedElements = $$('[data-animate]');
        
        if (animatedElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    // ============================================
    // Current Year in Footer
    // ============================================
    
    /**
     * Update copyright year dynamically
     */
    function initCopyrightYear() {
        const yearElement = $('#copyright-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ============================================
    // Error Handling
    // ============================================
    
    /**
     * Global error handler
     */
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            console.error('An error occurred:', e.message);
            // In production, you might want to send this to an error tracking service
        });
    }

    // ============================================
    // Initialize Application
    // ============================================
    
    /**
     * Main initialization function
     */
    function init() {
        try {
            initErrorHandling();
            initMobileMenu();
            initSmoothScroll();
            initScrollAnimations();
            initCopyrightYear();
            
            // Log successful initialization in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log('NexusPay initialized successfully');
            }
        } catch (error) {
            console.error('Failed to initialize application:', error);
        }
    }

    // ============================================
    // DOM Ready
    // ============================================
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
