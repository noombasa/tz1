module.exports = {
    plugins: [
        require("postcss-import"),
        require("postcss-calc"),
        require('postcss-nested'),

        require('autoprefixer'),
        require('postcss-flexbugs-fixes')
    ]
};
