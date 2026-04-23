/**
 * landing-script.js
 * Landing Page 互動邏輯
 */

/* ===== 導航列滾動效果 ===== */
(function initNavScroll() {
    var nav = document.querySelector('.lp-nav');
    if (!nav) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
            nav.classList.add('lp-nav--scrolled');
        } else {
            nav.classList.remove('lp-nav--scrolled');
        }
    });
})();

/* ===== FAQ 手風琴 ===== */
(function initFAQ() {
    var questions = document.querySelectorAll('.faq-question');

    questions.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item = btn.closest('.faq-item');
            var isActive = item.classList.contains('active');

            // 關閉所有
            document.querySelectorAll('.faq-item.active').forEach(function (el) {
                el.classList.remove('active');
            });

            // 切換點擊的那個
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
})();

/* ===== 平滑滾動到錨點 ===== */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var offset = 80;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });
})();

/* ===== 滾動入場動畫 ===== */
(function initFadeUp() {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('lp-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.lp-fade-up').forEach(function (el) {
        observer.observe(el);
    });
})();
