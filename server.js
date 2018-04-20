var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Setting up Passport for Username/Password authentication
app.get('/', function (req, res) {
  res.send('Welcome to Linked Learning.  Please enter your username/password.');
});
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Routes
require("./routes/link-api-routes.js")(app);
require("./routes/author-api-routes.js")(app);
var authRoute = require('./routes/auth.js')(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
