const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  genre: { type: String },
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);