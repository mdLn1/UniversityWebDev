const routes = require("next-routes")();

routes
  .add("/ideas/submitIdea", "/ideas/submitIdea")
  .add("/ideas/:id", "/ideas/displayIdea")
  .add("/categories/addCategory", "/categories/addCategory");

module.exports = routes;
