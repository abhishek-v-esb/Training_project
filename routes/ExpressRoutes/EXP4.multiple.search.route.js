const routes = require("express").Router();
const authorization = require("../../middleware/registration/authorization.js");

const data = require("../../model/ExpressTasks/EXP4.multiple.search.js");

routes.get("/input", data.runQuery);
routes.post("/input", data.runQuery);

module.exports = routes;
