var koa = require("koa");
var mount = require("koa-mount");
var co = require("co");
var robe = require("robe");
var _ = require("lodash").runInContext();
_.mixin({"defaultsDeep": require("merge-defaults")});

var logger = require("./logger");

var defaultConfig = {
    database: {
        type: "mongodb",
        url: "localhost/valkyrie"
    }
};

module.exports = function(config) {
    return co(function*() {
        // Merge config with defaults
        config = _.defaultsDeep(config, defaultConfig);

        // Connect to the database
        var db = yield robe.connect(config.database.url);

        // Create our sub-server
        var app = koa();

        // Require our plugins
        var users = require("./users");
        app.use(mount(users.path, users.middleware(db)));

        return mount("/", app);
    });
};

