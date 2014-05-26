express = require "express"
mongoose = require "mongoose"
supertest = require "supertest"
should = require "should"

valkyrie = require "../lib"

# Define some constants
DB_URL = "mongodb://127.0.0.1:27017/valkyrieTest"
TEST_USERS = [
    { email: "giodamelio", password: "hunter2" },
    { email: "dinnerbone", password: "hunter2" },
    { email: "notch", password: "hunter2" }
]

describe "REST", ->
    describe "Users", ->
        # Create our server and fill it with some test data
        server = undefined
        before (done) ->
            # Create server
            server = express()
            
            # Add middleware
            server.use valkyrie(mongoUrl: DB_URL)
            
            # Add some test records
            # Get our user model
            User = require("../lib/modules/users/userModel")
            
            # Clear the readd the records
            User.remove {}, (err) ->
                done err    if err
                User.create TEST_USERS, (err) ->
                    if err
                        done err
                    else
                        done()
        
        # List all the users
        it "should list users", (done) ->
            supertest(server)
            .get "/users"
            .expect "Content-Type", "application/json"
            .expect 200
            .expect (res) ->
                for value, index in res.body
                    if value.email isnt TEST_USERS[index].email
                        throw new Error("Emails do not match")
                    else if value.password isnt TEST_USERS[index].password
                        throw new Error("Passwords do not match")
                return false
            .end done

