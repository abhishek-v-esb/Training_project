const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/EXP5.delimeter.search.js");

routes.get("/delimeter", authorization.authorization, data.runQuery);
routes.post("/delimeter", authorization.authorization, data.runQuery);

module.exports = routes;
