/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem', // 10px
        '3xl': '1.875rem', // 30px
        '4xl': '2.75rem', 
        '5xl': '3rem',    // 48px
      },
    },
  },
  plugins: [
    require('flowbite-typography'),
  ],
}

