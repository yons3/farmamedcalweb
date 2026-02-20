document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Handle dropdown on mobile (tap/click)
    const dropdowns = document.querySelectorAll('.dropdown > a');
    dropdowns.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parentLi = link.parentElement;
                const dropdownMenu = parentLi.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    const isVisible = dropdownMenu.style.display === 'block';
                    dropdownMenu.style.display = isVisible ? 'none' : 'block';
                }
            }
        });
    });

    // Close nav menu and dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.textContent = '☰';
            // Reset all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = '';
            });
        }
    });

    // Close menu when a nav link (non-dropdown) is clicked on mobile
    document.querySelectorAll('.nav-link:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.textContent = '☰';
            }
        });
    });
});
