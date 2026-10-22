// Prism: view any page of the site under a proposed restyle.
// The page is loaded in a same-origin iframe; themes.css is injected into it and a
// class on its <html> selects the restyle. Animation is left to CSS: restyles and
// view changes run inside View Transitions where supported, plain CSS transitions otherwise.

(function () {
  var STYLES = [
    { id: 'original', name: 'Original', note: 'The site as it is' },
    { id: 'wall', name: 'Long wall', note: 'One wall, true relative scale, snap to each work' },
    { id: 'scale', name: 'True scale', note: 'Real heights beside a 175 cm figure' },
    { id: 'slow', name: 'One at a time', note: 'Full-screen panels, caption arrives after' },
    { id: 'index', name: 'Archive index', note: 'Rows of titles; image on hover or focus' },
    { id: 'cube', name: 'White cube', note: 'Flat white wall, serif type, quiet captions' },
    { id: 'night', name: 'Night wall', note: 'Charcoal ground, warm text, lifted works' },
    { id: 'pigment', name: 'Pigment', note: 'Ochre ground, ultramarine links, framed works' },
    { id: 'sheet', name: 'Contact sheet', note: 'Every work at once in a dense grid' },
    { id: 'monograph', name: 'Monograph', note: 'Book plates, italic captions, wide margins' },
    { id: 'swiss', name: 'Swiss index', note: 'Sans-serif, left-aligned, one red accent' }
  ];
  var PAGES = [
    { path: '/paintings/', name: 'Paintings' },
    { path: '/linocuts/', name: 'Linocuts' },
    { path: '/installations/', name: 'Installations' },
    { path: '/about/', name: 'About' },
    { path: '/cv/', name: 'CV' }
  ];
  var THEMES_CSS = '/assets/prism/themes.css';
  var FRAME_WIDTH = 1280; // grid previews render the page at desktop width, then scale down

  // Any page of this site except the prism itself.
  function isSitePath(p) {
    return typeof p === 'string' && /^\/(?!\/)/.test(p) && p.indexOf('/prism') !== 0;
  }

  // ---- state, mirrored in the URL so a view can be shared ----
  var params = new URLSearchParams(location.search);
  var state = {
    page: isSitePath(params.get('page')) ? params.get('page') : '/paintings/',
    style: STYLES.some(function (s) { return s.id === params.get('style'); }) ? params.get('style') : 'original',
    view: params.get('view') === 'grid' ? 'grid' : 'single'
  };

  function writeUrl() {
    var q = new URLSearchParams({ page: state.page, style: state.style, view: state.view });
    history.replaceState(null, '', location.pathname + '?' + q.toString());
  }

  // ---- DOM ----
  var root = document.documentElement;
  var pageBar = document.getElementById('prism-pages');
  var styleBar = document.getElementById('prism-styles');
  var viewButton = document.getElementById('prism-view');
  var openLink = document.getElementById('prism-open');
  var live = document.getElementById('prism-live');
  var liveFrame = live.querySelector('iframe');
  var grid = document.getElementById('prism-grid');

  function button(label, note, onClick) {
    var b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<span class="prism-name"></span>' + (note ? '<span class="prism-note"></span>' : '');
    b.querySelector('.prism-name').textContent = label;
    if (note) b.querySelector('.prism-note').textContent = note;
    b.addEventListener('click', onClick);
    return b;
  }

  PAGES.forEach(function (p) {
    var b = button(p.name, null, function () { go(p.path); });
    b.dataset.page = p.path;
    pageBar.appendChild(b);
  });

  STYLES.forEach(function (s) {
    var b = button(s.name, s.note, function () { restyle(s.id); });
    b.dataset.style = s.id;
    styleBar.appendChild(b);
  });

  // ---- dressing a framed page ----

  // Stated dimensions ("300x150cm") give two numbers; the photo's proportions decide which is the height.
  function measure(doc) {
    doc.querySelectorAll('.painting').forEach(function (p) {
      var dims = p.querySelector('.dimensions');
      var img = p.querySelector('img');
      var m = dims && dims.textContent.match(/(\d+(?:[.,]\d+)?)\s*[x×]\s*(\d+(?:[.,]\d+)?)/);
      if (!m) return;
      var a = parseFloat(m[1].replace(',', '.'));
      var b = parseFloat(m[2].replace(',', '.'));
      var set = function () {
        var h = b;
        if (img && img.naturalWidth) {
          var r = img.naturalWidth / img.naturalHeight;
          h = Math.abs(a / b - r) <= Math.abs(b / a - r) ? b : a;
        }
        p.style.setProperty('--h-cm', h);
      };
      set();
      if (img && !img.complete) img.addEventListener('load', set, { once: true });
    });
  }

  // Behaviour some restyles need beyond CSS: a scale figure, wheel-to-wall, focusable rows.
  function behave(doc, style) {
    if (!doc.querySelector('.prism-figure') && doc.body) {
      var fig = doc.createElement('div');
      fig.className = 'prism-figure';
      fig.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(fig);
    }
    doc.querySelectorAll('.painting').forEach(function (p) {
      if (style === 'index') p.tabIndex = 0; else p.removeAttribute('tabindex');
    });
    var wall = doc.querySelector('.gallery');
    if (wall && !wall.dataset.prismWheel) {
      wall.dataset.prismWheel = '1';
      // A vertical wheel walks along the wall when the wall is horizontal.
      wall.addEventListener('wheel', function (e) {
        if (!doc.documentElement.classList.contains('prism-wall')) return;
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        wall.scrollLeft += e.deltaY;
        e.preventDefault();
      }, { passive: false });
    }
  }

  function setClass(doc, style) {
    var h = doc.documentElement;
    Array.prototype.slice.call(h.classList).forEach(function (c) {
      if (c.indexOf('prism-') === 0 && c !== 'prism-switching') h.classList.remove(c);
    });
    h.classList.add('prism', 'prism-' + style);
    if (doc.body) behave(doc, style);
  }

  // Name only what is on screen, just for the duration of a transition:
  // snapshotting all 57 works would be heavy, and off-screen works need no morph.
  function nameVisible(doc) {
    var win = doc.defaultView;
    var named = [];
    var nav = doc.querySelector('.horizontal-list');
    var h1 = doc.querySelector('.content h1');
    if (nav) { nav.style.viewTransitionName = 'prism-nav'; named.push(nav); }
    if (h1) { h1.style.viewTransitionName = 'prism-h1'; named.push(h1); }
    doc.querySelectorAll('.painting, .image-item').forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      if (r.bottom > 0 && r.top < win.innerHeight && r.right > 0 && r.left < win.innerWidth) {
        el.style.viewTransitionName = 'prism-work-' + i;
        named.push(el);
      }
    });
    return function () { named.forEach(function (el) { el.style.viewTransitionName = ''; }); };
  }

  function dress(frame, style, onReady) {
    var doc;
    try { doc = frame.contentDocument; } catch (e) { doc = null; }
    if (!doc || !doc.head) { if (onReady) onReady(null); return; } // navigated off-site
    // The first dressing of a page appears at once; only later restyles animate.
    doc.documentElement.classList.add('prism-switching');
    var settle = onReady;
    onReady = function (d) {
      var win = doc.defaultView;
      win.requestAnimationFrame(function () {
        win.requestAnimationFrame(function () { doc.documentElement.classList.remove('prism-switching'); });
      });
      if (settle) settle(d);
    };
    measure(doc);
    setClass(doc, style);
    // Links leaving the site open in a new tab instead of inside the frame.
    doc.querySelectorAll('a[href]').forEach(function (a) {
      if (a.origin !== location.origin) a.target = '_blank';
    });
    if (doc.getElementById('prism-themes')) { if (onReady) onReady(doc); return; }
    var link = doc.createElement('link');
    link.id = 'prism-themes';
    link.rel = 'stylesheet';
    link.href = THEMES_CSS;
    link.onload = function () { if (onReady) onReady(doc); };
    // Never leave the preview invisible: show the unstyled page and say why.
    link.onerror = function () {
      console.error('prism: could not load ' + THEMES_CSS);
      if (onReady) onReady(doc);
    };
    doc.head.appendChild(link);
  }

  function reduced() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }

  // Run a DOM change inside a view transition when the document supports it.
  function transition(doc, change) {
    if (!doc.startViewTransition || reduced()) { change(); return; }
    var clear = nameVisible(doc);
    doc.documentElement.classList.add('prism-switching');
    var t = doc.startViewTransition(change);
    t.finished.finally(function () {
      doc.documentElement.classList.remove('prism-switching');
      clear();
    });
  }

  // ---- live frame ----
  liveFrame.addEventListener('load', function () {
    live.classList.remove('is-ready');
    dress(liveFrame, state.style, function () { live.classList.add('is-ready'); });
    // Follow navigation inside the frame, to any page of the site.
    try {
      var path = liveFrame.contentWindow.location.pathname;
      if (isSitePath(path) && path !== state.page) { state.page = path; if (state.view === 'grid') loadGridPage(); render(); }
    } catch (e) { /* off-site */ }
  });

  // ---- grid of previews, built on first use ----
  var cards = {};
  function buildGrid() {
    if (grid.childElementCount) return;
    STYLES.forEach(function (s) {
      // A div acting as a button: a real <button> may not contain an iframe.
      var card = document.createElement('div');
      card.setAttribute('role', 'button');
      card.tabIndex = 0;
      card.className = 'prism-card';
      card.dataset.style = s.id;
      card.innerHTML = '<span class="prism-thumb"><iframe tabindex="-1" loading="lazy" aria-hidden="true" inert></iframe></span>' +
        '<span class="prism-card-label"><span class="prism-name"></span><span class="prism-note"></span></span>';
      card.querySelector('.prism-name').textContent = s.name;
      card.querySelector('.prism-note').textContent = s.note;
      var frame = card.querySelector('iframe');
      frame.addEventListener('load', function () {
        card.classList.remove('is-ready');
        dress(frame, s.id, function () { card.classList.add('is-ready'); });
      });
      var choose = function () {
        state.style = s.id;
        setView('single');
      };
      card.addEventListener('click', choose);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); choose(); }
      });
      grid.appendChild(card);
      cards[s.id] = card;
    });
    var ro = new ResizeObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.style.setProperty('--prism-scale', (e.contentRect.width / FRAME_WIDTH).toFixed(4));
      });
    });
    grid.querySelectorAll('.prism-thumb').forEach(function (t) { ro.observe(t); });
  }

  function loadGridPage() {
    Object.keys(cards).forEach(function (id) {
      var f = cards[id].querySelector('iframe');
      if (f.getAttribute('src') !== state.page) f.setAttribute('src', state.page);
    });
  }

  // ---- actions ----
  function restyle(style) {
    if (style === state.style && state.view === 'single') return;
    state.style = style;
    if (state.view === 'grid') { setView('single'); return; }
    var doc = liveFrame.contentDocument;
    if (doc && doc.body) transition(doc, function () { setClass(doc, style); });
    render();
  }

  function go(path) {
    state.page = path;
    if (liveFrame.getAttribute('src') !== path) liveFrame.setAttribute('src', path);
    if (state.view === 'grid') loadGridPage();
    render();
  }

  function setView(view) {
    var change = function () {
      state.view = view;
      if (view === 'grid') { buildGrid(); loadGridPage(); }
      else {
        var doc = liveFrame.contentDocument;
        if (doc && doc.body) setClass(doc, state.style);
      }
      render();
    };
    if (document.startViewTransition && !reduced()) document.startViewTransition(change);
    else change();
  }

  viewButton.addEventListener('click', function () { setView(state.view === 'grid' ? 'single' : 'grid'); });

  // Arrow keys step through restyles; G toggles the grid.
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    var i = STYLES.findIndex(function (s) { return s.id === state.style; });
    if (e.key === 'ArrowRight') restyle(STYLES[(i + 1) % STYLES.length].id);
    else if (e.key === 'ArrowLeft') restyle(STYLES[(i - 1 + STYLES.length) % STYLES.length].id);
    else if (e.key === 'g' || e.key === 'G') setView(state.view === 'grid' ? 'single' : 'grid');
    else return;
    e.preventDefault();
  });

  // ---- render chrome from state ----
  function render() {
    root.dataset.view = state.view;
    pageBar.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.page === state.page));
    });
    styleBar.querySelectorAll('button').forEach(function (b) {
      var on = b.dataset.style === state.style;
      b.setAttribute('aria-pressed', String(on));
      if (on) b.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
    Object.keys(cards).forEach(function (id) {
      cards[id].classList.toggle('is-current', id === state.style);
    });
    viewButton.textContent = state.view === 'grid' ? 'Single view' : 'Compare all';
    viewButton.setAttribute('aria-pressed', String(state.view === 'grid'));
    openLink.href = state.page;
    writeUrl();
  }

  liveFrame.setAttribute('src', state.page);
  if (state.view === 'grid') { buildGrid(); loadGridPage(); }
  render();
})();
