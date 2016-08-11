var gulp = require("gulp");
var concat = require("gulp-concat");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");

gulp.task('default', ["compile:ts"]);

gulp.task('watch', function() {
    gulp.watch(["./**/*.ts", "../decorators.ts"], ["compile:ts"]);
});

gulp.task("lint:ts", function() {
    return gulp.src("ts/app.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

var tsProject = ts.createProject("tsconfig.json", {
    outFile: "angular-future-demo.js"
});
gulp.task("compile:ts", ["lint:ts"], function() {
    return tsProject.src()
        .pipe(ts(tsProject))
        .js
        .pipe(gulp.dest("www/js"));
});


gulp.task("concat:lib:js", function() {
    return gulp.src([
            "node_modules/jquery/dist/jquery.js",
            "node_modules/angular/angular.js",
            "node_modules/angular-ui-router/release/angular-ui-router.js",
            "node_modules/systemjs/dist/system.js",
            "node_modules/systemjs/dist/system-polyfills.js",
            "node_modules/es6-shim/es6-shim.js"
        ])
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("www/js"));
});