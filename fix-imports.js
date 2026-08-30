const fs = require('fs');
const path = require('path');

const DASHBOARD_DIR = path.join(__dirname, 'admin/src/app/dashboard');

function addImportIfMissing(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<ImageUpload') && !content.includes('import ImageUpload')) {
    const lines = content.split('\n');
    let reactImportIndex = lines.findIndex(line => line.startsWith('import React') || line.includes('import { useState'));
    if (reactImportIndex !== -1) {
      lines.splice(reactImportIndex + 1, 0, "import ImageUpload from '../../../components/ImageUpload';");
      fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
      console.log(`Added import to ${filePath}`);
    }
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('Manager.tsx')) {
      addImportIfMissing(fullPath);
    }
  });
}

traverseDir(DASHBOARD_DIR);
console.log('Done.');
