import '../src/index.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  themes: {
    default: 'Sanctum',
    list: [
      {
        name: 'Sanctum',
        class: ['theme-sanctum', 'mode-light'],
        color: '#8C62E7'
      },
      {
        name: 'Sanctum Dark',
        class: ['theme-sanctum', 'mode-dark'],
        color: '#152059'
      }
    ]
  }
}
