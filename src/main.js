var koa = require("koa");

var logger = require("./logger");

// Create our server
var app = koa();

app.use(function *(){
    this.body = "Hello World";
});

app.listen(3141);
logger.info("Valkyrie listening on http://localhost:3141");

