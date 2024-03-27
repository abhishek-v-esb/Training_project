const authorization = require("../controller/registration/authorization");

const routes = require("express").Router();
routes.get("/dynamicGrid", authorization.authorization, (req, res) => {
  res.render("pages/JSproject/JS1_dynamic_grid");
});

module.exports = routes;
