const express = require("express");
const Medicine = require("../models/Medicine.js");

const router = express.Router();

router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

router.post("/", async (req, res) => {
  const { name, category, price, brand, stock } = req.body;
  const medicine = await Medicine.create({
    name,
    category,
    price,
    brand,
    stock,
  });
  res.json(medicine);
});

module.exports = router;
