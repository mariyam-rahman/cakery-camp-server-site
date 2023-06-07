const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/courses", (req, res) => {
  res.send("all classes");
});
app.post("/course", (req, res) => {
  res.send("specific class (instructor)");
});
app.put("/course/:id", (req, res) => {
  res.send("update");
});
app.delete("/course/:id", (req, res) => {
  res.send("delete");
});
app.post("/login", (req, res) => {
  res.send("login");
});
app.post("/register", (req, res) => {
  res.send("register");
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
