var path = require('path');

var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: SRC_DIR + '/index.js',
    output: {
        path: SRC_DIR,
        filename: 'app.min.js'
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] }
            }
        ]
    }
};

module.exports = config;