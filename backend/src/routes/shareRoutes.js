const express = require("express");
const fs = require("fs");
const File = require("../models/File");
const { decrypt } = require("../services/encryption");
const validateShare = require("../middleware/validateShare");
const logAudit = require("../utils/auditLogger");

const router = express.Router();

router.get("/:token", validateShare, async (req, res) => {
  const file = await File.findById(req.fileId);
  const encrypted = fs.readFileSync(file.path);

  const decrypted = decrypt(encrypted, file.iv);
  logAudit(file._id, "VIEW", req.ip);

  res.end(decrypted);
});

module.exports = router;
