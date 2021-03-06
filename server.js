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


// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from the URL.
// ================================================================================
// require("./controllers/burgers_controllers")(app);
var routes = require("./controllers/burgers_controllers.js");

app.use("/", routes);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});