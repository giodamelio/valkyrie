express = require "express"

User = require "./userModel"

module.exports = (options) ->
    router = express.Router()
    
    # List all users
    router.get "/", (req, res) ->
        res.type "application/json"
        User.find {}, (err, users) ->
            res.send users

    return router

