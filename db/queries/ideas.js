const pool = require("../dbconn");

// add new Idea
function createIdeaQuery(
  title,
  description,
  categoryId,
  userId,
  isAnonymous = 0
) {
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Ideas (title, description, isAnonymous, views, category_id, user_id, posted_time) values (?, ?, ?, ?, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [title, description, isAnonymous, 0, categoryId, userId, date]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

// Returns All ideas with the latest posts being returned first.
function getAllIdeasQuery(pageNo, itemsCount, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous,
        (SELECT name FROM Users WHERE ID=i.user_id) AS author,
        (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS commentsCount,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS positiveVotes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS negativeVotes,
        (SELECT vote FROM Ratings WHERE user_id=? and i.ID=idea_id) as voted,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS uploadsCount
        FROM Ideas AS i where hidden=0
        ORDER BY i.posted_time DESC LIMIT ? OFFSET ?`,
        timeout: 40000, // 40s
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}
function getUserIdeasCountQuery(userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select COUNT(ID) FROM Ideas where user_id=?",
        timeout: 40000, // 40s
        values: [userId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(ID)"]);
      }
    );
  });
}
// Returns All ideas created by a specific user
function getAllIdeasUserQuery(pageNo, itemsCount, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous,
        (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS commentsCount,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS positiveVotes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS negativeVotes,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS uploadsCount
        FROM Ideas AS i where hidden=0 and i.user_id=?
        ORDER BY i.posted_time DESC LIMIT ? OFFSET 0`,
        timeout: 40000, // 40s
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}
function getAllIdeasForCSVExportQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID as IdeaIdentifier, i.description as Description, i.views as Views, i.posted_time as PostedTime,
        i.Title as Title, i.hidden as Hidden, U.name as Author,
         (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS NumberOfComments,
         (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS NumberOfLikes,
         (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS NumberOfDislikes,
         (SELECT tag FROM Categories WHERE ID = i.category_id) AS Category,
         (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS NumberOfUploads
         FROM Ideas AS i LEFT JOIN Users U on i.user_id = U.ID`,
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

// increase the number of views
function increaseIdeaViewsQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Ideas set views = views + 1 where ID = ?",
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        resolve();
      }
    );
  });
}

// update just description for now
function updateIdeaQuery(title, description, ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Ideas set title =?, description = ? where ID = ?",
        timeout: 40000, // 40s
        values: [title, description, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

function reportIdeaQuery(ideaId, userReportingId, reason) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `insert into ReportedIdeas (problem, idea_id, user_id) values (?, ?, ?);`,
        timeout: 40000, // 40s
        values: [reason, ideaId, userReportingId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

// This is just a temporary solution, as it will be a chained removal, where if
// an idea is delete, all comments+uploads+ratings are also deleted
function deleteIdeaQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "delete from Ideas where ID = ?",
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

function getReportedProblemsByIdeaIdQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID, i.problem, i.acknowledged, U.ID, U.name, U.disabled
        FROM ReportedIdeas as i
        LEFT JOIN Users U on i.user_id = U.ID
        where i.idea_id = ?
        ORDER BY i.ID DESC`,
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function getAllReportedIdeasQuery() {
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
        (SELECT COUNT(*) From ReportedComments where ReportedComments.comment_id = c.comment_id) as reports
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

// @desc Returns an idea based of its ID, along with its associated values for
//  that idea such as its upload url, name, description, numb of votes, positive and negative votes
function getIdeaByIdQuery(ideaId, userId = -1) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous,
        (SELECT name FROM Users WHERE ID=i.user_id) AS author,
        (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS commentsCount,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS positiveVotes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS negativeVotes,
        (SELECT vote FROM Ratings WHERE user_id=? and i.ID=idea_id) as voted,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS uploadsCount
        FROM Ideas AS i where i.ID=?`,
        timeout: 40000, // 40s
        values: [userId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function getIdeaAuthorQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT u.email, u.ID, u.name
        FROM Ideas AS i
        LEFT JOIN Users AS u
        ON i.user_id = u.ID
        WHERE i.ID = ?`,
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve({
          userId: result[0].ID,
          name: result[0].name,
          email: result[0].email
        });
      }
    );
  });
}

function getIdeasCountQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select COUNT(ID) FROM Ideas where hidden=0",
        timeout: 40000, // 40s
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(ID)"]);
      }
    );
  });
}

function hideShowAllUserIdeasQuery(userId, hidden) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Ideas set hidden = ? where user_id=?",
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

function getAllIdeasWithUploadsQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "select ID, (SELECT COUNT(*) from Uploads where idea_id=Ideas.ID) as uploads from Ideas",
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
  createIdeaQuery,
  updateIdeaQuery,
  deleteIdeaQuery,
  increaseIdeaViewsQuery,
  getAllIdeasQuery,
  getIdeaByIdQuery,
  getIdeaAuthorQuery,
  getIdeasCountQuery,
  reportIdeaQuery,
  hideShowAllUserIdeasQuery,
  getReportedProblemsByIdeaIdQuery,
  getAllReportedIdeasQuery,
  getAllIdeasUserQuery,
  getUserIdeasCountQuery,
  getAllIdeasWithUploadsQuery,
  getAllIdeasForCSVExportQuery
};
