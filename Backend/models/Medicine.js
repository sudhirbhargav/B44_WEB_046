const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  brand: String,
  stock: Number,
});

module.exports = mongoose.model("Medicine", medicineSchema);
