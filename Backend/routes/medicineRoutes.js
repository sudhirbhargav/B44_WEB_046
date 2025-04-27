const express = require("express");
const Medicine = require("../models/Medicine.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sortBy, order } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    let sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = order === "desc" ? -1 : 1;
    }

    const medicines = await Medicine.find(filter).sort(sortOptions);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
