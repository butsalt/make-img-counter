var path = require('path');
var gulp = require('gulp');

var Spritesmith = require('spritesmith')
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var _ = require('../util');
var consts = require('../consts');

function computeSprite (config, argv) {
    return new Promise(function (resolve, reject) {
        var imgInfo = config.imgInfo;

        var src = [];
        var imgMap = imgInfo.map;
        var imgId;
        for (imgId in imgMap) {
            src.push(imgMap[imgId].path);
        }

        Spritesmith.run(
            {
                src
            },
            function (err, res) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res);
            }
        );
    });
}

function outputCss (config, argv) {
    return new Promise(function (resolve, reject) {
        gulp
            .src(config.src)
            .pipe(
                less({
                    globalVars: config.vars,
                    plugins: [
                        new LessPluginAutoPrefix(
                            {
                                browsers: ['last 10 versions']
                            }
                        )
                    ]
                })
            )
            .on('error', reject)
            .pipe(gulp.dest(config.dist))
            .on('end', resolve);
    });
}

function outputSprite (config, argv) {
    return _.writeFile(config.spriteDist, config.spriteInfo.image);
}

module.exports = function releaseCss (config, argv) {
    return computeSprite(config, argv)
        .then(function (spriteInfo) {
            var imgInfo = config.imgInfo;
            var imgMap = imgInfo.map;
            coordinateMap = spriteInfo.coordinates;
            var vars = {
                'img-width': '0',
                'img-height': '0'
            }
            var imgId, img, coordinate;
            for (imgId in imgMap) {
                img = imgMap[imgId];
                coordinate = coordinateMap[img.path];
                vars['img-width'] = coordinate.width + 'px';
                vars['img-height'] = coordinate.height + 'px';
                vars['img-' + imgId + '-top'] = '-' + coordinate.y + 'px';
                vars['img-' + imgId + '-left'] = '-' + coordinate.x + 'px';
            }

            config.spriteDist = path.resolve(config.dist, consts.IMG_FOLDER_NAME, consts.SPRITE_NAME);
            vars['sprite-dist'] = '"' + consts.IMG_FOLDER_NAME + '/' + consts.SPRITE_NAME + '"';

            config.spriteInfo = spriteInfo;
            config.vars = vars;

            return Promise.all([
                outputCss(config, argv),
                outputSprite(config, argv)
            ]);
        });
};