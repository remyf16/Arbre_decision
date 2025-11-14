/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        'background-light': '#f8fafc',
        'background-dark': '#0b0f19',
        'surface-light': '#ffffff',
        'surface-dark': '#111827',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
        'text-light': '#0f172a',
        'text-dark': '#ffffff',
        'text-muted-light': '#6b7280',
        'text-muted-dark': '#9ca3af',
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
