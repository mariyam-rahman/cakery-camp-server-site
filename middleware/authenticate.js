const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

module.exports = async (req, res, next) => {
  // check if token in the request
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No Token Provided" });
  }
  console.log({ autHeader: req.headers.authorization });
  // verify the tokenn b
  try {
    var decoded = jwt.verify(token, "abc");
    // decoded = { id: user._id }
  } catch (err) {
    // err
    // please login
    return res.status(401).json({ message: "Please login. jwt invalid" });
  }
  const userId = decoded.id;
  // search the user from database
  const user = await User.findById(userId);

  if (!user) {
    return res
      .status(404)
      .json({ message: "No user found, please contact customer support." });
  }
  req.user = user;
  next();
  // approve or reject
  //   // approve = next()
  //   // reject = return res.json({no user found, please contact customer support})
};
