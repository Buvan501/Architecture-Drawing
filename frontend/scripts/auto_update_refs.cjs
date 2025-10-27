const fs = require('fs');
const path = require('path');

const srcRoot = path.join(__dirname, '..', 'src');

function makeSafe(segment) {
  // keep extension if present
  if (segment.includes('.')) {
    const idx = segment.lastIndexOf('.')
    const base = segment.substring(0, idx)
    const ext = segment.substring(idx)
    const safeBase = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+)|(-+$)/g, '')
    return safeBase + ext.toLowerCase()
  }
  return segment.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-+)|(-+$)/g, '')
}

function normalizeImagePath(oldPath) {
  // oldPath starts with /images/ or images/
  const p = oldPath.replace(/^\/*images\/*/, '')
  const parts = p.split('/')
  const normalizedParts = parts.map(makeSafe)
  return '/images/' + normalizedParts.join('/')
}

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const it of items) {
    const full = path.join(dir, it.name)
    if (it.isDirectory()) {
      walk(full)
    } else if (it.isFile() && /\.(js|jsx|ts|tsx|css|html)$/.test(it.name)) {
      let content = fs.readFileSync(full, 'utf8')
      let updated = false
      // Find quoted paths that start with /images/
      const regex = /(["'])(\/images\/.*?)(\1)/g
      content = content.replace(regex, (match, quote, imgPath) => {
        const newPath = normalizeImagePath(imgPath)
        if (newPath !== imgPath) {
          updated = true
          console.log(`Rewriting ${imgPath} -> ${newPath} in ${full}`)
          return quote + newPath + quote
        }
        return match
      })
      // Also handle without leading slash
      const regexNoSlash = /(["'])(images\/.*?)(\1)/g
      content = content.replace(regexNoSlash, (match, quote, imgPath) => {
        const newPath = normalizeImagePath('/' + imgPath)
        if (newPath !== '/' + imgPath) {
          updated = true
          console.log(`Rewriting ${imgPath} -> ${newPath} in ${full}`)
          return quote + newPath + quote
        }
        return match
      })

      if (updated) {
        fs.writeFileSync(full, content, 'utf8')
        console.log('Updated refs in:', full)
      }
    }
  }
}

walk(srcRoot)
console.log('Auto image ref normalization complete.')
