const mongoose = require("../config/dbConfig");

const RecordSchema = new mongoose.Schema({
  id: String,
  name: String,
  set: [],
});

const RecordModel = mongoose.model("records", RecordSchema);
module.exports = RecordModel;
