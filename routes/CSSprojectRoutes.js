const routes = require("express").Router();
const authorization = require("../middleware/authorization");

routes.get("/ehya", authorization.authorization, (req, res) => {
  res.render("pages/CSStasks/CSS1_ehya.ejs");
});

routes.get("/AwanHoster", authorization.authorization, (req, res) => {
  res.render("pages/CSStasks/CSS2_Awan_Hoster.ejs");
});
routes.get("/HireX", authorization.authorization, (req, res) => {
  res.render("pages/CSStasks/CSS3_HireX.ejs");
});
module.exports = routes;
