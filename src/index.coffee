express = require "express"
mongoose = require "mongoose"
joi = require "joi"

module.exports = (options) ->
    # Connect to the database
    mongoose.connect options.mongoUrl
    
    # Make our router
    router = express.Router()
    
    # Setup our modules
    router.use "/users", require("./modules/users")(options)
    
    return router

