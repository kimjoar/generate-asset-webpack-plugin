const fs = require('fs');

class GenerateAssetWebpackPlugin {

    constructor(options) {
        this.filename = options.filename;
        this.fn = options.fn;
        this.files = options.extraFiles || [];
    }

    apply(compiler) {
            compiler.hooks.emit.tap('emit', function (compilation, cb) {
                _this.fn(compilation, function (err, body) {
                    if (err) {
                        return cb(err);
                    }
        
                    compilation.assets[_this.filename] = {
                        source: function source() {
                            return body;
                        },
                        size: function size() {
                            return body.length;
                        }
                    };
        
                    _this.files.forEach(function (file) {
                        compilation.assets[file] = {
                            source: function source() {
                                return fs.readFileSync(file);
                            },
                            size: function size() {
                                return fs.statSync(file).size;
                            }
                        };
                    });
        
                    cb();
                });
            });
    }

}

module.exports = GenerateAssetWebpackPlugin;
