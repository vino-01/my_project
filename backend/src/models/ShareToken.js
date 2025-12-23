const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema({
  fileId: mongoose.Schema.Types.ObjectId,
  token: String,
  expiresAt: Date,
  revoked: { type: Boolean, default: false }
});

shareSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("ShareToken", shareSchema);
