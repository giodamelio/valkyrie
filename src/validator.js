var joi = require("joi");
var thunkify = require("thunkify");

var validate = thunkify(joi.validate);

module.exports = {
    username: function(username) {
        return validate(username, joi
            .string()
            .min(6)
            .max(24)
            .alphanum()
        );
    },
    password: function(password) {
        return validate(password, joi
            .string()
            .min(6)
            .max(256)
        );
    }
};

