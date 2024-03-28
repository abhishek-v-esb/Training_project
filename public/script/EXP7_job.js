let count = 1;
const form = document.querySelector("#form");
// console.log(form);
const page = {
  1: "basic-details",
  2: "education",
  3: "workExp",
  4: "language",
  5: "technology",
  6: "referenceContact",
  7: "preference",
};

const required = [
  "firstname",
  "lastname",
  "designation",
  "address1",
  "address2",
  "email",
  "phone",
  "zipcode",
  "ssc",
  "passingyearssc",
  "passingpercentagessc",
  "hsc",
  "passingyearhsc",
  "passingpercentagehsc",
  "bachelor",
  "passingyearbachelor",
  "passingpercentagebachelor",
  "master",
  "passingyearmaster",
  "passingpercentagemaster",
  "company1",
  "company1designation",
  "company1from",
  "company1to",
  "company2",
  "company2designation",
  "company2from",
  "company2to",
  "ref1",
  "ref1relation",
  "ref1contact",
  "ref2",
  "ref2relation",
  "ref2contact",
  "prefLocation",
  "currCTC",
  "expCTC",
  "department",
];

const isNum = [
  "phone",
  "zipcode",
  "passingpercentagessc",
  "passingpercentagehsc",
  "passingpercentagebachelor",
  "passingpercentagemaster",
  "ref1contact",
  "ref2contact",
  "currCTC",
  "expCTC",
];
const isStr = [
  "firstname",
  "lastname",
  "designation",
  "city",
  "state",
  "ssc",
  "hsc",
  "bachelor",
  "master",
  "company1",
  "company1designation",
  "company2",
  "company2designation",
  "ref1",
  "ref1relation",
  "ref2",
  "ref2relation",
  "prefLocation",
  "department",
];
const email = ["email"];
const merge = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a];
  b.forEach((bItem) =>
    c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
  );
  return c;
};

selectedState();
navActivate();
if (window.location.href.includes("updateform")) {
  getExistingData();
}

function getExistingData() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", `http://localhost:8007/EXP7/update?id=1`, true);

  xhr.onload = function () {
    if (this.status == 200) {
      const data = JSON.parse(this.responseText);

      addetails(data);
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.send();
}

function addetails(data) {
  //basic
  document.getElementById("firstname").value = data.employee.first_name;
  document.getElementById("lastname").value = data.employee.last_name;
  document.getElementById("designation").value = data.employee.emp_designation;
  document.getElementById("address1").value = data.employee.address1;
  document.getElementById("address2").value = data.employee.address2;
  document.getElementById("email").value = data.employee.email;
  document.getElementById("phone").value = data.employee.phone;
  document.getElementById("zipcode").value = data.employee.zip_code;
  document.getElementById("dob").value = data.employee.dob;
  document.getElementById(`${data.employee.gender}`).checked = true;

  //education
  const board = ["ssc", "hsc", "bachelor", "master"];
  board.forEach((element) => {
    const education_type = eval(
      "data.education." + element + ".education_type"
    );
    const passing_percentage = eval(
      "data.education." + element + ".passing_percentage"
    );
    const passing_year = eval("data.education." + element + ".passing_year");

    document.getElementById(`${element}`).value = education_type;
    document.getElementById(`passingpercentage${element}`).value =
      passing_percentage;
    document.getElementById(`passingyear${element}`).value = passing_year;
  });
  //work exp
  for (let i = 1; i <= Object.keys(data.work).length; i++) {
    document.getElementById(`company${i}`).value =
      data.work[Object.keys(data.work)[i - 1]].company_name;
    document.getElementById(`company${i}designation`).value =
      data.work[Object.keys(data.work)[i - 1]].work_designation;
    document.getElementById(`company${i}from`).value =
      data.work[Object.keys(data.work)[i - 1]].fromdate;
    document.getElementById(`company${i}to`).value =
      data.work[Object.keys(data.work)[i - 1]].todate;
  }

  //language
  for (let i = 1; i <= Object.keys(data.language).length; i++) {
    const lang = data.language[Object.keys(data.language)[i - 1]];
    document.getElementById(`${lang.language}`).checked = true;

    lang.fluency.forEach((element) => {
      document.getElementById(`${lang.language}${element}`).checked = true;
    });
  }

  //technology
  for (let i = 1; i <= Object.keys(data.technology).length; i++) {
    const tech = data.technology[Object.keys(data.technology)[i - 1]];
    document.getElementById(`${tech.tech_name}`).checked = true;
    document.getElementById(
      `${tech.tech_name}${tech.tech_expertise}`
    ).checked = true;
  }

  //references
  Object.keys(data.reference).forEach((element) => {
    const refname = eval("data.reference." + element + ".ref_name");
    const refcontact = eval("data.reference." + element + ".ref_contact");
    const refrelation = eval("data.reference." + element + ".ref_relation");
    document.getElementById(element.slice(-1)).value = refname;
    document.getElementById(`ref${element.slice(-1)}contact`).value =
      refcontact;
    document.getElementById(`ref${element.slice(-1)}relation`).value =
      refrelation;
  });

  // preferences
  document.getElementById("prefLocation").value = data.preference.location;
  document.getElementById("currCTC").value = data.preference.curr_CTC;
  document.getElementById("expCTC").value = data.preference.exp_CTC;
  document.getElementById("department").value = data.preference.department;
}

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
    window.location.href = "http://localhost:8007/EXP7/display";
  };
});

