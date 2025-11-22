const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connecting with Database
const dbName = "ProgrammingSkills";
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log("Connection ERROR!!!"));

// Working with routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contact", (req, res) => {
  res.send("+91 7077358291");
});

const port = 8000;
app.listen(port, () =>
  console.log(`Server is Running at port http://localhost:${port}`)
);
