const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");
var mysql = require("mysql");
const display = require("../../controllers/ExpressTasks/EXP7_job_application/display.js");
const insert = require("../../controllers/ExpressTasks/EXP7_job_application/insert.js");
const update = require("../../controllers/ExpressTasks/EXP7_job_application/update.js");

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

routes.get("/states", (req, res) => {
  con.query("select * from states", (err, result) => {
    res.send(result);
  });
});

routes.get("/cities", (req, res) => {
  const stateId = req.query.state;
  con.query(
    `select * from cities where state_id=${stateId}`,
    function (err, result) {
      res.send(result);
    }
  );
});

routes.get("/insert", (req, res) => {
  let id;
  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.get("/updateform", (req, res) => {
  let id = req.query.id;
  // console.log(id);
  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.post("/insert", insert.insertData);

routes.get("/update", update.existingData);

routes.post("/update", update.updateData);

routes.get("/display", display.displayData);

module.exports = routes;
