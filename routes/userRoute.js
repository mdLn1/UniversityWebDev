const express = require('express');
const router = express.Router();
const user = require('../testObjects/user');
const authMiddleware = require('../middleware/authMiddleware');
const {getAllUsers} = require('../db/queries/users')
// express-validator; data validation
const {
    check,
    validationResult
} = require('express-validator');

//@route POST api/user/
//@desc Receive user details
//@access Private
router.post('/', [
    authMiddleware,
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

// @desc Returns all users for the QA manager 
// @route GET /api/user/all - Route could be modified to suit REST principles
// @access Private
router.get('/all', async (req, res, next) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
        return next()
    } catch (err) {
        // :todo Replace error being logged to console with global error handler
        res.status(500).json( { error : err} )
        return next()
    }
})

// necessary line for every route
module.exports = router;