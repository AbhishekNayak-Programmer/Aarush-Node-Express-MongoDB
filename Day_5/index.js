const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/users");
const app = express();

// Connecting with Database
const dbName = "ProgrammingSkills";
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log("Connection ERROR!!!"));
app.use(express.json());

// Working with routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.get("/create-user", async (req, res) => {
  let user = {
    name: "Abhishek Nayak",
    salary: "2000000",
    email: "webcoder@gmail.com",
  };

  await User.create(user);

  res.status(201).json({
    message: "Created a User",
  });
});

const port = 8000;
app.listen(port, () =>
  console.log(`Server is Running at port http://localhost:${port}`)
);
