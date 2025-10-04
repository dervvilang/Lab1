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
