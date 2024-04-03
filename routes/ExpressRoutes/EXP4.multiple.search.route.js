const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/EXP4.multiple.search.js");

routes.get("/input", authorization.authorization, data.runQuery);
routes.post("/input", authorization.authorization, data.runQuery);

module.exports = routes;
