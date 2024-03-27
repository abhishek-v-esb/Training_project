var mysql = require("mysql");
var md5 = require("md5");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.loginUser = (req, res) => {
  const pagebody = req.body;
  // console.log(pagebody);
  con.query(
    `select email from users where email="${pagebody.loginEmail}"`,
    function (err, result) {
      if (err) throw err;
      if (!result.length) {
        res.send(false);
      } else {
        con.query(
          `select salt,password from users where email = "${pagebody.loginEmail}"`,
          function (err, result) {
            if (err) throw err;
            const requiredPass = md5(pagebody.loginPassword + result[0].salt);

            if (requiredPass == result[0].password) {
              const user = {
                email: pagebody.loginEmail,
              };
              const token = jwt.sign(user, process.env.SECRET_TOKEN, {
                expiresIn: "1800s",
              });

              res
                .cookie("access_token", token, {
                  maxAge: 1000 * 60 * 60 * 10, //10 hrs
                  httpOnly: true,
                })
                .status(200)
                .send("hello");
            } else {
              res.send(false);
            }
          }
        );
      }
    }
  );
};
