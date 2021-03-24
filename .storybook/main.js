const path = require('path');
const postcssNormalize = require('postcss-normalize');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({ autoprefixer: { flexbox: 'no-2009' }, stage: 3 }),
          postcssNormalize(),
        ],
        sourceMap: true,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve('resolve-url-loader'),
        options: { sourceMap: true, root: path.join(__dirname, '..', 'src') },
      },
      {
        loader: require.resolve(preProcessor),
        options: { sourceMap: true },
      },
    );
  }
  return loaders;
};

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.(scss|sass)$/,
        exclude: /\.module\.(scss|sass)$/,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
          },
          'sass-loader',
        ),
        sideEffects: true,
      },
      {
        test: /\.module\.(scss|sass)$/,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: { getLocalIdent: getCSSModuleLocalIdent },
          },
          'sass-loader',
        ),
      },
    );
    // Return the altered config
    return config;
  },
};
