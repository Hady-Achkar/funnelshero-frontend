const colors = require('tailwindcss/colors')
module.exports = {
	purge: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#2680eb',
				'dar-gray': '#4b4b4b',
				'light-gray-0': '#eaeaea',
				'light-gray-1': 'rgb(75,75,75)',
				'light-gray-2': 'rgb(128,128,128)',
				'renderer-gray': 'rgb(224, 224, 224)',
				red: colors.red,
				'green-400': '#2d9d78',
				'green-500': '#268e6c',
				'warm-gray': colors.warmGray,
				emerald: colors.emerald,
				teal: colors.teal,
			},
		},
	},
	variants: {},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
	],
}
