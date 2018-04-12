const webpack = require('webpack');
const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const extractSASS = new ExtractTextPlugin('stylesheets/style.css');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './public')
    },
    mode: process.env.NODE_ENV,
    watch: true,
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                ]
            },
            // {
            //     test: /\.scss$/,
            //     use: extractSASS.extract({
            //         use: ['css-loader', 'sass-loader']
            //     })
            // }
        ]
    }
}