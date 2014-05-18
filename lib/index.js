module.exports = function(options) {
    // Validate our options
    if (!options) {
        throw new Error("Missing options");
    } else {
        if (!options.mongoUrl) {
            throw new Error("Missing option: mongoUrl");
        }
    }
    return function(req, res, next) {
        res.send("Hello World!");
    };
};

