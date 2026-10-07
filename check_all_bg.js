const fs = require('fs');
const css = fs.readFileSync('post-3111.css', 'utf8');

const bgColors = css.match(/background-color:[^;]+/g);
console.log('All background-colors in post-3111.css:', [...new Set(bgColors)]);
