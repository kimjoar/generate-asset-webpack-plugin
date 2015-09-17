generate-asset-webpack-plugin
=============================

Sometimes you dynamically want to create files while having access to all the
Webpack compilation info.

Install
-------

```
npm install --save-dev generate-asset-webpack-plugin
```

Usage
-----

```javascript
var GenerateAssetPlugin = require('generate-asset-webpack-plugin');

var webpackConfig = {
    plugins: [
        new GenerateAssetPlugin({
            filename: 'index.html',
            fn: (compilation, cb) => {
                cb(null, createHtml(compilation));
            },
            extraFiles: ['favicon.ico']
        })
    ]
    // other webpack config ...
}
```

Example function using the `compilation`:

```javascript
function createHtml(compilation) {
    var chunk = compilation.chunks[0];
    var jsFile = chunk.files[0];
    var cssFile = chunk.files[1];
    return `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Awesome!</title>
                <link rel="stylesheet" href="${cssFile}">
            </head>
            <body>
                <div id="app"></div>
                <script src="${jsFile}"></script>
            </body>
        </html>
    `;
};
```

