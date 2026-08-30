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

  // Find all instances of <div>...<label...>.*Image.*</label>...<input.../>...</div>
  // We'll use a safer approach: matching lines or blocks.
  
  // Strategy:
  // Split file into lines, look for "<label...>.*Image.*</label>" or "Logo"
  // If found, check if next line is an <input ... />
  // If so, replace the <div>...</div> block wrapping it.

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if line contains a label that mentions Image, Logo, Cover, etc.
    if (line.includes('<label') && (line.toLowerCase().includes('image') || line.toLowerCase().includes('logo') || line.toLowerCase().includes('cover'))) {
      
      // Look ahead for the <input>
      let inputLineIdx = -1;
      for (let j = i + 1; j <= i + 3 && j < lines.length; j++) {
        if (lines[j].includes('<input')) {
          inputLineIdx = j;
          break;
        }
      }

      if (inputLineIdx !== -1) {
        const inputLine = lines[inputLineIdx];
        
        // Extract the state variable it edits (e.g. editingItem?.image or data.heroImage)
        const valueMatch = inputLine.match(/value=\{([^\}]+)\}/);
        const onChangeMatch = inputLine.match(/onChange=\{\([^)]*\)\s*=>\s*([^}]+)\}/);
        
        if (valueMatch && onChangeMatch) {
          let valueStr = valueMatch[1]; // e.g. "editingItem?.image || editingItem?.imageUrl || ''"
          let onChangeStr = onChangeMatch[1]; // e.g. "setEditingItem(prev => ({ ...prev, image: e.target.value, imageUrl: e.target.value }))"
          
          // Clean up valueStr to just get the main variable part without the default fallback
          let cleanValue = valueStr.split('||')[0].trim(); // e.g. editingItem?.image
          
          // Modify the onChangeStr to use the new 'url' parameter instead of 'e.target.value'
          let newOnChange = onChangeStr.replace(/e\.target\.value/g, 'url');
          
          // The label text
          const labelMatch = line.match(/>([^<]+)<\/label>/);
          const labelText = labelMatch ? labelMatch[1].replace('URL', '').trim() : 'Image';

          // Look backwards for <div>
          let divStartIdx = i;
          while (divStartIdx >= 0 && !lines[divStartIdx].includes('<div')) {
            divStartIdx--;
          }
          
          // Look forwards for </div>
          let divEndIdx = inputLineIdx;
          while (divEndIdx < lines.length && !lines[divEndIdx].includes('</div>')) {
            divEndIdx++;
          }

          if (divStartIdx >= 0 && divEndIdx < lines.length) {
            // Found a full block, replace it
            const newBlock = `            <ImageUpload label="${labelText}" value={${cleanValue}} onChange={(url) => ${newOnChange}} />`;
            
            // Delete lines from divStartIdx to divEndIdx
            lines.splice(divStartIdx, divEndIdx - divStartIdx + 1, newBlock);
            changed = true;
            
            // Adjust loop index since we removed lines
            i = divStartIdx; 
          }
        }
      }
    }
  }

  if (changed) {
    let newContent = lines.join('\n');
    newContent = addImport(newContent);
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
