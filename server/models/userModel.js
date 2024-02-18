const mongoose = require("../config/dbConfig");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  weight: Number,
  height: Number,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
