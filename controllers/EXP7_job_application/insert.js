const employee = require("./insert_functions/insert_employee.js");
const education = require("./insert_functions/insert_education.js");
const work_exp = require("./insert_functions/insert_work_exp.js");
const language = require("./insert_functions/insert_language.js");
const technology = require("./insert_functions/insert_technology.js");
const reference = require("./insert_functions/insert_reference_contact.js");
const preference = require("./insert_functions/insert_preference.js");
exports.insertData = (req, res) => {
  const pagebody = req.body;

  runQueries();

  async function runQueries() {
    try {
      const id = await employee.insert_employee(pagebody);
      await education.insert_education(id, pagebody);
      await work_exp.insert_work_exp(id, pagebody);
      await language.insert_language(id, pagebody);
      await technology.insert_technology(id, pagebody);
      await reference.insert_ref_contact(id, pagebody);
      await preference.insert_preference(id, pagebody);
      res.send("form submitted");
    } catch (error) {
      res.send("Form Not Submitted");
    }
  }
};
