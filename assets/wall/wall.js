// /wall/: size each painting from its stated dimensions, fit the scale to the screen,
// and let wheel, arrow keys and a counter move along the wall. Motion is CSS.

(function () {
  var wall = document.querySelector('.gallery');
  if (!wall) return;
  var works = Array.prototype.slice.call(wall.querySelectorAll('.painting'));
  var count = document.querySelector('.wall-count');
  var tallest = 175; // the figure must fit too

  // Dimensions are written height × width ("220x120cm"). The photo's proportions
  // correct the rare entry written the other way round once the image has loaded.
  works.forEach(function (p) {
    var dims = p.querySelector('.dimensions');
    var img = p.querySelector('img');
    var m = dims && dims.textContent.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/);
    if (!m) return;
    var a = parseFloat(m[1].replace(',', '.'));
    var b = parseFloat(m[2].replace(',', '.'));
    var apply = function (h, w) {
      p.style.setProperty('--h-cm', h);
      p.style.setProperty('--w-cm', w);
    };
    apply(a, b);
    tallest = Math.max(tallest, a, b);
    var check = function () {
      if (!img.naturalWidth) return;
      var r = img.naturalWidth / img.naturalHeight;
      if (Math.abs(b / a - r) > Math.abs(a / b - r)) apply(b, a);
    };
    if (img) { if (img.complete) check(); else img.addEventListener('load', check, { once: true }); }
  });

  // Fit: the tallest thing on the wall fills ~72% of the wall's height, leaving room for labels.
  function fit() {
    var px = (wall.clientHeight * 0.72) / tallest;
    document.documentElement.style.setProperty('--cm', px.toFixed(3) + 'px');
  }
  fit();
  addEventListener('resize', fit);

  // A vertical wheel walks along the wall.
  wall.addEventListener('wheel', function (e) {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    wall.scrollBy({ left: e.deltaY, behavior: 'auto' });
    e.preventDefault();
  }, { passive: false });

  // The work nearest the centre of the wall.
  function current() {
    var mid = wall.getBoundingClientRect().left + wall.clientWidth / 2;
    var best = 0, dist = Infinity;
    works.forEach(function (p, i) {
      var r = p.getBoundingClientRect();
      var d = Math.abs(r.left + r.width / 2 - mid);
      if (d < dist) { dist = d; best = i; }
    });
    return best;
  }

  function show(i) {
    var p = works[Math.max(0, Math.min(works.length - 1, i))];
    p.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  // Arrow keys and Home/End move one work at a time.
  document.addEventListener('keydown', function (e) {
    var i = current();
    if (e.key === 'ArrowRight' || e.key === 'PageDown') show(i + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') show(i - 1);
    else if (e.key === 'Home') show(0);
    else if (e.key === 'End') show(works.length - 1);
    else return;
    e.preventDefault();
  });

  // Counter: "12 / 57".
  var ticking = false;
  function update() {
    ticking = false;
    if (count) count.textContent = (current() + 1) + ' / ' + works.length;
  }
  wall.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();
