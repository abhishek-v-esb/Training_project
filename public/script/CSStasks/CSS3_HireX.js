function prevSlide() {
  const btnId = document.getElementById("review-content");
  console.log(btnId);
  btnId.scrollLeft -= 1350;
}
function nextSlide() {
  const btnId = document.getElementById("review-content");
  console.log(btnId);
  btnId.scrollLeft += 1350;
}
