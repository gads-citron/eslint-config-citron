module.exports = {
  ignorePatterns: ['.eslintrc.js'],
  env: {
    es2021: true,
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
    ecmaVersion: 2021,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin', 
    'import', 
    'prettier', 
    'jest'
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
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
      'warn',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-depth': ['warn', 4],
    'max-nested-callbacks': ['error', 3],
    'max-params': ['warn', 4],
    complexity: ['warn', 10],
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
    // Import organization
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index'
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],
    // Restrict import of some libraries
    'no-restricted-imports': [
      'error',
      {
        paths: ['moment', 'moment-timezone'],
      },
    ],
    // Allow underscore dangle
    'no-underscore-dangle': 'off',
    // Rewrite this airbnb rule to allow for and for or loops
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],

    /* Typescript */

    // Disable checksVoidReturn, too hard to handle with external packages
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    '@typescript-eslint/no-explicit-any': ['warn'],

    // Naming conventions (updated to match new requirements)
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variableLike',
        format: ['camelCase']
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE']
      },
      {
        selector: 'parameterProperty',
        modifiers: ['private', 'readonly'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'parameter',
        format: ['camelCase']
      },
      {
        selector: 'function',
        format: ['camelCase']
      },
      {
        selector: 'method',
        format: ['camelCase']
      },
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'classProperty',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'typeLike',
        format: ['PascalCase']
      },
      {
        selector: 'class',
        format: ['PascalCase']
      },
      {
        selector: 'interface',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['PascalCase']
      },
      {
        selector: 'enumMember',
        format: ['PascalCase']
      },
      {
        selector: 'memberLike',
        modifiers: ['protected'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
        filter: {
          regex: '^_id$',
          match: false,
        },
      },
      {
        selector: 'memberLike',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        filter: {
          regex: '^_id$',
          match: false,
        },
      },
    ],

    // Class and service design rules
    '@typescript-eslint/prefer-readonly': 'warn',
    'max-classes-per-file': ['warn', 1],

    // Error handling rules
    '@typescript-eslint/no-throw-literal': 'warn',

    // Async/await best practices
    'prefer-promise-reject-errors': 'warn',
    '@typescript-eslint/await-thenable': 'warn',
    '@typescript-eslint/no-floating-promises': 'warn',

    // Interface and type safety
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',

    // Enum conventions
    '@typescript-eslint/prefer-enum-initializers': 'warn',

    // Test conventions
    'jest/consistent-test-it': ['warn', { fn: 'it' }],
    'jest/prefer-expect-assertions': 'warn',
    'jest/no-disabled-tests': 'warn',

    // General code quality
    'prefer-const': 'warn',
    'no-var': 'warn',
    'object-shorthand': 'warn',
    'prefer-template': 'warn',

    /** Misc */

    // Fix no shadow error on enum, see https://github.com/typescript-eslint/typescript-eslint/issues/2483
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    'class-methods-use-this': 'off',
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'error',

    // Citron custom rules
    // 'citron/file-naming': 'warn',
    // 'citron/helper-class-structure': 'warn',
    // 'citron/no-objectid-in-dto': 'warn',
    // 'citron/repository-return-types': 'warn',
    // 'citron/service-stateless': 'warn',
  },
  overrides: [
    {
      files: ['*.contract.ts'],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off'
      }
    },
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
        '@typescript-eslint/no-floating-promises': 'error',
        'max-lines': 'off',
        'no-empty': 'off',
        'no-throw-literal': 'off',
      },
    }
    // {
    //   files: ['*.helper.ts'],
    //   rules: {
    //     'citron/helper-class-structure': 'warn'
    //   }
    // },
    // {
    //   files: ['*.dto.ts'],
    //   rules: {
    //     'citron/no-objectid-in-dto': 'warn'
    //   }
    // },
    // {
    //   files: ['*.service.ts'],
    //   rules: {
    //     'citron/service-stateless': 'warn'
    //   }
    // },
    // {
    //   files: ['*.repository.ts'],
    //   rules: {
    //     'citron/repository-return-types': 'warn'
    //   }
    // }
  ],
};