const { addFile } = require("./queries/uploads");

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
};
test();
