const fs = require('fs');
const path = require('path');

console.log('Script started');

// Function to extract work experience from certificates text
function extractWorkExperience(certificatesText, language) {
  const workExperiencePatterns = {
    ru: /Опыт работы:\s*\n([\s\S]*?)(?=\n\n|\n[A-ZА-Я]|$)/,
    kz: /Жұмыс тәжірибесі:\s*\n([\s\S]*?)(?=\n\n|\n[A-ZА-Я]|$)/,
  };

  const pattern = workExperiencePatterns[language];
  if (!pattern) return { workExperience: '', remainingText: certificatesText };

  const match = certificatesText.match(pattern);
  if (!match) return { workExperience: '', remainingText: certificatesText };

  const workExperience = match[1].trim();
  const remainingText = certificatesText
    .replace(pattern, '')
    .replace(/\n\n\n+/g, '\n\n')
    .trim();

  return { workExperience, remainingText };
}

// Function to process a single doctor file
function processDoctorFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file already has a work section
    if (content.includes('work: {')) {
      console.log(`Skipping ${path.basename(filePath)} - already has work section`);
      return;
    }

    // Extract the doctor object content
    const doctorMatch = content.match(/export const \w+ = \{([\s\S]*)\};/);
    if (!doctorMatch) {
      console.log(`Could not parse doctor object in ${path.basename(filePath)}`);
      return;
    }

    let doctorContent = doctorMatch[1];

    // Check if certificates section exists and contains work experience
    const hasRussianWork = doctorContent.includes('Опыт работы:');
    const hasKazakhWork = doctorContent.includes('Жұмыс тәжірибесі:');

    if (!hasRussianWork && !hasKazakhWork) {
      console.log(`Skipping ${path.basename(filePath)} - no work experience found`);
      return;
    }

    // Extract certificates section
    const certificatesMatch = doctorContent.match(/certificates:\s*\{([\s\S]*?)\s*\}/);
    if (!certificatesMatch) {
      console.log(`No certificates section found in ${path.basename(filePath)}`);
      return;
    }

    const certificatesContent = certificatesMatch[1];
    
    // Extract work experience for both languages
    const ruMatch = certificatesContent.match(/ru:\s*`([\s\S]*?)`/);
    const kzMatch = certificatesContent.match(/kz:\s*`([\s\S]*?)`/);

    let ruWorkExperience = '';
    let kzWorkExperience = '';
    let ruRemainingCertificates = '';
    let kzRemainingCertificates = '';

    if (ruMatch) {
      const { workExperience, remainingText } = extractWorkExperience(ruMatch[1], 'ru');
      ruWorkExperience = workExperience;
      ruRemainingCertificates = remainingText;
    }

    if (kzMatch) {
      const { workExperience, remainingText } = extractWorkExperience(kzMatch[1], 'kz');
      kzWorkExperience = workExperience;
      kzRemainingCertificates = remainingText;
    }

    // Only proceed if we found work experience
    if (!ruWorkExperience && !kzWorkExperience) {
      console.log(`No work experience extracted from ${path.basename(filePath)}`);
      return;
    }

    // Create new work section
    let workSection = '  work: {\n';
    if (ruWorkExperience) {
      workSection += `    ru: \`${ruWorkExperience}\`,\n`;
    }
    if (kzWorkExperience) {
      workSection += `    kz: \`${kzWorkExperience}\`,\n`;
    }
    workSection += '  },\n';

    // Update certificates section
    let newCertificatesContent = '  certificates: {\n';
    if (ruRemainingCertificates) {
      newCertificatesContent += `    ru: \`${ruRemainingCertificates}\`,\n`;
    } else {
      newCertificatesContent += `    ru: '',\n`;
    }
    if (kzRemainingCertificates) {
      newCertificatesContent += `    kz: \`${kzRemainingCertificates}\`,\n`;
    } else {
      newCertificatesContent += `    kz: '',\n`;
    }
    newCertificatesContent += '  }';

    // Replace the certificates section in the doctor content
    const newDoctorContent = doctorContent.replace(
      /certificates:\s*\{[\s\S]*?\s*\}/,
      newCertificatesContent
    );

    // Insert work section before certificates
    const finalDoctorContent = newDoctorContent.replace(
      /(certificates:\s*\{[\s\S]*?\s*\})/,
      `${workSection}$1`
    );

    // Create the new file content
    const newContent = content.replace(
      /export const \w+ = \{([\s\S]*)\};/,
      `export const ${path.basename(filePath, '.ts')} = {${finalDoctorContent}};`
    );

    // Write the updated content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${path.basename(filePath)}`);

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Main function to process all doctor files
function main() {
  const doctorsDir = path.join(__dirname, 'src', 'data', 'doctors');
  console.log('Resolved doctorsDir:', doctorsDir);
  
  if (!fs.existsSync(doctorsDir)) {
    console.error('Doctors directory not found');
    return;
  }

  const files = fs.readdirSync(doctorsDir)
    .filter(file => file.endsWith('.ts') && file !== 'index.ts');
  console.log('Files found:', files);

  console.log(`Found ${files.length} doctor files to process`);

  files.forEach(file => {
    const filePath = path.join(doctorsDir, file);
    processDoctorFile(filePath);
  });

  console.log('Processing complete!');
}

// Run the script
main();

console.log('Script completed');

try {
  // ... existing code ...
} catch (e) {
  console.error('Top-level error:', e);
} 