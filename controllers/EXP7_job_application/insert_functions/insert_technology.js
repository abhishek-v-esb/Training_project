const con = require("../../../connection/connection");

function insert_technology(id, pagebody) {
  return new Promise((resolve) => {
    const name = ["php", "MySql", "oracle", "laravel"];

    name.forEach((element) => {
      if (Object.keys(pagebody).toString().includes(`${element}`)) {
        const tech_name = `${element}[0]`;
        const expertise = `${element}[1]`;

        let newTech = "pagebody." + tech_name;
        newTech = `${eval(newTech)}`.split(",");
        let newExpertise = "pagebody." + expertise;
        newExpertise = `${eval(newExpertise)}`.split(",");
        con.query(
          `insert into technology (  employee_id, tech_name, tech_expertise) values (?,?,?);`,
          [id, newTech, newExpertise],
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

module.exports = { insert_technology };
