var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});

exports.forgotPass = (req, res) => {
  const email = req.body.forgot_email;

  con.query(
    `select email,id from users where email="${email}"`,

    function (err, result) {
      if (err) throw err;
      if (result[0] == undefined) {
        res.send(false);
      } else {
        const link = makeid(20);
        con.query(
          `update users set activation_link = "${link}" where id = "${result[0].id}"`,
          function (err) {
            if (err) throw err;
            const data = {
              link: link,
              id: result[0].id,
            };
            res.send(data);
          }
        );
      }
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
