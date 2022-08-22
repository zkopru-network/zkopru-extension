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
  },
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#fff' },
      { name: 'dark', value: '#000' }
    ]
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
}
