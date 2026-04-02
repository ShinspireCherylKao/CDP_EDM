/* 
 * main-script.js
 * 基礎互動功能（後續可擴充滾動動畫）
 */

document.addEventListener('DOMContentLoaded', function () {
    // 平滑滾動至錨點
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
});
