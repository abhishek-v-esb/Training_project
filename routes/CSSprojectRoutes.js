const routes = require("express").Router();
const authorization = require("../controller/registration/authorization");

routes.get("/ehya", authorization.authorization, (req, res) => {
  res.render("pages/CSSproject/CSS1_ehya.ejs");
});

module.exports = routes;
