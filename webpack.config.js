const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSASS = new ExtractTextPlugin('stylesheets/style.css');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
        publicPath: '/public'
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: extractSASS.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    // module: {
    //     loaders: [
    //         {
    //             test: /.jsx?$/,
    //             loader: 'babel-loader',
    //             exclude: /node_modules/,
    //             query: {
    //                 presets: ['env', 'react']
    //             }
    //         }
    //     ]
    // },
    plugins: [
        extractSASS,
        new webpack.optimize.UglifyJsPlugin({})
    ]
}