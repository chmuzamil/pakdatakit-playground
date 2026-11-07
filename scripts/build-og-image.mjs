// Renders scripts/og-image.svg to public/og-image.png (1200x630), the image
// shown when a playground link is shared. resvg is not a project dependency;
// after editing the SVG, run this from any folder where it is installed:
//   npm i @resvg/resvg-js@2.6.2 && node <path>/scripts/build-og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const { Resvg } = createRequire(join(process.cwd(), 'noop.js'))('@resvg/resvg-js')

const svg = readFileSync(join(root, 'scripts', 'og-image.svg'), 'utf8')
const png = new Resvg(svg, {
  fitTo: { mode: 'width', value: 1200 },
  font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
}).render().asPng()

writeFileSync(join(root, 'public', 'og-image.png'), png)
console.log(`Wrote public/og-image.png (${(png.length / 1024).toFixed(0)} KB)`)
