var should = require("should");
var hapi = require("hapi");

var valkyrie = require("../");

describe("Test", function() {
    var server = new hapi.Server();

    it("Loads plugin successfully", function(done) {
        server.register({
            register: valkyrie,
            options: {}
        }, function(err) {
            should.not.exist(err);
            done();
        });
    });
});

