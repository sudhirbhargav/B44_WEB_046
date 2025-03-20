const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  medicines: [
    {
      medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
