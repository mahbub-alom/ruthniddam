const fs = require('fs');

const content = fs.readFileSync('footer_dump.html', 'utf8');

// Find mobile logo or hidden-desktop
const mobLogo = content.match(/<[^>]+class="[^"]*elementor-hidden-desktop[^"]*"[\s\S]*?<\/div>/gi) || [];
console.log('Hidden desktop elements in footer:', mobLogo.map(m => m.slice(0, 300)));
