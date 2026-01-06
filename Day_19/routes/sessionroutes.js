const express = require("express");
const router = express.Router();
const session = require("../model/session");

router.post("/notification", async (req, res) => {
  try {
    const { username } = req.body;
    const allSessions = await session.find({});
    let usersSessions = [];

    for (let i = 0; i < allSessions.length; i++) {
      let studentsArr = allSessions[i].students;
      if (studentsArr.includes(username)) {
        usersSessions.push(allSessions[i]);
      }
    }

    res.status(200).json({
      data: usersSessions,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { topic, subtopic, students, date, time, description, meetinglink } =
      req.body;
    console.log(req.body);
    const data = await session.create({
      topic,
      subtopic,
      students: students || [],
      date,
      time,
      description,
      meetinglink,
    });

    res.status(201).json({
      message: "Session Added",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
