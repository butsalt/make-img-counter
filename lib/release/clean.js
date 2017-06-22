var fs = require('fs');
var path = require('path');
var del = require('del');

var _ = require('../util');
var consts = require('../consts');

module.exports = function clean(distPath) {
  return _.isExist(distPath)
    .then(function(exist) {
      if (!exist) {
        return _.mkDir(distPath);
      }
    })
    .then(function() {
      return del(distPath + '/*')
        .then(function() {
          return _.mkDir(
            path.resolve(distPath, consts.IMG_FOLDER_NAME)
          );
        });
    });
};