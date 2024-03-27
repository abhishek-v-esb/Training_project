function prevSlide() {
  const btnId = document.getElementById("slider-sec");
  //   console.log(btnId);
  btnId.scrollLeft += 450;
}
function nextSlide() {
  const btnId = document.getElementById("slider-sec");
  //   console.log(btnId);
  btnId.scrollLeft -= 450;
}
function showDes(language) {
  const content = document.getElementsByClassName("tech-des");
  //   console.log(content);
  for (let i = 0; i < content.length; i++) {
    content[i].style.display = "none";
  }
  const lang = document.getElementById(language);
  lang.style.display = "block";

  const remcolor = document.getElementsByClassName("tech-name");

  // const main = document.getElementById(language + "-main");
  // main.style.backgroundColor = "#6a88b6";
  // main.firstElementChild.style.color = "white";
}

function showCompanies() {
  const comp = document.getElementById("section-companies");
  comp.style.display = "block";
}
