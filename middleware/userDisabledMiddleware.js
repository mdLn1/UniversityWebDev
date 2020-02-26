const CustomError = require("../utils/CustomError");
const {isAccountDisabledQuery} = require("../db/queries/users");

module.exports = async (req,res, next) => {
    if(await isAccountDisabledQuery(req.user.id)) {
       return next(new CustomError("You cannot create new ideas/comments. Your account is disabled by an admin", 400));
    }
    next();
}