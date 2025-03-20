const express = require("express");
const Cart = require("../models/Cart.js");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, medicineId, quantity } = req.body;
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, medicines: [] });
  }

  const existingItem = cart.medicines.find(
    (item) => item.medicine.toString() === medicineId
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.medicines.push({ medicine: medicineId, quantity });
  }

  await cart.save();
  res.json(cart);
});

module.exports = router;
