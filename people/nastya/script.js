document.getElementById("moreBtn").addEventListener("click", function() {
  let text = document.getElementById("moreText");
  if (text.style.display === "none") {
    text.style.display = "block";
    this.textContent = "Скрыть";
  } else {
    text.style.display = "none";
    this.textContent = "Показать больше";
  }
});
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