var fs = require('fs');
var del = require('del');

var consts = require('../consts');

module.exports = function clean (path) {
    return new Promise(
        function (resolve, reject) {
            fs.access(
                path,
                (fs.constants || fs).W_OK,
                function (err) {
                    resolve(!!err);
                }
            )
        }
    )
    .then(function (notFound) {
        if (notFound) {
            return new Promise(
                function (resolve, reject) {
                    fs.mkdir(path, function (err) {
                        console.log();
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve();
                    });
                }
            );
        }
    })
    .then(function () {
        return del(path + '/*');
    });
};