const con = require("../../connection/connection");

exports.insertData = (req, res) => {
  const pagebody = req.body;

  runQueries();

  async function runQueries() {
    try {
      const id = await employee(pagebody);
      await education(id);
      await work_exp(id);
      await language(id);
      await technology(id);
      await ref_contact(id);
      await preference(id);
      res.send("Form Submitted");
    } catch (error) {
      res.send("Form Not Submitted");
    }
  }

  function employee(pagebody) {
    return new Promise((resolve) => {
      let values = [];
      for (let i = 1; i < 14; i++) {
        values.push(Object.values(pagebody)[i]);
      }
      const sql =
        "insert into employee (first_name,last_name,emp_designation,address1,address2,email,phone,city,state,zip_code,dob,gender,relationship_status) values (?,?,?,?,?,?,?,?,?,?,?,?,?);";

      con.query(sql, values, function (err, result) {
        if (err) {
          throw err;
        }

        resolve(result.insertId);
      });
    });
  }

  function education(id) {
    return new Promise((resolve) => {
      pagebody.boardname.forEach((element, index) => {
        if (element) {
          con.query(
            `insert into education (employee_id ,education_type, board_name, passing_year, passing_percentage) values (${id},'${element}','${pagebody.boardname[index]}','${pagebody.passingyear[index]}',${pagebody.passingpercentage[index]});`
          );
        }
      });
      resolve(id);
    });
  }

  function work_exp(id) {
    return new Promise((resolve) => {
      pagebody.company.forEach((element, index) => {
        con.query(
          `insert into work_exp (employee_id ,company_name, work_designation, work_from, work_to) values (${id},'${pagebody.company[index]}','${pagebody.companydesignation[index]}','${pagebody.companyfrom[index]}','${pagebody.companyto[index]}');`
        );
      });
      resolve(id);
    });
  }

  function language(id) {
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
            `insert into language (employee_id,language,fluency) values (${id},'${element}','${eff_str.slice(
              0,
              -1
            )}');`,
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

  function technology(id) {
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
            `insert into technology (  employee_id, tech_name, tech_expertise) values (${id},'${newTech}','${newExpertise}');`,
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

  function ref_contact(id) {
    return new Promise((resolve) => {
      pagebody.ref.forEach((element, index) => {
        if (pagebody.refcontact[index] && pagebody.refrelation[index]) {
          con.query(
            `insert into reference_contact (employee_id ,ref_name, ref_contact, ref_relation) values (${id},'${pagebody.ref[index]}','${pagebody.refcontact[index]}','${pagebody.refrelation[index]}');`
          );
        }
      });
      resolve(id);
    });
  }

  function preference(id) {
    return new Promise((resolve) => {
      con.query(
        `insert into preference(employee_id,location,curr_ctc,exp_ctc,department) values (${id},'${pagebody.prefLocation}','${pagebody.currCTC}','${pagebody.expCTC}','${pagebody.department}');`,
        function (err) {
          if (err) {
            res.send("Form Not Submitted");
          }
        }
      );
      resolve(id);
    });
  }
};
