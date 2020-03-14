const routes = require("next-routes")();

routes
  .add("/ideas/:id", "/ideas/displayIdea")
  .add("/categories/addCategory", "/categories/addCategory");

module.exports = routes;
