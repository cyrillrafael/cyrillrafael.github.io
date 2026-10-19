// Resources page: linkable subheadings and copy-on-click template insets.

// Each h2/h3 already carries a kramdown auto-id; add a visible "#" link to it.
document.querySelectorAll('.content h2[id], .content h3[id]').forEach(function (h) {
  var a = document.createElement('a');
  a.className = 'heading-anchor';
  a.href = '#' + h.id;
  a.textContent = '#';
  a.setAttribute('aria-label', 'Link to this section');
  h.appendChild(a);
});

// Each .copy-inset gets a corner button that copies the inset's text.
document.querySelectorAll('.copy-inset').forEach(function (inset) {
  var button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-button';
  button.setAttribute('aria-label', 'Copy to clipboard');
  button.innerHTML = '<i class="far fa-copy"></i>';
  inset.appendChild(button);

  function flash(icon, label) {
    button.innerHTML = '<i class="' + icon + '"></i>';
    button.setAttribute('aria-label', label);
    setTimeout(function () {
      button.innerHTML = '<i class="far fa-copy"></i>';
      button.setAttribute('aria-label', 'Copy to clipboard');
    }, 1500);
  }

  // When the clipboard is unavailable, select the text so a manual copy is one keystroke.
  function selectInstead() {
    var range = document.createRange();
    range.selectNodeContents(inset.querySelector('pre, blockquote') || inset);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    flash('fas fa-i-cursor', 'Text selected — press Cmd/Ctrl+C');
  }

  button.addEventListener('click', function () {
    var source = inset.querySelector('pre, blockquote') || inset;
    var text = source.innerText.trim();
    if (!navigator.clipboard) return selectInstead();
    navigator.clipboard.writeText(text).then(
      function () { flash('fas fa-check', 'Copied'); },
      selectInstead
    );
  });
});
