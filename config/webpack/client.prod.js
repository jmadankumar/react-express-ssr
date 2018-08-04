const clientConfig = require('./client.base');

module.exports = {
    mode: 'production',
    ...clientConfig,
    plugins: [
        ...clientConfig.plugins
    ]
}