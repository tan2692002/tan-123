const mongoose = require("mongoose");
const Buyer = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "secret"],
  },
  age: {
    type: Number,
    required: true,
  },
  boughtProductId: {
    type: Array,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Buyer", Buyer);
