const mongoose = require("mongoose");

const { check, validationResult } = require("express-validator");

const ContactSchema = mongoose.Schema({
  // Each contact should related to a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  type: {
    type: String,
    default: "personal", // default as personal, user can change it to professional
  },
  date: {
    type: Date,
    default: Date.now, // put the current time by default
  },
});

module.exports = mongoose.model("contact", ContactSchema);
