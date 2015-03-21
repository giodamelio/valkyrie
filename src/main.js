var koa = require("koa");
var mount = require("koa-mount");
var _ = require("lodash");
var monk = require("monk");

var logger = require("./logger");

var defaultConfig = {
    mongoUri: "localhost/valkyrie"
};

module.exports = function(config) {
    // Merge config with defaults
    config = _.extend(defaultConfig, config);

    // Connect to the database
    var db = monk(config.mongoUri);

    // Create our sub-server
    var app = koa();

    // Require our plugins
    var users = require("./users");
    app.use(mount(users.path, users.middleware(db)));

    return mount("/", app);
};

