(() => {
  // Плавающая кнопка "Наверх"
  const toTop = document.createElement('button');
  toTop.textContent = '↑ Наверх';
  Object.assign(toTop.style, {
    position:'fixed', right:'16px', bottom:'18px',
    padding:'10px 14px', background:'#131314',
    color:'var(--accent-soft)', border:'1px solid var(--border)',
    borderRadius:'9999px', cursor:'pointer', display:'none',
    zIndex:'50', boxShadow:'0 10px 24px rgba(0,0,0,.5)'
  });
  toTop.setAttribute('aria-label','Вернуться к началу страницы');
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Подсветка активного пункта меню при прокрутке
  const sectionIds = ['about','walter','arc','moments','symbols'];
  const navLinks = Array.from(document.querySelectorAll('nav .links a[href^="#"]'));

  function highlightActive() {
    let activeId = null;
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      if (top <= 120) activeId = id; // последний прошедший заголовок
    }
    navLinks.forEach(a => {
      if (a._origColor === undefined) {
        a._origColor = a.style.color;
        a._origBorder = a.style.borderBottomColor;
      }
      if (activeId && a.getAttribute('href') === '#' + activeId) {
        a.style.color = 'var(--accent)';
        a.style.borderBottomColor = 'currentColor';
      } else {
        a.style.color = a._origColor || '';
        a.style.borderBottomColor = a._origBorder || 'transparent';
      }
    });
  }

  // Показ/скрытие кнопки и подсветка в одном обработчике
  function onScroll() {
    toTop.style.display = (window.scrollY > 500) ? 'inline-block' : 'none';
    highlightActive();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('load', onScroll);

  // Одноразовая подсказка при первом заходе
  try {
    if (!localStorage.getItem('bb.tipShown')) {
      const tip = document.createElement('div');
      tip.textContent = 'Подсказка: прокрутите ниже — меню подсветит активный раздел.';
      Object.assign(tip.style, {
        position:'fixed', left:'16px', bottom:'18px', padding:'10px 12px',
        background:'#0f0f10', color:'var(--muted)', fontSize:'13px',
        border:'1px solid var(--border)', borderRadius:'12px',
        boxShadow:'0 10px 24px rgba(0,0,0,.45)', zIndex:'49'
      });
      document.body.appendChild(tip);
      setTimeout(() => tip.remove(), 3800);
      localStorage.setItem('bb.tipShown', '1');
    }
  } catch (e) { /* приватный режим — просто пропустим */ }
})();
(function() {
  const backControl = document.getElementById("nav-back");
  if (!backControl || !(backControl instanceof HTMLElement)) return;

  backControl.addEventListener("click", (event) => {
    if (history.length > 1) {
      event.preventDefault();
      history.back();
      return;
    }

    if (!(backControl instanceof HTMLAnchorElement)) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();