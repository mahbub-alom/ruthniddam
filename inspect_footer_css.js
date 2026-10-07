const fs = require('fs');

async function inspectFooterCss() {
  const res = await fetch('https://ruthniddam.fr/wp-content/uploads/elementor/css/post-3111.css');
  const css = await res.text();
  console.log('post-3111.css length:', css.length);
  fs.writeFileSync('post-3111.css', css);

  // Look for background colors and fonts
  const bgMatches = css.match(/[^{}]*background[^{}]*\{[^}]*\}/g) || [];
  console.log('Background rules in footer CSS:');
  bgMatches.forEach(b => console.log(' ', b.trim().replace(/\s+/g, ' ')));

  const fontMatches = css.match(/[^{}]*font-family[^{}]*\{[^}]*\}/g) || [];
  console.log('Font rules in footer CSS:');
  fontMatches.forEach(f => console.log(' ', f.trim().replace(/\s+/g, ' ')));

  // Look for colors
  const colorMatches = css.match(/[^{}]*color:[^{}]*\{[^}]*\}/g) || [];
  console.log('Color rules count:', colorMatches.length);
}
inspectFooterCss();
