import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderBadge } from '../scripts/render-hire-me.mjs';
import { measureText } from '../tools/commit-font/font.js';

test('HIRE ME uses the exact upstream 38-column bitmap within 53 columns', () => {
  assert.equal(measureText('HIRE ME'), 38);
  const svg = renderBadge();
  assert.equal((svg.match(/data-lit=/g) || []).length, 371);
  assert.ok((svg.match(/data-lit="true"/g) || []).length > 100);
  assert.match(svg, /HIRE ME — @recruiting-gains/);
});

test('profile image is deterministic, accessible, self-contained and not fake stats', () => {
  const svg = renderBadge();
  assert.equal(svg, renderBadge());
  assert.match(svg, /aria-labelledby="title desc"/);
  assert.match(svg, /not actual contribution data/);
  assert.doesNotMatch(svg, /<script|<foreignObject|href=|onload=|contributions in|Longest streak|active days/i);
});

test('rejects unsafe or invalid input and recovers with a subsequent valid render', () => {
  for (const text of ['', ' ', '<script>', 'A'.repeat(12), null]) assert.throws(() => renderBadge(text));
  for (const handle of ['', '-bad', 'bad-', 'a--b', '<x>', 'a'.repeat(40), null]) assert.throws(() => renderBadge('HIRE ME', handle));
  assert.match(renderBadge('HIRE ME', 'recruiting-gains'), /HIRE ME/);
});

test('checked-in asset exactly matches generator output for interruption-safe reruns', () => {
  assert.equal(readFileSync(new URL('../assets/hire-me.svg', import.meta.url), 'utf8'), renderBadge());
});

test('README has one decorative badge plus actual activity link, and retains portrait', () => {
  const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
  assert.equal((readme.match(/assets\/hire-me.svg/g) || []).length, 1);
  assert.match(readme, /not contribution data/);
  assert.match(readme, /js-contribution-activity-description/);
  assert.match(readme, /assets\/cruz-terminal.svg/);
  assert.doesNotMatch(readme, /ghchart\.rshah\.org/);
});
