import { build } from 'esbuild'
import fs from 'fs'

// we use esbuild for our build system.
// it's blazing fast and has enough functionalities for our usecase.
// if we found out that its functionalities are short for our usecase,
// we might replace to other build tools such as webpack.
// please refer to its document.
// FYI: https://esbuild.github.io/getting-started/

console.log('Start building files.')

// build popup file
await build({
  entryPoints: {
    popup: 'src/ui/popup.tsx',
    contentscript: 'src/contentscript.ts',
    inpage: 'src/inpage.ts'
  },
  outdir: 'build',
  bundle: true,
  format: 'esm'
})

// build background script
// in background script context, window object is not defined.
// in order to build and use imported libraries built for web browser which depend on window global variable,
// it's necessary to replace window variable with globalThis
// FYI: https://esbuild.github.io/api/#define
// NOTE: background script is too large. need to reduce size or split files
await build({
  entryPoints: ['src/background.ts'],
  outdir: 'build',
  bundle: true,
  minify: true,
  format: 'esm',
  define: { window: 'globalThis' }
})

// copy html
fs.copyFileSync('src/ui/popup.html', 'build/popup.html')

// copy manifest.json
// fs.copyFileSync('src/manifest_v3.json', 'build/manifest.json')
fs.copyFileSync('src/manifest/v2.json', 'build/manifest.json')

// copy icons
const assetsDir = 'build/assets'
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

fs.copyFileSync('assets/icon-16.png', 'build/assets/icon-16.png')
fs.copyFileSync('assets/icon-32.png', 'build/assets/icon-32.png')

console.log('Finish building files.')
