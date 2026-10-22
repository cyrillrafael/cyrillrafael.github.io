// /directions/: leaf between the four direction panels with tabs, arrow keys or a swipe.
// Scrolling and snapping are CSS; this file only routes input and marks the current panel.

(function () {
  var leaf = document.querySelector('.leaf');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs button'));

  function index() {
    return Math.round(leaf.scrollLeft / leaf.clientWidth);
  }

  function go(i, instant) {
    i = Math.max(0, Math.min(panels.length - 1, i));
    leaf.scrollTo({ left: i * leaf.clientWidth, behavior: instant ? 'auto' : 'smooth' });
  }

  function mark() {
    var i = index();
    panels.forEach(function (p, j) { p.classList.toggle('is-current', j === i); });
    tabs.forEach(function (t, j) { t.setAttribute('aria-current', String(j === i)); });
    var id = panels[i] && panels[i].id;
    if (id && location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
  }

  tabs.forEach(function (t, j) { t.addEventListener('click', function () { go(j); }); });

  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight') go(index() + 1);
    else if (e.key === 'ArrowLeft') go(index() - 1);
    else return;
    e.preventDefault();
  });

  var ticking = false;
  leaf.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; mark(); }); }
  }, { passive: true });
  addEventListener('resize', function () { go(index(), true); });

  // Open on the panel named in the URL, e.g. /directions/#rooms
  var start = panels.findIndex(function (p) { return '#' + p.id === location.hash; });
  if (start > 0) go(start, true);
  mark();
})();
