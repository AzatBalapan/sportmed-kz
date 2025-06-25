const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'data', 'doctors');

function extractSection(text, startMarker, stopMarkers) {
  if (!text) return {extracted: '', rest: text};
  const startIdx = text.indexOf(startMarker);
  if (startIdx === -1) return {extracted: '', rest: text};
  let endIdx = text.length;
  for (const stop of stopMarkers) {
    const idx = text.indexOf(stop, startIdx + startMarker.length);
    if (idx !== -1 && idx < endIdx) endIdx = idx;
  }
  const extracted = text.substring(startIdx, endIdx).replace(startMarker, '').trim();
  let rest = text.substring(0, startIdx).trim();
  if (endIdx < text.length) rest += (rest ? '\n' : '') + text.substring(endIdx).trim();
  return {extracted, rest};
}

fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    // Find the certificates/квалификация section
    const certMatch = content.match(/(certificates|квалификация)\s*:\s*{([\s\S]*?)}[,\n]/);
    if (!certMatch) return;
    let certBlock = certMatch[2];
    // Extract ru and kz fields
    const ruMatch = certBlock.match(/ru:\s*`([\s\S]*?)`/);
    const kzMatch = certBlock.match(/kz:\s*`([\s\S]*?)`/);
    let ru = ruMatch ? ruMatch[1] : '';
    let kz = kzMatch ? kzMatch[1] : '';
    // Extract work experience
    const ruRes = extractSection(ru, 'Опыт работы:', ['Публикации:', 'Дополнительные навыки:', 'Достижения:', 'Последние сертификаты:', 'Курсы повышения квалификации:', 'Повышение квалификации:', 'Сертификаты и квалификация:', 'Навыки:', 'Награды и достижения', 'Квалификация:', 'Стажировка:', '—']);
    const kzRes = extractSection(kz, 'Жұмыс тәжірибесі:', ['Публикациялар:', 'Қосымша дағдылар:', 'Жетістіктер:', 'Соңғы сертификаттар:', 'Біліктілікті арттыру курстары:', 'Біліктілік:', 'Дағдылар:', 'Марапаттар мен жетістіктер', 'Біліктілік:', 'Тәжірибе:', '—']);
    // Only update if work experience was found
    if (ruRes.extracted || kzRes.extracted) {
      // Update certificates/квалификация section
      let newCertBlock = certBlock;
      if (ruMatch) newCertBlock = newCertBlock.replace(/ru:\s*`([\s\S]*?)`/, `ru: \`${ruRes.rest}\``);
      if (kzMatch) newCertBlock = newCertBlock.replace(/kz:\s*`([\s\S]*?)`/, `kz: \`${kzRes.rest}\``);
      // Insert or update work section
      let workSection = `work: {\n    ru: \
\`${ruRes.extracted}\`,\n    kz: \
\`${kzRes.extracted}\`\n  },`;
      // If work already exists, replace it
      if (/work:\s*{[\s\S]*?},/.test(content)) {
        content = content.replace(/work:\s*{[\s\S]*?},/, workSection);
      } else {
        // Insert after certificates/квалификация section
        content = content.replace(/(certificates|квалификация)\s*:\s*{([\s\S]*?)}[,\n]/, `$1: {${newCertBlock}},\n  ${workSection}\n`);
      }
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
console.log('Done!'); 