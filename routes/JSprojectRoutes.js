const authorization = require("../middleware/registration/authorization");

const routes = require("express").Router();
routes.get("/dynamicGrid", authorization.authorization, (req, res) => {
  res.render("pages/JSproject/JS1_dynamic_grid");
});
routes.get("/functionGrid", authorization.authorization, (req, res) => {
  res.render("pages/JSproject/JS2_functions_grid");
});
routes.get("/kukuCube", authorization.authorization, (req, res) => {
  res.render("pages/JSproject/JS3_kuku_cube");
});
routes.get("/ticTacToe", authorization.authorization, (req, res) => {
  res.render("pages/JSproject/JS4_tic_tac_toe");
});
module.exports = routes;
