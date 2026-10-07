const fs = require('fs');

const content = fs.readFileSync('footer_dump.html', 'utf8');

const s2Idx = content.indexOf('550db986');
const s2Html = content.slice(s2Idx);

// First inner section
const isec1 = s2Html.match(/<section\s+class="elementor-section[^"]*elementor-inner-section[^"]*"[\s\S]*?<\/section>/i)[0];

// Let's print the first 2 columns of isec1
const cols = isec1.match(/<div\s+class="elementor-column[^"]*elementor-inner-column[^"]*"[\s\S]*?(?=<div\s+class="elementor-column[^"]*elementor-inner-column|<\/div>\s*<\/section>)/gi);
console.log('Total inner columns in isec1:', cols ? cols.length : 0);

if (cols) {
  cols.forEach((c, idx) => {
    console.log(`\n--- COLUMN ${idx + 1} ---`);
    console.log(c.replace(/<script[\s\S]*?<\/script>/gi, '').slice(0, 800));
  });
}
