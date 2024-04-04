function validateUser() {
  const required = [
    "firstname",
    "lastname",
    "gender",
    "email",
    "dob",
    "mobile",
  ];
  for (let i = 0; i < required.length; i++) {
    if (document.getElementById(`${required[i]}`).value == "") {
      document.getElementById(`${required[i]}_error`).style.display = "block";
      return false;
    }
    document.getElementById(`${required[i]}_error`).style.display = "none";
  }
  return true;
}
function validatePassword() {
  const required = ["password", "confirmPass"];
  for (let i = 0; i < required.length; i++) {
    if (document.getElementById(`${required[i]}`).value == "") {
      document.getElementById(`${required[i]}_error`).style.display = "block";
      return false;
    } else if (
      document.getElementById(`${required[0]}`).value !=
      document.getElementById(`${required[1]}`).value
    ) {
      document.getElementById(`${required[1]}_error`).style.display = "block";
      return false;
    }
    document.getElementById(`${required[i]}_error`).style.display = "none";
  }

  return true;
}
function validateLogin() {
  const required = ["loginEmail", "loginPassword"];
  for (let i = 0; i < required.length; i++) {
    if (document.getElementById(`${required[i]}`).value == "") {
      document.getElementById(`${required[i]}_error`).style.display = "block";
      return false;
    }
    document.getElementById(`${required[i]}_error`).style.display = "none";
  }
  return true;
}
function validateForgotEmail() {
  if (document.getElementById("forgot_email").value == "") {
    document.getElementById("forgot_email_error").style.display = "block";
    return false;
  }
  document.getElementById("forgot_email_error").style.display = "none";
  return true;
}
