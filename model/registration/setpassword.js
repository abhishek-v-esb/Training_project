var mysql = require("mysql");
var md5 = require("md5");
const dotenv = require("dotenv");

dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.checkStatus = (req, res) => {
  con.query(
    `select * from users where activation_link = "${req.query.activeCode}" and id = "${req.query.id}"`,
    function (err, result) {
      if (err) throw err;
      // console.log(result);
      const d1 = new Date(result[0].update_time);
      const d2 = new Date();

      const timeDiff = d2 - d1;

      if (timeDiff < 10000) {
        res.render("pages/registration/password", {
          id: req.query.id,
        });
      } else {
        resetLink();
      }
    }
  );
  function resetLink() {
    const code = makeid(20);
    con.query(
      `update users set activation_link = "${code}" where id="${req.query.id}"`,
      function (err) {
        if (err) throw err;
        const link = ` http://localhost:8016/password?activeCode=${code}&id=${req.query.id}`;
        res.render("pages/registration/regenerateLink", {
          link: link,
        });
      }
    );
  }
};

exports.userPassword = (req, res) => {
  const pagebody = req.body;

  const salt = makeid(4);
  const password = md5(pagebody.password + salt);
  const values = ["1", salt, password, pagebody.hiddenid];
  // console.log(values);

  con.query(
    "update users set link_status = ?,salt=?,password=? where id = ?",
    values,
    function (err) {
      if (err) throw err;
      res.send(true);
    }
  );
};
function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
