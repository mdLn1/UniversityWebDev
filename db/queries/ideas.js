const pool = require("../dbconn");

// add new Idea
function createIdeaQuery(title, description, isAnonymous, categoryId, userId) {
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
        sql: "insert into ReportedIdeas (problem, idea_id, user_id) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [reason, ideaId, userReportingId]
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

// @desc Returns an idea based of its ID, along with its associated values for
//  that idea such as its upload url, name, description, numb of votes, positive and negative votes
function getIdeaByIdQuery(ideaId,userId=-1) {
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
        sql: `SELECT u.email, u.ID
        FROM Ideas AS i
        LEFT JOIN Users AS u
        ON i.user_id = u.ID
        WHERE i.ID = ?`,
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve({ userId: result[0].ID, email: result[0].email });
      }
    );
  });
}


function getIdeasCountQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:"select COUNT(ID) FROM Ideas where hidden=0",
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
        sql:"update Ideas set hidden = ? where user_id=?",
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
  hideShowAllUserIdeasQuery
};
