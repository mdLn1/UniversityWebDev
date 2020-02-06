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
  const { id } = req.params;
  await deleteIdeaQuery(id);
  res.status(200).json({ success: "Idea deleted" });
};

const createIdeaReq = async (req, res) => {
  const { description, isAnonymous, category_id, user_id } = req.body;
  await createIdeaQuery(description, isAnonymous, category_id, user_id);
  res.status(201).json({ success: "Successfully created" });
};

const increaseIdeaViewsReq = async (req, res) => {
  const { id } = req.params;
  await increaseIdeaViewsQuery(id);
  res.status(204);
};

const updateIdeaReq = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  await updateIdeaQuery(description, id);
  res.status(200).json({ description });
};

const getIdeaByIdReq = async (req, res) => {
  const { id } = req.params;
  const idea = await getIdeaByIdQuery(id);
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
