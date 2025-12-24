const fs = require("fs");
const File = require("../models/File");
const { encrypt } = require("../services/encryption");

exports.uploadFile = async (req, res) => {
  const buffer = fs.readFileSync(req.file.path);
  const { encrypted, iv } = encrypt(buffer);

  const encryptedPath = `uploads/${req.file.filename}.enc`;
  fs.writeFileSync(encryptedPath, encrypted);

  const file = await File.create({
    ownerId: req.user.id,
    path: encryptedPath,
    iv
  });

  res.json({ fileId: file._id });
};
