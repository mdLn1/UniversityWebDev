// const {getDepartmentCoordinatorQuery, getUserDepartmentIdQuery} = require("./queries/departments")
const { regUserQuery } = require("./queries/users");
//const handeasync = require("../utils/exceptionHandler");

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  //await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
  // const result = await getRatingsQuery(1);
  try {
    await regUserQuery("Mikili", "Test123!", "test33@gmail.com", "Lecturer", "CIS");
    console.log("Ok");
  } catch (err) {
    console.error(err);
  }

  process.exit();
};
test();
