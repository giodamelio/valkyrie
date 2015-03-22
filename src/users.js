var router = require("koa-router")();

var validator = require("./validations");

module.exports = {
    path: "/users",
    middleware: function(db) {
        var Users = db.collection("Users");

        // Check if user exists
        router.get("/exists/:username", function*() {
            // Check if username is valid
            var isValid = yield validator.username(this.params.username); 
            if (isValid.error) {
                this.body = isValid.error;
                return;
            }

            // See if the username is taken
            var user = yield Users.findOne({
                username: this.params.username
            });

            if (user) {
                this.body = {
                    message: "Username exists"
                };
                return;
            } else {
                this.body = {
                    message: "Username available"
                };
                return;
            }
        });

        return router.routes();
    }
};

