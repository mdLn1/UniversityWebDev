const pool = require("../dbconn");

// Use this function to add a category to the portal
function addIdea(description, isAnonymous, category_id, user_id) {
  const date = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Ideas (description, isAnonymous, views, category_id, user_id, posted_time) values (?, ?, 0, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [description, isAnonymous, category_id, user_id, date]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

function increaseIdeaViewCounter(idea_id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Ideas set views = views + 1 where ID = ?",
        timeout: 40000, // 40s
        values: [idea_id]
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
function deleteIdea(idea_id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "delete from Ideas where ID = ?",
        timeout: 40000, // 40s
        values: [idea_id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    );
  });
}

module.exports = {
  addIdea,
  increaseIdeaViewCounter,
  deleteIdea
};
