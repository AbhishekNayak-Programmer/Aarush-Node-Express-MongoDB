const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Connect with the mongodb database in local system
// let URL = "mongodb://localhost:27017";
mongoose
  .connect(`${process.env.MONGO_URL}/robot`)
  .then((res) => console.log("Connected With DB!"))
  .catch((err) => console.log("Connection Unsuccessful!"));

// Routes
app.get("/", (req, res) => {
  res.send("Server is Running");
});

app.get("/home", (req, res) => {
  res.send("I am in home page");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server Running at http://localhost:${PORT}`)
);

// Homework
// 1. Create a Server, connect with MongoDB Database, create 5 routes
// 2. Use ENV to store secret and access it in server
// 3. Make a gitignore for your project
