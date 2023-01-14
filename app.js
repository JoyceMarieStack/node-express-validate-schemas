const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const Ajv = require("ajv");
const fs = require("fs");
const { json } = require("express");

const app = express();
const ajv = new Ajv();

// configure the app to use bodyParser()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// load schema file
const schema = JSON.parse(fs.readFileSync("schema.json", "utf8"));

// compile schema for validation
const validate = ajv.compile(schema);

// configure the app to use multer for file uploads
const upload = multer();

// configure the app to use ejs for templating
app.set("view engine", "ejs");
app.set("views", "views");

app.get("/", (req, res) => {
  res.render("upload-form");
});

app.post("/", upload.single("jsonFile"), (req, res) => {
  let jsonFile = req.file;
  let jsonData = JSON.parse(jsonFile.buffer.toString());
  if (!validate(jsonData)) {
    jsonData = { error: validate.errors };
    return res.render("json-data", { jsonData });
  }

  res.render("json-data", { jsonData });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
