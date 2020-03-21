const express = require("express");
const next = require("next");
const writeFeedback = require("./utils/writeFeedback");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/a", (req, res) => {
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    return app.render(req, res, "/b", req.query);
  });

  server.use(express.json({ extended: false }));
  server.use(express.urlencoded({ extended: true }));
  // WARNING! Errors may show if the routes files don't have module.exports = router;
  server.use("/api/user", require("./routes/userRoute"));
  server.use("/api/auth", require("./routes/authRoute"));
  server.use("/api/roles", require("./routes/rolesRoute"));
  server.use("/api/ideas", require("./routes/ideasRoute"));
  server.use("/api/departments", require("./routes/departmentsRoute"));
  server.use("/api/categories", require("./routes/categoriesRoute"));
  server.use("/api/management", require("./routes/managementRoute"));
  server.use("/api/stats", require("./routes/statsRoute"));
  server.use("/api/userDevice", require("./routes/userDevice"));

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  // Global error handling through middleware
  server.use((err, req, res, next) => {
    console.log(err.stack);
    if (err.statusCode) {
      return res.status(err.statusCode).json(writeFeedback(err.message));
    }
    res.status(500).json(writeFeedback(err.message));
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
