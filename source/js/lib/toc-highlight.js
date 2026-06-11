/* Aether ToC active-section highlight */
(function() {
  'use strict';
  var tocLinks = document.querySelectorAll('.toc-link');
  if (!tocLinks.length) return;

  var headings = [];
  tocLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var id = href.replace('#', '');
    var el = document.getElementById(id);
    if (el) headings.push({ el: el, link: link });
  });

  if (!headings.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        tocLinks.forEach(function(l) { l.classList.remove('active'); });
        var match = headings.find(function(h) { return h.el === entry.target; });
        if (match) match.link.classList.add('active');
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -60% 0px' });

  headings.forEach(function(h) { observer.observe(h.el); });
})();
