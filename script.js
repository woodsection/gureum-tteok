'use strict';

document.addEventListener('DOMContentLoaded', function () {

    function showScreen(id, addHistory) {
        document.querySelectorAll('.screen').forEach(function (s) {
            s.classList.remove('active');
        });
        var target = document.getElementById(id);
        if (target) {
            target.classList.add('active');
            var body = target.querySelector('.page-body');
            if (body) body.scrollTop = 0;
        }
        if (addHistory) {
            history.pushState({ screen: id }, '', '#' + id);
        }
    }

    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.screen) {
            showScreen(e.state.screen, false);
        } else {
            showScreen('splash', false);
        }
    });

    var hash = location.hash.replace('#', '');
    if (!hash || !document.getElementById(hash)) {
        setTimeout(function () {
            showScreen('menu', true);
        }, 1200);
    }

    document.querySelectorAll('[data-page]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showScreen(this.getAttribute('data-page'), true);
        });
    });

    var hash = location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showScreen(hash, false);
        history.replaceState({ screen: hash }, '', '#' + hash);
    } else {
        history.replaceState({ screen: 'splash' }, '', location.pathname);
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
