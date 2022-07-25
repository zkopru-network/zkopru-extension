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
    default: 'bg-sanctum-light',
    values: [
      { name: 'bg-sanctum-light', value: '#F9FAFF' },
      { name: 'bg-sanctum-dark', value: '#15172E' }
    ]
  },
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
  }
}
