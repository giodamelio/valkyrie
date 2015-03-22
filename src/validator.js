var joi = require("joi");

module.exports = {
    username: function(username) {
        return joi.validate(username, joi
            .string()
            .min(6)
            .max(24)
            .alphanum()
        );
    }
};

