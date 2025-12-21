const express = require("express");
const mongoose = require("mongoose");
const app = express();
const studentRouter = require("./routes/studentroutes");

// Connecting with Database
const dbName = "students";
mongoose
  .connect(`mongodb://localhost:27017/${dbName}`)
  .then(() => console.log("Connected With Database"))
  .catch((err) => console.log("Connection ERROR!!!"));

app.use(express.json());

// Working with routes
app.use("/", studentRouter);

const port = 8000;
app.listen(port, () =>
  console.log(`Server is Running at port http://localhost:${port}`)
);
