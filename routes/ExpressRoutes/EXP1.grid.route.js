const routes = require("express").Router();
const authorization = require("../../middleware/registration/authorization.js");

const data = require("../../model/ExpressTasks/EXP1.grid.js");

routes.get("/data", authorization.authorization, data.showData);
routes.get("/sorted", authorization.authorization, data.sortedData);

module.exports = routes;
