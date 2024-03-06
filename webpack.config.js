const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    return {
        mode: argv.mode === 'production' ? 'production' : 'development',
        entry: './src/index.ts',
        devtool: argv.mode === 'development' ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.less$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader'
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/fonts/[name][ext][query]'
                    }
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@Modules': path.resolve(__dirname, 'src/modules/'),
                '@GameModules': path.resolve(__dirname, 'src/modules/game/'),
            }
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            })
        ],
        devServer: {
            static: './dist',
        },
    };
};
