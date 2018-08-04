const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (filePath) => {
    return path.resolve(appDirectory, filePath);
};
const paths = {
    srcClient: resolveApp('src/client'),
    srcServer: resolveApp('src/server'),
    srcShared: resolveApp('src/shared'),
    buildClient: resolveApp('build/client'),
    buildServer: resolveApp('build/server'),
    publicPath: '/static/'
};
paths.resolveModules = [
    paths.srcClient,
    paths.srcServer,
    paths.srcShared,
    "node_modules"
];
module.exports = paths;