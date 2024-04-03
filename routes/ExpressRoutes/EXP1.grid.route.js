const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/EXP1.grid.js");

routes.get("/data", authorization.authorization, data.showData);
routes.get("/sorted", authorization.authorization, data.sortedData);

module.exports = routes;
