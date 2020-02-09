const {
  getCommentsByIdQuery,
  createCommentQuery
} = require("../db/queries/comments");

const getAllCommentsReq = async (req, res) => {
  const comments = await getCommentsByIdQuery(req.params.id);
  res.status(200).json(comments);
};

const createCommentReq = async (req, res) => {
  const {comment, isAnonymous } = req.body;
  const userId = req.user.ID;
  await createCommentQuery(comment, isAnonymous, userId, req.params.ideaId);
  res.status(201).status({ success: "Comment successfully added" });
};

module.exports = {
  getAllCommentsReq,
  createCommentReq
};
