// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Это включает все нужные файлы
  ],
  theme: {
    extend: {
      colors: {
        primary: { // Ваша primary секция
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#0e7490',
        },
        secondary: '#f0f9ff', // <--- Вот ваш bg-secondary должен браться отсюда
        accent: '#f97316',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}