'use strict';

document.addEventListener('DOMContentLoaded', function () {

    var toggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.nav-menu');
    var header = document.querySelector('.header');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', '메뉴 열기');
            });
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav') && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', '메뉴 열기');
            }
        });
    }

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }, { passive: true });
    }

    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            if (this.parentElement) {
                this.parentElement.classList.add('no-image');
            }
        });
    });

});
