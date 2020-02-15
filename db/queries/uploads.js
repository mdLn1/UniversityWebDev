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


function getUploadQuery(uploadId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "select * from Uploads where upload_id = ?",
        timeout: 40000, // 40s
        values: [uploadId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}


function getUploadsCountQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "select COUNT(*) from Uploads",
        timeout: 40000, // 40s
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]["COUNT(*)"]);
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
  getIdeaAllUploadsQuery,
  getUploadsCountQuery,
  getUploadQuery
};
