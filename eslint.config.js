import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import eslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // Базовая конфигурация JavaScript
  js.configs.recommended,

  // Конфигурация для TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      parser: eslintParser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // Рекомендованные правила для React Hooks
      '@typescript-eslint/no-unused-vars': 'error', // Правило TypeScript
      'prettier/prettier': 'error', // Применение Prettier как правила
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Конфигурация для Prettier
  eslintConfigPrettier, // Это правило отключает все конфликтующие с Prettier правила
];
