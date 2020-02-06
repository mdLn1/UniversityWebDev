const { getIdea, getIdeas } = require("../db/queries/ideas");
const writeFeedback = require("../utils/writeFeedback");

const getAllIdeasReq = async (req, res) => {
  const ideas = await getIdeas();
  res.status(200).json(ideas);
};

const getIdeaByIdReq = async (req, res) => {
  const idea = await getIdea(req.params.id);
  if (idea[0]) {
    return res.status(200).json({ idea: idea[0] });
  }
  res.status(404).json(writeFeedback("Idea not found"));
};

module.exports = {
  getAllIdeasReq,
  getIdeaByIdReq
};
