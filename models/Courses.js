const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const courseSchema = new mongoose.Schema({
  name: String,
  instructorName: String,
  email: String,
  photoUrl: String,
  availableSeats: Number,
  price: Number,
  details: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
