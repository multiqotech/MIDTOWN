const fs = require('fs');
const path = require('path');

const DASHBOARD_DIR = path.join(__dirname, 'admin/src/app/dashboard');
const IMAGE_UPLOAD_IMPORT_1 = `import ImageUpload from '../../../components/ImageUpload';`;
const IMAGE_UPLOAD_IMPORT_2 = `import ImageUpload from '../../components/ImageUpload';`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Determine import path based on depth
  const depth = filePath.split('/').length - DASHBOARD_DIR.split('/').length;
  const importStr = depth === 2 ? IMAGE_UPLOAD_IMPORT_1 : IMAGE_UPLOAD_IMPORT_2;

  // Ensure import exists if we make changes
  const addImport = (text) => {
    if (!text.includes('ImageUpload')) {
      const lines = text.split('\n');
      const lastImportIndex = lines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, -1);
      lines.splice(lastImportIndex + 1, 0, importStr);
      return lines.join('\n');
    }
    return text;
  };

  // Pattern for CRUD:
  // <label...>Image URL</label>\s*<input...value={editingItem\?.image || editingItem\?.imageUrl || ''}...onChange={(e) => setEditingItem(prev => ({ ...prev, image: e.target.value, imageUrl: e.target.value }))}.../>
  const crudPattern = /<div>\s*<label[^>]*>(?:Cover )?Image(?: URL)?<\/label>\s*<input[^>]*value=\{editingItem\?\.([^ |]+)(?: \|\| [^}]+)?\}[^>]*onChange=\{\(e\) => setEditingItem\([^>]*\)[^>]*\/>\s*<\/div>/g;

  content = content.replace(crudPattern, (match, fieldName) => {
    changed = true;
    return `<ImageUpload label="Image" value={editingItem?.${fieldName} || ''} onChange={(url) => setEditingItem(prev => ({ ...prev, ${fieldName}: url }))} />`;
  });

  // Also catch generic image fields in crud:
  const crudPattern2 = /<div>\s*<label[^>]*>([^<]*(?:Image|Logo)[^<]*)<\/label>\s*<input[^>]*value=\{editingItem\?\.([a-zA-Z0-9_]+)[^}]*\}[^>]*onChange=\{\(e\) => setEditingItem\([^>]*\)[^>]*\/>\s*<\/div>/g;
  content = content.replace(crudPattern2, (match, label, fieldName) => {
    if(match.includes('ImageUpload')) return match; // skip if already replaced
    changed = true;
    return `<ImageUpload label="${label}" value={editingItem?.${fieldName} || ''} onChange={(url) => setEditingItem(prev => ({ ...prev, ${fieldName}: url }))} />`;
  });

  // Pattern for Singleton (e.g. data.heroImage)
  const singletonPattern = /<div(?:[^>]*)>\s*<label[^>]*>([^<]*(?:Image|Logo)[^<]*)<\/label>\s*<input[^>]*value=\{data\.([a-zA-Z0-9_]+)\}[^>]*onChange=\{\(e\) => setData\(\{ \.\.\.data, [a-zA-Z0-9_]+: e\.target\.value \}\)\}[^>]*\/>\s*<\/div>/g;
  content = content.replace(singletonPattern, (match, label, fieldName) => {
    changed = true;
    return `<ImageUpload label="${label}" value={data.${fieldName} || ''} onChange={(url) => setData({ ...data, ${fieldName}: url })} />`;
  });

  // Catch coverImage or generic singletons
  const singletonPattern2 = /<div>\s*<label[^>]*>([^<]*(?:Image|Logo)[^<]*)<\/label>\s*<input[^>]*value=\{([a-zA-Z0-9_\.]+)\}[^>]*onChange=\{\(e\) => ([a-zA-Z0-9_]+)\([^>]*e\.target\.value[^>]*\)\}[^>]*\/>\s*<\/div>/g;
  content = content.replace(singletonPattern2, (match, label, valuePath, setterFunc) => {
    if(match.includes('ImageUpload')) return match; // skip if already replaced
    if(!valuePath.includes('data.')) return match;
    const fieldName = valuePath.split('.')[1];
    changed = true;
    return `<ImageUpload label="${label}" value={${valuePath} || ''} onChange={(url) => ${setterFunc}({ ...data, ${fieldName}: url })} />`;
  });

  if (changed) {
    content = addImport(content);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverseDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverseDir(fullPath);
    } else if (fullPath.endsWith('Manager.tsx')) {
      processFile(fullPath);
    }
  });
}

traverseDir(DASHBOARD_DIR);
console.log('Refactoring complete.');
