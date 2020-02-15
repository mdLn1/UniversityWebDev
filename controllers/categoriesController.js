const {
  createCategoryQuery,
  deleteCategoryByIdQuery,
  updateCategoryByIdQuery,
  getAllCategoriesQuery
} = require("../db/queries/categories");

const createCategoryReq = async (req, res) => {
  const { tag, description, isSelectable } = req.body;
  await createCategoryQuery(tag, description, isSelectable);
  res.status(200).json({ tag, description, isSelectable });
};

const deleteCategoryByIdReq = async (req, res) => {
  await deleteCategoryByIdQuery(req.params.id);
  res.status(200).json({ success: "Category deleted" });
};

const updateCategoryByIdReq = async (req, res) => {
  const { newTag, newDescription, isSelectable } = req.body;
  await updateCategoryByIdQuery(newTag, newDescription, isSelectable, req.params.id);
  res.status(202).json({ success: "Successfully updated" });
};

const getAllCategoriesReq = async (req, res) => {
  const categories = await getAllCategoriesQuery();
  res.status(200).json({categories});
};

module.exports = {
  createCategoryReq,
  deleteCategoryByIdReq,
  updateCategoryByIdReq,
  getAllCategoriesReq
};
