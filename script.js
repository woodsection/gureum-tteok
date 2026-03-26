/**
 * 구름떡집 — 스크립트
 *
 * 기능:
 * 1. 모바일 햄버거 메뉴 토글
 * 2. 메뉴 링크 클릭 시 메뉴 닫기
 * 3. 메뉴 바깥 클릭 시 메뉴 닫기
 * 4. 이미지 로드 실패 시 플레이스홀더 표시
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // 모바일 메뉴
    // ========================================
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.nav-menu');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
        });

        // 메뉴 링크 클릭 시 닫기
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', '메뉴 열기');
            });
        });

        // 메뉴 바깥 클릭 시 닫기
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav') && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', '메뉴 열기');
            }
        });
    }

    // ========================================
    // 이미지 로드 실패 시 플레이스홀더 표시
    // ========================================
    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            if (this.parentElement) {
                this.parentElement.classList.add('no-image');
            }
        });
    });

});
