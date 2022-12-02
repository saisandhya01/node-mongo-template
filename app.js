const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); //Parse incoming request bodies in a middleware before your handlers, available under the req.body property
const app = express();
require("dotenv/config");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

//use as middleware for every routes
app.use(bodyParser.json());

const postRouter = require("./routes/post");

app.use("/posts", postRouter);

app.listen(4000, () => {
  console.log("Server listening at port 4000");
});
