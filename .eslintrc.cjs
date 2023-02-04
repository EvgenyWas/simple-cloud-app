/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

const [error, warn, off] = [2, 1, 0];

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    ,
    'google',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['modules-newline'],
  rules: {
    '@typescript-eslint/no-explicit-any': off,
    'no-debugger': warn,
    'no-console': [warn, { allow: ['warn', 'error'] }],
    // note: rebind google config coz of some reasons
    'require-jsdoc': off,
    'max-len': [
      warn,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignorePattern: 'goog.(module|require)',
      },
    ],
    'new-cap': off,
    'linebreak-style': [error, 'unix'],
    '@typescript-eslint/explicit-module-boundary-types': off,
    'object-curly-spacing': [warn, 'always'],
    'object-curly-newline': [
      warn,
      {
        ObjectPattern: {
          multiline: true,
          minProperties: 2,
        },
        ObjectExpression: {
          multiline: true,
          minProperties: 2,
        },
        ImportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
        ExportDeclaration: {
          multiline: true,
          minProperties: 3,
        },
      },
    ],
    'object-property-newline': warn,
    'modules-newline/import-declaration-newline': off,
    'modules-newline/export-declaration-newline': warn,
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      rules: {
        'vue/max-attributes-per-line': [
          'error',
          {
            singleline: {
              max: 3,
            },
            multiline: {
              max: 1,
            },
          },
        ],
        'vue/no-v-html': off, // note: need in some cases sometimes
        'vue/no-unused-vars': error,
        'no-invalid-this': off,
        // ts conflicts
        '@typescript-eslint/explicit-module-boundary-types': off,
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-unused-vars': off,
        '@typescript-eslint/no-unused-vars': error,
      },
    },
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    withDefaults: 'readonly',
  },
};
