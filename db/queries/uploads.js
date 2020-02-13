const pool = require("../dbconn");

// Use this function to add a file to an idea
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

module.exports = {
  createUploadQuery
};
