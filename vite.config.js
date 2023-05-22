import path from 'path'
const { defineConfig } = require('vite')
import esbuild from 'rollup-plugin-esbuild'
import basicSsl from '@vitejs/plugin-basic-ssl'
import CustomHmr from './test/CustomHmr'
// import { obfuscator } from 'rollup-obfuscator'
// import del from 'rollup-plugin-delete'

const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

module.exports = defineConfig({
	root: './',
	base: './',
	server: {
		host: true,
		https: true,
		port: 4000,
		open: !isCodeSandbox, // Open if it's not a CodeSandbox
		origin: 'https://127.0.0.1:4000',
	},
	plugins: [ basicSsl(), CustomHmr() ],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: path.resolve(__dirname, './src/XYZ3d.js'),
			name: 'XYZ3d',
			// the proper extensions will be added
			fileName: (format) => `xyz3d.${format}.js`,
		},
		rollupOptions: {
			browser: true,
			main: true,
			// external: ['three', 'camera-controls'],
			plugins: [
				// del({ ignore: [ 'dist/*.js', 'dist/*.map' ], targets: 'dist/*', hook: 'generateBundle' }),
				esbuild(),
				// obfuscator({
				// 	global: false,
				// 	sourceMap: true,
				// }),
			],
			sourcemap: true,
		},
		outDir: './dist',
		emptyOutDir: true,
		sourcemap: true,
		minify: true,
	},
})
