var express = require("express");
var supertest = require("supertest");

var valkyrie = require("..");

describe("valkyrie", function() {
    // Create our server
    var server;
    before(function() {
        server = express();
        server.use(valkyrie());
    });

    it("should always send 'Hello World!'", function(done) {
        supertest(server)
            .get("/")
            .expect(200, "Hello World!", done);
    });
});

