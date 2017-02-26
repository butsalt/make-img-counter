var path = require('path');
var consts = require('../consts');

module.exports = function release (imgInfo, argv) {
    var distPath = path.resolve(argv.cwd, argv.dist);

    return require('./clean')(distPath, argv)
        .then(function () {
            return Promise.all([
                require('./release-js')(
                    {
                        dist: path.resolve(distPath, consts.DIST_JS_NAME)
                    },
                    argv
                ),
                require('./release-css')(
                    {
                        imgInfo,
                        dist: path.resolve(distPath, consts.DIST_CSS_NAME)
                    },
                    argv
                )
            ]);
        })
};