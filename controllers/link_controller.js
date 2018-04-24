var express = require("express");
var router = express.Router();

var link = require("../models/links.js")

router.get("/", function(req, res){
    link.all(function(data){
        var searchObj = {
            link: data
        };
        res.render("index", searchObj);
    });
});

                                                                                                                                                                                                                                        

router.post("/api/links", function(req, res){
    link.create([
        "link_name"],
        [req.body.link_name], function (result){
            res.json({id: result.insertID});
        })
})

router.put("/api/link/:id", function(req, res){
    var fav = "id = " + req.params.id;

    link.update({
        favorite: true}), function(result){
            return res.status(200).end();
        }
})

module.exports = router;