const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var ASSET_PATH = path.join(__dirname, 'public');

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(__dirname, 'src', 'index.tsx'),
    },
    target: 'web',

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                },
            },
        ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {},

    plugins: [
        new CleanWebpackPlugin(),
        //Generate index.html in /dist
        new HtmlWebpackPlugin({
            filename: 'index.html', //Name of file in ./dist/
            template: path.join(ASSET_PATH, 'index.html'), //Name of template in ./src
            hash: true,
            scriptLoading: 'defer',
            manifest: path.join(ASSET_PATH, 'manifest.json'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(ASSET_PATH, 'android-chrome-512x512.png'),
            favicons: {
                icons: {
                    android: true, // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    coast: true, // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    favicons: true, // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    firefox: true, // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                    yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
                },
            },
        }),
        new CopyWebpackPlugin([path.join(ASSET_PATH, 'manifest.webmanifest')], {
            ignore: ['.DS_Store'],
        }),
    ],
};
