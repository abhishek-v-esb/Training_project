const routes = require("express").Router();

const data = require("../../model/ExpressTasks/EXP3.query.search.js");

routes.get("/home", data.home);
routes.get("/input", data.runQuery);
routes.post("/input", data.runQuery);

module.exports = routes;
