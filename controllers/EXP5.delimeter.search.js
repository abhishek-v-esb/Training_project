const con = require("../connection/connection");

exports.runQuery = (req, res) => {
  let body = req.body.input + ".";

  body = body.split(" ").join("");

  const fname = [];
  const lname = [];
  const email = [];
  const city = [];
  const sem = [];
  let currentDel = 0;
  let nextDel = 0;

  let sql = "";
  if (req.body.input) {
    for (let i = 0; i <= body.length; i++) {
      if (
        body.charAt(i) == "_" ||
        body.charAt(i) == "$" ||
        body.charAt(i) == "{" ||
        body.charAt(i) == "}" ||
        body.charAt(i) == "." ||
        body.charAt(i) == ":"
      ) {
        currentDel = i;

        for (let j = i + 1; j <= body.length; j++) {
          if (
            body.charAt(j) == "_" ||
            body.charAt(j) == "$" ||
            body.charAt(j) == "{" ||
            body.charAt(j) == "}" ||
            body.charAt(j) == "." ||
            body.charAt(j) == ":"
          ) {
            nextDel = j;

            const del = body.charAt(currentDel);

            switch (del) {
              case "_":
                fname.push(body.slice(currentDel + 1, nextDel));
                break;
              case "$":
                lname.push(body.slice(currentDel + 1, nextDel));
                break;
              case "{":
                email.push(body.slice(currentDel + 1, nextDel));
                break;
              case "}":
                city.push(body.slice(currentDel + 1, nextDel));
                break;
              case ":":
                sem.push(body.slice(currentDel + 1, nextDel));

                break;
            }
            break;
          }
        }
      }
    }

    function stringForm(arr, field) {
      let tempStr = "";
      arr.forEach((element) => {
        if (element == undefined) {
          tempStr = tempStr + field + " like '%' or ";
        } else {
          tempStr = tempStr + field + " like '" + element + "%' or ";
        }
      });

      return tempStr.slice(0, -4);
    }

    const fname_str = stringForm(fname, "std_fname");
    const lname_str = stringForm(lname, "std_lname");
    const email_str = stringForm(email, "email");
    const city_str = stringForm(city, "city");
    const sem_str = stringForm(sem, "sem");

    let queryholder = [fname_str, lname_str, email_str, city_str, sem_str];
    let query = queryGen(queryholder);

    function queryGen(queryholder) {
      let random = "";
      queryholder.forEach((element) => {
        if (element == "") {
          random = random + "";
        } else {
          random = random + "(" + element + ") and";
        }
      });
      return random.slice(0, -4);
    }

    sql = `select std_fname as First_Name,std_lname as Last_Name,email as Email,city as City,sem as Semester from std_master where ${query};`;
  } else {
    sql =
      "select std_fname as First_Name,std_lname as Last_Name,email as Email,city as City,sem as Semester from std_master";
  }
  body = req.body.input;

  con.query(sql, function (err, result, fields) {
    if (err) {
      res.render("pages/ExpressTasks/EXP5_delimeter_search/table", {
        body: body,
      });
    } else {
      let cols = [];
      fields.forEach((element) => {
        cols.push(element.name);
      });
      res.render("pages/ExpressTasks/EXP5_delimeter_search/table", {
        cols: cols,
        result: result,
        body: body,
      });
    }
  });
};
