var http = require("http");

var koa = require("koa");
var supertest = require("supertest");
var monk = require("monk");
var bluebird = require("bluebird");
var _ = require("lodash");

var valkyrie = require("..");

var databaseUri = "localhost/valkyrie-test";

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
    var server, app, db;
    before(function() {
        // Create koa app
        app = koa();

        // Add valkyrie middleware
        app.use(valkyrie({
            mongoUri: databaseUri
        }));

        // Start the server
        server = http.createServer(app.callback());

        // Connect to our database
        db = monk(databaseUri);
    });

    // Delete mock data
    after(function(done) {
        db.get("users")
            .remove({})
            .then(function() {
                done();
            });
    });

    // Load our mock data
    beforeEach(function(done) {
        bluebird.all(mockUsers.map(function(user) {
            var copyOfUser = _.cloneDeep(user);
            console.log(copyOfUser);
            return db.get("users").insert(copyOfUser);
        })).then(function() {
            console.log("Done");
            done();
        });
    });

    // Delete mock data
    afterEach(function(done) {
        db.get("users")
            .remove({})
            .then(function() {
                done();
            });
    });

    it("List users", function(done) {
        supertest(server)
            .get("/users")
            .expect(200)
            .expect(mockUsers)
            .end(done);
    });
});

