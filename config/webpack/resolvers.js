const paths = require('../paths');

module.exports = {
    extensions: ['.js', '.json', '.jsx', '.css'],
    modules: [
        ...paths.resolveModules
    ]
};