const mongoose = require("mongoose");
const donorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
    },
    ngoEmail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const donorDetails = mongoose.model("donorDetails", donorSchema);
module.exports = donorDetails;
