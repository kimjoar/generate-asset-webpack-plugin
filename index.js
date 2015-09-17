const fs = require('fs');

class GenerateAssetWebpackPlugin {

    constructor(options) {
        this.filename = options.filename;
        this.fn = options.fn;
        this.files = options.extraFiles || [];
    }

    apply(compiler) {
        compiler.plugin('emit', (compilation, cb) => {
            this.fn(compilation, (err, body) => {
                if (err) {
                    return cb(err);
                }

                compilation.assets[this.filename] = {
                    source: () => body,
                    size: () => body.length
                }

                this.files.forEach(file => {
                    compilation.assets[file] = {
                        source: () => fs.readFileSync(file),
                        size: () => fs.statSync(file).size
                    }
                });

                cb();
            });
        });
    }

}

module.exports = GenerateAssetWebpackPlugin;
