const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const ejs = require("ejs");

const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure the app to use multer for file uploads
const upload = multer();

// configure the app to use ejs for templating
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("upload-form");
});

app.post("/", upload.single("jsonFile"), (req, res) => {
  const jsonFile = req.file;
  const jsonData = JSON.parse(jsonFile.buffer.toString());
  res.render("json-data", { jsonData });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
