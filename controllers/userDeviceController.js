const {
  addUserDevice,
  countBrowserUsage,
  countOSUsage
} = require("../db/queries/userDevice");

const createUserDevice = async (req, res) => {
  let { browser, os } = req.body;
  await addUserDevice(browser, os);
  res.status(200).json({ success: "Added to DB" });
};

const browserUsage = async (req, res) => {
  const browserData = await countBrowserUsage();
  res.status(200).json({ browserData });
};

const osUsage = async (req, res) => {
  const osData = await countOSUsage();
  res.status(200).json({ osData });
};

module.exports = {
  createUserDevice,
  browserUsage,
  osUsage
};
