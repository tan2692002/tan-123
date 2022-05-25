const mongoose = require("mongoose");
const Receipt = mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Buyer',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  payInMethod: {
    type: String,
    enum: ["cash", "credit card", "installment"],
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Receipt", Receipt);
