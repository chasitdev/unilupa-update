const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    resolver: {
        extraNodeModules: {
            '@ui': path.resolve(__dirname, 'components/ui'),
            '@components': path.resolve(__dirname, 'components'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@assets': path.resolve(__dirname, 'assets'),
            '@api': path.resolve(__dirname, 'api'),
            '@types': path.resolve(__dirname, 'types'),
        },
        watchFolders: [
            path.resolve(__dirname, 'components'),
            path.resolve(__dirname, 'utils'),
            path.resolve(__dirname, 'assets'),
            path.resolve(__dirname, 'api'),
            path.resolve(__dirname, 'types'),
        ],
        // useWatchman: false,
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
