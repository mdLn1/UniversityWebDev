const express = require('express')
const router = express.Router()
const { createNewRole } = require('../db/queries/roles')


// @desc Adds new role to roles table
// @route POST /
// @access Private
router.post('/', async (req, res, next) => {
    try {
        // :todo Add authorization to ensure only priviliged users can add a new role
        const { role, description } = await req.body
        await createNewRole(role, description)

        res.status(201).json( {Success: "New role added", data: req.body} )
        return next()
    } catch (err) {
        res.status(500).json( {error : err} )  //REPLACE with global error handling
        return next()
    }
})

module.exports = router