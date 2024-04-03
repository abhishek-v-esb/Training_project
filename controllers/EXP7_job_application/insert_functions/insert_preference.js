const con = require("../../../connection/connection");

function insert_preference(id, pagebody) {
  return new Promise((resolve) => {
    con.query(
      `insert into preference(employee_id,location,curr_ctc,exp_ctc,department) values (?,?,?,?,?);`,
      [
        id,
        pagebody.prefLocation,
        pagebody.currCTC,
        pagebody.expCTC,
        pagebody.department,
      ],
      function (err) {
        if (err) {
          res.send("Form Not Submitted");
        }
      }
    );
    resolve(id);
  });
}

module.exports = { insert_preference };
