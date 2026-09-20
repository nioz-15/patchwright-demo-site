/* Fernhill Goods – Patchwright broken-site fixture behaviour.
 * Defects here are deliberate and documented in ../EXPECTED.json. Do not "fix" them. */
(function () {
  'use strict';

  function toggle(buttonId, panelId) {
    var button = document.getElementById(buttonId);
    var panel = document.getElementById(panelId);
    if (!button || !panel) return;
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
    });
  }
  toggle('nav-toggle', 'primary-nav');
  toggle('header-search-btn', 'header-search');

  var topButton = document.getElementById('footer-top-btn');
  if (topButton) {
    topButton.addEventListener('click', function () {
      window.scrollTo(0, 0);
    });
  }

  // Fixture forms never send anything.
  Array.prototype.forEach.call(document.querySelectorAll('form.form'), function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  });

  // Mouse-only dropdown: click handlers only, no tabindex, no key handling (defect).
  var sortToggle = document.getElementById('sort-dropdown');
  var sortList = document.getElementById('sort-options');
  if (sortToggle && sortList) {
    sortToggle.addEventListener('click', function () {
      var open = sortToggle.getAttribute('aria-expanded') === 'true';
      sortToggle.setAttribute('aria-expanded', String(!open));
      sortList.hidden = open;
    });
    Array.prototype.forEach.call(sortList.children, function (item) {
      item.addEventListener('click', function () {
        sortToggle.textContent = 'Sort by: ' + item.getAttribute('data-sort');
        sortToggle.setAttribute('aria-expanded', 'false');
        sortList.hidden = true;
      });
    });
  }

  // Size guide dialog: focus moves in, Tab is contained, Escape closes,
  // but focus is NOT returned to the invoking control on close (defect).
  var dialog = document.getElementById('size-guide-dialog');
  var backdrop = document.getElementById('size-guide-backdrop');
  var openButton = document.getElementById('size-guide-open');
  var closeButton = document.getElementById('size-guide-close');
  if (dialog && backdrop && openButton && closeButton) {
    var tabbables = function () {
      return dialog.querySelectorAll('a[href], button:not([disabled])');
    };
    var closeDialog = function () {
      dialog.hidden = true;
      backdrop.hidden = true;
      // Missing: openButton.focus();
    };
    openButton.addEventListener('click', function () {
      dialog.hidden = false;
      backdrop.hidden = false;
      closeButton.focus();
    });
    closeButton.addEventListener('click', closeDialog);
    backdrop.addEventListener('click', closeDialog);
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;
      var items = tabbables();
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  // Promotions carousel: Tab and Shift+Tab wrap inside it and Escape is swallowed,
  // so keyboard focus can never leave (defect).
  var carousel = document.getElementById('promo-carousel');
  if (carousel) {
    var offers = [
      { title: 'Planters: 3 for 2', link: 'See the planters' },
      { title: 'Free apron repair kit', link: 'See the aprons' },
      { title: 'Tool bundle: save 15%', link: 'See the tools' },
    ];
    var index = 0;
    var show = function (step) {
      index = (index + step + offers.length) % offers.length;
      document.getElementById('carousel-title').textContent = offers[index].title;
      document.getElementById('carousel-link').textContent = offers[index].link;
    };
    document.getElementById('carousel-prev').addEventListener('click', function () {
      show(-1);
    });
    document.getElementById('carousel-next').addEventListener('click', function () {
      show(1);
    });
    carousel.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (event.key !== 'Tab') return;
      var items = carousel.querySelectorAll('a[href], button');
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }
})();
