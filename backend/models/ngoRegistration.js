const mongoose = require("mongoose");
const ngoSchema = mongoose.Schema(
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
    Password: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Pin: {
      type: Number,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const ngoRegistration = mongoose.model("NGO'S", ngoSchema);
module.exports = ngoRegistration;
