const {
  createIdeaQuery,
  deleteIdeaQuery,
  getAllIdeasQuery,
  increaseIdeaViewsQuery,
  updateIdeaQuery,
  getIdeaByIdQuery,
  getIdeaAuthorQuery
} = require("../db/queries/ideas");
const {
  createUploadQuery,
  getIdeaAllUploadsQuery
} = require("../db/queries/uploads");
const {
  getUserDepartmentIdQuery,
  getDepartmentCoordinatorQuery
} = require("../db/queries/departments");
const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const config = require("config");
const sendMail = require("../utils/emailSender");

const getAllIdeasReq = async (req, res) => {
  const ideas = await getAllIdeasQuery();
  res.status(200).json(ideas);
};

const deleteIdeaReq = async (req, res) => {
  const { id } = req.params;
  const {userId: author} = await getIdeaAuthorQuery(id);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  const uploads = await getIdeaAllUploadsQuery(id);
  await Promise.all(
    uploads.map(
      async el =>
        await cloudinary.v2.uploader.destroy(el.upload_id, {
          resource_type: "raw"
        })
    )
  );
  await deleteIdeaQuery(id);
  res.status(200).json({ success: "Idea deleted" });
};

const createIdeaReq = async (req, res) => {
  const { description, isAnonymous, title, categoryId } = req.body;
  const userId = req.user.id;
  const { insertId } = await createIdeaQuery(
    title,
    description,
    isAnonymous ? 1 : 0,
    categoryId,
    userId
  );
  if (req.uploadedFiles) {
    await Promise.all(
      req.uploadedFiles.forEach(
        async ({ name, description, upload_id, url }) => {
          await createUploadQuery(name, description, url, upload_id, insertId);
        }
      )
    );
  }
  const userDepartmentId = await getUserDepartmentIdQuery(userId);
  const coordinator = await getDepartmentCoordinatorQuery(userDepartmentId);
  // email needs to be configured to show this
  // sendMail({
  //   receiver: coordinator.email,
  //   subject: 'New idea created',
  //   html: `Please follow this link to check it out <a href="${config.get("server_route")}ideas/${insertId}">click here</a>`
  // });

  res.status(201).json({ success: "Successfully created idea" });
};

const increaseIdeaViewsReq = async (req, res) => {
  await increaseIdeaViewsQuery(req.params.id);
  res.status(204);
};

const updateIdeaReq = async (req, res) => {
  const { description, title } = req.body;
  const { id } = req.params.id;
  const {userId: author} = await getIdeaAuthorQuery(id);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  await updateIdeaQuery(title, description, id);
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
