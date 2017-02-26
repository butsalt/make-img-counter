var path = require('path');

var NAME = 'img-counter';
var TEMPLATE_PATH = path.resolve(__dirname, '../template');

var consts = {
    NAME,
    TEMPLATE_PATH,
    TEMPLATE_JS_NAME: NAME + '.js',
    TEMPLATE_LESS_NAME: NAME + '.less',
    DIST_JS_NAME: NAME + '.js',
    DIST_CSS_NAME: NAME + '.css'
};

consts.TEMPLATE_JS_PATH = path.resolve(TEMPLATE_PATH, consts.TEMPLATE_JS_NAME);

consts.TEMPLATE_LESS_PATH = path.resolve(TEMPLATE_PATH, consts.TEMPLATE_LESS_NAME);

module.exports = consts;