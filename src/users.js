var router = require("koa-router")();

module.exports = {
    path: "/users",
    middleware: function(db) {
        var Users = db.collection("Users");

        // Check if user exists
        router.get("/exists/:username", function*() {
            var user = yield Users.findOne({
                username: this.params.username
            });

            if (user) {
                this.body = {
                    message: "Username exists"
                };
            } else {
                this.body = {
                    message: "Username available"
                };
            }
        });

        return router.routes();
    }
};

