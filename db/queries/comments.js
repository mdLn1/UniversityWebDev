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
function hideShowAllUserCommentsQuery(userId, hidden) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Comments set hidden = ? where user_id=?",
        timeout: 40000, // 40s
        values: [hidden, userId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}
// Returns comments of a specific idea by the latest comments first.
function getAllCommentsForIdeaQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT Comments.ID, Comments.comment, Comments.commentTime, Comments.isAnonymous, Users.email, Users.name, Users.hideActivities
        FROM Comments left join Users ON Comments.user_id = Users.ID WHERE idea_id = ? and hidden=0
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

function deleteReportedCommentByCommentIDQuery(commentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `delete from ReportedComments where comment_id = ?`,
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

function getReportedProblemsByCommentIdQuery(commentId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT comment.ID, comment.problem, comment.acknowledged, ReportingUser.ID, ReportingUser.name, ReportingUser.disabled
        FROM ReportedComments as comment
        LEFT JOIN Users ReportingUser on comment.user_id = ReportingUser.ID
        where comment.comment_id = ?
        ORDER BY comment.ID DESC`,
        timeout: 40000, // 40s
        values: [commentId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function getAllReportedCommentsQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT DISTINCT c.comment_id,
          comment.comment,
          author.name,
          author.email,
          author.ID,
          comment.idea_id,
          c.acknowledged,
          comment.commentTime,
          (SELECT COUNT(*) From Comments where c.comment_id = Comments.ID) as reports
  FROM ReportedComments as c
  LEFT JOIN Comments comment on c.comment_id = comment.ID
  LEFT JOIN Users author on comment.user_id = author.ID
  ORDER BY c.ID DESC`,
        timeout: 40000, // 40s
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
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
  reportCommentQuery,
  getAllReportedCommentsQuery,
  getReportedProblemsByCommentIdQuery,
  deleteReportedCommentByCommentIDQuery,
  hideShowAllUserCommentsQuery
};
