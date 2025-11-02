module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // 'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],

    [
       'module-resolver',
      {
        root: ['./src'],
        alias: {
          src: './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@api': './src/api',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
  ],
};
