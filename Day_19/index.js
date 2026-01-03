const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userroutes = require("./routes/usersroutes");
const questionroutes = require("./routes/questionroutes");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://abhishek:1234@cluster0.1hnzsya.mongodb.net/skillswap"
    );
    console.log("MongoDB Atlas connection created!");
  } catch (err) {
    console.log("Connection ERROR with MongoDB Atlas");
  }
};
connectDB();

app.use(express.json());
app.use("/user", userroutes);
app.use("/question", questionroutes);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Application running at port ${port}`));
