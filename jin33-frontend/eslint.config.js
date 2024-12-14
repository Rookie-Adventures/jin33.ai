import { defineConfig, flatConfig } from 'eslint';

export default defineConfig([
    flatConfig({
        // 指定环境
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: ['./tsconfig.json', './tsconfig.eslint.json'],
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                React: 'readonly',
                JSX: 'readonly'
            }
        },
        // 指定插件
        plugins: [
            '@typescript-eslint',
            'react',
            'react-hooks',
            'jest'
        ],
        // 指定规则
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            'no-unused-vars': 'off',
            'no-console': ['warn', { allow: ['warn', 'error'] }]
        },
        // 指定文件匹配模式
        files: ['**/*.ts', '**/*.tsx'],
        // 指定排除文件
        ignores: ['**/node_modules/**', '**/dist/**', 'coverage/**'],
        // 指定扩展配置
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended',
            'plugin:react-hooks/recommended'
        ]
    })
]); 