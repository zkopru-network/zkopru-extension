const path = require('path')

module.exports = {
  stories: [
    '../src/ui/components/**/*.stories.mdx',
    '../src/ui/components/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    'storybook-addon-themes',
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
}
