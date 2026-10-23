import { readFile, access, stat } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const manifest = JSON.parse(await readFile(path.join(root, 'src/data/media-manifest.json'), 'utf8'))
const assets = [
  ['Hero video', manifest.hero],
  ['Feature image', manifest.feature],
  ...Object.entries(manifest.projects),
]
let pending = 0
let invalid = 0
for (const [name, asset] of assets) {
  if (!asset.src) {
    console.log(`PENDING ${name}: ${asset.expected}`)
    pending++
    continue
  }
  if (!/^\/assets\/[a-z0-9-]+\.(mp4|webm|webp|avif|png|jpg)$/.test(asset.src)) {
    console.error(`INVALID asset path: ${name}`)
    invalid++
    continue
  }
  const filename = path.join(root, 'public', asset.src)
  try {
    await access(filename)
    const details = await stat(filename)
    if (!details.size) throw new Error('empty file')
    console.log(`READY ${name}: ${asset.src} (${Math.round(details.size / 1024)} KB)`)
  } catch {
    console.error(`MISSING ${name}: ${asset.src}`)
    invalid++
  }
}
console.log(
  `${assets.length - pending - invalid} ready, ${pending} pending, ${invalid} invalid. Provider: ${manifest.provider}.`,
)
if (invalid || (process.argv.includes('--strict') && pending)) process.exitCode = 1
