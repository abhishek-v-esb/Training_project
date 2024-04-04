const con = require("../../../connection/connection");
function insert_employee(pagebody) {
  return new Promise((resolve) => {
    let values = [];
    for (let i = 1; i < 14; i++) {
      values.push(Object.values(pagebody)[i]);
    }
    const sql =
      "insert into employee (first_name,last_name,emp_designation,address1,address2,email,phone,state,city,zip_code,dob,gender,relationship_status) values (?,?,?,?,?,?,?,?,?,?,?,?,?);";

    con.query(sql, values, function (err, result) {
      if (err) {
        throw err;
      }

      resolve(result.insertId);
    });
  });
}
module.exports = { insert_employee };
