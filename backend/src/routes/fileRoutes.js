const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../middleware/auth");
const { uploadFile } = require("../controllers/fileController");

const router = express.Router();

// Use diskStorage to ensure stable paths and filenames
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/tmp");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

// Field name must be 'file'
router.post("/upload", auth, upload.single("file"), uploadFile);

module.exports = router;
