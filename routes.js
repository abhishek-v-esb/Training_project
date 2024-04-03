const routes = require("express").Router();
const authentication = require("./middleware/authentication.js");

const register = require("./controllers/registration/register");
const setpassword = require("./controllers/registration/setpassword");
const login = require("./controllers/registration/login");
const forgotPass = require("./controllers/registration/forgot");
const display = require("./controllers/EXP7_job_application/display.js");
const insert = require("./controllers/EXP7_job_application/insert.js");
const fill = require("./controllers/EXP7_job_application/fill.js");
const update = require("./controllers/EXP7_job_application/update.js");
const con = require("./connection/connection.js");

//----------------------------------------------  register  -------------------------------------------------//

routes.get("/register", (req, res) => {
  res.render("pages/registration/index");
});
routes.post("/register", register.registerUser);

routes.get("/password", setpassword.checkStatus);
routes.post("/password", setpassword.userPassword);

routes.get("/login", (req, res) => {
  res.render("pages/registration/login");
});
routes.post("/login", login.loginUser);

routes.get("/forgot", (req, res) => {
  res.render("pages/registration/forgotPassword");
});
routes.post("/forgot", forgotPass.forgotPass);

routes.get("/projects", authentication.authentication, (req, res) => {
  res.render("pages/registration/projects");
});

routes.get("/logout", authentication.authentication, (req, res) => {
  res.clearCookie("access_token").status(200).redirect("/login");
});

//----------------------------------------------  CSS  -------------------------------------------------//

routes.get("/ehya", authentication.authentication, (req, res) => {
  res.render("pages/CSStasks/CSS1_ehya.ejs");
});

routes.get("/AwanHoster", authentication.authentication, (req, res) => {
  res.render("pages/CSStasks/CSS2_Awan_Hoster.ejs");
});
routes.get("/HireX", authentication.authentication, (req, res) => {
  res.render("pages/CSStasks/CSS3_HireX.ejs");
});

//----------------------------------------------  JS  -------------------------------------------------//

routes.get("/dynamicGrid", authentication.authentication, (req, res) => {
  res.render("pages/JStasks/JS1_dynamic_grid");
});
routes.get("/functionGrid", authentication.authentication, (req, res) => {
  res.render("pages/JStasks/JS2_functions_grid");
});
routes.get("/kukuCube", authentication.authentication, (req, res) => {
  res.render("pages/JStasks/JS3_kuku_cube");
});
routes.get("/ticTacToe", authentication.authentication, (req, res) => {
  res.render("pages/JStasks/JS4_tic_tac_toe");
});

//----------------------------------------------  EXPRESS  -------------------------------------------------//

//----------------------------------------------  EXP1  -------------------------------------------------//

const dataEXP1 = require("./controllers/EXP1.grid.js");

routes.get("/EXP1/data", authentication.authentication, dataEXP1.showData);
routes.get("/EXP1/sorted", authentication.authentication, dataEXP1.sortedData);

//----------------------------------------------  EXP2  -------------------------------------------------//

const dataEXP2 = require("./controllers/EXP2.attendence.js");

routes.get(
  "/EXP2/attendence",
  authentication.authentication,
  dataEXP2.attendence
);
routes.get("/EXP2/details", authentication.authentication, dataEXP2.details);
routes.get("/EXP2/results", authentication.authentication, dataEXP2.results);

//----------------------------------------------  EXP3  -------------------------------------------------//

const dataEXP3 = require("./controllers/EXP3.query.search.js");

routes.get("/EXP3/home", authentication.authentication, dataEXP3.home);
routes.get("/EXP3/input", authentication.authentication, dataEXP3.runQuery);
routes.post("/EXP3/input", authentication.authentication, dataEXP3.runQuery);

//----------------------------------------------  EXP4  -------------------------------------------------//

const dataEXP4 = require("./controllers/EXP4.multiple.search.js");

routes.get("/EXP4/input", authentication.authentication, dataEXP4.runQuery);
routes.post("/EXP4/input", authentication.authentication, dataEXP4.runQuery);

//----------------------------------------------  EXP5  -------------------------------------------------//

const dataEXP5 = require("./controllers/EXP5.delimeter.search.js");

routes.get("/EXP5/delimeter", authentication.authentication, dataEXP5.runQuery);
routes.post(
  "/EXP5/delimeter",
  authentication.authentication,
  dataEXP5.runQuery
);

//----------------------------------------------  EXP6  -------------------------------------------------//

routes.get("/EXP6/post", authentication.authentication, (req, res) => {
  res.render("pages/ExpressTasks/EXP6_jsonplaceholder/index");
});
routes.get(
  "/EXP6/postdetails",
  authentication.authentication,
  function (req, res) {
    res.render("pages/ExpressTasks/EXP6_jsonplaceholder/details");
  }
);

//----------------------------------------------  EXP7  -------------------------------------------------//

routes.get("/EXP7/states", (req, res) => {
  con.query("select * from states", (err, result) => {
    res.send(result);
  });
});

routes.get("/EXP7/cities", (req, res) => {
  const stateId = req.query.state;
  con.query(
    `select * from cities where state_id=${stateId}`,
    function (err, result) {
      res.send(result);
    }
  );
});

routes.get("/EXP7/insert", authentication.authentication, (req, res) => {
  let id;
  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.get("/EXP7/updateform", authentication.authentication, (req, res) => {
  let id = req.query.id;

  res.render("pages/ExpressTasks/EXP7_job_application/index", {
    id: id,
  });
});

routes.post("/EXP7/insert", insert.insertData);

routes.get("/EXP7/update", authentication.authentication, fill.existingData);

routes.post("/EXP7/update", update.updateData);

routes.get("/EXP7/display", authentication.authentication, display.displayData);

//----------------------------------------------  EXP8  -------------------------------------------------//

routes.get("/EXP8/", authentication.authentication, (req, res) => {
  res.render("pages/ExpressTasks/EXP8_timezone/index");
});

module.exports = routes;
