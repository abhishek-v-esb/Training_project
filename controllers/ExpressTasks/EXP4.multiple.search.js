var mysql = require("mysql");

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.runQuery = (req, res) => {
  let count = req.query.id ? req.query.id : 1;

  const std_fname = req.body.std_fname;
  const std_lname = req.body.std_lname;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const city = req.body.city;
  const country = req.body.country;
  const sem = req.body.sem;
  // let andOr = "&&";
  // if (req.body.andOr == "and") {
  //   andOr = andOr + "&&";
  // } else if (req.body.andOr == "or") {
  //   andOr = andOr + "||";
  // }

  let sql = "";
  let stdId = "";
  if (req.body.input) {
    sql = `select * from std_master where std_id in (${req.body.input})`;
  } else if (req.query.stdId) {
    stdId = req.query.stdId;
    sql = `select * from std_master where std_id in (${req.query.stdId})`;
  } else if (
    std_fname != undefined &&
    std_lname != undefined &&
    gender != undefined &&
    dob != undefined &&
    city != undefined &&
    country != undefined &&
    sem != undefined
  ) {
    sql = `select * from std_master where std_fname like '${std_fname}%' && std_lname like '${std_lname}%' && gender like '${gender}%' && dob like '${dob}%' && city like '${city}%' && country like '${country}%' && sem like '%${sem}'`;
  } else {
    sql = `select * from std_master`;
  }

  const records = 10;
  const newsql = sql.replace("*", "count(*)");

  con.query(
    sql + ` limit ${count * records - records},${records};`,
    function (err, result, fields) {
      if (err) {
        res.send("data not found");
      } else {
        con.query(`select count(*) from std_master;`, function (err, total) {
          const totalData = Object.values(total[0])[0];

          if (count == null || count < 1) {
            count = 1;
          }
          if (count >= total / records) {
            count = total / records;
          }

          let cols = [];
          fields.forEach((element) => {
            cols.push(element.name);
          });

          if (stdId <= totalData) {
            res.render("pages/ExpressTasks/EXP4_multiple_search/table", {
              count: count,
              cols: cols,
              result: result,
              total: totalData,
              records: records,
              stdId: stdId,

              std_fname: std_fname,
              std_lname: std_lname,
              gender: gender,
              dob: dob,
              city: city,
              country: country,
              sem: sem,
            });
          } else {
            res.send("data not found");
          }
        });
      }
    }
  );
  function render(sql) {}
};
