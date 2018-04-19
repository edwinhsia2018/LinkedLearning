// Requiring our models
var db = require("../models");

// Routes
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/links", function(req, res) {
    var query = {};
    if (req.query.url_id) {
      query.urlId = req.query.url_id;
    }
    db.Link.findAll({
      where: query,
      include: [db.Author]
    }).then(function(dbLink) {
      res.json(dbLink);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/links/:id", function(req, res) {
    db.Link.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Author]
    }).then(function(dbLink) {
      res.json(dbLink);
    });
  });

  // POST route for saving a new post
  app.post("/api/links", function(req, res) {
    db.Link.create(req.body).then(function(dbLink) {
      res.json(dbLink);
    });
  });

  // PUT route for updating posts
  app.put("/api/links", function(req, res) {
    db.Link.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbLink) {
      res.json(dbLink);
    });
  });
};
