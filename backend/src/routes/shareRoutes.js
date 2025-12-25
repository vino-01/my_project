const express = require("express");
const fs = require("fs");
const File = require("../models/File");
const { decrypt } = require("../services/encryption");
const validateShare = require("../middleware/validateShare");
const logAudit = require("../utils/auditLogger");
const { createShareLink } = require("../controllers/shareController");

const router = express.Router();

router.get("/:token", validateShare, async (req, res) => {
  const file = await File.findById(req.fileId);
  const encrypted = fs.readFileSync(file.path);

  const decrypted = decrypt(encrypted, file.iv);
  logAudit(file._id, "VIEW", req.ip);

  res.end(decrypted);
});

// Create a share link for a given fileId
// Matches docs: POST /api/share/<fileId>
router.post("/:fileId", async (req, res) => {
  // Default expiry if not provided
  if (!req.body.expiresInMinutes) {
    req.body.expiresInMinutes = 15;
  }
  req.body.fileId = req.params.fileId;
  return createShareLink(req, res);
});

module.exports = router;
