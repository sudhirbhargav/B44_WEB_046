const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized, token failed" });
  }
});

module.exports = router;
