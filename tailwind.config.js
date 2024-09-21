/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#f1641e',
                secondary: '#222222',
                white: 'white',
                'light-black-overlay': 'rgba(0, 0, 0, 0.2)',
                'dark-gray-overlay': '#0e0e0e2e',
                'medium-black-overlay': 'rgba(0, 0, 0, 0.5)',
                'neutral-grey': '#808080',
                'charcoal-grey': '#595959',
                'light-grey-overlay': '#dedede90',

                'soft-coral': '#f9746b',
                'vibrant-orange': '#f1641e',
                'blush-pink': '#f9e3e2',
                'primary-green': 'green',
                'translucent-black': 'rgba(0, 0, 0, 0.75)',
                'primary-orange': 'orange',
                'neon-green': 'rgb(125, 251, 125)',
                'light-sage': 'rgb(225, 227, 223)',
                'sky-blue': '#68e',
            },
        },
    },
    plugins: [],
};
