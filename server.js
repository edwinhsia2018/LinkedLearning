var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var routes = require("./controllers/link_controller.js")

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
