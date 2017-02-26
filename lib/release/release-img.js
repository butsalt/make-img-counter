var path = require('path');
var gulp = require('gulp');

var _ = require('../util');

module.exports = function releaseImg (config, argv) {
    var promiseList = [];
    var imgInfo = config.imgInfo;
    var map = imgInfo.map;
    var key;
    for (key in map) {
        (function (img){
            promiseList.push(
                _
                    .readFile(img.path)
                    .then(function (content) {
                        return _.writeFile(
                            path.resolve(config.dist, img.fileName),
                            content
                        );
                    })

            );
        })(map[key]);
    }
    return Promise.all(promiseList);
};