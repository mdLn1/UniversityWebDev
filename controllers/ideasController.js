const {
  createIdeaQuery,
  deleteIdeaQuery,
  getAllIdeasQuery,
  increaseIdeaViewsQuery,
  updateIdeaQuery,
  getIdeaByIdQuery,
  getIdeaAuthorQuery,
  getIdeasCountQuery,
  reportIdeaQuery,
  getAllReportedIdeasQuery,
  getReportedProblemsByIdeaIdQuery,
  getAllIdeasUserQuery,
  getUserIdeasCountQuery
} = require("../db/queries/ideas");
const {
  createUploadQuery,
  getIdeaAllUploadsQuery,
  getUploadsCountQuery
} = require("../db/queries/uploads");
const {
  getUserDepartmentIdQuery,
  getDepartmentCoordinatorQuery
} = require("../db/queries/departments");
const { isExistingCategory } = require("../db/queries/categories");
const {
  createRatingQuery,
  deleteRatingQuery,
  updateRatingQuery,
  userRatedAlreadyQuery
} = require("../db/queries/ratings");
const { isAccountDisabledQuery } = require("../db/queries/users");

const config = require("config");
const path = require("path");
const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const uploadPreset = config.get("unsigned_upload_preset");
const Datauri = require("datauri");
const sendMail = require("../utils/emailSender");

const getAllIdeasReq = async (req, res) => {
  const { itemsCount, pageNo } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  const totalIdeas = await getIdeasCountQuery();
  if (pageNo * itemsCount > totalIdeas + itemsCount) {
    pageNo = 1;
    itemsCount = 5;
  }
  const ideas = await getAllIdeasQuery(pageNo, itemsCount, userId);
  res.status(200).json({ ideas, totalIdeas });
};

const getAllReportedIdeasReq = async (req, res) => {
  const reportedIdeas = await getAllReportedIdeasQuery();
  res.status(200).json({ reportedIdeas });
};

const getAllIdeasUser = async (req, res) => {
  const { itemsCount, pageNo } = req.query;
  const { id } = req.params;
  const totalIdeas = await getUserIdeasCountQuery(id);
  if (pageNo * itemsCount > totalIdeas + itemsCount) {
    pageNo = 1;
    itemsCount = 5;
  }
  const userIdeas = await getAllIdeasUserQuery(pageNo, itemsCount, id);

  res.status(200).json({ userIdeas, totalIdeas });
};

const getReportedProblemsByIdeaIdReq = async (req, res) => {
  const { id } = req.params;
  const reportedProblems = await getReportedProblemsByIdeaIdQuery(id);
  res.status(200).json({ reportedProblems });
};

const deleteIdeaReq = async (req, res) => {
  const { id } = req.params;
  const { userId, email } = await getIdeaAuthorQuery(id);

  if (
    !(userId === req.user.id || req.user.role === config.get("roles")["admin"])
  )
    throw new CustomError(
      "You are not the author of this idea nor an admin,therefore you cannot make changes",
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
  const { description, title, category, termsAgreed } = req.body;
  let { isAnonymous } = req.body;
  if ((isAnonymous && isAnonymous === 1) || isAnonymous === true) {
    isAnonymous = 1;
  } else {
    isAnonymous = 0;
  }
  const userId = req.user.id;
  if (!termsAgreed) {
    throw new CustomError(
      "You must agree to our terms and conditions before submitting an idea",
      400
    );
  }
  const categoryId = await isExistingCategory(category);
  if (await isAccountDisabledQuery(userId)) {
    throw new CustomError(
      "You can not create/edit content, your account has been disabled"
    );
  }
  const { insertId } = await createIdeaQuery(
    title,
    description,
    categoryId,
    userId,
    isAnonymous
  );
  let uploadedFiles;
  if (req.files) {
    const nrFiles = req.files.length || 0;
    let dUri = new Datauri();
    // max 6 files at a time
    if (nrFiles > 6) {
      throw new CustomError("Too many files, maximum allowed is six");
    } else if (nrFiles > 0) {
      let uploadsCount = await getUploadsCountQuery();
      uploadedFiles = await Promise.all(
        req.files.map(async element => {
          //element contains mimetype and fieldname
          // path.extname(element.originalname).toString() get the extension of the file
          const newBuffer = dUri.format(element.originalname, element.buffer);
          // once finished, new object data uri needs to be created
          dUri = new Datauri();

          // upload the file to cloudinary
          const uploadFile = await new Promise((resolve, reject) =>
            cloudinary.v2.uploader.unsigned_upload(
              newBuffer.content,
              uploadPreset,
              {
                resource_type: "raw",
                tags: `${insertId}`,
                public_id:
                  "idea" +
                  insertId +
                  element.originalname.substring(
                    0,
                    element.originalname.indexOf(".")
                  ) +
                  (uploadsCount++).toString() +
                  path.extname(element.originalname)
              },
              (error, res) => {
                if (error) reject(error);
                resolve(res);
              }
            )
          );
          // field resource_type comes back as "raw"
          return {
            name: element.originalname,
            description: "File linked to idea " + insertId,
            url: uploadFile.secure_url,
            upload_id: uploadFile.public_id
          };
        })
      );
    }
  }
  if (uploadedFiles) {
    await Promise.all(
      uploadedFiles.map(
        async ({ name, description, upload_id, url }) =>
          await createUploadQuery(
            name,
            description + insertId,
            url,
            upload_id,
            insertId
          )
      )
    );
  }
  const userDepartmentId = await getUserDepartmentIdQuery(userId);
  const coordinator = await getDepartmentCoordinatorQuery(userDepartmentId);
  if (coordinator)
    sendMail({
      receiver: coordinator.email,
      subject: "New idea created",
      html: `Please follow this link to check it out <a href="${config.get(
        "server_route"
      )}ideas/${insertId}">click here</a>`
    });

  res
    .status(201)
    .json({ success: "Successfully created idea", ideaId: insertId });
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
  const { id } = req.params;
  const { userId, email } = await getIdeaAuthorQuery(id);
  if (
    !(userId !== req.user.id || req.user.role !== config.get("roles")["admin"])
  )
    throw new CustomError(
      "You are not the author of this idea nor an admin,therefore you cannot make changes",
      400
    );
  if (await isAccountDisabledQuery(userId)) {
    throw new CustomError(
      "You can not create/edit content, your account has been disabled"
    );
  }
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
  let idea;
  if (req.user) {
    idea = await getIdeaByIdQuery(req.params.id, req.user.id);
  } else {
    idea = await getIdeaByIdQuery(req.params.id);
  }
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
  rateIdeaReq,
  getReportedProblemsByIdeaIdReq,
  getAllReportedIdeasReq,
  getAllIdeasUser
};
