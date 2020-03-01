const pool = require("../dbconn");

function createRatingQuery(ideaId, userId, vote) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "insert into Ratings (vote, user_id, idea_id) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [vote, userId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function getRatingsQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT
        (SELECT Count(*) from Ratings where vote=1 and idea_id = ?) as Positive,
        (Select Count(*) from Ratings where vote=0 and idea_id = ?) as Negative`,
        timeout: 40000, // 40s
        values: [ideaId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function userRatedAlreadyQuery(ideaId, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT vote from Ratings where idea_id = ? and user_id = ?`,
        timeout: 40000, // 40s
        values: [ideaId, userId]
      },
      (error, result) => {
        if (error) return reject(error);
        if(result.length > 0){
          return resolve(true);
        }
        return resolve(false)
      }
    );
  });
}

function updateRatingQuery(ideaId, userId, vote) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `update Ratings set vote = ? where idea_id = ? and user_id = ?`,
        timeout: 40000, // 40s
        values: [vote, ideaId, userId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );
  });
}

function deleteRatingQuery(ideaId, userId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `delete from Ratings where idea_id = ? and user_id = ?`,
        timeout: 40000, // 40s
        values: [ideaId, userId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

module.exports = {
  createRatingQuery,
  getRatingsQuery,
  userRatedAlreadyQuery,
  updateRatingQuery,
  deleteRatingQuery
};
