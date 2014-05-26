var gulp = require("gulp");
var gutil = require("gulp-util");
var coffee = require("gulp-coffee");
var mocha = require("gulp-mocha");

// Let mocha run coffeescript
require("coffee-script/register");

// Run our tests
gulp.task("test", ["coffee"], function() {
    return gulp.src("test/*.coffee")
        .pipe(mocha({
            reporter: "spec"
        }));
});

// Compile our coffeescript
gulp.task("coffee", function() {
    return gulp.src("src/**/*.coffee")
        .pipe(coffee()).on("error", gutil.log)
        .pipe(gulp.dest("lib/"));
});

// Watch and recomiple and rerun tests
gulp.task("watch", ["coffee", "test"], function() {
    gulp.watch("test/*.coffee", ["test"]);
    gulp.watch("src/**/*.coffee", ["coffee", "test"]);
});

gulp.task("default", ["watch"]);

