## Backend Challenges Boilerplate - Basic Express

Created from the FCC repository

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

## Challenges

### 1. Meet the Node console

During the development process, it is important to be able to check what’s going on in your code. Node is just a JavaScript environment. Like client side JavaScript, you can use the console to display useful debug information. On your local machine, you would see the console output in a terminal. On Glitch you can open the logs in the lower part of the screen. You can toggle the log panel with the button ‘Logs’ (lower-left, inside the tools menu).

We recommend to keep the log panel open while working at these challenges. By reading the logs, you can be aware of the nature of errors that may occur.

- Added `console.log("Hello World")` in myApp.js

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

### 3. Serve an HTML File

You can respond to requests with a file using the `res.sendFile(path)` method. You can put it inside the `app.get('/', ...)` route handler. Behind the scenes, this method will set the appropriate headers to instruct your browser on how to handle the file you want to send, according to its type. Then it will read and send the file. This method needs an absolute file path. We recommend you to use the Node global variable `\_\_dirname` to calculate the path like this:

```node
absolutePath = __dirname + relativePath / file.ext;
```

Send the `/views/index.html` file as a response to GET requests to the `/` path. If you view your live app, you should see a big HTML heading (and a form that we will use later…), with no style applied.

Note: You can edit the solution of the previous challenge or create a new one. If you create a new solution, keep in mind that Express evaluates routes from top to bottom, and executes the handler for the first match. You have to comment out the preceding solution, or the server will keep responding with a string.

### 4. Serve Static Assets

An HTML server usually has one or more directories that are accessible by the user. You can place there the static assets needed by your application (stylesheets, scripts, images). In Express, you can put in place this functionality using the middleware `express.static(path)`, where the `path` parameter is the absolute path of the folder containing the assets. If you don’t know what middleware is... don’t worry, we will discuss in detail later. Basically, middleware are functions that intercept route handlers, adding some kind of information. A middleware needs to be mounted using the method `app.use(path, middlewareFunction)`. The first `path` argument is optional. If you don’t pass it, the middleware will be executed for all requests.

```

```
