'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var splashTimeoutId = null;
    var menuTimeoutId = null;

    function clearSplashTimers() {
        if (splashTimeoutId) {
            clearTimeout(splashTimeoutId);
            splashTimeoutId = null;
        }
        if (menuTimeoutId) {
            clearTimeout(menuTimeoutId);
            menuTimeoutId = null;
        }
    }

    function getValidHashTarget() {
        var hash = location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            return hash;
        }
        return null;
    }

    function showScreen(id, addHistory) {
        if (id !== 'splash') {
            clearSplashTimers();
        }
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
            if (history.state && history.state.screen === id && location.hash === '#' + id) {
                history.replaceState({ screen: id }, '', '#' + id);
            } else {
                history.pushState({ screen: id }, '', '#' + id);
            }
        }
    }

    window.addEventListener('popstate', function (e) {
        if (e.state && e.state.screen) {
            showScreen(e.state.screen, false);
        } else if (getValidHashTarget()) {
            showScreen(getValidHashTarget(), false);
        } else {
            showScreen('splash', false);
        }
    });

    document.querySelectorAll('[data-page]').forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showScreen(this.getAttribute('data-page'), true);
        });
    });

    var hash = getValidHashTarget();
    if (hash) {
        showScreen(hash, false);
        history.replaceState({ screen: hash }, '', '#' + hash);
    } else {
        history.replaceState({ screen: 'splash' }, '', location.pathname);
        splashTimeoutId = setTimeout(function () {
            document.getElementById('splash').classList.remove('active');
            splashTimeoutId = null;
            menuTimeoutId = setTimeout(function () {
                document.getElementById('menu').classList.add('active');
                history.pushState({ screen: 'menu' }, '', '#menu');
                menuTimeoutId = null;
            }, 600);
        }, 1200);
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
