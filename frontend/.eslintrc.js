module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['tsconfig.json'],
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        eqeqeq: ['error'],
        quotes: ['warn', 'single'],
        'no-var': ['error'],
        'array-callback-return': ['warn'],
        'block-scoped-var': ['error'],
        'max-lines': ['error', { max: 250, skipComments: true }],
        'no-console': 'warn',
        'prefer-const': 'warn',
        'prefer-template': 'warn',
        'no-param-reassign': 'error',
        'no-proto': 'warn',
        'no-unused-expressions': 'error',
        'class-methods-use-this': 'warn',
        'consistent-return': 'warn',
        'no-eval': 'error',
        complexity: ['error', { max: 50 }],
        'max-lines-per-function': ['warn', { max: 50 }],
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/type-annotation-spacing': ['warn'],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['warn'],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            { overrides: { constructors: 'off' } },
        ],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/no-cycle': 'error',
        'import/newline-after-import': 'warn',
        'import/order': [
            'warn',
            {
                groups: [
                    ['builtin', 'external'],
                    ['internal'],
                    ['parent', 'sibling', 'index', 'object'],
                ],
                'newlines-between': 'always',
            },
        ],
    },
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
};
