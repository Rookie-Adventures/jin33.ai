module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                node: 'current'
            },
            modules: 'auto'
        }],
        '@babel/preset-typescript',
        ['@babel/preset-react', {
            runtime: 'automatic',
            development: process.env.NODE_ENV === 'development',
            importSource: '@emotion/react'
        }],
    ],
    plugins: [
        '@emotion/babel-plugin',
        ['@babel/plugin-transform-runtime', {
            corejs: 3,
            helpers: true,
            regenerator: true,
            useESModules: true
        }],
        '@babel/plugin-proposal-class-properties',
        'babel-plugin-transform-import-meta'
    ],
    env: {
        test: {
            presets: [
                ['@babel/preset-env', {
                    targets: {
                        node: 'current'
                    },
                    modules: 'commonjs'
                }]
            ],
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'babel-plugin-transform-import-meta'
            ]
        }
    }
}; 