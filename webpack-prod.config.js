var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        vendor: ["react", "react-dom"],
        app: ["babel-polyfill", "./src/index"]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].min.js",
        chunkFilename: "[name].min.js"
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, "src"),
                loader: "babel-loader",
                query: {
                    presets: [
                        ["es2015", { modules: false }],
                        "stage-0",
                        "react"
                    ],
                    plugins: [
                        "transform-async-to-generator",
                        "transform-decorators-legacy"
                    ]
                }
            },
            {
                test: /\.scss|css$/i,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "postcss-loader",
                        "resolve-url-loader",
                        "sass-loader?sourceMap"
                    ]
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            },
            output: {
                comments: false
            }
        }),
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            hash: false,
            template: "./src/index.html"
        })
    ]
};