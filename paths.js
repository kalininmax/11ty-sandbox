module.exports = {
	build: {
		root: 'build/',
		styles: 'build/assets/styles/',
		images: 'build/assets/images/',
		svg: 'build/assets/svg/',
		js: 'build/assets/js/'
	},
	src: {
		styles: 'src/assets/styles/index.scss',
		tailwind: 'src/assets/styles/tailwind.css',
		images: 'src/assets/images/',
		imagesInline: 'src/assets/images/inline',
		svg: 'src/assets/images/svg/**/*.svg',
		js: 'src/assets/js/',
		jsEntryPoint: 'src/assets/js/index.js'
	},
	watch: {
		styles: 'src/assets/styles/**/*.{sass,scss}',
		tailwind: ['src/assets/styles/tailwind.css', 'src/**/*.njk'],
		svg: 'src/assets/images/svg/**/*.svg'
	},
	purgecssContent: 'build/**/*.{html,js}',
	tailwindContent: ['./src/**/*.njk', './src/**/*.svg']
}
