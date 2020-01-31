const express = require('express')
const router = express.Router()
const { getIdea, getIdeas } = require("../db/queries/ideas")

// @desc Returns all ideas
// @route GET /api/ideas
// @access Private 
router.get('/', async (req, res, next) => {
    try{
        const ideas = await getIdeas()
        res.status(200).send(ideas) 
        return next()
    } catch (err) {
        res.status(500).json( {ERROR : err} )
        return next(err)
    }
})

// @desc Returns a specific idea based on passed ID
// @route GET /api/ideas/:id
// @access Private
router.get('/:id', async (req, res, next) => {
    try {
        const idea = await getIdea(req.params.id)
        if ( idea[0] ){
            res.status(200).send(idea[0])
            return next()
        }
    } catch (err) {
        res.status(404).json( { ERROR: err } )
        return next(err)
    }
})


module.exports = router;