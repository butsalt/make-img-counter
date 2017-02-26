var amdWrap = require("amd-wrap");

var consts = require('../consts');
var _ = require('../util');

module.exports = function releaseJs (config, argv) {
    return _.readFile(consts.TEMPLATE_JS_PATH)
        .then(function (content) {
            return amdWrap(content);
        })
        .then(function (content) {
            return _.writeFile(config.dist, content)
        });
};