const {
  createIdeaQuery,
  deleteIdeaQuery,
  getAllIdeasQuery,
  increaseIdeaViewsQuery,
  updateIdeaQuery,
  getIdeaByIdQuery
} = require("../db/queries/ideas");
const { createUploadQuery } = require("../db/queries/uploads");

const getAllIdeasReq = async (req, res) => {
  const ideas = await getAllIdeasQuery();
  res.status(200).json(ideas);
};

const deleteIdeaReq = async (req, res) => {
  await deleteIdeaQuery(req.params.id);
  res.status(200).json({ success: "Idea deleted" });
};

const createIdeaReq = async (req, res) => {
  const { description, isAnonymous, title, categoryId } = req.body;
  const userId = req.user.ID;
  const { insertId } = await createIdeaQuery(
    title,
    description,
    isAnonymous ? 1 : 0,
    categoryId,
    userId
  );
  await Promise.all(
    req.uploadedFiles.forEach(async ({ name, description, upload_id, url }) => {
      await createUploadQuery(name, description, url, upload_id, insertId);
    })
  );
  res.status(201).json({ success: "Successfully created idea" });
};

const increaseIdeaViewsReq = async (req, res) => {
  await increaseIdeaViewsQuery(req.params.id);
  res.status(204);
};

const updateIdeaReq = async (req, res) => {
  const { description, title } = req.body;
  await updateIdeaQuery(title, description, req.params.id);
  res.status(200).json({ title, description });
};

const getIdeaByIdReq = async (req, res) => {
  const idea = await getIdeaByIdQuery(req.params.id);
  res.status(200).json(idea);
};

module.exports = {
  getAllIdeasReq,
  deleteIdeaReq,
  increaseIdeaViewsReq,
  updateIdeaReq,
  createIdeaReq,
  getIdeaByIdReq
};
