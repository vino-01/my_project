const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");
const { uploadFile } = require("../controllers/fileController");

const router = express.Router();
const upload = multer({ dest: "uploads/tmp" });

router.post("/upload", auth, upload.single("file"), uploadFile);

module.exports = router;
