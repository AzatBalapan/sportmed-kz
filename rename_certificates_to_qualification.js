const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'doctors');

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace certificates: { with квалификация: {
    content = content.replace(/certificates\s*:/g, 'квалификация:');
    // Replace certificates = { with квалификация = {
    content = content.replace(/certificates\s*=/g, 'квалификация =');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Done!'); 