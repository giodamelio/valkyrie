var express = require("express");
var mongoose = require("mongoose");
var joi = require("joi");

module.exports = function(options) {
    // Connect to ur database
    mongoose.connect(options.mongoUrl);

    // Make our router
    var router = express.Router();

    // Setup our modules
    router.use("/users", require("./modules/users")(options));

    return router;
};

