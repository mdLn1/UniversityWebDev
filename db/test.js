const {getDepartmentCoordinatorQuery, getUserDepartmentIdQuery} = require("./queries/departments")

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  //await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
  // const result = await getRatingsQuery(1);
  const author = await getUserDepartmentIdQuery(17);
  console.log(author);
  process.exit();
};
test();
