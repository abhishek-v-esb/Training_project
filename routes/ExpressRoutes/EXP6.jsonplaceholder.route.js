const routes = require("express").Router();
const authorization = require("../../middleware/registration/authorization.js");

const data = require("../../model/ExpressTasks/EXP2.attendence.js");

routes.get("/post", authorization.authorization, (req, res) => {
  res.render("pages/ExpressTasks/EXP6_jsonplaceholder/index");
});
routes.get("/postdetails", authorization.authorization, function (req, res) {
  res.render("pages/ExpressTasks/EXP6_jsonplaceholder/details");
});

module.exports = routes;
