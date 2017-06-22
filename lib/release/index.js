var path = require('path');
var consts = require('../consts');

module.exports = function release(imgInfo, argv) {
  var distPath = path.resolve(argv.cwd, argv.dist);

  return require('./clean')(distPath, argv)
    .then(function() {
      return Promise.all([
        require('./release-js')(
          {
            src: consts.TEMPLATE_JS_PATH,
            dist: distPath
          },
          argv
        ),
        require('./release-css')(
          {
            imgInfo,
            src: consts.TEMPLATE_LESS_PATH,
            dist: distPath
          },
          argv
        )
      ]);
    });
};