// Monky patch mocha to support co
var mochaCo = require("co-mocha");

var http = require("http");

var koa = require("koa");
var robe = require("robe");
var supertest = require("supertest");

var valkyrie = require("..");

var databaseConfig = {
    type: "mongodb",
    url: "localhost/valkyrieTest"
};

var mockUsers = [
    {
        username: "giodamelio",
        password: "someRandomPassword"
    },
    {
        username: "johndoe",
        password: "hunter2"
    },
    {
        username: "janedoe",
        password: "worst password ever"
    }
];

describe("users", function() {
    var server, app, db, Users;
    before(function*() {
        // Connect to the database
        db = yield robe.connect(databaseConfig.url);

        // Get users collection
        Users = db.collection("Users");

        // Create koa app
        app = koa();

        // Add our middleware
        app.use(yield valkyrie({
            database: databaseConfig 
        }));

        // Create the server
        server = http.createServer(app.callback());
    });

    // Load our mock data
    beforeEach(function*() {
        yield Users.insert(mockUsers);
    });

    // Delete mock data
    afterEach(function*() {
        yield Users.remove({});
    });

    it("List users", function(done) {
        supertest(server)
            .get("/users")
            .expect(200)
            .expect(function(res) {
                if (res.body.length !== 3) return "Wrong amount of users";
            })
            .end(done);
    });
});

