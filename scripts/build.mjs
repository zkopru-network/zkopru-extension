import { build } from 'esbuild'
import fs from 'fs'

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
