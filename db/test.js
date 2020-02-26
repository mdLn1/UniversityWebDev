// const {getDepartmentCoordinatorQuery, getUserDepartmentIdQuery} = require("./queries/departments")
const { reportIdeaQuery } = require("./queries/ideas");
const handeasync = require("../utils/exceptionHandler");

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  //await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
  // const result = await getRatingsQuery(1);
  try {
    await reportIdeaQuery(1,8,"not on my taste");
    console.log("Ok");
  } catch (err) {
    console.error(err);
  }

  process.exit();
};
test();
