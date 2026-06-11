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

assert(html.includes('const SAVE_SCHEMA_VERSION = 3;'), 'Save schema version is missing.');
assert(html.includes('function migrateSavedGameData'), 'Save migration function is missing.');
assert(html.includes('runtimeState: serializeRuntimeState()'), 'Active runtime state must be saved.');
assert(html.includes('function restoreSavedRuntimeState(runtimeState, savedAt)'), 'Active runtime state restore function is missing.');
assert(html.includes('function restoreSavedWaveState(savedWaveState, hasSavedRuntimeState = false)'), 'Saved wave-state restore function is missing.');
assert(html.includes('const restoredRuntimeState = restoreSavedRuntimeState(savedGame.runtimeState, savedGame.savedAt);'), 'loadGame must restore active runtime state.');
assert(html.includes('if (!restoreSavedWaveState(savedGame.waveState, restoredRuntimeState))'), 'loadGame must restore saved wave state before falling back.');
const loadAndStartBody = html.match(/function loadAndStartGame\(\) \{([\s\S]*?)\n\}\s*\/\/ Initial setup on load/);
assert(loadAndStartBody && !loadAndStartBody[1].includes('resetActiveWaveForLoadedGame();'), 'loadAndStartGame must not overwrite restored wave state.');
assert(html.includes('saveGame({ silent: true });'), 'Hard refresh must silently save the active game state before unload.');
assert(html.includes('const remainingEnemies = hasSavedRuntimeState'), 'Loaded waves must distinguish old saves from runtime-state saves.');
assert(html.includes('function createUpgradeTree(initialRange)'), 'Upgrade definitions must stay isolated from game initialization.');
assert(html.includes('function createInitialGameState()'), 'Initial game state factory is missing.');
assert(html.includes('function createInitialWaveRuntime()'), 'Initial wave runtime factory is missing.');
assert(html.includes('function createInitialBaseState(initialRange)'), 'Initial base state factory is missing.');
const initializeGameBody = html.match(/function initializeGame\(shouldTryLoad = true\) \{([\s\S]*?)\n\}\s*function startGame/);
assert(initializeGameBody && initializeGameBody[1].includes('upgradeTree = createUpgradeTree(initialRange);'), 'initializeGame must build upgrades through createUpgradeTree.');
assert(initializeGameBody && !initializeGameBody[1].includes('category: "Cannon"'), 'initializeGame must not contain inline upgrade definitions.');
assert(initializeGameBody && initializeGameBody[1].includes('gameState = createInitialGameState();'), 'initializeGame must use the game-state factory.');
assert(initializeGameBody && initializeGameBody[1].includes('base = createInitialBaseState(initialRange);'), 'initializeGame must use the base-state factory.');
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
