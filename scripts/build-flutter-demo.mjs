/**
 * Builds the Flutter demo (flutter-demo/) for the web and copies it into
 * public/flutter-demo, where Vite serves it as static files. Vercel cannot
 * build Flutter, so the output is committed. Re-run after changing the demo or
 * upgrading pakdatakit_flutter:
 *
 *   npm run build:flutter-demo
 *
 * The CanvasKit renderer is loaded from Google's CDN (Flutter's default), so
 * the local canvaskit/ copy (about 30 MB) is not shipped.
 */
import { execSync } from 'node:child_process'
import { cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const app = join(root, 'flutter-demo')
const built = join(app, 'build', 'web')
const target = join(root, 'public', 'flutter-demo')

// Always build from scratch: an interrupted build can leave an incremental
// cache that silently skips the asset manifests. Run this from the real
// folder, not through a junction or symlink, or Flutter fails to write assets.
rmSync(join(app, 'build'), { recursive: true, force: true })
execSync('flutter pub get', { cwd: app, stdio: 'inherit' })
execSync('flutter build web --release --base-href /flutter-demo/', {
  cwd: app,
  stdio: 'inherit',
  env: { ...process.env, MSYS_NO_PATHCONV: '1' },
})

rmSync(target, { recursive: true, force: true })
cpSync(built, target, {
  recursive: true,
  filter: (source) => !source.startsWith(join(built, 'canvaskit')),
})

if (existsSync(join(target, 'canvaskit'))) {
  throw new Error('canvaskit/ should not be copied')
}
console.log(`Copied the Flutter demo to ${target}`)
