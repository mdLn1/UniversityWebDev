const { getRatingsQuery } = require("./queries/ratings");
const pool = require("../db/dbconn");

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  //await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
  // const result = await getRatingsQuery(1);
  const str = `" or ""="`;
  const result = await pool.query(`select user_id from Comments where id = ?`, [
    str
  ]);
  console.log(result);
};
test();
