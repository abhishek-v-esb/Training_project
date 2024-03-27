const routes = require("express").Router();
const authorization = require("../controller/registration/authorization");

routes.get("/ehya", authorization.authorization, (req, res) => {
  res.render("pages/CSSproject/CSS1_ehya.ejs");
});

routes.get("/AwanHoster", authorization.authorization, (req, res) => {
  res.render("pages/CSSproject/CSS2_Awan_Hoster.ejs");
});
routes.get("/HireX", authorization.authorization, (req, res) => {
  res.render("pages/CSSproject/CSS3_HireX.ejs");
});
module.exports = routes;
