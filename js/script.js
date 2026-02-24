document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle hamburger menu(تبديل قائمة الهامبرغر)
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
    // ========== إضافة كود الكاروسيل هنا ==========
    // عناصر الكاروسيل
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    // التحقق من وجود عناصر الكاروسيل قبل تنفيذ الكود (لتجنب الأخطاء إذا لم يكن موجوداً)
    if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;

        // إنشاء نقاط الترقيم تلقائياً
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.dataset.index = i;
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll('.dot');

        // دالة لعرض الشريحة المحددة
        function showSlide(index) {
            // إخفاء جميع الشرائح
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // إظهار الشريحة المطلوبة
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        }

        // الانتقال إلى التالية
        function nextSlide() {
            const newIndex = (currentIndex + 1) % totalSlides;
            showSlide(newIndex);
        }

        // الانتقال إلى السابقة
        function prevSlide() {
            const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            showSlide(newIndex);
        }

        // أحداث الأزرار
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        // أحداث النقاط
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                showSlide(index);
                resetAutoSlide();
            });
        });

        // التشغيل التلقائي كل 6 ثوانٍ
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 6000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        // بدء التشغيل التلقائي
        startAutoSlide();

        // إيقاف التشغيل عند تمرير الماوس فوق hero
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(autoSlideInterval);
            });
            heroSection.addEventListener('mouseleave', () => {
                startAutoSlide();
            });
        }
    }
});

