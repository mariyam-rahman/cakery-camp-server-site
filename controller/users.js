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
  const token = jwt.sign({ id: user._id }, "shhhhh");
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
