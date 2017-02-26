var less = require('less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix')

var consts = require('../consts');
var _ = require('../util');

module.exports = function releaseCss (config, argv) {
    var imgInfo = config.imgInfo;
    var vars = {
        'img-width': imgInfo.width + 'px',
        'img-height': imgInfo.height + 'px'
    };
    var imgMap = imgInfo.map;
    var key;
    for (key in imgMap) {
        vars[key] = '"' + imgMap[key].path + '"';
    }
    return _.readFile(consts.TEMPLATE_LESS_PATH)
        .then(function (content) {
            return less.render(
                content,
                {
                    globalVars: vars,
                    plugins: [
                        new LessPluginAutoPrefix(
                            {
                                browsers: ["last 10 versions"]
                            }
                        )
                    ]
                }
            );
        })
        .then(function (res) {
            return _.writeFile(config.dist, res.css)
        })
};