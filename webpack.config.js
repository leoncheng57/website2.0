const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pug = {
    test: /\.pug$/,
    use: ['html-loader', 'pug-html-loader']
};

const js = {
    test: /\.js$/,
    exclude: /(node_modules)/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
}

const scss = {
    test: /\.(sa|sc|c)ss$/,
    // Loaders are applying from right to left(!)
    use: [
        {loader: MiniCssExtractPlugin.loader},
        {loader: "css-loader"},
        {
            // First we transform SASS to standard CSS
            loader: "sass-loader",
            options: {
                implementation: require("sass")
            }
        }
    ]
}

const fonts = {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
                outputPath: 'webfonts'
            }
        }
    ]
}

const imgs = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
        {
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
                outputPath: 'images'
            }
        }
    ]
}

const config = {
    entry: './src/index.js',
    module: {
        rules: [pug, js, scss, fonts, imgs]
    },
    resolve: {
        extensions: [ '.js' ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: path.resolve(__dirname, "src/assets/js/jquery.min.js"),
            breakpoints: path.resolve(__dirname, "src/assets/js/breakpoints.min.js"),
            browser: path.resolve(__dirname, "src/assets/js/browser.min.js")
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            favicon: "./src/images/favicon.png",
        }),
        new HtmlWebpackPlugin({
            filename: 'landing.html',
            template: 'src/landing.pug',
            favicon: "./src/images/favicon.png",
        }),
        new HtmlWebpackPlugin({
            filename: 'soon.html',
            template: 'src/isabella-timer.pug',
            favicon: "./src/images/favicon.png",
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],
    
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: '[name].js'
    },
    devServer: {
        port: 3000,
    }
};

module.exports = config;