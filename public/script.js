const form = document.querySelector("#form");

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

start();

async function start() {
  if (window.location.href.includes("activeCode")) {
    await password();
  } else if (window.location.href.includes("login")) {
    await login();
  } else if (window.location.href.includes("forgot")) {
    await forgot();
  } else {
    await register();
  }
}

function register() {
  return new Promise((resolve) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = validateUser();
      console.log(valid);
      if (valid == true) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/register", true);
        let data = new FormData(form);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(new URLSearchParams(data));
        xhr.onload = () => {
          const data = xhr.responseText;
          checker(data);
        };
      }
    });
    resolve(true);
  });
}

function checker(data) {
  const userExist = document.getElementById("userExist");
  if (userExist) {
    userExist.remove();
  }
  const submitDiv = document.getElementById("submit-div");
  if (data == "true") {
    const p = document.createElement("p");
    p.innerHTML = "User already exists!";
    p.classList = "error";
    p.id = "userExist";
    p.style.color = "red";
    submitDiv.appendChild(p);
  } else {
    // console.log();
    // console.log(JSON.parse(data).link);
    const submitDiv = document.getElementById("submit-div");
    const a = document.createElement("a");
    document.getElementById("submit").remove();
    const p = document.createElement("p");
    p.innerHTML = "Click on below link to activate your account";
    a.id = "link";
    a.innerText = ` http://localhost:8016/password?activeCode=${
      JSON.parse(data).link
    }&id=${JSON.parse(data).id}`;
    a.setAttribute(
      "href",
      ` http://localhost:8016/password?activeCode=${JSON.parse(data).link}&id=${
        JSON.parse(data).id
      }`
    );
    submitDiv.appendChild(p);
    submitDiv.appendChild(a);
  }
}

function password() {
  return new Promise((resolve) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = validatePassword();
      if (valid == true) {
        const xhr = new XMLHttpRequest();

        xhr.open("POST", "/password", true);
        let data = new FormData(form);

        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );

        xhr.send(new URLSearchParams(data));

        xhr.onload = () => {
          const data = xhr.responseText;

          redirectLogin(data);
        };
      }
    });
    resolve(true);
  });
}

function redirectLogin(data) {
  // console.log(data);
  const div = document.getElementById("ip-holder");
  // console.log(div);
  div.innerHTML = "";
  const h1 = document.createElement("h1");
  h1.innerHTML = "User modified!";
  const a = document.createElement("a");
  a.innerHTML = `<center>Click To Login</center>`;
  a.setAttribute("href", `/login`);
  div.appendChild(h1);
  div.appendChild(a);
}

function login() {
  return new Promise((resolve) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = validateLogin();
      console.log(valid);
      if (valid == true) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/login", true);
        let data = new FormData(form);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(new URLSearchParams(data));
        xhr.onload = () => {
          const data = xhr.responseText;
          afterLogin(data);
        };
      }
    });
    resolve(true);
  });
}

function afterLogin(data) {
  if (data == "false") {
    document.getElementById("invalid_error").style.display = "block";
  } else {
    const div = document.getElementById("fin-div");
    const h1 = document.createElement("h1");
    h1.innerHTML = "Login Successful";
    div.parentNode.replaceChild(h1, div);
  }
}

function forgot() {
  return new Promise((resolve) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = validateForgotEmail();
      console.log(valid);
      if (valid == true) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/forgot", true);
        let data = new FormData(form);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(new URLSearchParams(data));
        xhr.onload = () => {
          const data = xhr.responseText;
          newPassword(data);
        };
      }
    });
    resolve(true);
  });
}

function newPassword(data) {
  console.log(data);
  const userExist = document.getElementById("userExist");
  if (userExist) {
    userExist.remove();
  }
  const submitDiv = document.getElementById("submit-div");
  console.log(submitDiv);
  if (data == "false") {
    const p = document.createElement("p");
    p.innerHTML = "Email not verified!";
    p.classList = "error";
    p.id = "userExist";
    p.style.color = "red";
    submitDiv.appendChild(p);
  } else {
    const submit = document.getElementById("submit");
    submit.remove();
    // console.log();
    // console.log(JSON.parse(data).link);
    const submitDiv = document.getElementById("submit-div");
    const a = document.createElement("a");
    const p = document.createElement("p");
    p.innerHTML = "Click on below link to activate your account";
    a.id = "link";
    a.innerText = ` http://localhost:8016/password?activeCode=${
      JSON.parse(data).link
    }&id=${JSON.parse(data).id}`;
    a.setAttribute(
      "href",
      ` http://localhost:8016/password?activeCode=${JSON.parse(data).link}&id=${
        JSON.parse(data).id
      }`
    );
    submitDiv.appendChild(p);
    submitDiv.appendChild(a);
  }
}
