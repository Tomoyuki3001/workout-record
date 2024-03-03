const mongoose = require("../config/dbConfig");

const RecordSchema = new mongoose.Schema({
  userId: String,
  date: String,
  set: [],
});

const RecordModel = mongoose.model("records", RecordSchema);
module.exports = RecordModel;
