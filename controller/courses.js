const User = require("../models/User.js");
const Course = require("./../models/Course.js");

exports.createCourse = async (req, res) => {
  const id = req.user._id;

  const course = new Course({ ...req.body, instructor: id });
  await course.save();
  res.send({ course });
};

exports.getCourse = async (req, res) => {
  const userId = req.query.userId;
  let courses;

  if (userId) {
    courses = await Course.find({ instructor: userId }).populate("instructor");
  } else {
    courses = await Course.find().populate("instructor");
  }

  return res.json({ courses });
};

exports.updateCourse = async (req, res) => {
  const filter = { _id: req.params.id };
  const update = req.body;
  const loggedInUser = req.user;

  try {
    // Check if the logged-in user is the owner of the course
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    if (course.instructor.toString() != loggedInUser._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized. You are not the owner of the course.",
      });
    }
    const updatedCourse = await Course.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(updatedCourse);
    res.json({ course: updatedCourse });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "An error occurred while updating the course." });
  }
};
exports.deleteCourse = async (req, res) => {
  const id = req.params.id;
  const loggedInUser = req.user;

  try {
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== loggedInUser._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized. You are not the owner of the course.",
      });
    }

    const deletedCourse = await Course.deleteOne({ _id: id });
    console.log(deletedCourse);
    res.send("delete");
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the course." });
  }
};

exports.selectCourse = async (req, res) => {
  if (req.user.selectedCourses.includes(req.params.id)) {
    return res.status(400).json({ message: "course already selected" });
  }

  req.user.selectedCourses.push(req.params.id);

  updatedUser = await User.findByIdAndUpdate(req.user._id, req.user);

  return res.json({ user: req.user });
};

exports.unselectCourse = async (req, res) => {
  if (!req.user.selectedCourses.includes(req.params.id)) {
    return res.status(400).json({ message: "course was not selected" });
  }

  req.user.selectedCourses = req.user.selectedCourses.filter(
    (e) => e != req.params.id
  );

  updatedUser = await User.findByIdAndUpdate(req.user._id, req.user);

  return res.json({ user: req.user });
};

exports.updateCourseStatus = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, adminFeedback: req.body.adminFeedback },
    { new: true }
  );
  res.json({ course: updatedCourse });
};
