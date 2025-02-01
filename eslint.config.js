// eslint.config.js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import importSortPlugin from 'eslint-plugin-simple-import-sort'
import globals from 'globals'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      'simple-import-sort': importSortPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...prettierPlugin.configs.recommended.rules,
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
      semi: ['error', 'never'],
    },
  },
  {
    ignores: ['node_modules', 'build', 'dist', '.vscode'],
  },
]
