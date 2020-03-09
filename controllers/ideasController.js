const {
  createIdeaQuery,
  deleteIdeaQuery,
  getAllIdeasQuery,
  increaseIdeaViewsQuery,
  updateIdeaQuery,
  getIdeaByIdQuery,
  getIdeaAuthorQuery,
  getIdeasCountQuery,
  reportIdeaQuery
} = require("../db/queries/ideas");
const {
  createUploadQuery,
  getIdeaAllUploadsQuery
} = require("../db/queries/uploads");
const {
  getUserDepartmentIdQuery,
  getDepartmentCoordinatorQuery
} = require("../db/queries/departments");

const {
  createRatingQuery,
  deleteRatingQuery,
  getRatingsQuery,
  updateRatingQuery,
  userRatedAlreadyQuery
} = require("../db/queries/ratings");

const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const config = require("config");
const sendMail = require("../utils/emailSender");

const getAllIdeasReq = async (req, res) => {
  let { pageNo, itemsCount } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  if (!itemsCount || itemsCount < 5) {
    itemsCount = 5;
  }
  if (!pageNo || pageNo < 1) {
    pageNo = 1;
  }
  if (isNaN(pageNo) || isNaN(itemsCount)) {
    pageNo = 1;
    itemsCount = 5;
  }
  pageNo = parseInt(pageNo);
  itemsCount = parseInt(itemsCount);
  const totalIdeas = await getIdeasCountQuery();
  if (pageNo * itemsCount > totalIdeas + itemsCount) {
    pageNo = 1;
    itemsCount = 5;
  }
  const ideas = await getAllIdeasQuery(pageNo, itemsCount, userId);
  res.status(200).json({ ideas, totalIdeas });
};

const deleteIdeaReq = async (req, res) => {
  const { id } = req.params;
  const { userId: author } = await getIdeaAuthorQuery(id);
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
  const { description, isAnonymous, title, categoryId, termsAgreed } = req.body;
  const userId = req.user.id;
  if (termsAgreed == undefined || !termsAgreed) {
    throw new CustomError(
      "You must agree to our terms and conditions before submitting an idea",
      400
    );
  }
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
  res.status(204).send();
};

const rateIdeaReq = async (req, res) => {
  const { ideaId } = req.params;
  const userId = req.user.id;
  let { vote } = req.query;
  let action = "";
  if ((vote && vote == 1) || vote == 0) {
    vote = parseInt(vote);
    if (await userRatedAlreadyQuery(ideaId, userId)) {
      await updateRatingQuery(ideaId, userId, vote);
      action = vote ? "updated thumbs up" : "updated thumbs down";
    } else {
      action = vote ? "created thumbs up" : "created thumbs down";
      await createRatingQuery(ideaId, userId, vote);
    }
  } else {
    action = "deleted";
    await deleteRatingQuery(ideaId, userId);
  }
  res.status(200).json({ success: "Rating " + action });
};

const updateIdeaReq = async (req, res) => {
  const { description, title } = req.body;
  const { id } = req.params.id;
  const { userId: author } = await getIdeaAuthorQuery(id);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  await updateIdeaQuery(title, description, id);
  res.status(200).json({ title, description });
};

const reportIdeaReq = async (req, res) => {
  const { ideaId } = req.params;
  const { problem } = req.body;
  await reportIdeaQuery(ideaId, req.user.id, problem);
  res.status(200).json({ success: "Idea has been reported" });
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
  getIdeaByIdReq,
  reportIdeaReq,
  rateIdeaReq
};
