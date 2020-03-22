const {
  getHighestRatedIdeasQuery,
  getMostRecentActiveUsersQuery,
  getMostRecentIdeasQuery,
  getMostViewedIdeasQuery,
  getNumberOfIdeasPerUserQuery,
  getOldestIdeasQuery,
  getUsersWithMostCommentsQuery,
  getAllVisibleIdeasCountQuery,
  getAnonymousCommentsCountQuery,
  getAnonymousPostsCountQuery,
  getNoCommentPostsCountQuery,
  getAllCommentsCountQuery,
  getContributorsCountPerDepartmentQuery,
  getIdeasCountPerDepartmentQuery
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

getIdeasCommentsStatsReq = async (req, res) => {
  const usersOrderedByNumberOfIdeas = await getNumberOfIdeasPerUserQuery();
  const usersOrderedByComments = await getUsersWithMostCommentsQuery();
  const allVisibleIdeasCount = await getAllVisibleIdeasCountQuery();
  const anonymousCommentsCount = await getAnonymousCommentsCountQuery();
  const anonymousPostsCount = await getAnonymousPostsCountQuery();
  const noCommentsPostsCount = await getNoCommentPostsCountQuery();
  const commentsCount = await getAllCommentsCountQuery();
  const contributorsPerDepartmentCount = await getContributorsCountPerDepartmentQuery();
  const ideasPerDepartmentCount = await getIdeasCountPerDepartmentQuery();

  res.status(200).json({
    usersOrderedByComments,
    usersOrderedByNumberOfIdeas,
    allVisibleIdeasCount,
    anonymousCommentsCount,
    anonymousPostsCount,
    noCommentsPostsCount,
    commentsCount,
    contributorsPerDepartmentCount,
    ideasPerDepartmentCount
  });
};
module.exports = {
  getHighestRatedIdeasReq,
  getMostViewedIdeasReq,
  getMostRecentIdeasReq,
  getOldestIdeasReq,
  getIdeasCommentsStatsReq
};
