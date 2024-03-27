const routes = require("express").Router();

const data = require("../../model/ExpressTasks/EXP1.grid.js");

routes.get("/data", data.showData);
routes.get("/sorted", data.sortedData);

module.exports = routes;
