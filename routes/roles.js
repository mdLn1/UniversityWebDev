const express = require('express')
const router = express.Router()
const { createNewRole, getAllRoles } = require('../db/queries/roles')


// @desc Adds new role to roles table
// @route POST /api/roles
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

// @desc Returns all roles
// @route GET /api/roles/
// @access Public
router.get('/', async (req, res, next) => {
    try {
        const roles = await getAllRoles();
        res.status(200).json(roles);
        return next();
    } catch (err) {
        res.status(404).json( {ERROR: err} );
        return next(err);
    }
})

module.exports = router