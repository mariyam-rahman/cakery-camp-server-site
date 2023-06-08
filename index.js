const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Course = require("./models/Courses");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;
const router = require("./routes");
//middleware
app.use(cors());
app.use(express.json());
app.use(router);

async function main() {
  await mongoose
    .connect(
      "mongodb+srv://cakery-camp:Vyim8nr6cl88fg3Y@wezency.fl0crhl.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("connected"));
}
main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/courses", async (req, res) => {
  res.send("specific class (instructor)");
});
app.post("/course", async (req, res) => {
  console.log(req.body);
  const course = new Course(req.body);
  await course.save();
  res.send("all classes");
});
app.put("/course/:id", async (req, res) => {
  const filter = { _id: req.params.id }; // Assuming you want to update by the course ID
  const update = req.body; // Assuming the request body contains the updated course information
  const updatedCourse = await Course.findOneAndUpdate(filter, update, {
    new: true,
  });
  console.log(updatedCourse);
  res.send("update");
});
app.delete("/course/:id", async (req, res) => {
  const id = req.params.id;
  const deletedCourse = await Course.deleteOne({ _id: id }); // returns {deletedCount: 1}
  console.log(deletedCourse);
  res.send("delete");
});

app.put("/user/:id", (req, res) => {
  res.send("me (without role), admin");
});
app.post("/course/:id/select", (req, res) => {
  res.send("student");
});
app.delete("/course/:id/select", (req, res) => {
  res.send("student");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
