let count = 1;
navActivate();
function previous() {
  const view = page[count];
  document.getElementById(`${view}`).style.display = "none";
  document.getElementById(`${view}_head`).classList.remove("selected-head");
  if (count > 1) {
    count--;
  }
  navActivate();
  showPage(count);
}
function next() {
  const valid = validate(
    required[count - 1],
    isNum[count - 1],
    isStr[count - 1]
  );

  if (valid) {
    const view = page[count];
    document.getElementById(`${view}`).style.display = "none";
    document.getElementById(`${view}_head`).classList.remove("selected-head");
    if (count < Object.keys(page).length) {
      count++;
    }
    navActivate();
    showPage(count);
  }
}
function navActivate() {
  if (count == 1) {
    document.getElementById("prev").style.visibility = "hidden";
  } else {
    document.getElementById("prev").style.visibility = "visible";
  }

  if (count == Object.keys(page).length) {
    document.getElementById("next").style.display = "none";
    document.getElementById("submit").style.display = "flex";
  } else {
    document.getElementById("next").style.display = "flex";
    document.getElementById("submit").style.display = "none";
  }
}

function activateBtn() {
  const currentUrl = window.location.href;
  if (currentUrl.includes("update")) {
    document.getElementById("submit").disabled = true;
    document.getElementById("update").disabled = false;
  } else {
    document.getElementById("submit").disabled = false;
    document.getElementById("update").disabled = true;
  }
}
