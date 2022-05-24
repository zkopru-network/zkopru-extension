import { build } from 'esbuild'
import fs from 'fs'
import linaria from '@linaria/esbuild'
import yargs from 'yargs/yargs'

// we use esbuild for our build system.
// it's blazing fast and has enough functionalities for our usecase.
// if we found out that its functionalities are short for our usecase,
// we might replace to other build tools such as webpack.
// please refer to its document.
// FYI: https://esbuild.github.io/getting-started/
const argv = yargs(process.argv.slice(2)).options({
  t: {
    choices: ['all', 'firefox', 'chromium'],
    alias: 'target',
    default: 'all'
  }
}).argv

console.log(`Start building files for target: ${argv.t}`)

if (argv.t === 'firefox') {
  await buildFirefox()
} else if (argv.t === 'chromium') {
  await buildChromium()
} else if (argv.t === 'all') {
  await buildFirefox()
  await buildChromium()
} else {
  console.error('Invalid target')
  process.exit(1)
}

async function buildFirefox() {
  console.log('Building files for Firefox')
  const outdir = 'build/firefox'
  const assetsDir = `${outdir}/assets`
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

  // build popup file
  await build({
    entryPoints: {
      popup: 'src/ui/popup.tsx',
      contentscript: 'src/contentscript.ts',
      inpage: 'src/inpage.ts'
    },
    outdir,
    bundle: true,
    format: 'esm',
    plugins: [
      linaria.default({
        sourceMap: true
      })
    ]
  })

  // build background script
  // in background script context, window object is not defined.
  // in order to build and use imported libraries built for web browser which depend on window global variable,
  // it's necessary to replace window variable with globalThis
  // FYI: https://esbuild.github.io/api/#define
  // NOTE: background script is too large. need to reduce size or split files
  await build({
    entryPoints: ['src/background.ts'],
    outdir,
    bundle: true,
    minify: true,
    format: 'esm',
    define: { window: 'globalThis' }
  })

  // copy html
  fs.copyFileSync('src/ui/popup.html', `${outdir}/popup.html`)

  // copy manifest.json
  // fs.copyFileSync('src/manifest_v3.json', 'build/manifest.json')
  fs.copyFileSync('src/manifest/v2.json', `${outdir}/manifest.json`)

  // copy icons
  fs.copyFileSync('src/assets/icon-16.png', `${assetsDir}/icon-16.png`)
  fs.copyFileSync('src/assets/icon-32.png', `${assetsDir}/icon-32.png`)

  console.log('Finish building files for Firefox')
}

async function buildChromium() {
  console.log('Building files for Chromium')
  const outdir = 'build/chromium'
  const assetsDir = `${outdir}/assets`
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

  // build popup file
  await build({
    entryPoints: {
      popup: 'src/ui/popup.tsx',
      contentscript: 'src/contentscript.ts',
      inpage: 'src/inpage.ts'
    },
    outdir,
    bundle: true,
    format: 'esm',
    plugins: [
      linaria.default({
        sourceMap: true
      })
    ]
  })

  // build background script
  // in background script context, window object is not defined.
  // in order to build and use imported libraries built for web browser which depend on window global variable,
  // it's necessary to replace window variable with globalThis
  // FYI: https://esbuild.github.io/api/#define
  // NOTE: background script is too large. need to reduce size or split files
  await build({
    entryPoints: ['src/background.ts'],
    outdir,
    bundle: true,
    minify: true,
    format: 'esm',
    define: { window: 'globalThis' }
  })

  // copy html
  fs.copyFileSync('src/ui/popup.html', `${outdir}/popup.html`)

  // copy manifest.json
  // fs.copyFileSync('src/manifest_v3.json', 'build/manifest.json')
  fs.copyFileSync('src/manifest/v3.json', `${outdir}/manifest.json`)

  // copy icons
  fs.copyFileSync('src/assets/icon-16.png', `${assetsDir}/icon-16.png`)
  fs.copyFileSync('src/assets/icon-32.png', `${assetsDir}/icon-32.png`)

  console.log('Finish building files for Chromium')
}
