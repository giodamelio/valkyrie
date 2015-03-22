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

describe("Users", function() {
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

    describe("Check if user exists", function() {
        it("Existing username", function(done) {
            supertest(server)
                .get("/users/exists/giodamelio")
                .expect(200)
                .expect({
                    message: "Username exists"
                })
                .end(done);
        });
        it("Available username", function(done) {
            supertest(server)
                .get("/users/exists/newUsername")
                .expect(200)
                .expect({
                    message: "Username available"
                })
                .end(done);
        });
        it("Invalid username (Non alphanumeric)", function(done) {
            supertest(server)
                .get("/users/exists/Invalid_Username")
                .expect(200)
                .expect(function(res) {
                    if (res.body.name != "ValidationError" || res.body.details[0].type != "string.alphanum") {
                        return "Validation fail";
                    }
                })
                .end(done);
        });
        it("Invalid username (Too long)", function(done) {
            supertest(server)
                .get("/users/exists/ReallyReallyReallyLongUsername")
                .expect(200)
                .expect(function(res) {
                    if (res.body.name != "ValidationError" || res.body.details[0].type != "string.max") {
                        return "Validation fail";
                    }
                })
                .end(done);
        });
        it("Invalid username (Too short)", function(done) {
            supertest(server)
                .get("/users/exists/short")
                .expect(200)
                .expect(function(res) {
                    if (res.body.name != "ValidationError" || res.body.details[0].type != "string.min") {
                        return "Validation fail";
                    }
                })
                .end(done);
        });
    });
});

