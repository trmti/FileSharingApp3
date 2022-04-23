const { override, fixBabelImports } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
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
  })
);
