const con = require("../../connection/connection");

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
