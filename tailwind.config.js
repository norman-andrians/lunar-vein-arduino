/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3A3AFF',
        'secondary': '#0B0B1D66',
        'secondary-solid': '#0B0B1D',
        'finn': '#00000066',
        'finn-solid': '#000000',
        'danger': '#FF016C',
        'disabled': '#7373B0',
        'border': '#FFFFFF66',
        'background': '#06060C'
      },
      fontFamily: {
        'poppins': '"Poppins", sans-serif',
        'roboto-mono': '"Roboto Mono", monospace',
      },
      animation: {
        'size-in': 'size-in .3s ease-in-out',
        'fade-in': 'fade-in .3s ease-in-out',
        'size-fade-in': 'size-fade-in .3s ease-in-out',
        'wewew': 'wewew .9s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
