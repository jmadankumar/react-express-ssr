const serverConfig = require('./server.base');

module.exports = {
    ...serverConfig,
    mode: 'development',
    performance: {
        hints: false,
    }
};