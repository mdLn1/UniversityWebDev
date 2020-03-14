const pool = require("../dbconn");

// Use this function to add a comment to and idea
function createCommentQuery(comment, isAnonymous, userId, ideaId) {
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
        values: [comment, isAnonymous, date, userId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve({ insertId: result.insertId, commentTime: date });
      }
    )
  );
}

// Returns comments of a specific idea by the latest comments first.
function getAllCommentsForIdeaQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT Comments.ID, Comments.comment, Comments.commentTime, Comments.isAnonymous, Users.email, Users.name, Users.hideActivities
        FROM Comments left join Users ON Comments.user_id = Users.ID WHERE idea_id = ?
        ORDER BY commentTime DESC`,
        timeout: 40000,
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function updateCommentForIdeaQuery(commentId, content) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `update Comments set comment = ? where commentId = ? and user_id = ?`,
        timeout: 40000,
        values: [content, commentId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

function deleteCommentQuery(commentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `delete from Comments where id = ?`,
        timeout: 40000,
        values: [commentId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

function getCommentAuthorQuery(commentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `select user_id from Comments where id = ?`,
        timeout: 40000,
        values: [commentId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0].user_id);
      }
    );
  });
}

function reportCommentQuery(commentId, userReportingId, problem) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `insert into ReportedComments (problem, comment_id, user_id, acknowledged) values (?, ?, ?, ?)`,
        timeout: 40000,
        values: [problem, commentId, userReportingId, 0]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

module.exports = {
  createCommentQuery,
  getAllCommentsForIdeaQuery,
  deleteCommentQuery,
  updateCommentForIdeaQuery,
  getCommentAuthorQuery,
  reportCommentQuery
};
