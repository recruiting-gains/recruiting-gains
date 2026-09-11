import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(resolve(root, 'assets/cruz-terminal.svg'), 'utf8');
const readme = readFileSync(resolve(root, 'README.md'), 'utf8');
const portrait = readFileSync(resolve(root, 'assets/cruz-terminal-portrait.png'));

test('banner is self-contained, script-free, and uses the checked-in portrait', () => {
  assert.ok(svg.includes(`data:image/png;base64,${portrait.toString('base64')}`));
  assert.doesNotMatch(svg, /<script|foreignObject|\bon\w+=|javascript:|(?:href|src)="https?:/i);
  assert.match(svg, /viewBox="0 0 1200 660"/);
});

test('artwork has an accessible description and reduced-motion alternative', () => {
  assert.match(svg, /<title id="title">Cruz G\./);
  assert.match(svg, /prefers-reduced-motion:reduce/);
  assert.match(readme, /alt="Cruz G\.[^"\n]*AI-stylized/);
  assert.doesNotMatch(svg, /infinite/);
});

test('public copy preserves attribution and avoids stale project counts', () => {
  assert.match(readme, /Adapted from Tarek Sherif/);
  assert.match(readme, /detection is not a guarantee/);
  assert.match(readme, /GitHub contributions over the past year/);
  assert.match(readme, /https:\/\/ghchart\.rshah\.org\/39d353\/recruiting-gains/);
  assert.doesNotMatch(readme, /Six working projects|Every project is an independent, original/);
  assert.doesNotMatch(readme + svg, /\/Users\/|\/tmp\/|@icloud|@yahoo|@gmail|student/i);
});

test('selected builds all include live and source links', () => {
  for (const name of ['hypercube', 'airframe', 'looplab', 'mask-before-you-ask']) {
    assert.ok(readme.includes(`/tree/main/${name}`));
  }
  assert.equal((readme.match(/\[Live ↗\]/g) || []).length, 4);
  assert.ok(readFileSync(resolve(root, 'assets/ai-builds-showcase.webp')).length > 0);
});
