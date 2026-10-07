const fs = require('fs');

const css = fs.readFileSync('post-3111.css', 'utf8');

// Print all rules in post-3111.css
const rules = css.split('}');
rules.forEach(r => {
  const clean = r.trim().replace(/\s+/g, ' ');
  if (clean.includes('background') || clean.includes('color') || clean.includes('border') || clean.includes('padding') || clean.includes('margin')) {
    if (clean.length < 300) {
      console.log(clean + '}');
    }
  }
});
