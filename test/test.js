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

// --- New integration test for start button behaviour ---
// Remove external resources that may fail to load in the test environment
let sanitizedHtml = html
  .replace(/<link[^>]*fonts\.googleapis\.com[^>]*>/, '');

const fullDom = new JSDOM(sanitizedHtml, {
  runScripts: 'dangerously',
  resources: 'usable',
  url: 'http://localhost',
  beforeParse(window) {
    // Stub canvas context so the game scripts don't fail under JSDOM
    window.HTMLCanvasElement.prototype.getContext = function () {
      return new Proxy(
        {},
        {
          get: () => () => {},
          set: () => true,
        }
      );
    };
  },
});

await new Promise((resolve) => {
  fullDom.window.addEventListener('load', resolve);
});

// Extract required game logic from the HTML
const showWarnMatch = html.match(/function showSensorWarning\(\)[\s\S]*?\}/);
const startGameMatch = html.match(/function startGame\(\)[\s\S]*?showSensorWarning\(\);\n\}/);
if (!showWarnMatch || !startGameMatch) {
  throw new Error('Required game functions not found');
}
const helpers = `const getElement=id=>document.getElementById(id);\n` +
  `function unlistenLeaderboard(){}\n` +
  `function initializeGame(){ }\n` +
  `function pauseGame(){}\n` +
  `function updateSpeedDisplay(){}\n` +
  `function drawGame(){}\n` +
  `function updateHUD(){}\n` +
  `const SPEED_STEPS=[1]; let gameSpeedMultiplier=1; let speedIndex=0;`;

fullDom.window.eval(`${helpers}\n${showWarnMatch[0]}\n${startGameMatch[0]}\ndocument.getElementById('startButton').onclick=startGame;`);

const document = fullDom.window.document;
document.getElementById('startButton').click();

const startScreen = document.getElementById('startScreen');
const sensorWarning = document.getElementById('sensorWarning');

assert.strictEqual(startScreen.style.display, 'none');
assert.notStrictEqual(sensorWarning.style.display, 'none');
console.log('startButton hides startScreen and shows sensorWarning');
