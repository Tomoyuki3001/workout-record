const mongoose = require("../config/dbConfig");

const LogSchema = new mongoose.Schema({
  id: String,
  userId: String,
  logs: [],
});

const LogModel = mongoose.model("logs", LogSchema);
module.exports = LogModel;
