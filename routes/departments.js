const express = require('express')
const router = express.Router()
const { getAllDepartments } = require('../db/queries/departments')


// @desc Returns all the departments 
// @access Public
router.get('/', async (req, res, next) => {
    try {
        const departments = await getAllDepartments()
        res.status(200).json(departments)
        return next()
    } catch (err) {
        return next(err);
    }
})


module.exports = router;