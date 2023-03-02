module.exports = {
  root: true,
  ignorePatterns: ['projects/**/*'],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: true,
      },
      extends: ['plugin:@angular-eslint/recommended', 'plugin:@angular-eslint/template/process-inline-templates', 'prettier'],
      plugins: ['prettier'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'off',
          {
            accessibility: 'explicit',
          },
        ],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          {
            exceptAfterSingleLine: true,
          },
        ],
        '@typescript-eslint/naming-convention': [
          'off',
          {
            selector: 'default',
            format: ['camelCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: ['typeLike', 'enumMember'],
            format: ['PascalCase'],
          },
        ],
        'no-console': 'off',
        'no-restricted-syntax': [
          'error',
          {
            selector: "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
            message: 'Unexpected property on console object was called',
          },
        ],
        'id-blacklist': 'off',
        'id-match': 'off',
        'no-eval': 'off',
        'no-underscore-dangle': 'off',
        'no-shadow': 'off',
        'prettier/prettier': [
          'error',
          {
            arrowParens: 'avoid',
            endOfLine: 'auto',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@angular-eslint/template/recommended', 'prettier'],
      plugins: ['prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
      excludedFiles: ['*inline-template-*.component.html'],
    },
    {
      files: ['*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
};
