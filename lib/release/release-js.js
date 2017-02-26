var gulp = require('gulp');
var umd = require('gulp-umd')

var _ = require('../util');

module.exports = function releaseJs (config, argv) {
    return new Promise(function (resolve, reject) {
        gulp
            .src(config.src)
            .on('error', reject)
            .pipe(gulp.dest(config.dist))
            .on('end', resolve);
    });
};