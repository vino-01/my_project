const express = require("express");
const app = express();

app.use(express.json());

// Prefix all routes with /api to match client expectations
app.use("/api/files", require("./routes/fileRoutes"));
app.use("/api/share", require("./routes/shareRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
