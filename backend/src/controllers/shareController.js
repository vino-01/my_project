const jwt = require("jsonwebtoken");
const ShareToken = require("../models/ShareToken");

exports.createShareLink = async (req, res) => {
  const { fileId, expiresInMinutes } = req.body;

  const token = jwt.sign({ fileId }, process.env.JWT_SECRET, {
    expiresIn: `${expiresInMinutes}m`
  });

  await ShareToken.create({
    fileId,
    token,
    expiresAt: new Date(Date.now() + expiresInMinutes * 60000)
  });

  res.json({ link: `/share/${token}` });
};
