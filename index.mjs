import fs from 'fs'
import zlib from 'zlib'
import util from 'util'

class Cache {
  constructor(path) {
    this.path = path
    this.brotliCompress = util.promisify(zlib.brotliCompress)
    this.brotliDecompress = util.promisify(zlib.brotliDecompress)
    this.cache = {}
  }

  async load() {
    const fileExists = await fs.promises.stat(this.path).then(() => true).catch(() => false)
    if (fileExists) {
      const compressed = await fs.promises.readFile(this.path)
      const decompressed = await this.brotliDecompress(compressed)
      this.cache = JSON.parse(decompressed.toString())
    }
  }

  async save() {
    const decompressed = Buffer.from(JSON.stringify(this.cache))
    const compressed = await this.brotliCompress(decompressed)
    await fs.promises.writeFile(this.path, compressed)
  }

  set(key, value) {
    this.cache[key] = value
  }

  get(key) {
    return this.cache[key]
  }

  has(key) {
    return this.cache[key] !== undefined
  }
}

export default Cache
