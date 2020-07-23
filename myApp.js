const express = require("express");
const app = express();

// The body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
// Logger middleware
app.use("/", (req, res, next) => {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// app.METHOD(PATH, HANDLER) Serve an HTML file
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html"));
app.use("/", express.static(__dirname + "/public"));

// Serve JSON on a specific route & use the .env file to configure the app
message = "Hello json";
if (process.env.MESSAGE_STYLE === "uppercase") message = message.toUpperCase();
app.get("/json", (req, res) => res.json({ message: message }));

// Chaining middleware. A Time server
app.route("/now").get(
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);

// Get input from client - Route parameters
app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));

// Get input from client - Query parameters // /name?first=<firstname>&last=<lastname>
// Get data form POST body
app
  .route("/name")
  .get((req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }))
  .post((req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }));

module.exports = app;
