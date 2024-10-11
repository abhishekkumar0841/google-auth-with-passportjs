const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  googleId: String,
  emailProvider: {
    type: String,
    default: "EMAIL",
  },
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
