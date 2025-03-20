const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      quantity: Number,
    },
  ],
  status: { type: String, default: "Processing" },
  totalPrice: Number,
});

module.exports = mongoose.model("Order", orderSchema);
