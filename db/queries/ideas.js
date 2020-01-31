const pool = require('../dbconn');

// @desc Returns all ideas
function getIdeas(){
    return new Promise( (resolve, reject) => {
        pool.query({
            sql: "SELECT * FROM Ideas",
            timeout: 40000
        }, (err, result) => {
            if (err) return reject(err)
            ideas = []
            result.forEach(element => {
                ideas.push(element)
            })
            return resolve(ideas)
        }
        )
    } )
}

// @desc Return idea based on specific ID
function getIdea(id) {
    return new Promise( (resolve, reject) => {
        pool.query({
            sql: "SELECT * FROM Ideas WHERE ID = ?",
            timeout: 40000,
            values: [id]
        }, (err, result) => {
            if (err) { return reject(err) }

            return resolve(result)
        }
        )
    })
}

module.exports = {
    getIdeas,
    getIdea
}