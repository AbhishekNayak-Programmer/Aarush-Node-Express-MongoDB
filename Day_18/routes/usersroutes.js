const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("../model/users");
const router = express.Router();

// URL - /user/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new Users({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "User Created",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: "Unable to Signup",
    });
  }
});

// URL - /user/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) throw new Error("No User Found with this email");
    const isMatch = await bcrypt.compare(password, user.password);

    res.status(200).json({
      login_credentials: isMatch,
      _id: user._id,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

// URL - /user/edit/:id
router.patch("/edit/:id", async (req, res) => {
  try {
    const { firstname, lastname, email, username, schoolid, grade } = req.body;
    const userId = req.params.id;
    const user = await Users.findOne({ _id: userId });
    if (!user) throw new Error("No User Found with this id");

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (username) user.username = username;
    if (schoolid) user.schoolid = schoolid;
    if (grade) user.grade = grade;

    await user.save({ new: true });

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
});

module.exports = router;
