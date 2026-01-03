const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  subtopic: { type: String, required: true },
  students: [],
  date: { type: Date, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
  meetinglink: { type: String, required: true },
});

const sessionModel = mongoose.model("sessions", sessionSchema);
module.exports = sessionModel;
