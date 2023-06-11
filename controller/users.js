const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(400)
      .json({ message: "User Not Found. Please register!" });
  }
  if (user.password != req.body.password) {
    return res.status(400).json({ message: "password is not valid" });
  }
  const token = jwt.sign({ id: user._id }, "abc");
  res.send({ user, token });
};

exports.register = async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  console.log(existingUser);

  if (existingUser) {
    return res.status(400).json({ message: "already user existed" });
  }
  const user = new User(req.body);
  await user.save();

  res.send({
    user: user,
  });
};

exports.updateProfile = async (req, res) => {
  if (req.body.role) {
    return res
      .status(401)
      .json({ message: "Only admins can update user roles." });
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  // Extract only the relevant user fields for the response
  const { _id, name, email, selectedCourses } = updatedUser;

  return res.json({ user: { _id, name, email, selectedCourses } });
};

exports.updateUserRole = async (req, res) => {
  if (!["student", "instructor", "admin"].includes(req.body.role)) {
    return res.status(400).json({ message: "invalid role" });
  }
  const userExist = await User.findById(req.params.id);
  if (!userExist) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const newUser = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    { new: true }
  );
  return res.json({ user: newUser });
};

exports.getUsers = async (req, res) => {
  if (req.query.type) {
    const users = await User.find({ type: req.query.type });
    return res.json({ users });
  } else {
    const users = await User.find();
    return res.json({ users });
  }
};
