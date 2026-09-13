import { renderText } from '../tools/commit-font/font.js';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export function renderBadge(text = 'HIRE ME', handle = 'recruiting-gains') {
  if (typeof text !== 'string' || !/^[A-Z0-9 ]+$/.test(text) || !text.trim()) {
    throw new Error('Use uppercase letters, numbers and spaces for profile artwork.');
  }
  if (typeof handle !== 'string' || !/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/.test(handle) || handle.includes('--')) {
    throw new Error('Use a valid GitHub handle.');
  }
  const glyph = renderText(text);
  if (glyph.length > 53) throw new Error('Text exceeds the 53-column artwork.');
  const offset = Math.floor((53 - glyph.length) / 2);
  const cells = [];
  for (let x = 0; x < 53; x++) {
    for (let y = 0; y < 7; y++) {
      const lit = glyph[x - offset]?.[y] === true;
      const color = lit ? ((x * 7 + y * 3) % 13 === 0 ? '#26a641' : '#39d353') : '#161b22';
      cells.push(`<rect x="${51 + x * 17}" y="${102 + y * 17}" width="14" height="14" rx="2" fill="${color}" data-lit="${lit}"/>`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="300" viewBox="0 0 1000 300" role="img" aria-labelledby="title desc">
<title id="title">${text} — @${handle}</title>
<desc id="desc">Green pixel letters spell ${text}. Decorative contribution-style artwork, not actual contribution data. Bitmap font from Commit Font by Studio 4by5.</desc>
<rect x="1" y="1" width="998" height="298" rx="18" fill="#0d1117" stroke="#30363d" stroke-width="2"/>
<rect x="40" y="36" width="12" height="12" rx="3" fill="#39d353"/>
<text x="66" y="54" fill="#e6edf3" font-family="monospace" font-size="30">@${handle}</text>
<text x="950" y="54" text-anchor="end" fill="#8b949e" font-family="monospace" font-size="24">PROFILE ART</text>
${cells.join('\n')}
<text x="50" y="264" fill="#a6b0bb" font-family="monospace" font-size="28">Contribution-style artwork</text>
<g aria-hidden="true"><rect x="875" y="247" width="18" height="18" rx="3" fill="#0e4429"/><rect x="900" y="247" width="18" height="18" rx="3" fill="#26a641"/><rect x="925" y="247" width="18" height="18" rx="3" fill="#39d353"/></g>
</svg>
`;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = new URL('../assets/hire-me.svg', import.meta.url);
  writeFileSync(output, renderBadge());
  console.log(`Rendered ${fileURLToPath(output)}`);
}
