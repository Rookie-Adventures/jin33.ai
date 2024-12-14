import { defineConfig } from 'eslint';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';

export default defineConfig([
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.config.js']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'jsdoc': jsdoc
    },
    rules: {
      // TypeScript 规则
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      '@typescript-eslint/interface-name-prefix': ['error', { 'prefixWithI': 'always' }],
      '@typescript-eslint/consistent-type-imports': ['error', {
        'prefer': 'type-imports',
        'disallowTypeAnnotations': true
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'interface',
          'format': ['PascalCase'],
          'prefix': ['I']
        },
        {
          'selector': 'typeAlias',
          'format': ['PascalCase'],
          'prefix': ['T']
        }
      ],
      
      // 通用规则
      'no-console': ['error', { 'allow': ['warn', 'error'] }]
    }
  }
]); 