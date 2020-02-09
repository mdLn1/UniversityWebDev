const { getCommentsByIdQuery, addCommentQuery } = require('../db/queries/comments')

const getAllCommentsReq = async (req, res) => {
    const { id } = req.params;
    const comments = await getCommentsByIdQuery(id);
    res.status(200).json(comments)
}

module.exports = {
    getAllCommentsReq
};