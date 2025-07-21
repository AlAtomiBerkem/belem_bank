const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'materials');
const OUTPUT = path.join(__dirname, 'materials_structure.json');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries
    .filter(entry => entry.name !== '.DS_Store')
    .map(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return {
          type: 'folder',
          name: entry.name,
          children: walk(fullPath)
        };
      } else {
        return {
          type: 'file',
          name: entry.name
        };
      }
    });
}

const structure = walk(ROOT);
fs.writeFileSync(OUTPUT, JSON.stringify(structure, null, 2), 'utf-8');
console.log('Структура материалов сохранена в', OUTPUT); 