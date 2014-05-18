var express = require("express");
var jsonschema = require("jsonschema");

module.exports = function(options) {
    // Validate our options
    if (!options) {
        throw new Error("Missing options");
    } else {
        var schema = {
            type: "object",
            properties: {
                "mongoUrl": {
                    type: "string",
                    required: true
                }
            }
        };
        var validated = jsonschema.validate(options, schema);
        if (validated.errors.length > 0) {
            throw new Error(validated.errors[0].stack);
        }
    }

    // Make our router
    var router = express.Router();

    router.get("/", function(req, res) {
        res.send("Hello World!");
    });

    return router;
};

