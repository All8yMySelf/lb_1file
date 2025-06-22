import { JSDOM } from 'jsdom';
import assert from 'assert';
import fs from 'fs';
import path from 'node:path';

const htmlPath = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract showHighScores definition from the file
const match = html.match(/function showHighScores\(\)[\s\S]*?window\.showHighScores = showHighScores;/);
if (!match) {
  throw new Error('showHighScores function not found');
}
const snippet = `<script>${match[0]}</script>`;

const dom = new JSDOM(snippet, { runScripts: 'dangerously' });

assert.strictEqual(typeof dom.window.showHighScores, 'function');
console.log('showHighScores exists as function');
