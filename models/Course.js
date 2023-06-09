const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const courseSchema = new mongoose.Schema({
  name: String,
  instructor: mongoose.SchemaTypes.ObjectId,
  email: String,
  photoUrl: String,
  availableSeats: Number,
  price: Number,
  details: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
