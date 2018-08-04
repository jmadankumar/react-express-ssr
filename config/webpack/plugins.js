const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require('path');
const paths = require('../paths');
const clientPlugins = [
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "styles.css"
    }),
    new ManifestPlugin({ fileName: 'manifest.json' })
];
const serverPlugins = [];
module.exports = {
    clientPlugins,
    serverPlugins
}