var mysql = require("mysql");

const dotenv = require("dotenv");

dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.existingData = (req, res) => {
  const id = req.query.id;

  let data = {};

  run();
  async function run() {
    data.employee = await employee();
    data.education = await education();
    data.work = await work_exp();
    data.language = await language();
    data.technology = await technology();
    data.reference = await reference_contact();
    data.preference = await preference();

    await res.send(data);
  }

  // employee(id);
  function employee() {
    return new Promise((resolve) => {
      con.query(
        `select *,DATE_FORMAT(dob,'%Y-%m-%d') as dob from employee where id=${id}`,
        function (err, result) {
          if (err) throw err;

          resolve(result[0]);
        }
      );
    });
  }
  //   education();
  function education() {
    return new Promise((resolve) => {
      con.query(
        `select * from education where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;

          const newResult = {};
          result.forEach((element) => {
            const key = element.education_type;
            newResult[`${key}`] = element;
          });

          resolve(newResult);
        }
      );
    });
  }
  //   work_exp();
  function work_exp() {
    return new Promise((resolve) => {
      con.query(
        `select *,DATE_FORMAT(work_from,'%Y-%m-%d') as fromdate,DATE_FORMAT(work_to,'%Y-%m-%d') as todate from work_exp where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;
          const newResult = {};
          result.forEach((element) => {
            const key = element.company_name;
            newResult[`${key}`] = element;
          });

          resolve(newResult);
        }
      );
    });
  }
  //   language();
  function language() {
    return new Promise((resolve) => {
      con.query(
        `select * from language where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;
          const newResult = {};
          for (let i = 0; i < result.length; i++) {
            const fluency = result[i].fluency.split(",");
            result[i].fluency = fluency;
          }

          result.forEach((element) => {
            const key = element.language;
            newResult[`${key}`] = element;
          });

          resolve(newResult);
        }
      );
    });
  }
  //   technology();
  function technology() {
    return new Promise((resolve) => {
      con.query(
        `select * from technology where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;
          const newResult = {};
          result.forEach((element) => {
            const key = element.tech_name;
            newResult[`${key}`] = element;
          });

          resolve(newResult);
        }
      );
    });
  }
  //   reference_contact();
  function reference_contact() {
    return new Promise((resolve) => {
      con.query(
        `select * from reference_contact where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;

          const newResult = {};

          for (let i = 1; i <= result.length; i++) {
            result.forEach((element) => {
              const key = `ref${i}`;
              newResult[`${key}`] = element;
            });
          }
          resolve(newResult);
        }
      );
    });
  }
  //   preference();
  function preference() {
    return new Promise((resolve) => {
      con.query(
        `select * from preference where employee_id=${id}`,
        function (err, result) {
          if (err) throw err;

          resolve(result[0]);
        }
      );
    });
  }
};

exports.updateData = (req, res) => {
  const pagebody = req.body;
  const id = pagebody.hiddenid;

  update();

  async function update() {
    try {
      await update_employee(id, pagebody);
      await update_education(id, pagebody);
      await update_work_exp(id, pagebody);
      await update_language(id, pagebody);
      await update_technology(id, pagebody);
      await update_ref_contact(id, pagebody);
      await update_preference(id, pagebody);

      await res.send("Form submitted");
    } catch (error) {
      res.send("Form Not Submitted");
    }
  }
  function update_employee(id, pagebody) {
    return new Promise((resolve) => {
      let values = [];
      for (let i = 1; i < 14; i++) {
        values.push(Object.values(pagebody)[i]);
      }
      con.query(
        `update employee set first_name=?,last_name=?,emp_designation=?,address1=?,address2=?,email=?,phone=?,city=?,state=?,zip_code=?,dob=?,gender=?,relationship_status=? where id=${id}`,
        values,
        function (err) {
          if (err) {
            throw err;
          }
        }
      );
      resolve(id);
    });
  }

  function update_education(id, pagebody) {
    return new Promise((resolve) => {
      con.query(
        `delete from education where employee_id=${id}`,
        function (err) {
          if (err) throw err;
          const len = pagebody.boardname.length;

          pagebody.boardname.forEach((element, index) => {
            if (element) {
              con.query(
                `insert into education (employee_id ,education_type, board_name, passing_year, passing_percentage) values (${id},'${element}','${pagebody.boardname[index]}','${pagebody.passingyear[index]}',${pagebody.passingpercentage[index]});`
              );
            }
          });
          resolve(id);
        }
      );
    });
  }
  function update_work_exp(id, pagebody) {
    return new Promise((resolve) => {
      con.query(
        `delete from  work_exp where employee_id=${id}`,
        function (err) {
          if (err) throw err;
          pagebody.company.forEach((element, index) => {
            con.query(
              `insert into work_exp (employee_id ,company_name, work_designation, work_from, work_to) values (${id},'${pagebody.company[index]}','${pagebody.companydesignation[index]}','${pagebody.companyfrom[index]}','${pagebody.companyto[index]}');`
            );
          });
          resolve(id);
        }
      );
    });
  }

  function update_language(id, pagebody) {
    return new Promise((resolve) => {
      con.query(`delete from language where employee_id=${id}`, function (err) {
        if (err) throw err;
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
    });
  }

  function update_technology(id, pagebody) {
    return new Promise((resolve) => {
      con.query(
        `delete from technology where employee_id=${id}`,
        function (err) {
          if (err) throw err;
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
        }
      );
    });
  }

  function update_ref_contact(id, pagebody) {
    return new Promise((resolve) => {
      con.query(
        `delete from reference_contact where employee_id=${id}`,
        function (err) {
          if (err) throw err;
          pagebody.ref.forEach((element, index) => {
            if (pagebody.refcontact[index] && pagebody.refrelation[index]) {
              con.query(
                `insert into reference_contact (employee_id ,ref_name, ref_contact, ref_relation) values (${id},'${pagebody.ref[index]}','${pagebody.refcontact[index]}','${pagebody.refrelation[index]}');`
              );
            }
          });
          resolve(id);
        }
      );
    });
  }

  function update_preference(id, pagebody) {
    return new Promise((resolve) => {
      con.query(
        `delete from preference where employee_id=${id}`,
        function (err) {
          if (err) throw err;
          con.query(
            `insert into preference(employee_id,location,curr_ctc,exp_ctc,department) values (${id},'${pagebody.prefLocation}','${pagebody.currCTC}','${pagebody.expCTC}','${pagebody.department}');`,
            function (err) {
              if (err) {
                res.send("pref");
              }
            }
          );
          resolve(id);
        }
      );
    });
  }
};
