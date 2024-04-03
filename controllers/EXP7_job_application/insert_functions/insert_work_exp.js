const con = require("../../../connection/connection");

function insert_work_exp(id, pagebody) {
  return new Promise((resolve) => {
    pagebody.company.forEach((element, index) => {
      con.query(
        `insert into work_exp (employee_id ,company_name, work_designation, work_from, work_to) values (?,?,?,?,?);`,
        [
          id,
          pagebody.company[index],
          pagebody.companydesignation[index],
          pagebody.companyfrom[index],
          pagebody.companyto[index],
        ]
      );
    });
    resolve(id);
  });
}

module.exports = { insert_work_exp };
