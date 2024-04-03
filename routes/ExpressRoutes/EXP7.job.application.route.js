const routes = require("express").Router();
const authorization = require("../../middleware/authorization.js");
const display = require("../../controllers/ExpressTasks/EXP7_job_application/display.js");
const insert = require("../../controllers/ExpressTasks/EXP7_job_application/insert.js");
const update = require("../../controllers/ExpressTasks/EXP7_job_application/update.js");
const con = require("../../connection/connection.js");

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

routes.get("/insert", authorization.authorization, (req, res) => {
  let id;
  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.get("/updateform", authorization.authorization, (req, res) => {
  let id = req.query.id;

  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.post("/insert", insert.insertData);

routes.get("/update", authorization.authorization, update.existingData);

routes.post("/update", update.updateData);

routes.get("/display", authorization.authorization, display.displayData);

module.exports = routes;
