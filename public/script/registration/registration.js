const form = document.querySelector("#form");
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
    const submitDiv = document.getElementById("submit-div");
    const a = document.createElement("a");
    document.getElementById("submit").remove();
    const p = document.createElement("p");
    p.innerHTML = "Click on below link to activate your account";
    a.id = "link";
    a.innerText = ` /password?activeCode=${JSON.parse(data).link}&id=${
      JSON.parse(data).id
    }`;
    a.setAttribute(
      "href",
      ` /password?activeCode=${JSON.parse(data).link}&id=${JSON.parse(data).id}`
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
  const div = document.getElementById("ip-holder");
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
    location.href = "/projects";
  }
}

function forgot() {
  return new Promise((resolve) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const valid = validateForgotEmail();
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
  const userExist = document.getElementById("userExist");
  if (userExist) {
    userExist.remove();
  }
  const submitDiv = document.getElementById("submit-div");
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
    const submitDiv = document.getElementById("submit-div");
    const a = document.createElement("a");
    const p = document.createElement("p");
    p.innerHTML = "Click on below link to activate your account";
    a.id = "link";
    a.innerText = ` /password?activeCode=${JSON.parse(data).link}&id=${
      JSON.parse(data).id
    }`;
    a.setAttribute(
      "href",
      ` /password?activeCode=${JSON.parse(data).link}&id=${JSON.parse(data).id}`
    );
    submitDiv.appendChild(p);
    submitDiv.appendChild(a);
  }
}
