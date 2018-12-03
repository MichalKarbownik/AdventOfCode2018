const path = require('path');

module.exports = {
    entry: {
        'main': './Day3/src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'Day3/build/')
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