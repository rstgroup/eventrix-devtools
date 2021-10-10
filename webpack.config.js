const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "production",
    target: 'web',
    entry: {
        panel: "./src/panel.jsx",
        devtools: "./src/devtools.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'chrome')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]',
                            sourceMap: true,
                            sourceMapContents: false
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ]
    },
    resolve: {
        modules: [process.cwd(), 'node_modules', path.resolve(__dirname,'src')],
        extensions: ['.js', '.jsx'],
        plugins: [new DirectoryNamedWebpackPlugin(true)],
    },
    devServer: {
        port: 9010,
        historyApiFallback: true,
        watchOptions: {
            poll: true
        },
        watchContentBase: true,
    }
};