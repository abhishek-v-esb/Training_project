const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

exports.authorization = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.redirect("/login");
  } else {
    try {
      const data = jwt.verify(token, process.env.SECRET_TOKEN);
      req.email = data.email;

      return next();
    } catch {
      return res.sendStatus(403);
    }
  }
};
