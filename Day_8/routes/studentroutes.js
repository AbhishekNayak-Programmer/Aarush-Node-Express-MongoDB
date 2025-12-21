const express = require("express");
const router = express.Router();
const Student = require("../model/students");

router.get("/students", async (req, res) => {
  try {
    const studentsData = await Student.find();

    res.status(200).json({
      message: "Fetched Students",
      students: studentsData,
    });
  } catch (err) {
    res.status(501).json({
      message: "Server down",
    });
  }
});

router.get("/student/:email", async (req, res) => {
  // console.log(req.params.email);
  try {
    const student = await Student.find({ email: req.params.email });
    if (!student) throw new Error("No student with this email exists");

    res.status(200).json({
      message: "Student Details",
      student: student,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.get("/students/:id", async (req, res) => {
  // console.log(req.params);
  try {
    const student = await Student.find({ _id: req.params.id });
    if (!student) throw new Error("No student with this id exists");

    res.status(200).json({
      message: "Student Details By ID",
      student: student,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.post("/students", async (req, res) => {
  try {
    let response = await Student.create({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });

    res.status(201).json({
      message: "Student Created",
      data: response,
    });
  } catch (err) {
    res.status(501).json({
      message: "Server down",
    });
  }
});

router.patch("/students/:id", async (req, res) => {
  // console.log(req.body);
  try {
    const updatedData = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedData) throw new Error("Student Does not exist in the Database");

    res.status(200).json({
      message: "Updated Student Details",
      data: updatedData,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.patch("/students", async (req, res) => {
  try {
    const updatedData = await Student.findOneAndUpdate(
      { email: req.body.email },
      req.body,
      { new: true }
    );

    if (!updatedData) throw new Error("Student Does not exist in the Database");

    res.status(200).json({
      message: "Updated Student Details",
      data: updatedData,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    const deletedUser = await Student.findByIdAndDelete({ _id: req.params.id });

    if (!deletedUser) throw new Error("Student Does not exist in the Database");

    res.status(204).json({
      message: "Student Deleted",
      data: deletedUser,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.delete("/students", async (req, res) => {
  try {
    const deletedUser = await Student.findOneAndDelete({
      email: req.body.email,
    });

    if (!deletedUser) throw new Error("Student Does not exist in the Database");

    res.status(204).json({
      message: "Student Deleted",
      data: deletedUser,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

router.delete("/delete-all-students", async (req, res) => {
  try {
    await Student.deleteMany();

    res.status(204).json({
      message: "All Student Deleted",
    });
  } catch (err) {
    res.status(404).json({
      message: "Unable to delete students",
    });
  }
});

module.exports = router;
