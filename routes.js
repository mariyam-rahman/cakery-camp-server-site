const express = require("express");
const {
  login,
  register,
  updateUserRole,
  updateProfile,
  getUsers,
} = require("./controller/users.js");
const {
  createCourse,
  updateCourse,
  getCourse,
  deleteCourse,
  selectCourse,
  unselectCourse,
  updateCourseStatus,
} = require("./controller/courses.js");

const authenticate = require("./middleware/authenticate.js");
const authorizeOnly = require("./middleware/authorize.js");

const router = express.Router();

// --------user module
router.post("/login", login);
router.post("/register", register);

router.put("/user", authenticate, updateProfile);
router.put(
  "/user/:id/role",
  authenticate,
  authorizeOnly("admin"),
  updateUserRole
);

// --------course module

router.get("/courses", getCourse);
router.get("/users", getUsers);

router.post("/course", authenticate, authorizeOnly("instructor"), createCourse);

router.put(
  "/course/:id",
  authenticate,
  authorizeOnly("instructor"),
  updateCourse
);

router.put(
  "/course/:id/status",
  authenticate,
  authorizeOnly("admin"),
  updateCourseStatus
);

router.delete(
  "/course/:id",
  authenticate,
  authorizeOnly("instructor"),
  deleteCourse
);

router.post("/course/:id/select", authenticate, selectCourse);
router.delete("/course/:id/select", authenticate, unselectCourse);

module.exports = router;
