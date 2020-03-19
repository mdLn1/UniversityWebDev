const {
  getUserDetailsQuery,
  isEmailRegisteredAlreadyQuery,
  adminUpdateUserDetailsQuery,
  adminEnableDisableUserAccountQuery,
  hideShowUserActivityQuery
} = require("../db/queries/users");
const {
  deleteCommentQuery,
  hideShowAllUserCommentsQuery
} = require("../db/queries/comments");
const { deleteIdeaQuery } = require("../db/queries/ideas");
const { hideShowAllUserIdeasQuery } = require("../db/queries/ideas");
const {} = require("../db/queries/departments");
const bcrypt = require("bcryptjs");
const isEmailValid = require("../utils/isEmailValid");
const isPasswordValid = require("../utils/isPasswordValid");
const CustomError = require("../utils/CustomError");

const adminUpdateUserDetailsReq = async (req, res) => {
  const { userId } = req.params;
  const { name, email, department, role, password } = req.body;
  let { hideActivities, disabled } = req.body;
  if (
    !isEmailValid(email) ||
    !(email.endsWith("@gre.ac.uk") || email.endsWith("@greenwich.ac.uk"))
  )
    throw new CustomError("Invalid email address or wrong email domain", 400);
  const user = await getUserDetailsQuery(userId);
  if (user.email !== email)
    if (await isEmailRegisteredAlreadyQuery(email))
      throw new CustomError(
        "The new email address chosen is already in use",
        400
      );
  let salt, hashedPassword;
  if (password) {
    if (!isPasswordValid(password)) {
      throw new CustomError(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 digit",
        400
      );
    }
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  await adminUpdateUserDetailsQuery(
    name,
    email,
    password ? hashedPassword : user.password,
    role,
    department,
    userId,
    hideActivities,
    disabled
  );
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
