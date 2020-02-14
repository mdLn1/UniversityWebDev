const path = require("path");
const config = require("config");
const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const uploadPreset = config.get("unsigned_upload_preset");
const Datauri = require("datauri");
const {
  createUploadQuery,
  deleteUploadQuery,
  getIdeaAllUploadsQuery
} = require("../db/queries/uploads");
const { getIdeaAuthorQuery } = require("../db/queries/ideas");

const uploadFilesReq = async (req, res) => {
  const { id } = req.params;
  const author = await getIdeaAuthorQuery(id);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  const nrFiles = req.files.length;
  let dUri = new Datauri();
  // max 6 files at a time
  if (nrFiles > 6) {
    throw new CustomError("Too many files, maximum allowed is six", 400);
  } else if (nrFiles == 0) {
    throw new CustomError("No files attached to upload", 400);
  }
  const uploaded = await Promise.all(
    req.files.map(async element => {
      //element contains mimetype and fieldname
      const newBuffer = dUri.format(element.originalname, element.buffer);
      // once finished, new object data uri needs to be created
      dUri = new Datauri();

      // upload the file to cloudinary
      // path.extname(element.originalname).toString() get the extension of the file
      const uploadFile = await new Promise((resolve, reject) =>
        cloudinary.v2.uploader.unsigned_upload(
          newBuffer.content,
          uploadPreset,
          { resource_type: "auto" },
          (error, res) => {
            if (error) reject(error);
            resolve(res);
          }
        )
      );
      // field resource_type comes back as "raw"
      const { insertId } = await createUploadQuery(
        element.originalname,
        "File linked to idea " + req.params.id,
        uploadFile.secure_url,
        uploadFile.public_id,
        req.params.id
      );
      return {
        ID: insertId,
        name: element.originalname,
        uploadId: uploadFile.public_id,
        url: uploadFile.secure_url,
        ideaId: req.params.id
      };
    })
  );
  res.status(201).json({ uploads: uploaded });
};

const deleteUploadReq = async (req, res) => {
  const { ideaId, uploadId } = req.params;
  const author = await getIdeaAuthorQuery(ideaId);
  if (author !== req.user.id)
    throw new CustomError(
      "You are not the author of this idea, you cannot make changes",
      400
    );
  await deleteUploadQuery(ideaId, uploadId);
  res.status(200).json({ success: "Upload deleted" });
};

const downloadUploadsReq = async (req, res) => {
  const uploadedFiles = await getIdeaAllUploadsQuery(req.params.ideaId);
  const createZipLink = await cloudinary.v2.uploader.create_zip({
    tags: [],
    public_ids: uploadedFiles.map(el => el.upload_id.substring(10)),
    prefixes: "/uniwebdev",
    resource_type: "raw"
  });

  res.status(200).json(createZipLink);
};

module.exports = { uploadFilesReq, deleteUploadReq, downloadUploadsReq };
