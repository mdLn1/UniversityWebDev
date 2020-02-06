const { validationResult } = require("express-validator");
const writeFeedback = require("../utils/writeFeedback");

module.exports = function errorChecker(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json(writeFeedback(errors.array().map(el => el.msg)));
  }
  next();
};
