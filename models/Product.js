const mongoose = require("mongoose");
const Product = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imagePath: {
    type: Array,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  CPU: {
    type: String,
    required: true,
  },
  screenSize: {
    type: String,
    required: true,
  },
  RAM: {
    type: Number,
    required: true,
  },
  maxRAM: {
    type: Number,
    required: true,
  },
  GPU: {
    type: String,
    required: true,
  },
  graphicCard: {
    type: String,
    required: true,
  },
  OS: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Product", Product);
