var validator = require("../src/validator");

describe("Validators", function() {
    describe("Username", function() {
        it("Valid", function(done) {
            validator.username("giodamelio")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Valid (Max Length)", function(done) {
            validator.username("ThisNameIs24LettersLongA")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Valid (Min Length)", function(done) {
            validator.username("6Chars")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Not a String", function(done) {
            validator.username(42)(function(err) {
                if (err) return done();
                done("Username is not not a string");
            });
        });
        it("Non Alphanumerical", function(done) {
            validator.username("No_Symbols-Allowed")(function(err) {
                if (err) return done();
                done("Username is not non alphanumerical");
            });
        });
    });
    describe("Password", function() {
        it("Valid", function(done) {
            validator.password("hunter2")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Valid (Max Length)", function(done) {
            validator.password("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Valid (Min Length)", function(done) {
            validator.password("6Chars")(function(err) {
                if (err) return done(err);
                done();
            });
        });
        it("Not a String", function(done) {
            validator.username(42)(function(err) {
                if (err) return done();
                done("Password is not not a string");
            });
        });
    });
});

