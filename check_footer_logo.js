const fs = require('fs');

const path = 'footer_dump.html';
const content = fs.readFileSync(path, 'utf8');

// Find logo image in footer
const logoIdx = content.indexOf('RUTH_NIDDAM_LOGO_COMPLET_NOIR_RGB.jpg');
console.log('Logo snippet in footer:');
console.log(content.slice(logoIdx - 200, logoIdx + 500));
