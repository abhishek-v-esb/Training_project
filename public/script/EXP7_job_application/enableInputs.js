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
