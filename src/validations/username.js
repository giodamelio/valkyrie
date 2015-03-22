var joi = require("joi");

module.exports = function(username) {
    return joi.validate(
        username, 
        joi
            .string()
            .min(6)
            .max(24)
            .alphanum()
    );
};