function selectedState(e) {
  let type;
  let url;
  if (e == undefined) {
    type = "states";
    url = "http://localhost:8007/EXP7/states";

    // console.log(url);
  } else {
    type = "cities";
    const select = document.getElementById(`${type}`);
    // console.log(select.options);
    for (const each of select.options) {
      // console.log(each);
      each.remove();
    }

    url = `http://localhost:8007/EXP7/cities?state=${e.selectedIndex}`;
  }
  var xhr = new XMLHttpRequest();

  xhr.onload = function () {
    if (this.status == 200) {
      const id = document.getElementById("hiddenid");

      const data = JSON.parse(this.responseText);

      const select = document.getElementById(`${type}`);

      // console.log(data);

      // console.log(select);
      data.forEach((element) => {
        const option = document.createElement("option");
        option.value = element.name;
        option.innerHTML = element.name;
        select.appendChild(option);
      });
    } else {
      console.log(`Error: ${xhr.status}`);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

function showPage(pageNum) {
  const view = page[pageNum];
  document.getElementById(`${view}`).style.display = "block";
  document.getElementById(`${view}_head`).classList.add("selected-head");
}

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
  const view = page[count];
  document.getElementById(`${view}`).style.display = "none";
  document.getElementById(`${view}_head`).classList.remove("selected-head");
  if (count < Object.keys(page).length) {
    count++;
  }
  navActivate();
  showPage(count);
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

// function headerClick(e) {
//   // console.log(e.id);
//   for (each in page) {
//     // console.log(page[each]);
//     document
//       .getElementById(`${page[each]}_head`)
//       .classList.remove("selected-head");
//     console.log();
//     const key = Object.keys(page).find((key) => page[key] === page[each]);
//     if (e.id === `${page[each]}_head`) {
//       document.getElementById(`${page[key]}`).style.display = "block";
//     } else {
//       document.getElementById(`${page[key]}`).style.display = "none";
//     }

//     //
//   }
//   document.getElementById(`${e.id}`).classList.add("selected-head");
// }

function validate() {
  const tempMerge = merge(required, isNum);
  const finMerge = merge(tempMerge, isStr);

  for (check of finMerge) {
    const element = document.getElementById(check);

    const value = element.value.trim();
    const errorspan = document.getElementById(`${check}_error`);
    if (required.includes(check) && value == "") {
      errorspan.innerHTML = "please enter the field";
      // errorspan.focus();
      return false;
    }
    if (isNum.includes(check) && !value.match(/^[0-9]+$/)) {
      errorspan.innerHTML = "enter a number";
      return false;
    }
    if (isStr.includes(check) && !value.match(/^[A-Za-z]+$/)) {
      errorspan.innerHTML = "enter a string";
      return false;
    }
    if (
      email.includes(check) &&
      !value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    ) {
      errorspan.innerHTML = "enter proper email";
      return false;
    }
    errorspan.innerHTML = "";
  }

  return true;
}

function checkLang(checkbox) {
  const type = ["Read", "Write", "Speak"];

  type.forEach((element) => {
    if (checkbox.checked == true) {
      document
        .getElementById(`${checkbox.id}${element}`)
        .removeAttribute("disabled");
    } else {
      document
        .getElementById(`${checkbox.id}${element}`)
        .setAttribute("disabled", "disabled");
    }
  });
}

function checkTech(checkbox) {
  const type = ["Beginner", "Mediator", "Expert"];

  type.forEach((element) => {
    if (checkbox.checked == true) {
      document
        .getElementById(`${checkbox.id}${element}`)
        .removeAttribute("disabled");
    } else {
      document
        .getElementById(`${checkbox.id}${element}`)
        .setAttribute("disabled", "disabled");
    }
  });
}
function enableComp(input) {
  const comp = ["designation", "from", "to"];
  comp.forEach((element) => {
    if (input.value) {
      document
        .getElementById(`${input.id}${element}`)
        .removeAttribute("disabled");
    } else {
      document
        .getElementById(`${input.id}${element}`)
        .setAttribute("disabled", "disabled");
    }
  });
}
function enableRef(input) {
  const ref = ["contact", "relation"];
  ref.forEach((element) => {
    if (input.value) {
      document
        .getElementById(`ref${input.id}${element}`)
        .removeAttribute("disabled");
    } else {
      document
        .getElementById(`ref${input.id}${element}`)
        .setAttribute("disabled", "disabled");
    }
  });
}

function addCompRow() {
  const tr = document.createElement("tr");
  const body = document.querySelector("#compTable tbody");
  const id = parseInt(body.lastElementChild.id);
  console.log(id);
  tr.id = id + 1;
  tr.innerHTML = `<td><label for="company">Company:</label></td>
  <td>
    <input
      type="text"
      name="company"
      id="company${id + 1}"
      onkeyup="enableComp(this)"
    />
    <span class="error"><p id="company${id + 1}_error"></p></span>
  </td>
  <td><label for="companydesignation">Designation:</label></td>
  <td>
    <input
      type="text"
      name="companydesignation"
      id="company${id + 1}designation"
      disabled
    />
    <span class="error"
      ><p id="company${id + 1}designation_error"></p
    ></span>
  </td>
  <td><label for="companyfrom">From:</label></td>

  <td>
    <input
      type="date"
      name="companyfrom"
      id="company${id + 1}from"
      placeholder="dd-mm-yyyy"
      disabled
    />
    <span class="error"><p id="company${id + 1}from_error"></p></span>
  </td>
  <td><label for="companyto">To:</label></td>
  <td>
    <input
      type="date"
      name="companyto"
      id="company${id + 1}to"
      placeholder="dd-mm-yyyy"
      disabled
    />
    <span class="error"><p id="company${id + 1}to_error"></p></span>
  </td>`;

  body.appendChild(tr);
}

function removeCompRow() {
  const element = document.querySelector("#compTable tbody").lastElementChild;
  if (element.id > 2) {
    element.remove();
  }
}

function addRefRow() {
  const tr = document.createElement("tr");
  const body = document.querySelector("#refTable tbody");
  const id = parseInt(body.lastElementChild.id.slice(-1));
  // console.log(id);
  const newId = `ref${id + 1}`;
  tr.id = `ref${id + 1}`;
  tr.innerHTML = `<td><label for="ref">Name:</label></td>
  <td>
    <input
      type="text"
      name="ref"
      id="${newId}"
      onkeyup="enableRef(this)"
    />
    <span class="error"><p id="${newId}_error"></p></span>
  </td>

  <td><label for="refcontact">Contact:</label></td>
  <td>
    <input
      type="text"
      name="refcontact"
      id="${newId}contact"
      disabled
    />
    <span class="error"><p id="${newId}contact_error"></p></span>
  </td>
  <td><label for="refrelation">Relation:</label></td>
  <td>
    <input
      type="text"
      name="refrelation"
      id="${newId}relation"
      disabled
    />
    <span class="error"><p id="${newId}relation_error"></p></span>
  </td>`;

  body.appendChild(tr);
}

function removeRefRow() {
  const element = document.querySelector("#refTable tbody").lastElementChild;
  const id = parseInt(element.id.slice(-1));
  if (id > 2) {
    element.remove();
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
