var express = require("express");
var joi = require("joi");

module.exports = function(options) {
    // Validate our options
    var optionsSchema = joi.object().keys({
        mongoUrl: joi.string().required(),
    });
    joi.validate(options, optionsSchema, function(error, value) {
        if (error) {
            throw error;
        }
    });

    // Make our router
    var router = express.Router();

    router.get("/", function(req, res) {
        res.send("Hello World!");
    });

    return router;
};

