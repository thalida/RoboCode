'use strict'

var webpack = require('webpack');
var merge = require('webpack-merge');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SplitByPathPlugin = require('webpack-split-by-path');


var isProduction = process.env.NODE_ENV === 'production'

var APP = __dirname + '/app';
var DIST = __dirname + '/dist';


var common = {
    context: APP,
    entry: {
        app: './'
    },
    output: {
        path: DIST,
        filename: "[name].[hash].js",
        chunkFilename: "[id].js",
        publicPath: ''
    },
    module: {
        loaders: [
            {
                test: require.resolve("jquery"),
                loader: "expose?$!expose?jQuery"
            },
            {
                test: require.resolve('angular'),
                loader: "expose?angular"
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url-loader!sass-loader?sourceMap")
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg|png|gif|jpg|jpeg|wav|mp3)(\?]?.*)?$/,
                loader: 'file-loader?name=[path][name].[hash].[ext]'
            }
        ]
    },
    resolve: {
        root: APP,
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            MODE: {
                production: isProduction
            }
        }),
        new HtmlWebpackPlugin({
            template: APP + '/index.html',
            inject: true
        }),
        new ExtractTextPlugin("[name].[hash].css", {
            allChunks: true
        })
    ]
};

var productionConfig = {
    plugins: [
        new SplitByPathPlugin([{
            name: 'vendors',
            path: path.resolve(__dirname, 'node_modules')
        }]),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
};
var devConfig = {
    plugins: [
        new SplitByPathPlugin([{
            name: 'vendors',
            path: '/fake/path/to/disable/vendors/bundle'
        }]),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};

var config = ( isProduction ) ? productionConfig : devConfig;
module.exports = merge(common, config);
