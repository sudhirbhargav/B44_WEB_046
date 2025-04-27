const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    const hash = bcrypt.hashSync(password, 10);
    await User.create({ name, email, password: hash });
    res.json({ message: "User generated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exists" });
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass)
      return res.status(400).json({ message: "Wrong Password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
