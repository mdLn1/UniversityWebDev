const express = require('express');
const router = express.Router();
const user = require('../testObjects/user');
// express-validator; data validation
const {
    check,
    validationResult
} = require('express-validator');
const writeFeedback = require("../utils/writeFeedback");


//@route POST api/user/
//@desc Receive user details
//@access Private
router.post('/', [
    check("firstName", "firstName must have a value").not().isEmpty().trim().escape(),
    check("lastName", "lastName must have a value").not().isEmpty().trim().escape(),
    check("age", "age must have a value").not().isEmpty()
], async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                feedback: errors.array().map(obj => {
                    return {
                        msg: obj.msg,
                        type: 'danger'
                    };
                })
            });
        }
        const {
            firstName,
            lastName,
            age
        } = req.body;
        res.status(201).json({
            firstName,
            lastName,
            age
        });
    } catch (err) {
        next(err);
    }
})

//@route GET api/user/
//@desc Return user details
//@access Private
router.get('/', async (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            age
        } = user;
        res.status(200).json({
            firstName,
            lastName,
            age
        });
    } catch (err) {
        next(err);
    }
})

// necessary line for every route
module.exports = router;