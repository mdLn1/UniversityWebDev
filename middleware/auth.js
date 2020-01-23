const jwt = require("jsonwebtoken");
const config = require("config");


module.export = async (req,res,next) => {
    try {
        
        next();
    } catch (err) {
        next(err);
    }
}