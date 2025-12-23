const mongoose = require("mongoose");

const fileSchema =  new mongoose.scheme({
    ownerId: String,
    path:String,
    iv:Buffer,
    createAt: {type:Date, default: Date.now}
});

module.exports = mongoose.models("File", fileSchema);