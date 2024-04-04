if (window.location.href.includes("updateform")) {
  getExistingData();
  removeDisabled();
}

function getExistingData() {
  var xhr = new XMLHttpRequest();
  const id = document.getElementById("hiddenId").value;

  xhr.open("GET", `/EXP7/update?id=${id}`, true);

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
function removeDisabled() {
  const disabledInputs = document.getElementsByClassName("disabledClass");
  for (const each of disabledInputs) {
    each.disabled = false;
  }
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
  const states = document.getElementById("states");

  for (const state of states) {
    if (state.value == data.employee.state) {
      state.selected = true;
    }
  }
  document.getElementById(
    "cities"
  ).innerHTML = `<option>${data.employee.city}</option>`;
  document.getElementById(`${data.employee.gender}`).checked = true;

  //education
  const board = ["ssc", "hsc", "bachelor", "master"];
  board.forEach((element) => {
    const education_type = eval("data.education." + element + ".board_name");
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
