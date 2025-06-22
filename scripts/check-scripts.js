#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const acorn = require('acorn');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const regex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

const scripts = [];
let match;
while ((match = regex.exec(html))) {
  scripts.push({ attrs: match[1], code: match[2] });
}

let hasError = false;

scripts.forEach(({ attrs, code }, idx) => {
  const isModule = /type\s*=\s*["']module["']/.test(attrs);
  const sourceType = isModule ? 'module' : 'script';
  try {
    acorn.parse(code, { ecmaVersion: 'latest', sourceType });
  } catch (err) {
    console.error(`Syntax error in script block #${idx + 1}: ${err.message}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('Script parsing failed.');
  process.exit(1);
} else {
  console.log(`All ${scripts.length} script blocks parsed successfully.`);
}
