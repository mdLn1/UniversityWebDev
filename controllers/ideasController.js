const {
  createIdeaQuery,
  deleteIdeaQuery,
  getAllIdeasQuery,
  increaseIdeaViewsQuery,
  updateIdeaQuery,
  getIdeaByIdQuery
} = require("../db/queries/ideas");

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
  await createIdeaQuery(title, description, isAnonymous, categoryId, userId);
  res.status(201).json({ success: "Successfully created" });
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
