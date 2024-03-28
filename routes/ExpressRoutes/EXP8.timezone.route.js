const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

routes.get("/", authorization.authorization, (req, res) => {
  res.render("pages/ExpressTasks/EXP8_timezone/index");
});

module.exports = routes;
