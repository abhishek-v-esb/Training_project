const routes = require("express").Router();

const data = require("../../model/ExpressTasks/EXP2.attendence.js");

routes.get("/attendence", data.attendence);
routes.get("/details", data.details);
routes.get("/results", data.results);

module.exports = routes;
