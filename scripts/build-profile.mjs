import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const portrait = readFileSync(resolve(root, 'assets/cruz-terminal-portrait.png')).toString('base64');
const shapes = {
  C: ['01111','11000','11000','11000','11000','11000','01111'],
  R: ['11110','11011','11011','11110','11100','11010','11011'],
  U: ['11011','11011','11011','11011','11011','11011','01110'],
  Z: ['11111','00011','00110','00100','01100','11000','11111'],
  G: ['01111','11000','11000','11011','11011','11011','01111'],
  A: ['01110','11011','11011','11111','11011','11011','11011'],
};
function word(text, x, y, cell, delay) {
  return [...text].map((letter, index) => {
    const pixels = shapes[letter].flatMap((row, ry) => [...row].flatMap((on, rx) => {
      if (on === '0') return [];
      const px = x + (index * 6 + rx) * cell, py = y + ry * cell;
      const color = ry < 3 ? '#e6f5ff' : '#89c9ee';
      return [`<rect x="${px}" y="${py}" width="${cell-2}" height="${cell-2}" rx="1" fill="${color}" opacity=".07"/>`,
        `<text x="${px+1}" y="${py+cell*.43}" font-size="${cell*.42}" fill="${color}" letter-spacing=".5">${(rx+ry)%2?'01':'##'}</text>`,
        `<text x="${px+1}" y="${py+cell*.87}" font-size="${cell*.42}" fill="${color}" letter-spacing=".5">${(rx+ry)%3?'++':'10'}</text>`];
    }));
    return `<g class="glyph" style="animation-delay:${delay+index*.16}s">${pixels.join('')}</g>`;
  }).join('');
}
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1200" height="660" viewBox="0 0 1200 660" role="img" aria-labelledby="title desc">
<title id="title">Cruz Garza — AI builder, visual experiments, practical tools</title>
<desc id="desc">A terminal-style profile with an AI-stylized portrait based on Cruz's supplied photo, animated ASCII lettering, and a build-test-improve workflow. This artwork does not display live status or contribution statistics.</desc>
<defs><clipPath id="portraitClip"><rect x="46" y="143" width="374" height="422" rx="8"/></clipPath><linearGradient id="edge"><stop stop-color="#62e6bd"/><stop offset="1" stop-color="#54b9f2"/></linearGradient></defs>
<style>
text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.glyph{animation:arrive .38s ease-out both}
.sweep{animation:scan 2.8s ease-in-out both}
.cursor{animation:blink .65s steps(1,end) 4}
@keyframes arrive{from{opacity:.08;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
@keyframes scan{0%{opacity:0;transform:translateY(0)}15%{opacity:.22}85%{opacity:.12}100%{opacity:0;transform:translateY(290px)}}
@keyframes blink{50%{opacity:0}}
@media(prefers-reduced-motion:reduce){.glyph,.sweep,.cursor{animation:none}.sweep{opacity:0}}
</style>
<rect width="1200" height="660" rx="22" fill="#08101c"/>
<rect x="1" y="1" width="1198" height="658" rx="22" fill="none" stroke="#25364a" stroke-width="2"/>
<rect x="1" y="1" width="1198" height="66" rx="22" fill="#101c2c"/>
<path d="M1 66H1199" stroke="#28384e"/>
<circle cx="32" cy="33" r="6" fill="#fb7185"/><circle cx="54" cy="33" r="6" fill="#e8bd60"/><circle cx="76" cy="33" r="6" fill="#69dbaa"/>
<text x="111" y="39" fill="#b2c3d9" font-size="17">recruiting-gains / public-portfolio</text>
<text x="1040" y="39" fill="#6e8da8" font-size="14">README.md</text>
<rect x="28" y="92" width="410" height="500" rx="12" fill="#0b1220" stroke="#2b4055"/>
<rect x="459" y="92" width="713" height="500" rx="12" fill="#0b1524" stroke="#2b4055"/>
<path d="M28 132H438M459 132H1172" stroke="#25394d"/>
<text x="49" y="117" fill="#80a1bb" font-size="14">01 / portrait.render</text>
<text x="482" y="117" fill="#80a1bb" font-size="14">02 / whoami</text>
<image x="46" y="137" width="374" height="439" preserveAspectRatio="xMidYMid meet" clip-path="url(#portraitClip)" xlink:href="data:image/png;base64,${portrait}"/>
<text x="49" y="578" font-size="11" fill="#70869e">OWNER-SUPPLIED PHOTO · AI-STYLIZED</text>
<text x="489" y="170" font-size="15" fill="#65dfb9">$ introducing</text>
${word('CRUZ',508,204,25,.12)}
${word('GARZA',508,405,20,.6)}
<rect class="sweep" x="488" y="203" width="650" height="3" fill="url(#edge)" opacity="0"/>
<path d="M491 382H1137" stroke="#21364b"/>
<text x="493" y="574" fill="#8ba7bf" font-size="13">turning ideas into things you can try</text>
<rect class="cursor" x="1132" y="563" width="9" height="14" fill="#65dfb9"/>
<text x="31" y="628" fill="#99b6cc" font-size="16">IDEA → BUILD → TEST → IMPROVE</text>
<text x="794" y="628" fill="#65dfb9" font-size="14">VISUAL EXPERIMENTS. PRACTICAL TOOLS.</text>
</svg>`;
writeFileSync(resolve(root, 'assets/cruz-terminal.svg'), svg);
console.log(`Generated assets/cruz-terminal.svg (${Buffer.byteLength(svg)} bytes)`);
