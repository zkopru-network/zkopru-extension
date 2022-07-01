const path = require('path')

module.exports = {
  stories: [
    '../src/ui/components/**/*.stories.mdx',
    '../src/ui/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-postcss',
      options: {
        cssLoaderOptions: {
          importLoaders: 1
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  }
  // webpackFinal: async (config) => {
  //   config.module.rules.push({
  //     test: /\,css&/,
  //     use: [
  //       {
  //         loader: 'postcss-loader',
  //         options: {
  //           postcssOptions: {
  //             plugins: [require('tailwindcss'), require('autoprefixer')]
  //           }
  //         }
  //       }
  //     ],
  //     include: path.resolve(__dirname, '../')
  //   })
  //   return config
  // }
}
