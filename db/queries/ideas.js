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
          "insert into Ideas (title, description, isAnonymous, views, category_id, user_id, posted_time) values (?, ?, ?, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [title, description, isAnonymous, categoryId, userId, date]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// to be completed
function getAllIdeasQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        // add full query for retrieving ideas
        sql: "select * from ideas",
        timeout: 40000, // 40s
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
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
        return resolve();
      }
    );
  });
}

// update just description for now
function updateIdeaQuery(description, id) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "update Ideas set description = ? where ID = ?",
        timeout: 40000, // 40s
        values: [description, id]
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

// needs to be completed
function getIdeaByIdQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "select * from Ideas where ID = ?",
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

module.exports = {
  createIdeaQuery,
  updateIdeaQuery,
  deleteIdeaQuery,
  increaseIdeaViewsQuery,
  getAllIdeasQuery,
  getIdeaByIdQuery
};
