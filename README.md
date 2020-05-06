## Backend Challenges Boilerplate - Basic Express

![GitHub package.json version](https://img.shields.io/github/package-json/v/estebmaister/boilerplate-express?color=blue&style=plastic&logo=github) ![GitHub package.json dependency version express](https://img.shields.io/github/package-json/dependency-version/estebmaister/boilerplate-express/express?style=plastic&logo=express) ![License](https://img.shields.io/github/license/estebmaister/boilerplate-express) [![Twitter Follow](https://img.shields.io/twitter/follow/estebmaister?label=Follow&style=social)](https://twitter.com/estebmaister)

Created from the FCC repository, to compile the lessons about node and express.

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F31OD9K)

Start with an empty repository and making the git init as follows:

```git
echo # boilerplate-express >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/Estebmaister/boilerplate-express.git
git push -u origin master
```

Adding the files from the original repo in FCC and start to coding.

## Scripts

To install all the dependencies :

```npm
npm install
```

To run the server

```node
node server.js
```

## Challenges

### 1. Meet the Node console

During the development process, it is important to be able to check what’s going on in your code. Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see the console output in a terminal. On Glitch you can open the logs in the lower part of the screen. You can toggle the log panel with the button ‘Logs’ (lower-left, inside the tools menu).

We recommend to keep the log panel open while working at these challenges. By reading the logs, you can be aware of the nature of errors that may occur.

- Added `console.log("Hello World")` to myApp.js.

### 2. Start a Working Express Server

In the first two lines of the file`myApp.js`, you can see how easy it is to create an Express app object. This object has several methods, and you will learn many of them in these challenges. One fundamental method is `app.listen(port)`. It tells your server to listen on a given port, putting it in running state. You can see it at the bottom of the file. It is inside comments because, for testing reasons, we need the app to be running in the background. All the code that you may want to add goes between these two fundamental parts. Glitch stores the port number in the environment variable `process.env.PORT`. Its value is `3000`.

Let’s serve our first string! In Express, routes takes the following structure: `app.METHOD(PATH, HANDLER)`. METHOD is an http method in lowercase. PATH is a relative path on the server (it can be a string, or even a regular expression). HANDLER is a function that Express calls when the route is matched.

Handlers take the form `function(req, res) {...}`, where req is the request object, and res is the response object. For example, the handler

```node
function(req, res) {
  res.send('Response String');
}
```

will serve the string 'Response String'.

- Added `app.get("/", function(req, res) {res.send('Hello Express');})` to myApp.js.

### 3. Serve an HTML File

You can respond to requests with a file using the `res.sendFile(path)` method. You can put it inside the `app.get('/', ...)` route handler. Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path. We recommend you to use the Node global variable `\_\_dirname` to calculate the path like this:

```node
absolutePath = __dirname + relativePath / file.ext;
```

- Changed handler `app.get("/", function(req, res) {res.sendFile(__dirname + "/views/index.html");})` in myApp.js.

### 4. Serve Static Assets

An HTML server usually has one or more directories that are accessible by the user. You can place there the static assets needed by your application (stylesheets, scripts, images). In Express, you can put in place this functionality using the middleware `express.static(path)`, where the `path` parameter is the absolute path of the folder containing the assets. If you don’t know what middleware is... don’t worry, we will discuss in detail later. Basically, middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method `app.use(path, middlewareFunction)`. The first `path` argument is optional. If you don’t pass it, the middleware will be executed for all requests.

- Added `app.use("/",express.static(__dirname + "/public" ))` to myApp.js.

### 5. Serve JSON on a Specific Route

While an HTML server serves (you guessed it!) HTML, an API serves data. A REST (REpresentational State Transfer) API allows data exchange in a simple way, without the need for clients to know any detail about the server. The client only needs to know where the resource is (the URL), and the action it wants to perform on it (the verb). The GET verb is used when you are fetching some information, without modifying anything. These days, the preferred data format for moving information around the web is JSON. Simply put, JSON is a convenient way to represent a JavaScript object as a string, so it can be easily transmitted.

Let's create a simple API by creating a route that responds with JSON at the path `/json`. You can do it as usual, with the `app.get()` method. Inside the route handler, use the method `res.json()`, passing in an object as an argument. This method closes the request-response loop, returning the data. Behind the scenes, it converts a valid JavaScript object into a string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back. A valid object has the usual structure `{key: data}`. `data` can be a number, a string, a nested object or an array. `data` can also be a variable or the result of a function call, in which case it will be evaluated before being converted into a string.

- Added `app.get("/json", function(req, res) {res.json({ "message": "Hello json" }); });` to myApp.js.

### 6. Use the .env File

The `.env` file is a hidden file that is used to pass environment variables to your application. This file is secret, no one but you can access it, and it can be used to store data that you want to keep private or hidden. For example, you can store API keys from external services or your database URI. You can also use it to store configuration options. By setting configuration options, you can change the behavior of your application, without the need to rewrite some code.

The environment variables are accessible from the app as `process.env.VAR_NAME`. The `process.env` object is a global Node object, and variables are passed as strings. By convention, the variable names are all uppercase, with words separated by an underscore. The `.env` is a shell file, so you don’t need to wrap names or values in quotes. It is also important to note that there cannot be space around the equals sign when you are assigning values to your variables, e.g. `VAR_NAME=value`. Usually, you will put each variable definition on a separate line.

- Added the following code to myApp.js.

```node
message = "Hello json";

if (process.env.MESSAGE_STYLE === "uppercase") {
  message = message.toUpperCase();
}

app.get("/json", function (req, res) {
  res.json({ message: message });
});
```

For this to work you have to pass the variable in your terminal or install other dependencies for .env files.

i.e. `npx cross-env MESSAGE_STYLE=uppercase node server`

For Linux Mac or Windows after install **cross-env**, or `npx node-env-run server` with **node-env-run** and the `.dev` file.

Another possible choice is **dotenv** with an extra line the code: `require('dotenv').config();` at the top of your `js` for load all the variables in `.env`.

### 7.Implement a Root-Level Request Logger Middleware

Earlier, you were introduced to the `express.static()` middleware function. Now it’s time to see what middleware is, in more detail. Middleware functions are functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, `next()`.

Look at the following example:

```node
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

Let’s suppose you mounted this function on a route. When a request matches the route, it displays the string “I’m a middleware…”, then it executes the next function in the stack. In this exercise, you are going to build root-level middleware. As you have seen in challenge 4, to mount a middleware function at root level, you can use the `app.use(<mware-function>)` method. In this case, the function will be executed for all the requests, but you can also set more specific conditions. For example, if you want a function to be executed only for POST requests, you could use `app.post(<mware-function>)`. Analogous methods exist for all the HTTP verbs (GET, DELETE, PUT, …).
