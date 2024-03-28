const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/ExpressTasks/EXP5.delimeter.search.js");

routes.get("/delimeter", data.runQuery);
routes.post("/delimeter", data.runQuery);

module.exports = routes;
