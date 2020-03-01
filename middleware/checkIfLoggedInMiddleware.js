const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
  if (token) {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
  }
  } catch (err) {
    return next();
  }
  next();
};
