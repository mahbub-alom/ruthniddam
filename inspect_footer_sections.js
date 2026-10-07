const fs = require('fs');

const path = 'C:/Users/Towsif Mahbub/.gemini/antigravity-ide/brain/e7a52335-2e8d-459e-a1a8-e084167dc7cd/.system_generated/steps/4/content.md';
const content = fs.readFileSync(path, 'utf8');

const footerStart = content.indexOf('<footer');
const footerEnd = content.indexOf('</footer>', footerStart) + 9;
const footerHtml = content.slice(footerStart, footerEnd);

console.log('Footer total length:', footerHtml.length);

// Top level sections in footer
const sections = footerHtml.split(/<section\s+class="elementor-section[^"]*elementor-top-section[^"]*"[^>]*>/gi);
console.log('Top sections in footer:', sections.length);

sections.forEach((sec, idx) => {
  if (idx === 0) return;
  console.log(`\n================ FOOTER SECTION ${idx} ================`);
  const headings = [...sec.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(h => `${h[1]}: ${h[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')}`);
  console.log('Headings:', headings);

  const links = [...sec.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(a => `[${a[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')}] -> ${a[1]}`)
    .filter(l => !l.startsWith('[]'));
  console.log('Links:', links);

  const imgs = [...sec.matchAll(/<img[^>]+src="([^">]+)"/gi)].map(i => i[1]);
  console.log('Images:', imgs);
  
  const textClean = sec.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  console.log('Text preview:', textClean.slice(0, 400));
});
