var mysql = require("mysql");

const dotenv = require("dotenv");
dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.displayData = (req, res) => {
  con.query(
    "select id,first_name,last_name,DATE_FORMAT(dob,'%d-%m-%Y') as dob  from employee",
    function (err, result) {
      if (err) throw err;

      res.render("pages/ExpressTasks/EXP7_job_application/display", {
        result: result,
      });
    }
  );
};
