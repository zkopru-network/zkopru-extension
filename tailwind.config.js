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
        'skin-back': 'rgb(var(--color-back) / <alpha-value>)' // background color
      },
      opacity: {
        33: '.33'
      },
      textColor: {
        'skin-text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)'
      },
      backgroundImage: {
        'zk-pattern': 'url("assets/onboarding-bg.png")'
      }
    }
  },
  plugins: []
}
