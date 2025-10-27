const fs = require('fs');
const path = require('path');

const mapPath = path.join(__dirname, 'image_name_map.json');
if (!fs.existsSync(mapPath)) {
  console.error('Mapping file not found:', mapPath);
  process.exit(1);
}

const mappings = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
if (!Array.isArray(mappings) || mappings.length === 0) {
  console.log('No mappings to apply.');
  process.exit(0);
}

// Build a small deduped map (old -> new)
const map = {};
for (const m of mappings) {
  if (m.old && m.new) map[m.old] = m.new;
}

const srcRoot = path.join(__dirname, '..', 'src');

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      walk(full);
    } else if (it.isFile() && /\.(js|jsx|ts|tsx|css|html)$/.test(it.name)) {
      let content = fs.readFileSync(full, 'utf8');
      let updated = false;
      for (const oldPath in map) {
        const newPath = map[oldPath];
        if (content.includes(oldPath)) {
          content = content.split(oldPath).join(newPath);
          updated = true;
        }
        // also try without leading slash
        const oldNoSlash = oldPath.startsWith('/') ? oldPath.substring(1) : oldPath;
        const newNoSlash = newPath.startsWith('/') ? newPath.substring(1) : newPath;
        if (content.includes(oldNoSlash)) {
          content = content.split(oldNoSlash).join(newNoSlash);
          updated = true;
        }
      }
      if (updated) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Updated refs in:', full);
      }
    }
  }
}

walk(srcRoot);
console.log('Image reference update complete.');
