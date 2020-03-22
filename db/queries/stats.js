const pool = require("../dbconn");

//@desc Get user with highest difference between votes up and down
function getHighestRatedIdeasQuery(itemsCount, pageNo, userId = -1) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT i.ID, i.title, i.description, i.posted_time,
        i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous,
        (SELECT name FROM Users WHERE ID=i.user_id) AS author,
        (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS commentsCount,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS positiveVotes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS negativeVotes,
        (SELECT vote FROM Ratings WHERE user_id=? and i.ID=idea_id) as voted,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS uploadsCount
                FROM Ideas as i
                ORDER BY (positiveVotes - negativeVotes) DESC LIMIT ? OFFSET ?`,
        timeout: 40000,
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
//@desc Returns idea with most views
function getMostViewedIdeasQuery(itemsCount, pageNo, userId = -1) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT i.ID, i.title, i.description, i.posted_time,
        i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous,
        (SELECT name FROM Users WHERE ID=i.user_id) AS author,
        (SELECT COUNT(*) FROM Comments WHERE i.ID = Comments.idea_id ) AS commentsCount,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1 and i.ID=idea_id) AS positiveVotes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0 and i.ID=idea_id) AS negativeVotes,
        (SELECT vote FROM Ratings WHERE user_id=? and i.ID=idea_id) as voted,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT COUNT(*) FROM Uploads WHERE idea_id = i.ID) AS uploadsCount
                FROM Ideas as i
                ORDER BY i.views DESC LIMIT ? OFFSET ?`,
        timeout: 40000,
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
//@desc Returns most recent ideas with a limit of 5
function getMostRecentIdeasQuery(itemsCount, pageNo, userId = -1) {
  return new Promise((resolve, reject) =>
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
          ORDER BY i.posted_time DESC
          LIMIT ? OFFSET ?`,
        timeout: 40000,
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
function getOldestIdeasQuery(itemsCount, pageNo, userId = -1) {
  return new Promise((resolve, reject) =>
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
        ORDER BY i.posted_time ASC
        LIMIT ? OFFSET ?`,
        timeout: 40000,
        values: [userId, itemsCount, itemsCount * (pageNo - 1)]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
//@desc Returns the number of ideas submitted per user
function getNumberOfIdeasPerUserQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT u.email, u.name, COUNT(i.user_id) AS number_of_ideas
          FROM Ideas AS i
          INNER JOIN Users AS u ON u.ID = i.user_id
          GROUP BY u.email
          ORDER BY COUNT(i.user_id) DESC LIMIT 5`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
//@desc Returns users with most recent posts
function getMostRecentActiveUsersQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT DISTINCT u.name, i.posted_time
          FROM Ideas AS i
          INNER JOIN Users AS u ON u.ID = i.user_id
          where i.posted_time IS NOT NULL
          ORDER BY i.posted_time DESC LIMIT 5`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}
//@desc Returns emails of users with the most comments
function getUsersWithMostCommentsQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT u.email, u.name, COUNT(c.user_id) AS number_of_comments
          FROM Users as u
          INNER JOIN Comments AS c ON u.ID = c.user_id
          GROUP BY u.email
          ORDER BY number_of_comments DESC LIMIT 5`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function getAnonymousPostsCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(*)
        FROM Ideas
        WHERE isAnonymous=1 and hidden=0`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
      }
    )
  );
}
function getAnonymousCommentsCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(*)
        FROM Comments
        WHERE isAnonymous=1`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
      }
    )
  );
}

function getNoCommentPostsCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(*)
        FROM Ideas AS i
        LEFT OUTER JOIN Comments AS c ON i.ID = c.idea_id
        WHERE i.hidden = 0 and c.idea_id IS NULL`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
      }
    )
  );
}

function getAllCommentsCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(*)
        FROM Comments`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
      }
    )
  );
}

function getAllVisibleIdeasCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(*)
        FROM Ideas where hidden=0`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
      }
    )
  );
}

function getContributorsCountPerDepartmentQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: `SELECT COUNT(u.ID) AS contributors, d.department
        FROM Users AS u
        INNER JOIN Departments As d
        ON u.department_id = d.ID
        where u.hideActivities = 0
        GROUP BY d.department`,
        timeout: 40000,
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function getIdeasCountPerDepartmentQuery() {
  return new Promise((resolve, reject) =>
  pool.query(
    {
      sql: `SELECT d.department, COUNT(i.ID) AS NumberIdeas
      FROM Ideas AS i
      INNER JOIN Users AS u ON u.ID = i.user_id
      INNER JOIN Departments AS d ON d.ID = u.department_id
      where i.hidden = 0
      GROUP BY d.department`,
      timeout: 40000,
      values: []
    },
    (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    }
  )
);
}

module.exports = {
  getHighestRatedIdeasQuery,
  getMostViewedIdeasQuery,
  getMostRecentActiveUsersQuery,
  getMostRecentIdeasQuery,
  getUsersWithMostCommentsQuery,
  getNumberOfIdeasPerUserQuery,
  getOldestIdeasQuery,
  getAnonymousCommentsCountQuery,
  getAnonymousPostsCountQuery,
  getNoCommentPostsCountQuery,
  getAllVisibleIdeasCountQuery,
  getAllCommentsCountQuery,
  getContributorsCountPerDepartmentQuery,
  getIdeasCountPerDepartmentQuery
};
