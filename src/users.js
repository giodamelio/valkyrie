var router = require("koa-router")();

module.exports = {
    path: "/users",
    middleware: function(db) {
        var Users = db.get("users");

        router.get("/", function*() {
            var users = yield Users.find({});

            // Remove id's
            users = users.map(function(user) {
                var newUser = user;
                delete newUser._id;
                return newUser;
            });

            this.body = yield users;
        });

        return router.routes();
    }
};

