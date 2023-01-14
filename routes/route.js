exports.home = function (req, res) {
  res.render("home");
};

exports.uploadForm = function (req, res) {
  res.render("upload-form");
};

exports.jsonResults = function (req, res) {
  res.render("json-data");
};
