const routes = require("express").Router();
const authorization = require("../../middleware/registration/authorization.js");

const data = require("../../model/ExpressTasks/EXP3.query.search.js");

routes.get("/home", authorization.authorization, data.home);
routes.get("/input", authorization.authorization, data.runQuery);
routes.post("/input", authorization.authorization, data.runQuery);

module.exports = routes;