import { build } from 'esbuild'
import fs from 'fs'

console.log('build starting...')

// build popup file
await build({
  entryPoints: ['src/popup.tsx', 'src/background.ts'],
  outdir: 'build',
  bundle: true
})

// copy html
fs.copyFileSync('src/popup.html', 'build/popup.html')

// copy manifest.json
fs.copyFileSync('src/manifest.json', 'build/manifest.json')
