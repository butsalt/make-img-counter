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
        fs.writeFile(
            path,
            content,
            'utf8',
            function (err) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            }
        );
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