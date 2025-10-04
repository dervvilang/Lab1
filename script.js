(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = Array.from(document.querySelectorAll('.card'));
  if (!cards.length) return;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    cards.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach((el) => io.observe(el));
})();
