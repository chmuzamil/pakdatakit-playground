import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'

// The pakdatakit version actually installed (and so bundled), shown in the UI.
const pakdatakitVersion: string = JSON.parse(
  readFileSync(new URL('./node_modules/pakdatakit/package.json', import.meta.url), 'utf8'),
).version

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __PAKDATAKIT_VERSION__: JSON.stringify(pakdatakitVersion),
  },
})
