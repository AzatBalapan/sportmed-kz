const fs = require('fs');
const path = require('path');

// Management doctor file names (without .ts)
const management = ['nurmatov', 'abdykhadirov'];

const doctorsDir = path.join(__dirname, 'src', 'data', 'doctors');

fs.readdirSync(doctorsDir).forEach(file => {
  if (!file.endsWith('.ts')) return;
  const name = file.replace('.ts', '');
  if (management.includes(name)) return;

  const filePath = path.join(doctorsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the work section
  const workMatch = content.match(/work:\s*{([\s\S]*?)},/);
  if (!workMatch) return;

  let workSection = workMatch[1];

  // Remove 'АКИМАТА ГОРОДА АСТАНЫ' from the last ru entry (robust)
  workSection = workSection.replace(/(ru:\s*`[\s\S]*)(АКИМАТА ГОРОДА АСТАНЫ)([\s.,!"'«»]*)?([\s\S]*?`)/,
    (m, p1, p2, p3, p4) => p1 + (p4 || '').replace(/\s*АКИМАТА ГОРОДА АСТАНЫ[\s.,!"'«»]*/g, ''));

  // Remove 'ӘКІМДІГІ' and 'АКИМАТЫ' from the last kz entry (robust)
  workSection = workSection.replace(/(kz:\s*`[\s\S]*)(ӘКІМДІГІ|АКИМАТЫ)([\s.,!"'«»]*)?([\s\S]*?`)/u,
    (m, p1, p2, p3, p4) => p1 + (p4 || '').replace(/\s*(ӘКІМДІГІ|АКИМАТЫ)[\s.,!"'«»]*/gu, ''));

  // Replace the work section in the file
  const newContent = content.replace(/work:\s*{([\s\S]*?)},/, `work: {${workSection}},`);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Processed: ${file}`);
}); 
