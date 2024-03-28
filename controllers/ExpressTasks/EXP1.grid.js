var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.showData = (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM student_master", function (err, result) {
      if (err) throw err;

      res.render("pages/ExpressTasks/EXP1_grid/data", {
        result: result,
      });
    });
  });
};

exports.sortedData = (req, res) => {
  const records = 500;
  let count = Number(req.query.id);
  let field = req.query.field;

  if (count == null || count < 1) {
    count = 1;
  }
  if (count == 1) {
    con.query(
      "SELECT * FROM student_master order by " +
        field +
        " limit " +
        500 +
        " offset " +
        0,
      function (err, result) {
        if (err) throw err;

        res.render("pages/ExpressTasks/EXP1_grid/navigation_data", {
          result: result,
          count: count,
          field: field,
        });
      }
    );
  }
  if (count > 100) {
    count = 100;
  }

  con.query(
    "SELECT * FROM student_master order by " +
      field +
      " limit " +
      (count * records - 500) +
      "," +
      records +
      ";",
    function (err, result) {
      if (err) throw err;

      res.render("pages/ExpressTasks/EXP1_grid/navigation_data", {
        result: result,
        count: count,
        field: field,
      });
    }
  );
};
