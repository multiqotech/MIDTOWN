const fs = require('fs');
const path = require('path');

const DASHBOARD_DIR = path.join(__dirname, 'admin/src/app/dashboard');
const IMAGE_UPLOAD_IMPORT_1 = `import ImageUpload from '../../../components/ImageUpload';`;
const IMAGE_UPLOAD_IMPORT_2 = `import ImageUpload from '../../components/ImageUpload';`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const depth = filePath.split('/').length - DASHBOARD_DIR.split('/').length;
  const importStr = depth === 2 ? IMAGE_UPLOAD_IMPORT_1 : IMAGE_UPLOAD_IMPORT_2;

  const addImport = (text) => {
    if (!text.includes('ImageUpload')) {
      const lines = text.split('\n');
      const lastImportIndex = lines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, -1);
      lines.splice(lastImportIndex + 1, 0, importStr);
      return lines.join('\n');
    }
    return text;
  };

  // Find generic divs wrapping a label about Image and an input
  const blockRegex = /<div(?:[^>]*)>\s*<label(?:[^>]*)>([^<]*?(?:Image|Logo|Cover)[^<]*?)<\/label>\s*<input(?:[^>]*?)value=\{([^}]+)\}(?:[^>]*?)onChange=\{\(e: any\) => ([^\}]+)\}(?:[^>]*?)\/>\s*<\/div>/g;
  
  content = content.replace(blockRegex, (match, label, valueProp, setterBlock) => {
    if(match.includes('ImageUpload')) return match;
    changed = true;
    
    // setterBlock looks like `setData((prev: any) => ({ ...prev!, heroImage: e.target.value }))`
    // or `setEditingItem(prev => ({ ...prev, image: e.target.value }))`
    const cleanLabel = label.replace(/\*|URL/g, '').trim();
    const newSetter = setterBlock.replace(/e\.target\.value/g, 'url');
    
    return `<ImageUpload label="${cleanLabel}" value={${valueProp}} onChange={(url) => ${newSetter}} />`;
  });
  
  // also handle standard e => set...(e.target.value) without typing
  const blockRegex2 = /<div(?:[^>]*)>\s*<label(?:[^>]*)>([^<]*?(?:Image|Logo|Cover)[^<]*?)<\/label>\s*<input(?:[^>]*?)value=\{([^}]+)\}(?:[^>]*?)onChange=\{\(e\) => ([^\}]+)\}(?:[^>]*?)\/>\s*<\/div>/g;
  
  content = content.replace(blockRegex2, (match, label, valueProp, setterBlock) => {
    if(match.includes('ImageUpload')) return match;
    changed = true;
    
    const cleanLabel = label.replace(/\*|URL/g, '').trim();
    const newSetter = setterBlock.replace(/e\.target\.value/g, 'url');
    
    return `<ImageUpload label="${cleanLabel}" value={${valueProp}} onChange={(url) => ${newSetter}} />`;
  });
  
  // What if it's setData({...data, heroImage: e.target.value})
  const blockRegex3 = /<div(?:[^>]*)>\s*<label(?:[^>]*)>([^<]*?(?:Image|Logo|Cover)[^<]*?)<\/label>\s*<input(?:[^>]*?)value=\{([^}]+)\}(?:[^>]*?)onChange=\{\(e\) => ([^}]+\.\.\.[^}]+\: e\.target\.value [^}]+)\}(?:[^>]*?)\/>\s*<\/div>/g;
  
  content = content.replace(blockRegex3, (match, label, valueProp, setterBlock) => {
    if(match.includes('ImageUpload')) return match;
    changed = true;
    
    const cleanLabel = label.replace(/\*|URL/g, '').trim();
    const newSetter = setterBlock.replace(/e\.target\.value/g, 'url');
    
    return `<ImageUpload label="${cleanLabel}" value={${valueProp}} onChange={(url) => ${newSetter}} />`;
  });

  // What if it's onChange={e => setEditingItem({...editingItem, image: e.target.value})}
  const blockRegex4 = /<div(?:[^>]*)>\s*<label(?:[^>]*)>([^<]*?(?:Image|Logo|Cover)[^<]*?)<\/label>\s*<input(?:[^>]*?)value=\{([^}]+)\}(?:[^>]*?)onChange=\{e => ([^}]+\.\.\.[^}]+\: e\.target\.value [^}]+)\}(?:[^>]*?)\/>\s*<\/div>/g;

  content = content.replace(blockRegex4, (match, label, valueProp, setterBlock) => {
    if(match.includes('ImageUpload')) return match;
    changed = true;
    
    const cleanLabel = label.replace(/\*|URL/g, '').trim();
    const newSetter = setterBlock.replace(/e\.target\.value/g, 'url');
    
    return `<ImageUpload label="${cleanLabel}" value={${valueProp}} onChange={(url) => ${newSetter}} />`;
  });

  if (changed) {
    let newContent = addImport(content);
    fs.writeFileSync(filePath, newContent, 'utf8');
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
