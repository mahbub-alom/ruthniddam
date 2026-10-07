const fs = require('fs');

const css = fs.readFileSync('post-3111.css', 'utf8');
const matches = css.match(/[^{}]*550db986[^{}]*\{[^}]*\}/g);
console.log('550db986 in post-3111.css:', matches);

const content = fs.readFileSync('C:/Users/Towsif Mahbub/.gemini/antigravity-ide/brain/e7a52335-2e8d-459e-a1a8-e084167dc7cd/.system_generated/steps/4/content.md', 'utf8');
const sIdx = content.indexOf('550db986');
console.log(content.slice(sIdx - 50, sIdx + 200));
