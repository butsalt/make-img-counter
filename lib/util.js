var fs = require('fs');

exports.readFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, 'utf8', function (err, content) {
            if (err) {
                reject(err);
                return;
            }
            resolve(content);
        });

    });
};

exports.writeFile = function (path, content) {
    return new Promise(function (resolve, reject) {
        var args = [path, content, 'utf8'];
        if (typeof path == 'string') {
            args = [path, content];
        }
        args.push(function resHandler (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
        fs.writeFile.apply(fs, args);
    });
};

exports.mkDir = function (path) {
    return new Promise(
        function (resolve, reject) {
            fs.mkdir(path, function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        }
    );
};

exports.isExist = function (path) {
    return new Promise(
        function (resolve, reject) {
            fs.access(
                path,
                (fs.constants || fs).W_OK,
                function (err) {
                    resolve(!err);
                }
            )
        }
    );
};