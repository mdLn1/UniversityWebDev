const {
  createDeadlineQuery,
  getAllDeadlinesQuery,
  updateDeadlineQuery
} = require("../db/queries/deadlines");

const createDeadlineReq = async (req, res) => {
  const { ideasSubmissionEnd, commentsSubmissionEnd } = req.body;
  const { insertId } = await createDeadlineQuery(
    ideasSubmissionEnd,
    commentsSubmissionEnd
  );
  res
    .status(200)
    .json({ ID: insertId, ideasSubmissionEnd, commentsSubmissionEnd });
};

const getAllDeadlinesReq = async (req, res) => {
  const deadlines = await getAllDeadlinesQuery();
  res.status(200).json({ deadlines });
};

const updateDeadlineReq = async (req, res) => {
  const { id } = req.params;
  const { ideasSubmissionEnd, commentsSubmissionEnd } = req.body;
  await updateDeadlineQuery(id, ideasSubmissionEnd, commentsSubmissionEnd);
  res.status(200).json({ message: "Success" });
};

module.exports = {
  getAllDeadlinesReq,
  updateDeadlineReq,
  createDeadlineReq
};
