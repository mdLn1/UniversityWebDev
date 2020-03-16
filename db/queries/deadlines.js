const pool = require("../dbconn");
const CustomError = require("../../utils/CustomError");

function createDeadlineQuery(ideasSubmissionEnd, commentsSubmissionEnd) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Deadlines (IdeasSubmissionEnd, CommentsSubmissionEnd) values (?, ?)",
        timeout: 40000, // 40s
        values: [ideasSubmissionEnd, commentsSubmissionEnd]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function getAllDeadlinesQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select * from Deadlines ORDER BY CommentsSubmissionEnd ASC",
        timeout: 40000, // 40s
        values: []
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

function updateDeadlineQuery(
  deadlineId,
  ideasSubmissionEnd,
  commentsSubmissionEnd
) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "update Deadlines set (IdeasSubmissionEnd =?, CommentsSubmissionEnd=?) where ID = ?",
        timeout: 40000, // 40s
        values: [ideasSubmissionEnd, commentsSubmissionEnd, deadlineId]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    )
  );
}

module.exports = {
  getAllDeadlinesQuery,
  updateDeadlineQuery,
  createDeadlineQuery
};
