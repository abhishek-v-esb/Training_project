function validate(required, isNum, isStr) {
  const tempMerge = merge(required, isNum);
  const finMerge = merge(tempMerge, isStr);

  for (check of finMerge) {
    const element = document.getElementById(check);

    const value = element.value.trim();

    const errorspan = document.getElementById(`${check}_error`);
    if (required.includes(check) && value == "" && element.disabled == false) {
      errorspan.style.display = "block";
      return false;
    }
    if (
      isNum.includes(check) &&
      !value.match(/^[0-9]+$/) &&
      element.disabled == false
    ) {
      errorspan.innerHTML = "enter a number";
      errorspan.style.display = "block";
      return false;
    }
    if (
      isStr.includes(check) &&
      !value.match(/^[A-Za-z]+$/) &&
      element.disabled == false
    ) {
      errorspan.innerHTML = "enter a string";
      errorspan.style.display = "block";
      return false;
    }
    if (
      email.includes(check) &&
      !value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
    ) {
      errorspan.innerHTML = "enter proper email";
      errorspan.style.display = "block";
      return false;
    }

    errorspan.innerHTML = "";
  }

  return true;
}
