/* Blue Sky Signs — Proposal Prototype
   Interactivity:
   - Tab switcher for desktop mockup view
   - Clones desktop mockups into tablet/mobile device frames
*/

(function () {
  /* ---------- Clone desktop mockups into device frames ---------- */
  function cloneInto(targetSelector, sourceTemplate) {
    const source = document.querySelector(
      '.mockup[data-template="' + sourceTemplate + '"] .browser-body'
    );
    if (!source) return;
    document.querySelectorAll(targetSelector).forEach(function (target) {
      // Recreate browser-bar + cloned browser-body
      target.innerHTML = '';
      const bar = document.createElement('div');
      bar.className = 'browser-bar';
      bar.innerHTML =
        '<span></span><span></span><span></span>' +
        '<div class="browser-url">blueskysigns.com.au</div>';
      target.appendChild(bar);
      target.appendChild(source.cloneNode(true));
    });
  }

  cloneInto('.browser[data-clone="page"]', 'page');
  cloneInto('.browser[data-clone="blog"]', 'blog');

  /* ---------- Tab switcher (desktop view above) ---------- */
  const tabs = document.querySelectorAll('.tab');
  const mockups = document.getElementById('mockups');
  if (!mockups || !tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');

      const view = tab.getAttribute('data-view');
      mockups.classList.remove('view-page', 'view-blog');
      if (view === 'page') mockups.classList.add('view-page');
      if (view === 'blog') mockups.classList.add('view-blog');

      mockups.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
