/* 
 * main-script.js
 * 滾動淡入動畫、互動效果
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ===== 平滑滾動至錨點 ===== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ===== 滾動淡入動畫 (IntersectionObserver) ===== */
    var fadeEls = document.querySelectorAll('.fade-up');
    if ('IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeEls.forEach(function (el) {
            fadeObserver.observe(el);
        });
    } else {
        // fallback：不支援 IO 就直接顯示
        fadeEls.forEach(function (el) {
            el.classList.add('is-visible');
        });
    }

    /* ===== Section 標題動畫 ===== */
    var sectionHeaders = document.querySelectorAll('.section__header');
    if ('IntersectionObserver' in window) {
        var headerObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    headerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sectionHeaders.forEach(function (el) {
            el.classList.add('fade-up');
            headerObserver.observe(el);
        });
    }

    /* ===== 步驟編號 pulse 動畫 ===== */
    var stepNumbers = document.querySelectorAll('.step-number');
    if ('IntersectionObserver' in window) {
        var pulseObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pulse');
                    pulseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stepNumbers.forEach(function (el) {
            pulseObserver.observe(el);
        });
    }

    /* ===== 數字計數動畫（審核通知的筆數） ===== */
    var countEls = document.querySelectorAll('.approval-item__count');
    if ('IntersectionObserver' in window) {
        var countObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    countObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        countEls.forEach(function (el) { countObserver.observe(el); });
    }

    function animateCount(el) {
        var text = el.textContent;
        var match = text.match(/(\d+)/);
        if (!match) return;
        var target = parseInt(match[1], 10);
        var span = el.childNodes[el.childNodes.length - 1];
        var duration = 800;
        var start = performance.now();

        function tick(now) {
            var progress = Math.min((now - start) / duration, 1);
            // ease-out
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * target);
            span.textContent = ' ' + current + ' 筆';
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    /* ===== 話術卡展開/收合 ===== */
    var scriptBoxes = document.querySelectorAll('.script-box');
    scriptBoxes.forEach(function (box) {
        var label = box.querySelector('.script-box__label');
        var textEl = box.querySelector('.script-box__text');
        if (!label || !textEl) return;

        // 預設收合
        textEl.style.maxHeight = '0';
        textEl.style.overflow = 'hidden';
        textEl.style.transition = 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease';
        textEl.style.opacity = '0';
        textEl.style.paddingTop = '0';

        // 加一個展開提示
        var hint = document.createElement('span');
        hint.className = 'script-box__toggle';
        hint.innerHTML = ' <i class="fa-solid fa-chevron-down"></i>';
        label.appendChild(hint);

        label.style.cursor = 'pointer';
        label.addEventListener('click', function () {
            var isOpen = box.classList.toggle('is-open');
            if (isOpen) {
                textEl.style.maxHeight = textEl.scrollHeight + 'px';
                textEl.style.opacity = '1';
                textEl.style.paddingTop = '8px';
                hint.innerHTML = ' <i class="fa-solid fa-chevron-up"></i>';
            } else {
                textEl.style.maxHeight = '0';
                textEl.style.opacity = '0';
                textEl.style.paddingTop = '0';
                hint.innerHTML = ' <i class="fa-solid fa-chevron-down"></i>';
            }
        });
    });

    /* ===== Hero 視差微動 ===== */
    var hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset;
            if (scrollY < window.innerHeight) {
                var content = hero.querySelector('.hero__content');
                if (content) {
                    content.style.transform = 'translateY(' + (scrollY * 0.15) + 'px)';
                    content.style.opacity = String(1 - scrollY / (window.innerHeight * 0.9));
                }
            }
        }, { passive: true });
    }

});
