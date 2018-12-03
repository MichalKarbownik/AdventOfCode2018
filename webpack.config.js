const path = require('path');

module.exports = {
    entry: {
        'main': './Day2/src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'Day2/build/')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    mode: 'development'
};