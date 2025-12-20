const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/students");
const app = express();

// Connecting with Database
const dbName = "students";
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log("Connection ERROR!!!"));

app.use(express.json());

// GET - GETTING SOMETHING
// POST - CREATE
// PUT - COMPLETE UPDATE
// PATCH - PARTIALLY UPDATE SOME FIELDS
// DELETE - COMPLETELY DELETE

// Working with routes
app.get("/students", async (req, res) => {
  const studentsData = await Student.find();

  res.status(200).json({
    message: "Fetched Students",
    students: studentsData,
  });
});

app.get("/student/:email", async (req, res) => {
  // console.log(req.params.email);
  const student = await Student.find({ email: req.params.email });

  res.status(200).json({
    message: "Student Details",
    student: student,
  });
});

app.get("/students/:id", async (req, res) => {
  // console.log(req.params);
  const student = await Student.find({ _id: req.params.id });

  res.status(200).json({
    message: "Student Details By ID",
    student: student,
  });
});

app.post("/students", async (req, res) => {
  let response = await Student.create({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  res.status(201).json({
    message: "Student Created",
    data: response,
  });
});

const port = 8000;
app.listen(port, () =>
  console.log(`Server is Running at port http://localhost:${port}`)
);
