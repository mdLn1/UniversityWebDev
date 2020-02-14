const {
  getAllCommentsForIdeaQuery,
  createCommentQuery,
  deleteCommentQuery,
  updateCommentForIdeaQuery,
  getCommentAuthorQuery
} = require("../db/queries/comments");

const getAllCommentsReq = async (req, res) => {
  const comments = await getAllCommentsForIdeaQuery(req.params.id);
  res.status(200).json(comments);
};

const createCommentReq = async (req, res) => {
  const { comment, isAnonymous } = req.body;
  const userId = req.user.ID;
  const { insertId } = await createCommentQuery(
    comment,
    isAnonymous,
    userId,
    req.params.ideaId
  );
  res.status(201).status({ ID: insertId, comment, isAnonymous });
};

const updateCommentForIdeaReq = async (req, res) => {
  const { content } = req.body;
  const { ideaId, commentId } = req.params;
  const author = await getCommentAuthorQuery(commentId);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );

  await updateCommentForIdeaQuery(commentId, content);
  res.status(200).json({ success: "Successfully updated" });
};

const deleteCommentReq = async (req, res) => {
  const { ideaId, commentId } = req.params;
  const author = await getCommentAuthorQuery(commentId);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  await deleteCommentQuery(commentId);
  res.status(200).json({ success: "Successfully deleted" });
};

module.exports = {
  getAllCommentsReq,
  createCommentReq,
  updateCommentForIdeaReq,
  deleteCommentReq
};
