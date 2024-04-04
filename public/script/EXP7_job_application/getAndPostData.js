selectedState();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();

  if (event.target.action.includes("insert")) {
    xhr.open("POST", "/EXP7/insert");
  } else {
    xhr.open("POST", "/EXP7/update");
  }
  let data = new FormData(form);

  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(new URLSearchParams(data));

  xhr.onload = () => {
    window.location.href = "/EXP7/display";
  };
});

function selectedState(event) {
  let type;
  let url;
  const cityNode = document.getElementById("cities");

  cityNode.replaceChildren();

  if (event == undefined) {
    type = "states";

    url = "/EXP7/states";
  } else {
    type = "cities";

    url = `/EXP7/cities?state=${event.selectedIndex}`;
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    if (this.status == 200) {
      const data = JSON.parse(this.responseText);
      const select = document.getElementById(`${type}`);

      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.name;
        option.innerHTML = element.name;
        if (type == "cities") {
          option.classList = "city-options";
        }
        select.appendChild(option);
      });
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
