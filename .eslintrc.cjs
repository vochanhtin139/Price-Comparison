module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier'
],
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 'latest',
  //   ecmaFeatures: { jsx: true },
  //   project: './tsconfig.json',
  // },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  /**
   * 0 ~ 'off'
   * 1 ~ 'warn'
   * 2 ~ 'error'
   */
  rules: {
    'import/default': 'off',
    'import/export': 'off',
    'react/display-name': 'off',
    'import/no-unresolved': 'off',
    'import/no-duplicates': 'off',
    'import/namespace': 'off',
    'jsx-a11y/no-autofocus': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
            'warn',
            {
                arrowParens: 'always',
                semi: false,
                trailingComma: 'none',
                tabWidth: 4,
                endOfLine: 'auto',
                useTabs: false,
                singleQuote: true,
                printWidth: 120,
                jsxSingleQuote: true
            }
        ]
  },
};
