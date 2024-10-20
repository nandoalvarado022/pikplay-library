/** @type {import('next').NextConfig} */

///* eslint-disable import/no-anonymous-default-export */
// import NextFederationPlugin from '@module-federation/nextjs-mf';

const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
    webpack(config, options) {
        const { isServer } = options;
        if (isServer) {
            config.optimization.usedExports = false
        }
        config.plugins.push(
            new NextFederationPlugin({
                name: 'pikplay-library',
                remotes: {
                    'pikplay-library': `pikplay-frontend@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
                },
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    './Header': './src/components/Header.jsx',
                },
                shared: {
                    // whatever else
                },
            }),
        );

        return config;
    },
};
