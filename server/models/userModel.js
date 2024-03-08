const mongoose = require("../config/dbConfig");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  weight: String,
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
