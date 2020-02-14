const path = require("path");
const config = require("config");
const CustomError = require("../utils/CustomError");
const cloudinary = require("cloudinary");
const uploadPreset = config.get("unsigned_upload_preset");
const Datauri = require("datauri");

const uploadFiles = async (req, res, next) => {
  const nrFiles = req.files.length;
  req.uploads = [];
  let dUri = new Datauri();
  // max 6 files at a time
  if (nrFiles > 6) {
    throw new CustomError("Too many files, maximum allowed is six");
  } else if (nrFiles == 0) {
    next();
  }
  const uploads = await Promise.all(
    req.files.map(async element => {
      //element contains mimetype and fieldname
      // path.extname(element.originalname).toString() get the extension of the file
      const newBuffer = dUri.format(
        element.originalname,
        element.buffer
      );
      // once finished, new object data uri needs to be created
      dUri = new Datauri();

      // upload the file to cloudinary
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
      return {
        name: element.originalname,
        description: "File linked to idea " + req.params.id,
        url: uploadFile.secure_url,
        upload_id: uploadFile.public_id
      };
    })
  );
  req.uploadedFiles = uploads;
  next();
};

module.exports = uploadFiles;