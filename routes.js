const express = require("express");
const { login, register } = require("./controller/users.js");
const { createCourse, updateCourse } = require("./controller/courses.js");

const authenticate = require("./middleware/authenticate.js");
const authorizeOnly = require("./middleware/authorize.js");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post(
  "/course",

  authenticate,
  authorizeOnly("instructor"),

  createCourse
);

router.put(
  "/course/:id",
  authenticate,
  authorizeOnly("instructor"),
  updateCourse
);

module.exports = router;
