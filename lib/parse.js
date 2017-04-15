var path = require('path');
var glob = require('glob');

module.exports = function parse (argv) {
  var srcPath = path.resolve(argv.cwd, argv.src);

  var list = glob.sync('{0,1,2,3,4,5,6,7,8,9}.{png,jpg}', {
    cwd: srcPath
  });

  var reg = /^\d+/;
  var map = {};
  list.forEach(function (img, i) {
    var id = reg.exec(img)[0];
    map[id] = {
      id,
      path: path.resolve(srcPath, img),
      fileName: img
    };
  });

  return {
    basePath: srcPath,
    map
  };
};