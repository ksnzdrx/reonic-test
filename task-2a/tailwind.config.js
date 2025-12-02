/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stat: {
          energy: {
            bg: '#D1FAE5',
            label: '#064E3B',
            value: '#064E3B',
          },
          events: {
            bg: '#A7F3D0',
            label: '#064E3B',
            value: '#064E3B',
          },
          month: {
            bg: '#6EE7B7',
            label: '#064E3B',
            value: '#064E3B',
          },
          week: {
            bg: '#34D399',
            label: '#022C22',
            value: '#022C22',
          },
          day: {
            bg: '#10B981',
            label: '#F0FDF4',
            value: '#F0FDF4',
          },
          average: {
            bg: '#047857',
            label: '#ECFDF5',
            value: '#ECFDF5',
          }
        },
        ui: {
          primary: '#D1FAE5',
          secondary: '#6EE7B7',
          card: '#FFFFFF',
          border: '#D1D5DB',
          bg1: "#212121ff",
          text: {
            title: '#A7F3D0',
            subtitle: '#A7F3D0',
            primary: '#022C22',
            secondary: '#064E3B',
            muted: '#022c22cd',
          },
          button: {
            inactive: '#E5E7EB',
            hover: '#CBD5E1',
            bg: '#A7F3D0',
            text: '#047857',
          },
          slider: '#D1FAE5',
          daySelector: '#10B981',
        },
      },
    },
  },
  plugins: [],
}
