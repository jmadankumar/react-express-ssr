const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelLoader = {
    test: /\.(js|jsx)$/,
    use: {
        loader: 'babel-loader'
    }

};
const cssLoader = {
    test: /\.css$/,
    use: [{
        loader: MiniCssExtractPlugin.loader
    }, "css-loader"]
}
const urlLoaderClient = {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                name: '[name][hash].[ext]',
                limit: 8192
            }
        }
    ]
};
const urlLoaderServer = {
    test: /\.(png|jp(e*)g|svg|gif)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                name: '[name][hash].[ext]',
                limit: 8192
            }
        }
    ]
};
const fileLoaderClient = {
    test: /\.(ttf|eot|woff|woff2)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name][hash].[ext]'
        }
    }]
};
const fileLoaderServer = {
    test: /\.(ttf|eot|woff|woff2)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name][hash].[ext]',
            emitFile: false
        }
    }]
};
const clientLoaders = [babelLoader, cssLoader, urlLoaderClient, fileLoaderClient];
const serverLoaders = [babelLoader, cssLoader, urlLoaderServer, fileLoaderServer];
module.exports = {
    clientLoaders,
    serverLoaders
}