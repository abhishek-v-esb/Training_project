const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/ExpressTasks/EXP4.multiple.search.js");

routes.get("/input", data.runQuery);
routes.post("/input", data.runQuery);

module.exports = routes;
