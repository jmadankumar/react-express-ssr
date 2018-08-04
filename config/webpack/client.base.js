const path = require('path');
const paths = require('../paths');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolvers = require('./resolvers');
module.exports = {
    name: 'client',
    target: 'web',
    entry: {
        bundle: ["babel-polyfill", path.resolve(paths.srcClient, 'index.js')]
    },
    output: {
        path: path.join(paths.buildClient, paths.publicPath),
        filename: 'bundle.js',
        publicPath: paths.publicPath,
        chunkFilename: '[name].[chunkhash:8].chunk.js',
    },
    resolve: {
        ...resolvers
    },
    module: {
        rules: [...loaders.clientLoaders]
    },
    plugins: [
        ...plugins.clientPlugins
    ],
    optimization: {
        namedModules: true,
        noEmitOnErrors: true,
        // concatenateModules: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
}