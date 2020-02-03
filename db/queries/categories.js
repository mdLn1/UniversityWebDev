const pool = require("../dbconn");

// Use this function to add a category to the portal
function addCategory(tag, description, selectable) {
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

// Use this function to delete a category using its name
function deleteCategoryByName(tag) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "delete from Categories where (tag = ?)",
        timeout: 40000, // 40s
        values: [tag]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function to delete a category using its ID
function deleteCategoryByID(id) {
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

// Use this function to toogle the selectable value of a categorie by TAG name
function toggleCategoryByTag(tag, isSelectable) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "update Categories set isSelectable = ? where (tag = ?)",
        timeout: 40000, // 40s
        values: [!isSelectable, tag]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function to toogle the selectable value of a category by ID
function toggleCategoryByID(id, isSelectable) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "update Categories set isSelectable = ? where (id = ?)",
        timeout: 40000, // 40s
        values: [!isSelectable, id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function change the category by passing the tag
function updateCategoryByTag(tag, newTag, newDescription) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "update Categories set tag = ?, description = ? where (tag = ?)",
        timeout: 40000, // 40s
        values: [newTag, newDescription, tag]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

// Use this function change the category by passing the id
function updateCategoryByID(id, newTag, newDescription) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "update Categories set tag = ?, description = ? where (tag = ?)",
        timeout: 40000, // 40s
        values: [newTag, newDescription, id]
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve();
      }
    )
  );
}

module.exports = {
  addCategory,
  deleteCategoryByName,
  deleteCategoryByID,
  toggleCategoryByTag,
  toggleCategoryByID,
  updateCategoryByTag,
  updateCategoryByID
};
