const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
