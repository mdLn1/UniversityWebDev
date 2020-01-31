const jwt = require("jsonwebtoken");
const config = require("config");
const writeFeedback = require("../utils/writeFeedback");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(400)
        .json(writeFeedback("No token, authorization denied"));
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    next(err);
  }
};
