const { 
    getHighestRatedIdeasQuery,
    getMostRecentActiveUsersQuery,
    getNumberOfIdeasPerUserQuery,
    getMostViewedIdeasQuery,
    getMostRecentIdeasQuery,
    getUsersWithMostCommentsQuery
} = require("../db/queries/stats");

getHighestRatedIdeasReq = async (req, res) => {
    const data = await getHighestRatedIdeasQuery();
    res.status(200).json(data)
}

getMostRecentActiveUsersReq = async (req, res) => {
    const data = await getMostRecentActiveUsersQuery();
    res.status(200).json(data)
}

getNumberOfIdeasPerUserReq = async (req, res) => {
    const data = await getNumberOfIdeasPerUserQuery();
    res.status(200).json(data)
}

getMostViewedIdeasReq = async (req, res) => {
    const data = await getMostViewedIdeasQuery();
    res.status(200).json(data)
}

getMostRecentIdeasReq = async (req, res) => {
    const data = await getMostRecentIdeasQuery();
    res.status(200).json(data)
}

getUsersWithMostCommentsReq = async (req, res) => {
    const data = await getUsersWithMostCommentsQuery();
    res.status(200).json(data)
}

module.exports = {
    getHighestRatedIdeasReq,
    getMostRecentActiveUsersReq,
    getNumberOfIdeasPerUserReq,
    getMostViewedIdeasReq,
    getMostRecentIdeasReq,
    getUsersWithMostCommentsReq
};