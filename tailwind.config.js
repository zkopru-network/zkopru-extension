/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: [
  //   '.src/ui/components/**/*.{js,ts,jsx,tsx}',
  //   '.src/ui/pages/**/*.{js,ts,jsx,tsx}'
  // ],
  mode: 'jit',
  content: [
    '.src/ui/components/**/*.{js,ts,jsx,tsx}',
    '.src/ui/pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
