const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  role: String,

  email: { type: String, unique: true },
  photoUrl: String,
  password: String,
  selectedCourses: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
