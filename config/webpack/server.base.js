var nodeExternals = require('webpack-node-externals');
const path = require('path');
const paths = require('../paths');
const loaders = require('./loaders');
const plugins = require('./plugins');
const resolvers = require('./resolvers');
module.exports = {
    name: "server",
    target: "node",
    externals: [nodeExternals()],
    entry: {
        bundle: ["babel-polyfill", path.resolve(paths.srcServer, 'index.js')]
    },
    output: {
        path: paths.buildServer,
        filename: 'server.js',
    },
    module: {
        rules: [...loaders.serverLoaders]
    },
    resolve: {
        ...resolvers
    },
    plugins: [
        ...plugins.serverPlugins
    ]
}