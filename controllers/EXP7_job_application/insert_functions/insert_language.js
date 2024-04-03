const con = require("../../../connection/connection");

function insert_language(id, pagebody) {
  return new Promise((resolve) => {
    pagebody.language.forEach((element) => {
      if (element) {
        let temp = `${element}_efficiency`;
        let efficiency = "pagebody." + temp;
        efficiency = `${eval(efficiency)}`.split(",");

        let eff_str = "";
        efficiency.forEach((eff) => {
          eff_str = eff_str + eff + ",";
        });
        con.query(
          `insert into language (employee_id,language,fluency) values (?,?,?);`,
          [id, element, eff_str.slice(0, -1)],
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

module.exports = { insert_language };
