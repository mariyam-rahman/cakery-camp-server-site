const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  photoUrl: String,
  availableSeats: Number,
  price: Number,
  details: String,
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  adminFeedback: String,
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
