import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

const banners = ['banner-login.png', 'banner-cadastro.png', 'banner.png']

for (const file of banners) {
  const input = join(publicDir, file)
  const output = input.replace(/\.png$/, '.webp')
  try {
    await sharp(input).webp({ quality: 80 }).toFile(output)
    console.log(`${file} -> ${output.split(/[\\/]/).pop()}`)
  } catch (e) {
    console.warn(`skip ${file}: ${e.message}`)
  }
}
