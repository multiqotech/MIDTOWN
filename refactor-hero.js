const fs = require('fs');
const path = require('path');

const DASHBOARD_DIR = path.join(__dirname, 'admin/src/app/dashboard');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // The block in those 5 managers looks like this:
  /*
            <div>
              <label style={{ display: 'block', color: '#aaa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Hero Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <input 
                  type="text"
                  value={data.heroImage || ''}
                  onChange={(e: any) => setData((prev: any) => ({ ...prev!, heroImage: e.target.value }))}
                  style={{ flex: 1, padding: '0.875rem', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => { setCurrentUploadField({ field: 'heroImage' }); fileInputRef.current?.click(); }}
                  style={{ backgroundColor: '#333', color: 'white', border: 'none', padding: '0.875rem 1.5rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <UploadCloud size={18} /> {uploading && currentUploadField?.field === 'heroImage' ? 'Uploading...' : 'Upload'}
                </button>
              </div>
              {data.heroImage && (
                <div style={{ marginTop: '1rem', width: '200px', height: '120px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                  <img src={data.heroImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>
  */

  // Let's use a very general approach. Since we know they are in MedicalEducation, NursingEducation, Overview, DayAtMidtown, VisionMission
  if (
    filePath.includes('MedicalEducationManager.tsx') ||
    filePath.includes('NursingEducationManager.tsx') ||
    filePath.includes('OverviewManager.tsx') ||
    filePath.includes('DayAtMidtownManager.tsx') ||
    filePath.includes('VisionMissionManager.tsx')
  ) {
    
    // We will look for "Hero Image URL" and delete down to the closing </div> of that block.
    const lines = content.split('\n');
    let changed = false;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('Hero Image URL')) {
        let divStart = i;
        while (divStart >= 0 && !lines[divStart].includes('<div')) {
          divStart--;
        }
        
        // Count divs to find the matching closing div
        let divCount = 0;
        let divEnd = -1;
        for (let j = divStart; j < lines.length; j++) {
          if (lines[j].includes('<div')) divCount += (lines[j].match(/<div/g) || []).length;
          if (lines[j].includes('</div')) divCount -= (lines[j].match(/<\/div/g) || []).length;
          
          if (divCount === 0) {
            divEnd = j;
            break;
          }
        }
        
        if (divEnd !== -1) {
          const newBlock = `            <ImageUpload label="Hero Image" value={data.heroImage || ''} onChange={(url) => setData((prev: any) => ({ ...prev!, heroImage: url }))} />`;
          lines.splice(divStart, divEnd - divStart + 1, newBlock);
          changed = true;
          
          // Ensure ImageUpload is imported
          const depth = filePath.split('/').length - DASHBOARD_DIR.split('/').length;
          const importStr = depth === 2 ? `import ImageUpload from '../../../components/ImageUpload';` : `import ImageUpload from '../../components/ImageUpload';`;
          
          const contentStr = lines.join('\n');
          if (!contentStr.includes('ImageUpload')) {
             const finalLines = contentStr.split('\n');
             const lastImportIndex = finalLines.reduce((acc, line, i) => line.startsWith('import ') ? i : acc, -1);
             finalLines.splice(lastImportIndex + 1, 0, importStr);
             fs.writeFileSync(filePath, finalLines.join('\n'), 'utf8');
          } else {
             fs.writeFileSync(filePath, contentStr, 'utf8');
          }
          console.log(`Updated ${filePath}`);
          break; // Done with this file
        }
      }
    }
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
console.log('Refactoring heroImages complete.');
