var express = require("express");
var mongoose = require("mongoose");
var joi = require("joi");

module.exports = function(options) {

    // Make our router
    var router = express();

    router.get("/", function(req, res) {
        res.send("Hello World!");
    });

    return router;
};

