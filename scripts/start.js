const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const express = require('express');
const nodemon = require('nodemon');
const webpackConfig = require('../config/webpack')('development')
const paths = require('../config/paths');
const { compilerPromise } = require('./util');
const PORT = 8443;
const app = express();
const start = async () => {
    rimraf.sync(paths.buildClient);
    rimraf.sync(paths.buildServer);

    const [clientConfig, serverConfig] = webpackConfig;

    //Reference: https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/example/webpack.config.js
    clientConfig.entry.bundle = [
        `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,
        ...clientConfig.entry.bundle
    ];

    clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
    clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js';

    const publicPath = clientConfig.output.publicPath;

    clientConfig.output.publicPath = [`http://localhost:${PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    serverConfig.output.publicPath = [`http://localhost:${PORT}`, publicPath]
        .join('/')
        .replace(/([^:+])\/+/g, '$1/');

    const multiCompiler = webpack([clientConfig, serverConfig]);
    
    const clientCompiler = multiCompiler.compilers[0];
    const serverCompiler = multiCompiler.compilers[1];

    const clientCompilerPromise = compilerPromise(clientCompiler);
    const serverCompilerPromise = compilerPromise(serverCompiler);


    const watchOptions = {
        ignored: /node_modules/,
    };

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        return next();
    });

    app.use(
        webpackDevMiddleware(clientCompiler, {
            publicPath: clientConfig.output.publicPath,
            watchOptions
        }
        ));
    app.use(webpackHotMiddleWare(clientCompiler));

    app.use('/static', express.static(paths.buildClient));
    console.log("we are in start.js st");
    app.listen(PORT);
    console.log("we are in start.js end");

    serverCompiler.watch(watchOptions, (err, stats) => {
        if (!err && !stats.hasErrors) {
            console.log(stats.toString());
        }
    });

    try {
        await clientCompilerPromise;
        await serverCompilerPromise;
    } catch (error) {
        console.log(error);
    }

    const script = nodemon({
        script: `${paths.buildServer}/server.js`,
        ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
    });

    script.on('restart', () => {
        console.log('Server side app has been restarted.', 'warning');
    });

    script.on('quit', () => {
        console.log('Process ended');
        process.exit();
    });

    script.on('error', () => {
        console.log('An error occured. Exiting', 'error');
        process.exit(1);
    });

};
start();