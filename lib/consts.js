var path = require('path');

var NAME = 'make-img-counter';
var TEMPLATE_FOLDER_PATH = path.resolve(__dirname, '../template');

var consts = {
  NAME,
  MODULE_NAME: 'makeImgCounter',
  TEMPLATE_FOLDER_PATH,
  TEMPLATE_JS_NAME: NAME + '.js',
  TEMPLATE_LESS_NAME: NAME + '.less',
  IMG_FOLDER_NAME: 'img',
  SPRITE_NAME: NAME + '-sprite.png'
};

consts.TEMPLATE_JS_PATH = path.resolve(TEMPLATE_FOLDER_PATH, consts.TEMPLATE_JS_NAME);

consts.TEMPLATE_LESS_PATH = path.resolve(TEMPLATE_FOLDER_PATH, consts.TEMPLATE_LESS_NAME);

module.exports = consts;