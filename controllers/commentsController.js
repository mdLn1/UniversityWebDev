const {
  getAllCommentsForIdeaQuery,
  createCommentQuery,
  deleteCommentQuery,
  updateCommentForIdeaQuery,
  getCommentAuthorQuery
} = require("../db/queries/comments");

const { getIdeaAuthorQuery } = require("../db/queries/ideas");
const config = require("config");
const sendMail = require("../utils/emailSender");

const getAllCommentsReq = async (req, res) => {
  const comments = await getAllCommentsForIdeaQuery(req.params.id);
  res.status(200).json(comments);
};

const createCommentReq = async (req, res) => {
  const { comment, isAnonymous } = req.body;
  const { ideaId } = req.params;
  const userId = req.user.id;
  const { insertId } = await createCommentQuery(
    comment,
    isAnonymous,
    userId,
    ideaId
  );
  const { email } = await getIdeaAuthorQuery(ideaId);
  // email needs to be configured to show this
  // sendMail({
  //   receiver: coordinator.email,
  //   subject: 'New comment added',
  //   html: `Please follow this link to check it out <a href="${config.get("server_route")}ideas/${ideaId}">click here</a>`
  // });
  res.status(201).json({ ID: insertId, comment, isAnonymous });
};

const updateCommentForIdeaReq = async (req, res) => {
  const { content } = req.body;
  const { ideaId, commentId } = req.params;
  const author = await getCommentAuthorQuery(commentId);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this comment, you cannot make changes",
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
      "You are not the author of this comment, you cannot make changes",
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
