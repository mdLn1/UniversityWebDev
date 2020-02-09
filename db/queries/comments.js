const pool = require("../dbconn");

// Use this function to add a comment to and idea
function addCommentQuery(comment, isAnonymous, user_id, idea_id) {
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Comments (comment, isAnonymous, commentTime, user_id, idea_id) values (?, ?, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [comment, isAnonymous, date, user_id, idea_id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Returns comments of a specific idea by the latest comments first.
function getCommentsByIdQuery(ideaID) {
  return new Promise( (resolve, reject) => {
    pool.query(
      {
        sql: `SELECT comment, commentTime, isAnonymous,
        (SELECT name FROM Users WHERE ID=user_id) AS username
        FROM Comments WHERE idea_id = ? 
        ORDER BY commentTime`,
        timeout: 40000,
        values: [ideaID]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  })
}

module.exports = {
  addCommentQuery,
  getCommentsByIdQuery
};
