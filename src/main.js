var logger = require("./logger");

module.exports = function() {
    return function* (){
        this.body = "Hello World!";
    };
};

