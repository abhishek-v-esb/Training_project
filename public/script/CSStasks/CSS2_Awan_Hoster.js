function prevSlide() {
  const btnId = document.getElementById("slider-sec");
  btnId.scrollLeft += 450;
}
function nextSlide() {
  const btnId = document.getElementById("slider-sec");
  btnId.scrollLeft -= 450;
}
function showDes(language) {
  const content = document.getElementsByClassName("tech-des");
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  const lang = document.getElementById(language);
  lang.style.display = "block";
}

function showCompanies() {
  const comp = document.getElementById("section-companies");
  comp.style.display = "block";
}
