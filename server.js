function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get("x-forwarded-proto") !== "https") {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.use(requireHTTPS);

app.use(express.static(__dirname + "/dist/ruby-todo"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/ruby-todo/index.html"));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
