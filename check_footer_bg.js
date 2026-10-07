const fs = require('fs');

const path = 'C:/Users/Towsif Mahbub/.gemini/antigravity-ide/brain/e7a52335-2e8d-459e-a1a8-e084167dc7cd/.system_generated/steps/4/content.md';
const content = fs.readFileSync(path, 'utf8');

const sIdx = content.indexOf('550db986');
console.log('550db986 snippet:');
console.log(content.slice(sIdx - 100, sIdx + 500));
