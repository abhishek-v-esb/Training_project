const con = require("../../connection/connection");
const education = require("./insert_functions/insert_education");
const work_exp = require("./insert_functions/insert_work_exp.js");
const language = require("./insert_functions/insert_language.js");
const technology = require("./insert_functions/insert_technology.js");
const reference = require("./insert_functions/insert_reference_contact.js");
const preference = require("./insert_functions/insert_preference.js");

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
          education.insert_education(id, pagebody);
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
          work_exp.insert_work_exp(id, pagebody);
          resolve(id);
        }
      );
    });
  }

  function update_language(id, pagebody) {
    return new Promise((resolve) => {
      con.query(`delete from language where employee_id=${id}`, function (err) {
        if (err) throw err;
        language.insert_language(id, pagebody);
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
          technology.insert_technology(id, pagebody);
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
          reference.insert_ref_contact(id, pagebody);
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
          preference.insert_preference(id, pagebody);
          resolve(id);
        }
      );
    });
  }
};
