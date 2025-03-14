const {
  createCategoryQuery,
  deleteCategoryByIdQuery,
  updateCategoryByIdQuery,
  getAllCategoriesQuery,
  isCategoryUsedQuery
} = require("../db/queries/categories");

const createCategoryReq = async (req, res) => {
  const { tag, description, isSelectable } = req.body;
  const { insertId } = await createCategoryQuery(
    tag,
    description,
    isSelectable
  );
  res.status(200).json({ tag, description, isSelectable, ID: insertId });
};

const deleteCategoryByIdReq = async (req, res) => {
  const { id } = req.params;
  await isCategoryUsedQuery(id);
  await deleteCategoryByIdQuery(id);
  res.status(200).json({ success: "Category deleted" });
};

const updateCategoryByIdReq = async (req, res) => {
  const { tag, description, isSelectable } = req.body;
  await updateCategoryByIdQuery(tag, description, isSelectable, req.params.id);
  res.status(202).json({ success: "Successfully updated" });
};

const getAllCategoriesReq = async (req, res) => {
  const categories = await getAllCategoriesQuery();
  res.status(200).json({ categories });
};

module.exports = {
  createCategoryReq,
  deleteCategoryByIdReq,
  updateCategoryByIdReq,
  getAllCategoriesReq
};
