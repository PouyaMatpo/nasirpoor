module.exports = {
	content: [
		'./pages/**/*.{html,js,vue}',
		'./components/**/*.{html,js,vue}',
		'./layouts/**/*.{html,js,vue}',
		'./modules/**/*.{html,js,vue}',
		'./plugins/**/*.{html,js,vue}',
		'./node_modules/@eronco/**/*.{html,js,vue}',
		'./layouts/default.vue',
		'./layouts/error.vue'
	],
	theme: {
		extend: {
			lineHeight: {
				'11': '2.75rem',
				'12': '3rem',
				'13': '3.25rem',
				'14': '3.5rem',
			},
			borderRadius: {
				'4xl': '2rem',
				'5xl': '2.5rem',
				'6xl': '3rem',
			},
			zIndex: {
				'-5': '-5',
				'-4': '-4',
				'-3': '-3',
				'-2': '-2',
				'-1': '-1',
				'1': '1',
				'2': '2',
				'3': '3',
				'4': '4',
				'5': '5',
				'6': '6',
				'7': '7',
				'8': '8',
				'9': '9',
			},
		}
	},
	plugins: [],
	darkMode: 'class'
}
