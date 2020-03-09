const pool = require("../dbconn");

//@desc Get user with highest difference between votes up and down
function getHighestRatedIdeasQuery(){
    return new Promise( (resolve, reject) => 
        pool.query(
            {
                sql: `SELECT i.ID, i.title, i.description, i.posted_time,
                (SELECT COUNT(vote) FROM Ratings WHERE i.ID = idea_id AND vote=1) -
                (SELECT COUNT(vote) FROM Ratings WHERE i.ID = idea_id AND vote=0) AS difference_in_votes
                FROM Ideas as i
                ORDER BY difference_in_votes DESC`,
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
//@desc Returns idea with most views
function getMostViewedIdeasQuery() {
    return new Promise( (resolve, reject) => 
        pool.query(
            {
                sql: `SELECT i.ID, i.description, i.title, i.posted_time, i.views
                FROM Ideas as i
                ORDER BY i.views DESC`,
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
//@desc Returns most recent ideas with a limit of 5 
function getMostRecentIdeasQuery() {
    return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          `SELECT i.title, i.description, i.posted_time, i.views, c.comment, c.commentTime
          FROM Ideas as i
          INNER JOIN Comments AS c ON i.ID = c.idea_id
          ORDER BY i.posted_time DESC
          LIMIT 5`,
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
//@desc Returns the number of ideas submitted per user
function getNumberOfIdeasPerUserQuery() {
    return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          `SELECT u.email, u.name, COUNT(i.user_id) AS number_of_ideas
          FROM Ideas AS i
          INNER JOIN Users AS u ON u.ID = i.user_id
          GROUP BY u.email
          ORDER BY COUNT(i.user_id) DESC`,
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
function getMostRecentActiveUsersQuery(){
    return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          `SELECT DISTINCT u.name, u.lastLogin
          FROM Ideas AS i
          INNER JOIN Users AS u ON u.ID = i.user_id
          ORDER BY posted_time DESC`,
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
        sql:
          `SELECT u.email, COUNT(c.user_id) AS number_of_comments
          FROM Users as u
          INNER JOIN Comments AS c ON u.ID = c.user_id
          GROUP BY u.email
          ORDER BY number_of_comments DESC`,
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
    getNumberOfIdeasPerUserQuery
};