const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");

const data = require("../../controllers/ExpressTasks/EXP2.attendence.js");

routes.get("/attendence", authorization.authorization, data.attendence);
routes.get("/details", authorization.authorization, data.details);
routes.get("/results", authorization.authorization, data.results);

module.exports = routes;
