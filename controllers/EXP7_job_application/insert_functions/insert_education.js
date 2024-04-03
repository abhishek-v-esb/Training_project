const con = require("../../../connection/connection");

function insert_education(id, pagebody) {
  return new Promise((resolve) => {
    const edType = ["ssc", "hsc", "bachelor", "master"];
    pagebody.boardname.forEach((element, index) => {
      if (element) {
        con.query(
          `insert into education (employee_id ,education_type, board_name, passing_year, passing_percentage) values (?,?,?,?,?);`,
          [
            id,
            edType[index],
            pagebody.boardname[index],
            pagebody.passingyear[index],
            pagebody.passingpercentage[index],
          ]
        );
      }
    });
    resolve(id);
  });
}

module.exports = { insert_education };
