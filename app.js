const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const register = require("./database/register");
const setpassword = require("./database/setpassword");
const login = require("./database/login");
const forgotPass = require("./database/forgot");
const authorization = require("./controller/authorization");
const app = express();
const port = 8016;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/register", (req, res) => {
  res.render("pages/index");
});
app.post("/register", register.registerUser);

app.get("/password", setpassword.checkStatus);
app.post("/password", setpassword.userPassword);

app.get("/login", (req, res) => {
  res.render("pages/login");
});
app.post("/login", login.loginUser);

app.get("/forgot", (req, res) => {
  res.render("pages/forgotPassword");
});
app.post("/forgot", forgotPass.forgotPass);

app.get("/authorised", authorization.authorization, (req, res) => {
  res.render("pages/welcome");
});

app.get("/logout", authorization.authorization, (req, res) => {
  res.clearCookie("access_token").status(200).redirect("/login");
});

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
