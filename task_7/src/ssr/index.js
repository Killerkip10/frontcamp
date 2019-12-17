require('ignore-styles');

require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [["module-resolver", {
        root: ['./src'],
        alias: { configs: './src/configs' },
    }]],
});

require('./server');