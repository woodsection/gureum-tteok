'use strict';

document.addEventListener('DOMContentLoaded', function () {

    function showScreen(id) {
        document.querySelectorAll('.screen').forEach(function (s) {
            s.classList.remove('active');
        });
        var target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            var body = target.querySelector('.page-body');
            if (body) body.scrollTop = 0;
        }
    }

    var splashBtn = document.querySelector('.splash-btn');
    if (splashBtn) {
        splashBtn.addEventListener('click', function () {
            showScreen('menu');
        });
    }

    document.querySelectorAll('[data-page]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showScreen(this.getAttribute('data-page'));
        });
    });

    document.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            if (this.parentElement) {
                this.parentElement.classList.add('no-image');
            }
        });
    });

});
