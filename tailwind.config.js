module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        bg: 'var(--bg-color)',
        text: 'var(--text-color)',
        border: 'var(--border-color)',
        card: 'var(--card-bg)',
        hover: 'var(--hover-color)',
      },
    },
  },
  plugins: [],
}