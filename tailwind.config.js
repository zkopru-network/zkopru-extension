/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/ui/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/pages/**/*.{js,ts,jsx,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'btn-bright': 'rgb(var(--color-btn-bright) / <alpha-value>)',
        'skin-light-gray': 'rgb(var(--color-light-gray) / <alpha-value>)',
        'skin-back': 'rgb(var(--color-back) / <alpha-value>)', // background color
        'skin-text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'skin-g-primary': 'rgb(var(--color-g-primary) / <alpha-value>)',
        'skin-g-secondary': 'rgb(var(--color-g-secondary) / <alpha-value>)',
        'skin-inverse': 'rgb(var(--color-inverse) / <alpha-value>)',
        'tab-selected': 'rgb(var(--color-tab-selected) / <alpha-value>)'
      },
      opacity: {
        33: '.33'
      },
      backgroundImage: {
        'zk-pattern': 'url("assets/onboarding-bg.png")',
        'zk-logo': 'url("assets/logo-bg.png")'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
