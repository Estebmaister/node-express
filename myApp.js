const express = require("express");
const app = express();

// --> 7)  Mount the Logger middleware here

app.use("/", function (req, res, next) {
  const { method, path, ip } = req;
  console.log(`${method} ${path} - ${ip}`);
  next();
});

// --> 11)  Mount the body-parser middleware  here

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

/** 1) Meet the node console. */

console.log("Hello console");

/** 2) A first working Express Server */
// app.METHOD(PATH, HANDLER)

/* app.get("/", function(req, res) {
  res.send('Hello Express');
}) /*

/** 3) Serve an HTML file */

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/", express.static(__dirname + "/public"));

/** 5) serve JSON on a specific route */

// app.get("/json", function (req, res) {
//   res.json({ message: "Hello json" });
// });

/** 6) Use the .env file to configure the app */

message = "Hello json";

if (process.env.MESSAGE_STYLE === "uppercase") {
  message = message.toUpperCase();
}

app.get("/json", function (req, res) {
  res.json({ message: message });
});

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

console.log("Middleware logger active");

/** 8) Chaining middleware. A Time server */

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
/** 12) Get data form POST  */
app
  .route("/name")
  .get((req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }))
  .post((req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }));

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

console.log("Body parser activated");

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
