const {
  createUserQuery,
  getUserDetailsQuery,
  isEmailRegisteredAlreadyQuery,
  adminUpdateUserDetailsQuery,
  adminEnableDisableUserAccountQuery,
  hideShowUserActivityQuery
} = require("../db/queries/users");
const { deleteCommentQuery,  hideShowAllUserCommentsQuery} = require("../db/queries/comments");
const { deleteIdeaQuery } = require("../db/queries/ideas");
const {hideShowAllUserIdeasQuery} = require("../db/queries/ideas")
const isEmailValid = require("../utils/isEmailValid");

const adminUpdateUserDetailsReq = async (req, res) => {
  const { userId } = req.params;
  const { name, email, departmentId, roleId } = req.body;
  if (!isEmailValid)
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const user = await getUserDetailsQuery(userId);
  if (user.email !== email)
    if (await isEmailRegisteredAlreadyQuery(email))
      throw new CustomError(
        "The new email address chosen is already in use",
        400
      );
  await adminUpdateUserDetailsQuery(name, email, roleId, departmentId, userId);
  res.status(200).json({ success: "User details successfully updated" });
};

const adminDisableUserAccountReq = async (req, res) => {
  const { userId } = req.params;
  await adminEnableDisableUserAccountQuery(userId, 1);
  res.status(200).json({ success: "Account Disabled" });
};

const adminEnableUserAccountReq = async (req, res) => {
  const { userId } = req.params;
  await adminEnableDisableUserAccountQuery(userId, 0);
  res.status(200).json({ success: "Account Enabled" });
};

const adminHideUserActivityReq = async (req, res) => {
  const { userId } = req.params;
  await hideShowUserActivityQuery(userId, 1);
  await hideShowAllUserIdeasQuery(userId, 1);
  await hideShowAllUserCommentsQuery(userId, 1);
  res.status(200).json({ success: "User activity hidden" });
};

const adminShowUserActivityReq = async (req, res) => {
  const { userId } = req.params;
  await hideShowUserActivityQuery(userId, 0);
  await hideShowAllUserIdeasQuery(userId, 0);
  await hideShowAllUserCommentsQuery(userId, 0);
  res.status(200).json({ success: "User activity shown" });
};

const adminDeleteCommentReq = async (req, res) => {
  const { commentId } = req.params;
  await deleteCommentQuery(commentId);
  res.status(200).json({ success: "Comment successfully deleted" });
};
const adminDeleteIdeaReq = async (req, res) => {
  const { ideaId } = req.params;
  await deleteIdeaQuery(ideaId);
  res.status(200).json({ success: "Idea successfully deleted" });
};

module.exports = {
  adminUpdateUserDetailsReq,
  adminDisableUserAccountReq,
  adminEnableUserAccountReq,
  adminShowUserActivityReq,
  adminHideUserActivityReq,
  adminDeleteCommentReq,
  adminDeleteIdeaReq
};
