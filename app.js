const express = require("express");
const routes = require("./routes");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", routes);

app.listen(port, () => {
  console.log(`server listening at ${port}`);
});
