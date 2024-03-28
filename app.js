const express = require("express");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = 8007;

const registration = require("./routes/registration");
const JSroutes = require("./routes/JSprojectRoutes");
const CSSroutes = require("./routes/CSSprojectRoutes");
const EXP1 = require("./routes/ExpressRoutes/EXP1.grid.route.js");
const EXP2 = require("./routes/ExpressRoutes/EXP2.attendence.route.js");
const EXP3 = require("./routes/ExpressRoutes/EXP3.query.search.route.js");
const EXP4 = require("./routes/ExpressRoutes/EXP4.multiple.search.route.js");
const EXP5 = require("./routes/ExpressRoutes/EXP5.delimeter.search.route.js");
const EXP6 = require("./routes/ExpressRoutes/EXP6.jsonplaceholder.route.js");
const EXP7 = require("./routes/ExpressRoutes/EXP7.job.application.route.js");

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", registration);
app.use("/", JSroutes);
app.use("/", CSSroutes);
app.use("/EXP1", EXP1);
app.use("/EXP2", EXP2);
app.use("/EXP3", EXP3);
app.use("/EXP4", EXP4);
app.use("/EXP5", EXP5);
app.use("/EXP6", EXP6);
app.use("/EXP7", EXP7);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
