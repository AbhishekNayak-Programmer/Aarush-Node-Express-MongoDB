const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    schoolid: { type: String, default: "" },
    grade: { type: String, default: "" },
    role: {
      type: String,
      default: "student",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
