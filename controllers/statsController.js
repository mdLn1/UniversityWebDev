const {
  getHighestRatedIdeasQuery,
  getMostRecentActiveUsersQuery,
  getMostRecentIdeasQuery,
  getMostViewedIdeasQuery,
  getNumberOfIdeasPerUserQuery,
  getOldestIdeasQuery,
  getUsersWithMostCommentsQuery
} = require("../db/queries/stats");

const { getIdeasCountQuery } = require("../db/queries/ideas");

getHighestRatedIdeasReq = async (req, res) => {
  let { itemsCount, pageNo } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  const totalIdeas = await getIdeasCountQuery();
  const highestRatedIdeas = await getHighestRatedIdeasQuery(
    itemsCount,
    pageNo,
    userId
  );
  res.status(200).json({ ideas: highestRatedIdeas, totalIdeas });
};

getMostRecentIdeasReq = async (req, res) => {
  let { itemsCount, pageNo } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  const totalIdeas = await getIdeasCountQuery();
  const mostRecentIdeas = await getMostRecentIdeasQuery(
    itemsCount,
    pageNo,
    userId
  );
  res.status(200).json({ ideas: mostRecentIdeas, totalIdeas });
};

getMostViewedIdeasReq = async (req, res) => {
  const { itemsCount, pageNo } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  const totalIdeas = await getIdeasCountQuery();
  const mostViewedIdeas = await getMostViewedIdeasQuery(
    itemsCount,
    pageNo,
    userId
  );
  res.status(200).json({ ideas: mostViewedIdeas, totalIdeas });
};

getOldestIdeasReq = async (req, res) => {
  const { itemsCount, pageNo } = req.query;
  let userId = -1;
  if (req.user) {
    userId = req.user.id;
  }
  const totalIdeas = await getIdeasCountQuery();
  const oldestIdeas = await getOldestIdeasQuery(itemsCount, pageNo, userId);
  res.status(200).json({ ideas: oldestIdeas, totalIdeas });
};

getMostRecentActiveUsersReq = async (req, res) => {
  let { itemsCount, pageNo } = req.query;
  const data = await getMostRecentActiveUsersQuery();
  res.status(200).json(data);
};

getNumberOfIdeasPerUserReq = async (req, res) => {
  let { itemsCount, pageNo } = req.query;
  const data = await getNumberOfIdeasPerUserQuery();
  res.status(200).json(data);
};

getUsersWithMostCommentsReq = async (req, res) => {
  let { itemsCount, pageNo } = req.query;
  const data = await getUsersWithMostCommentsQuery();
  res.status(200).json(data);
};

module.exports = {
  getHighestRatedIdeasReq,
  getMostRecentActiveUsersReq,
  getNumberOfIdeasPerUserReq,
  getMostViewedIdeasReq,
  getMostRecentIdeasReq,
  getUsersWithMostCommentsReq,
  getOldestIdeasReq
};
