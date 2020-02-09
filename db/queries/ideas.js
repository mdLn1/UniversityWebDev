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

// Returns All ideas with the latest posts being returned first.
function getAllIdeasQuery() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        // add full query for retrieving ideas
        sql: `SELECT i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous, 
        (SELECT name FROM Users WHERE ID=i.user_id) AS author, 
        (SELECT COUNT(comment) FROM Comments WHERE i.ID = Comments.idea_id ) AS numb_of_comments, 
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1) AS positive_votes, 
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0) AS negative_votes, 
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category, 
        (SELECT name FROM Uploads WHERE idea_id = i.ID) AS upload_name, 
        (SELECT description FROM Uploads WHERE idea_id = i.ID) AS upload_desc, 
        (SELECT url FROM Uploads WHERE idea_id = i.ID) AS upload_url, 
        (SELECT upload_id FROM Uploads WHERE idea_id = i.ID) AS upload_ID 
        FROM Ideas AS i 
        ORDER BY posted_time DESC`,
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

// @desc Returns an idea based of its ID, along with its associated values for 
//  that idea such as its upload url, name, description, numb of votes, positive and negative votes
function getIdeaByIdQuery(ideaId) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: `SELECT i.ID, i.description, i.views, i.posted_time, i.Title, i.isAnonymous, 
        (SELECT name FROM Users WHERE ID=i.user_id) AS author,
        (SELECT COUNT(comment) FROM Comments WHERE i.ID = Comments.idea_id ) AS numb_of_comments,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=1) AS positive_votes,
        (SELECT COUNT(vote) FROM Ratings WHERE vote=0) AS negative_votes,
        (SELECT tag FROM Categories WHERE ID = i.category_id) AS category,
        (SELECT name FROM Uploads WHERE idea_id = i.ID) AS upload_name,
        (SELECT description FROM Uploads WHERE idea_id = i.ID) AS upload_desc,
        (SELECT url FROM Uploads WHERE idea_id = i.ID) AS upload_url,
        (SELECT upload_id FROM Uploads WHERE idea_id = i.ID) AS upload_ID
        FROM Ideas AS i
        WHERE i.ID = ?`,
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
