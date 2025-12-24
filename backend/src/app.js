const express = require("express");
const app = express();

app.use(express.json());

app.use("/files", require("./routes/fileRoutes"));
app.use("/share", require("./routes/shareRoutes"));
app.use("/auth", require("./routes/authRoutes"));

module.exports = app;
