// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var connection = require("./config/connection");
var orm = require("./config/orm.js");


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================
var app = express();
app.use(express.static("public"));
app.use(express.static("views"));

var method = methodOverride();

// Sets an initial port. We"ll use this in the listener
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "burgers_db"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// Serve index.handlebars to the root route.
// app.get("/index", function(req, res) {
//     console.log("i am about to make the connection query");
//     c.query("SELECT * FROM burgers_t WHERE devoured IS false ORDER BY id", function(err, data) {
//       if (err) {
//           console.log(err);
//         return res.status(500).end();
//       }
//       console.log(JSON.stringify(data));
//       res.render("index", { burger: data });
//     });
//   });

app.get("/index", function (req, res) {
  // Then display the JSON for the  burgers
  // (Note how we're using the ORM here to run our searches)
  console.log("server.js get");
  orm.selectAll(function (data) {
    console.log(data);
    var uneaten = [];
    var eaten = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].devoured) {
        eaten.push(data[i])
      } else {
        uneaten.push(data[i])
      }
    }
    console.log(JSON.stringify(uneaten));
    console.log(JSON.stringify(eaten));
    res.render("index", {uneatenBurger: uneaten, eatenBurger: eaten});
  });
});

app.get("/", function (req, res) {
  // Then display the JSON for the  burgers
  // (Note how we're using the ORM here to run our searches)
  console.log("server.js get");
  orm.selectAll(function (data) {
    console.log(data);
    var uneaten = [];
    var eaten = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].devoured) {
        eaten.push(data[i])
      } else {
        uneaten.push(data[i])
      }
    }
    console.log(JSON.stringify(uneaten));
    console.log(JSON.stringify(eaten));
    res.render("index", {uneatenBurger: uneaten, eatenBurger: eaten});
  });
});


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================
require("./routing/apiRoutes")(app);

// require("./routing/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});