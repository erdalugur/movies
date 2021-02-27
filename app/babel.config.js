module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            screens: './src/screens',
            theme: './src/theme',
            utils: './src/utils',
            components: './src/components',
            api: './src/api',
            config: "./src/config",
            context: "./src/context",
            types: "./src/navigation"
          }
        }
      ]
    ]
  };
};
