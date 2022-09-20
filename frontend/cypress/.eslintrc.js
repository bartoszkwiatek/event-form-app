module.exports = {
    plugins: ['cypress'],
    env: {
        'cypress/globals': true,
    },
    rules: {
        strict: 'off',
        'max-lines-per-function': 'off',
    },
};
