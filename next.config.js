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
                filename: 'static/chunks/remoteEntry.js',
                exposes: {
                    // './Header': './src/components/Header.jsx',
                    './Login': './src/modules/Login/Login.jsx',
                },
                shared: {
                    // whatever else
                },
            }),
        );

        return config;
    },
};
