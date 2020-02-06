const pool = require("../dbconn");

// Use this function to add a category to the portal
function createCategoryQuery(tag, description, selectable = true) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "insert into Categories (tag, description, isSelectable) values (?, ?, ?)",
        timeout: 40000, // 40s
        values: [tag, description, selectable]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function to delete a category using its ID
function deleteCategoryByIdQuery(id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "delete from Categories where (id = ?)",
        timeout: 40000, // 40s
        values: [id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function change the category by passing the id
// Order of params : newTag, newDescription, isSelectable, id
function updateCategoryByIdQuery(...params) {
  const [newTag, newDescription, isSelectable, id] = params;
  const parArray = [];
  if (params.length < 2) {
    throw new Error("Parameters missing");
  }
  let sql = "update Categories set ";
  if (newTag) {
    sql += "tag = ?";
    parArray.push(newTag);
  }
  if (newTag && newDescription) {
    sql += ",";
  }
  if (newDescription) {
    sql += "description = ?";
    parArray.push(newDescription);
  }
  if ((newDescription && isSelectable) || (newTag && isSelectable)) {
    sql += ",";
  }
  if (isSelectable) {
    sql += "isSelectable = ?";
    parArray.push(isSelectable);
  }
  sql += " where (id = ?)";
  parArray.push(id);

  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: sql,
        timeout: 40000, // 40s
        values: [...parArray]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

function getAllCategoriesQuery() {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select * from Categories",
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

module.exports = {
  updateCategoryByIdQuery,
  createCategoryQuery,
  deleteCategoryByIdQuery,
  getAllCategoriesQuery
};
