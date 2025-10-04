// Кнопка «Назад» (фолбэк на прокрутку к началу)
(function () {
  const btn = document.getElementById("nav-back");
  if (!btn || !(btn instanceof HTMLElement)) return;
  btn.addEventListener("click", (event) => {
    if (history.length > 1) {
      event.preventDefault();
      history.back();
      return;
    }
    if (!(btn instanceof HTMLAnchorElement)) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();

// Инициализация слайдеров (для всех [data-component="slider"])
(function () {
  const sliders = document.querySelectorAll('[data-component="slider"]');
  sliders.forEach((root) => {
    const track = root.querySelector(".slider__track");
    if (!track) return;
    const slides = Array.from(track.children);
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    let index = 0;
    const update = () => {
      track.style.transform = `translateX(${-index * 100}%)`;
    };
    const go = (to) => {
      index = (to + slides.length) % slides.length;
      update();
    };
    prev?.addEventListener("click", () => go(index - 1));
    next?.addEventListener("click", () => go(index + 1));
    let startX = null;
    track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), {
      passive: true,
    });
    track.addEventListener("touchend", (e) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
    update();
  });
})();