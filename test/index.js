var express = require("express");
var supertest = require("supertest");
var should = require("should");

var valkyrie = require("..");

describe("REST", function() {
    // Create our server
    var server;
    before(function() {
        server = express();
        server.use(valkyrie({
            mongoUrl: "mongodb://127.0.0.1:27017/valkyrieTest"
        }));
    });

    it("should always send 'Hello World!'", function(done) {
        supertest(server)
            .get("/")
            .expect(200, "Hello World!", done);
    });
});

