const pool = require("../dbconn");
const CustomError = require("../../utils/CustomError");
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
        return resolve(result);
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
function updateCategoryByIdQuery(newTag, newDescription, isSelectable, id) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql:
          "update Categories set tag = ?, description = ?, isSelectable = ? where (id = ?)",
        timeout: 40000, // 40s
        values: [newTag, newDescription, isSelectable, id]
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
        return resolve(
          result.map(({ ID, tag, isSelectable, description }) => ({
            id: ID,
            tag,
            isSelectable,
            description
          }))
        );
      }
    )
  );
}

function isCategoryUsedQuery(categoryId) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select COUNT(*) from Ideas where category_id = ?",
        timeout: 40000, // 40s
        values: [categoryId]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result[0]["COUNT(*)"] > 0)
          return reject(
            new CustomError("Category in use, cannot be deleted", 400)
          );
        resolve();
      }
    )
  );
}

function isExistingCategory(tag) {
  return new Promise((resolve, reject) =>
    pool.query(
      {
        sql: "select ID from Categories where tag = ?",
        timeout: 40000, // 40s
        values: [tag]
      },
      (error, result) => {
        if (error) return reject(error);
        if (result.length === 0)
          return reject(
            new CustomError("Selected category does not exist", 400)
          );
        resolve(result[0].ID);
      }
    )
  );
}

module.exports = {
  updateCategoryByIdQuery,
  createCategoryQuery,
  deleteCategoryByIdQuery,
  getAllCategoriesQuery,
  isCategoryUsedQuery,
  isExistingCategory
};
