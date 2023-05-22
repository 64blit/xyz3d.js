const path = require('path')
const { defineConfig } = require('vite')

const isCodeSandbox =
  'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env

module.exports = defineConfig({
  root: './',
  publicDir: './public',
  base: './',
  server: {
    host: true,
    open: !isCodeSandbox // Open if it's not a CodeSandbox
  }
})
