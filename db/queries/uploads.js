const pool = require("../dbconn");

function createUploadQuery(name, description, url, upload_id, idea_id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Uploads (name, description, url, upload_id, idea_id) values (?, ?, ?, ?, ?)",
        timeout: 40000, // 40s
        values: [name, description, url, upload_id, idea_id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function getIdeaAllUploadsQuery(ideaId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "select * from Uploads where idea_id = ?",
        timeout: 40000, // 40s
        values: [ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function deleteUploadQuery(ideaId, uploadId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "delete from Uploads where ID = ? and idea_id = ? ",
        timeout: 40000, // 40s
        values: [uploadId, ideaId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

module.exports = {
  createUploadQuery,
  deleteUploadQuery,
  getIdeaAllUploadsQuery
};
