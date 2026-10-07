const fs = require('fs');

const path = 'C:/Users/Towsif Mahbub/.gemini/antigravity-ide/brain/e7a52335-2e8d-459e-a1a8-e084167dc7cd/.system_generated/steps/4/content.md';
const content = fs.readFileSync(path, 'utf8');

// Find footer tag or footer elementor container
const footerIdx = content.indexOf('<footer');
console.log('Footer index:', footerIdx);

if (footerIdx !== -1) {
  const footerChunk = content.slice(footerIdx);
  console.log('Footer chunk length:', footerChunk.length);
  fs.writeFileSync('footer_dump.html', footerChunk);
  console.log('First 3000 chars of footer:');
  console.log(footerChunk.slice(0, 3000));
} else {
  // Check for "liens utiles"
  const luIdx = content.indexOf('liens utiles');
  console.log('liens utiles index:', luIdx);
  if (luIdx !== -1) {
    const chunk = content.slice(luIdx - 1000, luIdx + 15000);
    fs.writeFileSync('footer_dump.html', chunk);
    console.log(chunk.slice(0, 3000));
  }
}
