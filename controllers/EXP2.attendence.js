const con = require("../connection/connection");
exports.attendence = (req, res) => {
  const year = req.query.year ? req.query.year : 23;
  const month = req.query.month ? req.query.month : 12;
  const days = req.query.days ? req.query.days : 31;
  let count = Number(req.query.id) ? req.query.id : 1;
  const orderby = req.query.orderby ? req.query.orderby : "asc";
  const field = req.query.field ? req.query.field : "attendence.std_id";
  const records = 20;

  con.query(
    `SELECT  std_master.std_id,std_fname,std_lname,count(att_date) as count  FROM attendence inner join std_master on std_master.std_id=attendence.std_id where attendence=1 and att_date between "20${year}-${month}-01" and "20${year}-${month}-${days}"  group by attendence.std_id order by ${field} ${orderby} limit ${
      count * records - records
    },${records};  `,
    function (err, result) {
      if (err) {
        res.send("data not found");
      }
      con.query("select count(*) from std_master", function (err, total) {
        if (err) {
          res.send("data not found");
        }

        if (count == null || count < 1) {
          count = 1;
        }
        if (count > total / records) {
          count = total / records;
        }
        res.render("pages/ExpressTasks/EXP2_attendence/attendence", {
          result: result,
          count: count,
          year: year,
          month: month,
          total: Object.values(total[0])[0],
          days: days,
          records: records,
          orderby: orderby,
          field: field,
        });
      });
    }
  );
};

exports.details = (req, res) => {
  const id = req.query.id;
  con.query("select count(*) from std_master;", function (err, total) {
    if (id > Object.values(total[0])[0]) {
      res.send("data not found");
    } else {
      con.query(
        `select exam_master.sub_id,std_fname,std_lname,sub_name,sum(case when exam_master.type_id = 1 then exam_master.p_omarks else 0 end) as pre_pr,sum(case when exam_master.type_id = 1 then exam_master.t_omarks else 0 end) as pre_th,sum(case when exam_master.type_id = 2 then exam_master.p_omarks else 0 end) as ter_pr,sum(case when exam_master.type_id = 2 then exam_master.t_omarks else 0 end) as ter_th,sum(case when exam_master.type_id = 3 then exam_master.p_omarks else 0 end) as fin_pr,sum(case when exam_master.type_id = 3 then exam_master.t_omarks else 0 end) as fin_th from (exam_master inner join subject on exam_master.sub_id=subject.sub_id) inner join std_master on std_master.std_id=exam_master.std_id where exam_master.std_id =${id} group by sub_id;`,
        function (err, result) {
          const name = result[0].std_fname + " " + result[0].std_lname;

          if (err) throw err;
          res.render("pages/ExpressTasks/EXP2_attendence/details", {
            result: result,
            name: name,
            id: id,
          });
        }
      );
    }
  });
};

exports.results = (req, res) => {
  const records = 20;

  let count = Number(req.query.id) ? req.query.count : 1;
  const id = req.query.id ? req.query.id : 1;

  if (count == null || count < 1) {
    count = 1;
  }
  if (count > 10) {
    count = 10;
  }

  con.query(
    `select std_master.std_id,std_fname,std_lname,sum(case when exam_master.type_id = 1 then exam_master.p_omarks else 0 end) as pre_pr,sum(case when exam_master.type_id = 1 then exam_master.t_omarks else 0 end) as pre_th,sum(case when exam_master.type_id = 2 then exam_master.p_omarks else 0 end) as ter_pr,sum(case when exam_master.type_id = 2 then exam_master.t_omarks else 0 end) as ter_th,sum(case when exam_master.type_id = 3 then exam_master.p_omarks else 0 end) as fin_pr,sum(case when exam_master.type_id = 3 then exam_master.t_omarks else 0 end) as fin_th from std_master inner join exam_master on std_master.std_id=exam_master.std_id group by std_id  limit ${
      count * records - records
    },${records};`,
    function (err, result) {
      con.query("select count(*) from std_master", function (err, total) {
        if (err) throw err;
        if (count == null || count < 1) {
          count = 1;
        }
        if (count > total / records) {
          count = total / records;
        }
        const std_id = result[0].std_id;

        if (err) throw err;

        res.render("pages/ExpressTasks/EXP2_attendence/results", {
          result: result,
          count: count,
          std_id: std_id,
          id: id,
          total: Object.values(total[0])[0],
          records: records,
        });
      });
    }
  );
};
