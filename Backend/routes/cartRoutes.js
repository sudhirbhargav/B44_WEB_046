const express = require("express");
const Cart = require("../models/Cart.js");

const router = express.Router();

router.post("/add", async (req, res) => {
  const { userId, medicineId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  cart.items = cart.items || [];

  const existingItem = cart.items.find(
    (item) => item.medicine.toString() === medicineId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ medicine: medicineId, quantity });
  }

  await cart.save();
  res.json(cart);
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let cart = await Cart.findOne({ user: userId }).populate("items.medicine");

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart" });
  }
});

module.exports = router;
