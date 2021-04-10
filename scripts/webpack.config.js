// Custom webpack configuration file, provides generation of service worker
// More information: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
const { GenerateSW } = require('workbox-webpack-plugin');
//const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        /*new CopyPlugin([
            './src/index.html',
            './src/manifest.json',
            './src/resources'
        ]),*/
        new GenerateSW({
            swDest: 'sw.js',
            importScripts: ['pushSW.js'],
            skipWaiting: true,
            clientsClaim: true,
            runtimeCaching: [
                {
                    urlPattern: new RegExp('api/records$'),
                    handler: 'StaleWhileRevalidate'
                },
                {
                    urlPattern: new RegExp('api/vapidPublicKey$'),
                    handler: 'StaleWhileRevalidate'
                },
                {
                    urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                    handler: 'StaleWhileRevalidate'
                }
            ]
        })
    ]
};