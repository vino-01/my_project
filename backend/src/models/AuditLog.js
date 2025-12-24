const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
  fileId: mongoose.Schema.Types.ObjectId,
  action: String,
  ip: String,
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AuditLog", auditSchema);
