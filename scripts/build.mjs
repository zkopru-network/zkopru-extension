import { build } from 'esbuild'
import fs from 'fs-extra'
import linaria from '@linaria/esbuild'
import yargs from 'yargs/yargs'
import { execSync } from 'child_process'

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
  },
  m: {
    type: 'boolean',
    alias: 'manifest',
    default: 'true'
  }
}).argv

console.log(`Start building files for target: ${argv.t}`)

if (argv.t === 'firefox') {
  await buildFirefox(argv)
} else if (argv.t === 'chromium') {
  await buildChromium(argv)
} else if (argv.t === 'all') {
  await buildFirefox(argv)
  await buildChromium(argv)
} else {
  console.error('Invalid target')
  process.exit(1)
}

async function buildFiles(opt) {
  const { m, outDir, manifestVersion } = opt
  const assetsDir = `${outDir}/assets`
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true })

  console.log('building source files')
  // build popup file
  await build({
    entryPoints: {
      popup: 'src/ui/popup.tsx',
      contentscript: 'src/scripts/contentscript/index.ts',
      inpage: 'src/scripts/injected/inpage.ts',
      sendL1Tx: 'src/scripts/injected/sendL1Tx.ts',
      zkopruProvider: 'src/scripts/injected/zkopruProvider.ts'
    },
    outdir: outDir,
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
    entryPoints: { background: 'src/scripts/background/index.ts' },
    outdir: outDir,
    bundle: true,
    format: 'esm',
    define: { window: 'globalThis' }
  })

  // copy html
  fs.copyFileSync('src/ui/popup.html', `${outDir}/popup.html`)

  // copy manifest.json
  if (m) {
    console.log('generating manifest.json')
    fs.copyFileSync(
      `src/manifest/${manifestVersion}.json`,
      `${outDir}/manifest.json`
    )
  }

  // copy icons
  console.log('generating assets files')
  fs.copy('src/assets', assetsDir)

  // build tailwind css with tailwindcss command
  // NOTE: does not have to be built with esbuild
  execSync(`npx tailwindcss -i src/index.css -o ${outDir}/tailwind.css`)

  console.log('Finish building files for', opt.targetName)
}

async function buildFirefox(opt) {
  await buildFiles({
    ...opt,
    outDir: 'build/firefox',
    targetName: 'firefox',
    manifestVersion: 'v2'
  })
}

async function buildChromium(opt) {
  await buildFiles({
    ...opt,
    outDir: 'build/chromium',
    targetName: 'chromium',
    manifestVersion: 'v3'
  })
}
