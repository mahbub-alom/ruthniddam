const fs = require('fs');

const content = fs.readFileSync('footer_dump.html', 'utf8');

// Decode cloudflare email protection:
// data-cfemail="9dfef2f3e9fcfee9ddefe8e9f5f3f4f9f9fcf0b3fef2f0"
const m = content.match(/data-cfemail="([a-f0-9]+)"/i);
if (m) {
  const enc = m[1];
  const k = parseInt(enc.substr(0, 2), 16);
  let email = '';
  for (let i = 2; i < enc.length; i += 2) {
    email += String.fromCharCode(parseInt(enc.substr(i, 2), 16) ^ k);
  }
  console.log('Decoded email:', email);
} else {
  console.log('No cfemail found');
}
