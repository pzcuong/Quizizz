/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				primary: '#f8fff0',
				background: '#f5f5f8',
				button: '#8daf74',
				darkGreen: '#1E3F20'
			},
			fontFamily: {
				body: ['Nunito'],
				title: ['Jost']
			}
		}
	},
	plugins: []
};
