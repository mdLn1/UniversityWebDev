const pool = require("../dbconn");

// @desc all new users to submit local data
// @param browser and os
function addUserDevice(browser, os) {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql: "insert into UserDevice (browser_type, os_platform) values (?, ?)",
        timeout: 40000,
        values: [browser, os]
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

// @desc returns all Browser and number of users using it
function countBrowserUsage() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "SELECT browser_type, count(*) as Num FROM UserDevice GROUP BY browser_type",
        timeout: 40000,
        values: []
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

// @desc returns all OS types and number of users using it
function countOSUsage() {
  return new Promise((resolve, reject) => {
    pool.query(
      {
        sql:
          "SELECT os_platform, count(*) as Num FROM UserDevice GROUP BY os_platform",
        timeout: 40000,
        values: []
      },
      (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      }
    );
  });
}

module.exports = {
  addUserDevice,
  countBrowserUsage,
  countOSUsage
};
