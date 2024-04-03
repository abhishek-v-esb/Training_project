const con = require("../connection/connection");

exports.runQuery = (req, res) => {
  let count = req.query.id ? req.query.id : 1;

  const body = req.body;

  let sql = "";
  let stdId = "";
  if (body.input) {
    sql = `select * from std_master where std_id in (${body.input})`;
  } else if (req.query.stdId) {
    stdId = req.query.stdId;
    sql = `select * from std_master where std_id in (${req.query.stdId})`;
  } else if (
    body.std_fname != undefined &&
    body.std_lname != undefined &&
    body.gender != undefined &&
    body.dob != undefined &&
    body.city != undefined &&
    body.country != undefined &&
    body.sem != undefined
  ) {
    sql = `select * from std_master where std_fname like '${body.std_fname}%' && std_lname like '${body.std_lname}%' && gender like '${body.gender}%' && dob like '${body.dob}%' && city like '${body.city}%' && country like '${body.country}%' && sem like '%${body.sem}'`;
  } else {
    sql = `select * from std_master`;
  }

  const records = 10;

  const limit = count * records - records;
  con.query(
    sql + ` limit ?,?;`,
    [limit, records],
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

          const cols = [];
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
              std_fname: body.std_fname,
              std_lname: body.std_lname,
              gender: body.gender,
              dob: body.dob,
              city: body.city,
              country: body.country,
              sem: body.sem,
            });
          } else {
            res.send("data not found");
          }
        });
      }
    }
  );
};
