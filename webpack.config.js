const path = require('path');
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
        {loader: "postcss-loader"},
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
    loader: 'file-loader?name=/fonts/[name].[ext]'
}

const imgs = {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
        {
            loader: "file-loader",
            options: {
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
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
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