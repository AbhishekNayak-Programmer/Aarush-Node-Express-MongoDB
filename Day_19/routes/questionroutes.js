const express = require("express");
const router = express.Router();
const Question = require("../model/question");

router.post("/", async (req, res) => {
  try {
    const { topic, subtopic, subject, description, user } = req.body;

    const data = await Question.create({
      topic,
      subtopic,
      subject,
      user,
      description,
      reply: [],
    });

    res.status(201).json({
      message: "Question Added",
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.get("/:subtopic", async (req, res) => {
  try {
    const ques = await Question.find({ subtopic: req.params.subtopic });
    if (!ques) throw new Error("No Question added for this subtopic");

    res.status(200).json({
      message: "Subtopics",
      data: ques,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.patch("/vote/:id", async (req, res) => {
  try {
    const ques = await Question.findById(req.params.id);
    if (!ques) {
      return res.status(404).json({ message: "Question not found" });
    }

    const { voteType } = req.body;

    if (voteType === "up") {
      ques.upvote += 1;
    } else if (voteType === "down") {
      ques.downvote += 1;
    } else {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    const data = await ques.save();

    res.status(200).json({
      message: "Updated Vote",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.patch("/reply/:id", async (req, res) => {
  try {
    const ques = await Question.findById(req.params.id);
    if (!ques) {
      return res.status(404).json({ message: "Question not found" });
    }

    const { user, message } = req.body;

    ques.reply.push({ user, message });

    const data = await ques.save();

    res.status(200).json({
      message: "Updated Reply",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
