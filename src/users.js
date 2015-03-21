var router = require("koa-router")();

module.exports = {
    path: "/users",
    middleware: function(db) {
        var Users = db.collection("Users");

        // List users
        router.get("/", function*() {
            var users = yield Users.find({});
            this.body = users;
        });

        return router.routes();
    }
};

