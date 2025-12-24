const AuditLog = require("../models/AuditLog");

module.exports = (fileId, action, ip) => {
  AuditLog.create({ fileId, action, ip });
};
