var path = require('path');
var gulp = require('gulp');

var _ = require('../util');

module.exports = function releaseImg (config, argv) {
    var promiseList = [];
    var imgInfo = config.imgInfo;
    var imgMap = imgInfo.map;
    var imgId;
    for (imgId in imgMap) {
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
        })(imgMap[imgId]);
    }
    return Promise.all(promiseList);
};