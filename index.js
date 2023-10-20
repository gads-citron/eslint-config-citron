module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  env: {
    node: true,
    jest: true,
  },
  root: true,
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',

    /* Javascript */
    'max-lines': [
      'error',
      {
        max: 200,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-lines-per-function': [
      'error',
      {
        max: 35,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-depth': ['error', 4],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['error', 5],
    complexity: ['error', 10],
    'no-await-in-loop': 'off',
    // Allows dependency injections into classes with empty constructors.
    'no-useless-constructor': 'off',
    'no-use-before-define': 'off',

    /* Import */

    // Specify the file extension when importing only if not .ts
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
      },
    ],
    // Prefer named export
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Allow underscore dangle
    'no-underscore-dangle': 'off',
    // Rewrite this airbnb rule to allow for and for or loops
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

    /* Typescrypt */

    // Disable checksVoidReturn, too hard to handle with external packages
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    '@typescript-eslint/no-explicit-any': ['error'],

    /** Misc */

    // Fix no shadow error on enum, see https://github.com/typescript-eslint/typescript-eslint/issues/2483
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        'max-lines-per-function': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'max-nested-callbacks': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        'max-lines': 'off',
        'no-empty': 'off',
        'no-throw-literal': 'off',
      },
    },
  ],
};
