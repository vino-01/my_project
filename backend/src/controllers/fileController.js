const fs = require("fs");
const path = require("path");
const File = require("../models/File");
const { encrypt } = require("../services/encryption");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded. Send multipart/form-data with field 'file'",
      });
    }

    const tempPath =
      req.file.path ||
      (req.file.destination && req.file.filename
        ? path.join(req.file.destination, req.file.filename)
        : null);

    if (!tempPath) {
      return res
        .status(500)
        .json({ error: "Upload failed: temporary file path not found" });
    }

    const buffer = fs.readFileSync(tempPath);
    const { encrypted, iv } = encrypt(buffer);

    const encryptedDir = path.join("uploads");
    const encryptedPath = path.join(encryptedDir, `${req.file.filename}.enc`);
    fs.writeFileSync(encryptedPath, encrypted);

    try {
      fs.unlinkSync(tempPath);
    } catch (_) {}

    const file = await File.create({
      ownerId: req.user.id,
      path: encryptedPath,
      iv,
    });

    res.json({ fileId: file._id });
  } catch (err) {
    console.error("uploadFile error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};
