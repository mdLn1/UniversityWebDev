const { deleteIdea } = require("./queries/ideas");

test = async () => {
  //await addIdea("Make uni better", false, 1, 2);
  //await addFile("test", "test", "test", "test", 1);
  //await addCategory("library", "library", true);
  await deleteIdea(4);
};
test();
