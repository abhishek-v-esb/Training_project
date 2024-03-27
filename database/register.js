var mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

var con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORDS,
  database: process.env.DATABASE,
});
exports.registerUser = (req, res) => {
  const pagebody = req.body;
  // const saltChar =
  //   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  // const linkChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  start();
  async function start() {
    await checkIfExist();
  }

  function checkIfExist() {
    return new Promise((resolve) => {
      con.query(
        `select email from users where email = "${pagebody.email}"`,
        function (err, result) {
          if (result[0] == undefined) {
            insert();
          } else {
            res.send(true);
          }
        }
      );
      resolve(true);
    });
  }

  function insert() {
    const activeCode = makeid(30);

    const values = [
      pagebody.firstname,
      pagebody.lastname,
      pagebody.gender,
      pagebody.email,
      pagebody.dob,
      pagebody.mobile,
      activeCode,
      "0",
    ];
    con.query(
      "insert into users (  first_name,last_name,gender,email,dob,mobile,activation_link,link_status) values (?,?,?,?,?,?,?,?)",
      values,
      function (err, result) {
        if (err) throw err;
        const data = {
          id: result.insertId,
          link: activeCode,
        };
        res.send(data);
      }
    );
  }

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
};
