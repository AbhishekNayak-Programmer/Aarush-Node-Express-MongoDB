const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subtopic: { type: String, required: true },
  subject: { type: String, required: true },
  user: { type: String, required: true },
  description: { type: String, required: true },
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  reply: [],
});

const questionModel = mongoose.model("questions", questionSchema);
module.exports = questionModel;
