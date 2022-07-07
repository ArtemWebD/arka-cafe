const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isDev = process.env.NODE_ENV === "development" ? true : false
const isProd = !isDev

const optimisation = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

const config = {
    context: path.resolve(__dirname, "src"),
    entry: "./js/index.js",
    output: {
        filename: "./js/[name].js",
        path: path.resolve(__dirname, "dist")
    },
    optimization: optimisation(),
    devServer: {
        open: true,
        port: 80,
        hot: isDev,
        liveReload: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            inject: "body",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/img"),
                    to: path.resolve(__dirname, "dist/img")
                },
                {
                    from: path.resolve(__dirname, "src/fonts"),
                    to: path.resolve(__dirname, "dist/fonts")
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "./css/style.css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}

module.exports = config;