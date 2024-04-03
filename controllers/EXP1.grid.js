const con = require("../connection/connection");

exports.showData = (req, res) => {
  con.query("SELECT * FROM student_master", function (err, result) {
    if (err) {
      res.send("data not found");
    }
    res.render("pages/ExpressTasks/EXP1_grid/data", {
      result: result,
    });
  });
};

exports.sortedData = (req, res) => {
  const records = 100;
  let count = Number(req.query.id) ? req.query.id : 1;
  const field = req.query.field;
  const limit = count * records - records;
  con.query(
    `SELECT * FROM student_master order by ${field} limit ?,?;`,
    [limit, records],
    function (err, result) {
      con.query("select count(*) from student_master", function (err, total) {
        if (count == null || count < 1) {
          count = 1;
        }
        if (count > Object.values(total[0])[0] / records) {
          count = Object.values(total[0])[0] / records;
        }

        res.render("pages/ExpressTasks/EXP1_grid/navigation_data", {
          result: result,
          count: count,
          field: field,
          total: Object.values(total[0])[0],
          records: records,
        });
      });
    }
  );
};
