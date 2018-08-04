const webpack = require('webpack');
const clientConfig = require('./client.base');

module.exports = {
    mode :'development',    
    ...clientConfig,
    plugins:[
        ...clientConfig.plugins,
        new webpack.HotModuleReplacementPlugin()
    ],
    performance: {
        hints: false,
    }
}