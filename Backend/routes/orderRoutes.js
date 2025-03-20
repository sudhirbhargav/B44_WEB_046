const express = require("express");
const Order = require("../models/Order.js");

const router = express.Router();

router.post("/place", async (req, res) => {
  const { userId, medicines, totalPrice } = req.body;

  const order = await Order.create({
    user: userId,
    medicines,
    totalPrice,
    status: "Processing",
  });

  res.json(order);
});

module.exports = router;
