const con = require("../../../connection/connection");

function insert_ref_contact(id, pagebody) {
  return new Promise((resolve) => {
    pagebody.ref.forEach((element, index) => {
      if (pagebody.refcontact[index] && pagebody.refrelation[index]) {
        con.query(
          `insert into reference_contact (employee_id ,ref_name, ref_contact, ref_relation) values (?,?,?,?);`,
          [
            id,
            pagebody.ref[index],
            pagebody.refcontact[index],
            pagebody.refrelation[index],
          ],
          function (err) {
            if (err) {
              res.send("Form Not Submitted");
            }
          }
        );
      }
    });
    resolve(id);
  });
}

module.exports = { insert_ref_contact };
