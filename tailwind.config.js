/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/ui/components/**/*.{js,ts,jsx,tsx}',
    './src/ui/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        'sanctum-blue': '#3030C6',
        'sanctum-blue-dark': '#152059',
        'sanctum-blue-light': '#CBD4FF',
        'sanctum-blue-medium': '#3A405F'
      },
      opacity: {
        33: '.33'
      }
    }
  },
  plugins: []
}
