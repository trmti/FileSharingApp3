const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#69D2E7',
          '@font-family':
            '"Times New Roman", "YuMincho", "Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
          '@font-color': '#333333',
        },
      },
    },
  ],
};
