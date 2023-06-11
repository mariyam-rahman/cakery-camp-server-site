const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");
const Course = require("./models/Course");
const app = express();

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 