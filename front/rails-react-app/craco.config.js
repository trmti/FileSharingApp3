const CracoLessPlugin = require('craco-less');

module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.webSocketServer = {
      options: { path: 'ws' },
    };
    return devServerConfig;
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#69D2E7',
              '@font-family':
                '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
              '@font-color': '#333333',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
