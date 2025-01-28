import globals from 'globals';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/', 'package-lock.json'],
  },
];
