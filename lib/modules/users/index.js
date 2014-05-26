var express = require("express");

var User = require("./userModel");

module.exports = function(options) {
    var router = express.Router();
    
    // List all users
    router.get("/", function(req, res) {
        res.type("application/json");
        User.find({}, function(err, users) {
            res.send(users);
        });
    });

    return router;
};

