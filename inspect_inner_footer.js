const fs = require('fs');

const content = fs.readFileSync('footer_dump.html', 'utf8');

// Section 2 contains the columns and copyright
const s2Idx = content.indexOf('550db986');
const s2Html = content.slice(s2Idx);

// Look for columns: <div class="elementor-column ...
const cols = s2Html.match(/<div\s+class="elementor-column[^"]*elementor-top-column[^"]*"[\s\S]*?(?=<div\s+class="elementor-column[^"]*elementor-top-column|<\/div>\s*<\/div>\s*<\/section>)/gi) || [];
console.log('Top columns in footer s2:', cols.length);

// Also look for inner sections
const innerSecs = s2Html.match(/<section\s+class="elementor-section[^"]*elementor-inner-section[^"]*"[\s\S]*?<\/section>/gi) || [];
console.log('Inner sections in footer s2:', innerSecs.length);

innerSecs.forEach((isec, idx) => {
  console.log(`\n--- INNER SECTION ${idx + 1} ---`);
  const headings = [...isec.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(h => `${h[1]}: ${h[2].replace(/<[^>]+>/g, '').trim()}`);
  console.log('Headings:', headings);

  const links = [...isec.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(a => `[${a[2].replace(/<[^>]+>/g, '').trim()}] -> ${a[1]}`)
    .filter(l => !l.startsWith('[]'));
  console.log('Links:', links);
  
  const textClean = isec.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Text preview:', textClean.slice(0, 300));
});
