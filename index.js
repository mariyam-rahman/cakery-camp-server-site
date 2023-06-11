const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Course = require("./models/Course");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const router = require("./routes");
//middleware
app.use(cors());
app.use(express.json());
app.use(router);

async function main() {
  await mongoose
    .connect(process.env.MONGO_STRING)
    .then(() => console.log("connected"));
}
main().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
