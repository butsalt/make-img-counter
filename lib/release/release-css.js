var path = require('path');
var gulp = require('gulp');
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var _ = require('../util');

module.exports = function releaseCss (config, argv) {
    var imgInfo = config.imgInfo;
    var vars = {
        'img-width': imgInfo.width + 'px',
        'img-height': imgInfo.height + 'px'
    };
    var imgMap = imgInfo.map;
    var imgId;
    for (imgId in imgMap) {
        vars['img-' + imgId] = '"./img/' + imgMap[imgId].fileName + '"';
    }
    return new Promise(function (resolve, reject) {
        gulp
            .src(config.src)
            .pipe(
                less({
                    globalVars: vars,
                    plugins: [
                        new LessPluginAutoPrefix(
                            {
                                browsers: ["last 10 versions"]
                            }
                        )
                    ]
                })
            )
            .on('error', reject)
            .pipe(gulp.dest(config.dist))
            .on('end', resolve);
    });
};