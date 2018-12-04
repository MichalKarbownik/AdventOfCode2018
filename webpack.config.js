const path = require('path');

module.exports = {
    entry: {
        'main': './Day4/src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'Day4/build/')
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