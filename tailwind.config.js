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
        'btn-primary': 'rgb(var(--color-btn-primary) / <alpha-value>)'
        // 'primary-dark': '#152059',
        // 'primary-light': '#CBD4FF',
        // 'primary-medium': '#3A405F'
      },
      opacity: {
        33: '.33'
      }
    }
  },
  plugins: []
}
