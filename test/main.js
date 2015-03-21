var http = require("http");

var koa = require("koa");
var supertest = require("supertest");

var valkyrie = require("..");

describe("main", function() {
    var server, app;
    before(function() {
        // Create koa app
        app = koa();

        // Add valkyrie middleware
        app.use(valkyrie());

        // Start the server
        server = http.createServer(app.callback());
    });

    it("should return 'Hello World!'", function(done) {
        supertest(server)
            .get("/")
            .expect(200)
            .expect("Hello World!")
            .end(done);
    });
});

