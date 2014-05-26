var express = require("express");
var mongoose = require("mongoose");
var supertest = require("supertest");
var should = require("should");

var valkyrie = require("..");

var DB_URL = "mongodb://127.0.0.1:27017/valkyrieTest";
var TEST_USERS = [
    { email: "giodamelio", password: "hunter2" },
    { email: "dinnerbone", password: "hunter2" },
    { email: "notch", password: "hunter2" }
];

describe("REST", function() {
    describe("Users", function() {
        // Create our server and fill it with some test data
        var server;
        before(function(done) {
            // Create server
            server = express();

            // Add middleware
            server.use(valkyrie({
                mongoUrl: DB_URL
            }));

            // Add some test records            
            // Get our user model
            User = require("../lib/modules/users/userModel");
            
            // Clear the readd the records
            User.remove({}, function(err) {
                if (err) {
                    done(err);
                }

                User.create(TEST_USERS, function(err) {
                    if (err) {
                        done(err);
                    } else {
                        done();
                    }
                });
            });
        });

        it("should list users", function(done) {
            supertest(server)
                .get("/users")
                .expect("Content-Type", "application/json")
                .expect(200)
                .expect(function(res) {
                    res.body.forEach(function(value, index) {
                        if (value.email != TEST_USERS[index].email) {
                            throw new Error("Emails do not match");
                        } else if (value.password != TEST_USERS[index].password) {
                            throw new Error("Passwords do not match");
                        }
                    });
                })
                .end(done);
        });
    });
});

