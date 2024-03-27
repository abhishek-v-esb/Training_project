const routes = require("express").Router();

const register = require("../model/registration/register");
const setpassword = require("../model/registration/setpassword");
const login = require("../model/registration/login");
const forgotPass = require("../model/registration/forgot");
const authorization = require("../middleware/registration/authorization");

routes.get("/register", (req, res) => {
  res.render("pages/registration/index");
});
routes.post("/register", register.registerUser);

routes.get("/password", setpassword.checkStatus);
routes.post("/password", setpassword.userPassword);

routes.get("/login", (req, res) => {
  res.render("pages/registration/login");
});
routes.post("/login", login.loginUser);

routes.get("/forgot", (req, res) => {
  res.render("pages/registration/forgotPassword");
});
routes.post("/forgot", forgotPass.forgotPass);

routes.get("/projects", (req, res) => {
  res.render("pages/registration/projects");
});

routes.get("/logout", authorization.authorization, (req, res) => {
  res.clearCookie("access_token").status(200).redirect("/login");
});

module.exports = routes;
