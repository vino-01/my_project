const jwt = require("jsonwebtoken");
const ShareToken = require("../models/ShareToken");

module.exports = async (req, res, next) => {
  const token = req.params.token;

  const record = await ShareToken.findOne({ token });
  if (!record || record.revoked) {
    return res.status(403).send("Access denied");
  }

  jwt.verify(token, process.env.JWT_SECRET);
  req.fileId = record.fileId;
  next();
};
