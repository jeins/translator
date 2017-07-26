var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

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
        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { presets: ['es2015', 'react'], plugins: ["transform-decorators-legacy", "transform-class-properties"] }
            },
            {
                test: /\.scss|css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "resolve-url-loader",
                    "sass-loader?sourceMap"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: false,
            template: "./src/index.html"
        })
    ]
};

module.exports = config;