import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const readProjectFile = path => readFileSync(new URL(path, root), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const html = readProjectFile('index.html');
const readme = readProjectFile('README.md');
const changelog = readProjectFile('CHANGELOG.md');
const rules = JSON.parse(readProjectFile('database.rules.json'));

const versionMatch = html.match(/const GAME_VERSION = '([^']+)'/);
assert(versionMatch, 'GAME_VERSION constant is missing.');
const version = versionMatch[1];
const versionLabel = `v${version}`;

assert(html.includes(`<title>Orbital Defense ${versionLabel} - Optimised</title>`), 'Fallback document title is not versioned.');
assert(html.includes(`Orbital Defense ${versionLabel}`), 'Start-screen version label is missing.');
assert(readme.includes(`### ${versionLabel}`), 'README changelog is missing the current version.');
assert(changelog.includes(`## ${versionLabel}`), 'CHANGELOG is missing the current version.');

const scoresRules = rules.rules?.scores;
assert(scoresRules, 'Firebase scores rules are missing.');
assert(scoresRules['.read'] === true, 'Scores must remain readable.');
assert(typeof scoresRules['.write'] === 'string', 'Scores write rule must be a validation expression.');
assert(scoresRules['.write'].includes("newData.child('ranking').val() == newData.child('wave').val() * 100000 - newData.child('time').val()"), 'Scores write rule must enforce the ranking formula.');
assert(!readme.includes('".write": true'), 'README must not document permissive leaderboard writes.');

assert(html.includes('const SAVE_SCHEMA_VERSION = 2;'), 'Save schema version is missing.');
assert(html.includes('function migrateSavedGameData'), 'Save migration function is missing.');
assert(html.includes('getStoredNumber(MUSIC_VOLUME_STORAGE_KEY, 0.25'), 'Music volume should use parsed stored number fallback.');
assert(!html.includes('parseFloat(localStorage.getItem("ode_musicVolume"))||0.25'), 'Old music volume fallback still exists.');
assert(html.includes('flex-wrap: wrap'), 'Mobile control wrapping CSS is missing.');
assert(html.includes('writing-mode: horizontal-tb'), 'Mobile volume slider layout is missing.');

const inlineScripts = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(([, attrs]) => !/src=/i.test(attrs) && !/type=["']?module/i.test(attrs))
  .map(([, , body]) => body.trim())
  .filter(body => body && !body.includes('updateKoFiWidgetColor();'));

const tempDir = mkdtempSync(join(tmpdir(), 'orbital-defense-smoke-'));
const scriptPath = join(tempDir, 'inline-scripts.js');
writeFileSync(scriptPath, inlineScripts.join('\n\n'), 'utf8');
execFileSync(process.execPath, ['--check', scriptPath], { stdio: 'pipe' });

console.log(`Smoke check passed for Orbital Defense ${versionLabel}.`);
