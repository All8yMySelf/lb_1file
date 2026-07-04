# Orbital Defense v3.106 — Deep Code Review

**Reviewer:** Hermes (CLI agent)
**Date:** 2026-07-03
**Files reviewed:** `index.html` (~9,975 lines, ~440 KB), `CHANGELOG.md`, `database.rules.json`, `IMPROVEMENT_PLAN.md`
**Scope:** Architecture, correctness bugs, performance, security, and prioritized improvements.

---

## 1. Architecture & Maintainability

### 1.1 Single-file approach

The entire game — rendering, physics, UI, networking, audio, and styles — lives in one HTML file. This is a deliberate constraint (local-build → smoke-check → publish), but at ~440 KB it is approaching the point where structural debt slows reasoning.

**Positive:** No build step, no bundler, trivial to host. The file loads fast and caches well.

**Negative:** There is no module boundary anywhere. Functions, state, and DOM manipulation are all in one global script scope.

Concrete line references:

- **Lines 7–180:** Firebase module script embedded directly in `<head>`, before any game code. It defines `window.submitScore`, `window.getTopScores`, `window.listenToLeaderboard`, and wires up the “Leaderboard” button click at line 171. This mixing of module-scope Firebase code with the rest of the global game script is the first seam that would benefit from separation.
- **Lines 184–195 and 197–201:** Two separate `<style>` blocks. The first is the massive `:root` CSS variable dump + layout rules. The second is a tiny ruleset for `#highScoreList` styling. These should be merged.
- **Lines 1325–1533:** The `CONFIG` object and its immediate destructuring into ~90 individual `const` bindings. This is roughly 200 const declarations. The destructuring (`const { ENEMY_HEALTH_SCALE_FACTOR, ... } = CONFIG;`) exists so that downstream code can reference bare identifiers instead of `CONFIG.FOO`, but it means every config key is duplicated in the source — once in the object, once in the destructuring pattern. Adding a new config requires two edits and risks drift.
- **Lines 1824–1967:** Global `let` declarations for game state (`gameState`, `base`, `upgradeTree`, `particles`, `keysPressed`, `hudDirty`, `deltaTime`, `lastTime`, etc.). There are roughly 40+ top-level mutable variables. Any function can mutate any of them, making data flow impossible to trace statically.

**Recommendation (non-breaking):** Even within the single-file constraint, organize into IIFE namespaces: `const Game = { state: ..., base: ..., upgrades: ... };`. This would make accidental global mutations explicit rather than silent.

### 1.2 Object pooling

The code *does* use object pooling (`ObjectPool`, line 2018), which is good. However, the `release()` implementation uses `active.splice(index, 1)` (line 2042). In a dense late-game frame with many releases, this is O(n) per release and causes array compaction churn in the hot path.

**Line 2042:** `active.splice(index, 1);`

Swap-pop (replace released element with last element, then `pop()`) would be O(1) at the cost of losing stable ordering. For enemies, bullets, and missiles, ordering is not semantically required.

### 1.3 Ring click regions rebuilt every frame

`ringClickRegions` (line 1948) is cleared and fully rebuilt inside `drawUpgradeMenu` on every frame (line 7564). The array allocations are small, but this pattern means hit-testing logic is coupled to rendering logic. A cleaner separation would compute layout bounds once and cache them until upgrades change.

---

## 2. Correctness Bugs

### 2.1 Event listener cleanup gaps

**Most listeners use `AbortController` correctly.** `cleanupEventListeners()` (lines 1294–1297) aborts and recreates the controller. Keyboard, mouse, touch, resize, and fullscreen listeners all attach with `{ signal: eventListenerController.signal }`.

**BUT two listeners are NOT covered:**

1. **Line 171:** The leaderboard button inside the Firebase module script:
   ```javascript
   document.getElementById("show-leaderboard").addEventListener("click", async () => { ... });
   ```
   This is a bare `addEventListener` with no `AbortController` signal. If the game ever resets without a page reload, this listener leaks. It also fires even when the start screen is hidden because there is no guard.

2. **Dynamically created reward card listeners (lines 6711, 6719, 6736, 6752):**
   ```javascript
   targetButton.addEventListener('click', event => { ... });
   card.addEventListener('click', () => pickWaveReward(perk));
   ```
   These are created inside `showWaveRewardScreen()` and never removed. The DOM elements themselves may be hidden, but the closures retain references to `perk` and `target` objects, preventing GC of the wave-reward state.

**Severity:** Medium (memory leak on repeated reward screens; listener leak for leaderboard button).

### 2.2 Save/load schema v3 migration is a no-op

**Line 4121:** `migrateSavedGameData(savedData)`

```javascript
function migrateSavedGameData(savedData) {
    const schemaVersion = Number(savedData.schemaVersion || 1);
    if (schemaVersion > SAVE_SCHEMA_VERSION) { throw ... }
    return { ...savedData, schemaVersion: SAVE_SCHEMA_VERSION };
}
```

This function does **nothing** except bump the schemaVersion field. It does not:
- Rename fields that changed between schemas (e.g., old saves had `laserWideBeamWidth` vs current `LASER_WIDE_BEAM_WIDTH`).
- Backfill defaults for new fields (e.g., `gameState.usedCheat`, `base.mineMagnetRadius`, `base.supersonicSalvoAI`).
- Clamp values that were re-balanced (e.g., Macross missile cap was raised/lowered across versions).

**Line 4487:** `loadGame()` calls `applyUpgradeEffect(i, j, false)` for every saved upgrade. This re-applies effects, but if a saved field name no longer exists in the current code (e.g., renamed in a refactor), the value is silently dropped.

**Line 4255:** `serializeRuntimeState()` builds a `Map<enemy, index>` for bullet/missile target serialization. If two enemies are identical objects (unlikely but possible with pool reuse edge cases), the Map will deduplicate them incorrectly.

**Line 4296:** `type: savedEnemy.type || 'Normal'` — old saves may store numeric `type` indices (0, 1, 2, 3) from earlier versions, but current code expects string names ('Normal', 'Fast', etc.). The fallback to `'Normal'` hides the corruption rather than migrating it.

### 2.3 Game loop timing / dt handling

**Line 5258:** `deltaTime = Math.min(0.1, (timestamp - lastTime) / 1000);`

The dt cap is **hardcoded** to `0.1` seconds. `CONFIG.DELTA_TIME_CAP` (line 1357) exists but is never used here. If the cap is ever changed in CONFIG, the game loop ignores it.

**Line 4112:** In `resumeGame()`:
```javascript
lastTime = 0;
animationFrameId = requestAnimationFrame(gameLoop);
```

Setting `lastTime = 0` means the next `gameLoop` tick computes `deltaTime = (timestamp - 0) / 1000`, which is essentially the uptime of the browser tab (could be hours). The `Math.min(0.1, ...)` cap prevents a visible jump, but this is a brittle fix. It should instead store `lastTime = timestamp` on resume.

**Line 5296:** In `updateGame(dt)`:
```javascript
let effectiveDt = dt * gameSpeedMultiplier;
```

If `gameSpeedMultiplier` is changed mid-frame (e.g., by the time-control dock), the current frame uses the new multiplier for the entire dt. This is acceptable for coarse time scaling but means the first frame after a speed change applies the new speed retroactively to the entire interval.

**Line 5300:** Hit-stop uses real-time `dt`, not `effectiveDt`:
```javascript
hitStopTime = Math.max(0, hitStopTime - dt);
```

This is actually correct (hit-stop should decay in real time), but the comment above it says “world slows, real-time decay” which is slightly misleading — the *world* slows via `effectiveDt *= 0.15`, but the hit-stop timer itself decays at full speed.

### 2.4 Collision detection correctness

**Lines 6065–6147:** `checkCollisions(dt)` uses nested loops for bullet-enemy and missile-enemy collisions.

- Bullets iterate `bullets.length - 1` down to `0`, and for each bullet iterate `enemies.length - 1` down to `0`. This is O(bullets × enemies).
- The bullet loop `break`s after the first hit, but the inner loop may have already iterated over many enemies.
- **Bug:** A bullet can hit an enemy that was already killed by a previous bullet in the same frame, because enemies are only released at the end of the inner loop, not immediately. In practice the `enemy.health <= 0` check triggers and the enemy is released, but if two bullets hit the same enemy in the same frame, both apply damage before either triggers the release.

**Line 6086:** `enemy.health -= applyShieldAbsorption(enemy, base.bulletDamage);`

If two bullets strike in the same frame, both subtract full damage. This can overkill an enemy and potentially grant double credits if the credits logic were inside the inner loop (it is not — credits are granted on the first kill). The overkill itself is harmless but means shield absorption is applied twice even if the first bullet would have killed.

### 2.5 Fog of war canvas stale on resize

**Line 1993–1999:** `applyOverlay(radius)` creates `fogCanvas` lazily:
```javascript
if (!fogCanvas) {
    fogCanvas = document.createElement('canvas');
    fogCanvas.width = canvasWidth;
    fogCanvas.height = canvasHeight;
    fogCtx = fogCanvas.getContext('2d');
}
```

But on window resize (`canvasWidth`/`canvasHeight` change at line 9826), `fogCanvas` is NOT resized. The next `applyOverlay` call draws into a canvas that no longer matches the screen dimensions, producing visual artifacts.

---

## 3. Performance

### 3.1 Allocation in hot loops

**Particle system (line 3052–3065):**
```javascript
for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    // ...
    if (p.life <= 0) {
        particles.splice(i, 1);   // LINE 3063: O(n) allocation + compaction
    }
}
```

With `MAX_PARTICLES = 500`, a death explosion can create 30+ particles. In late-game dense waves, particle churn is constant. `splice` in a backward loop is the standard workaround, but it still compacts the array every time. A ring buffer or object pool for particles would eliminate this entirely.

**`drawParticles` (line 3068–3091):**
```javascript
const particlesByColor = {};
particles.forEach(p => {
    if (!particlesByColor[p.color]) {
        particlesByColor[p.color] = [];
    }
    particlesByColor[p.color].push(p);
});
```

This allocates a new object and N small arrays every frame. For 500 particles with ~10 colors, that is 11 object allocations per frame (22,000 per second at 60fps). Minor, but unnecessary — a pre-allocated `Map` or static buckets would remove it.

### 3.2 Canvas rendering inefficiencies

**Inline enemy cards (line 7276–7371):**

When `sensorDisplayMode === 'inline'`, `drawEnemyInlineCard` is called for every visible enemy every frame. Inside it:

- `ctx.measureText()` is called in a word-wrap loop (line 7310).
- `infoLines.flatMap(...)` creates new arrays.
- The card width/height are recomputed from scratch.

With 30 enemies visible, this is ~30 text measurement passes per frame. On low-end devices this is a real bottleneck.

**Recommendation:** Cache the card dimensions per enemy type, or at least only re-measure when the enemy’s health/speed actually changes.

**`drawGame` (line 6916):**

Every frame calls, in order:
1. `drawStarfield`
2. `applyOverlay` — redraws the entire fog pattern to an offscreen canvas
3. `drawRangeRings` — draws up to 7 arcs
4. `drawEnemiesLayer` — loops all enemies
5. `drawProjectilesLayer` — loops bullets + missiles
6. `drawLaserBeamSegments`
7. `drawLaserCleaveFragments`
8. `drawParticles`
9. `drawFloatingTexts`
10. `drawUpgradeMenu` — rebuilds `ringClickRegions`

The offscreen `fogCanvas` is fully repainted every frame (line 2000: `fogCtx.clearRect` then `drawFogPattern` then compositing). At 1920×1080, that is ~2 million pixels written to an offscreen buffer every frame. This is the most expensive single draw call. It could be cached and only invalidated when `visibleRadius` or `canvasWidth`/`canvasHeight` changes.

### 3.3 Entity array traversal

**Enemy update loop (lines 5367–5450):**

```javascript
for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    // ... trail.unshift({ x, y }) ...
    if (enemy.trail.length > 5) enemy.trail.pop();
}
```

Enemy trails are small arrays (max 5), so `unshift`/`pop` is cheap here. But `unshift` is still O(n). If trail length ever increases, this becomes a problem.

**Bullet culling (line 5796):**
```javascript
if (isOutsideVisibleWorldBounds(bullet.x, bullet.y, 40)) {
    releaseWeaponDamage(bullet.target, 'cannon', bullet.reservedDamage);
    bulletPool.release(bullet);
}
```

`isOutsideVisibleWorldBounds` is not shown in the search results but likely involves Math.hypot or similar. For 150 bullets, this is fine.

**Missile targeting (lines 5886–5896):**

For every missile without a target, the code iterates all enemies to find the closest within homing radius. In a Macross volley of 200 missiles and 30 enemies, this is 6,000 distance checks per frame. The code already uses squared distance (`dx*dx + dy*dy`), which is good. But it could be further optimized with a spatial grid or by only checking enemies in the missile’s sector.

### 3.4 Memory leaks

- **Line 2932:** `laserBeams.push({ ... })` — laser beams are spliced out when `life <= 0` (line 2990), but if the game ends abruptly or is paused, no cleanup happens.
- **Line 2948:** `laserCleaveFragments.push({ ... })` — same pattern, capped at 24 (line 2962) but only capped on push, not cleaned up on game over.
- **Line 9954:** `window.addEventListener('beforeunload', () => { saveGame(); });` — saves on tab close, which is good, but if the page is refreshed rapidly the save may be corrupted or incomplete.

---

## 4. Security

### 4.1 Firebase leaderboard — client-side rate limiting is trivially bypassed

**Line 27–30:**
```javascript
const RATE_LIMIT = {
    submissions: 0,
    resetTime: Date.now() + 60000
};
```

This is module-scope JavaScript. Any user can:
1. Open DevTools → Console.
2. Run `RATE_LIMIT.submissions = 0` or reload the page.
3. Submit unlimited scores.

The `database.rules.json` does **not** enforce any rate limiting. The `.write` rule (line 5) only validates:
- Field existence (`initials`, `wave`, `time`, `date`, `ranking`)
- Data types and ranges (`wave` 1–1000, `time` >= 0)
- The ranking formula: `ranking == wave * 100000 - time`

**The ranking formula is public and deterministic.** Anyone can compute `ranking = 1000 * 100000 - 0 = 100,000,000` and submit a fabricated top score with any initials.

**Validation in `submitScore` (lines 47–59):**
```javascript
const computedRanking = cleanWave * 100000 - cleanTime;
if (Number(ranking) !== computedRanking) {
    console.warn('Score ranking corrected before submission', ...);
}
```

Wait — the code warns but **does not reject** a mismatched ranking. It computes `computedRanking` and puts that in the payload regardless. However, the `ranking` parameter from the caller is never used after the warning. The payload uses `computedRanking`. So a malicious caller cannot forge a mismatched ranking, but they can trivially forge a matched one by picking any `wave` and `time` that produce the desired ranking.

**The `.write` rule also allows unlimited writes** because it has no timestamp or user-specific throttling. Firebase RTDB rules cannot implement rate limiting natively — that requires Cloud Functions.

**IMPROVEMENT_PLAN.md Phase 4** correctly notes this weakness. The cheapest fix listed is “client-side sanity caps in rules.” That is insufficient because rules are public and bypassable. A proper fix would require either:
- Cloud Functions to validate scores server-side (cost: Firebase Blaze plan).
- A signed hash / replay verification (but the secret would live in the client, so still extractable).
- Daily seeded runs with deterministic verification (Phase 2 suggestion) — this shifts trust from score submission to seed reproducibility, which is much harder to fake.

### 4.2 Cheat-score filtering is cosmetic, not enforced

**Lines 89–93:**
```javascript
function filterCheatScores(list) {
    const showCheats = typeof window.shouldShowCheatScores === 'function' && window.shouldShowCheatScores();
    const visible = showCheats ? list : list.filter(s => !s.cheat);
    return visible.slice(0, 10);
}
```

The `cheat` flag is set client-side in `purchaseUpgrade` (line 8535) when debug credits are granted. A malicious client can simply:
1. Use debug credits to max out upgrades.
2. Submit a score with `cheat: false` (or omit the field).
3. The score appears in the clean leaderboard.

There is no server-side verification that the run was legitimate.

**Line 3939–3941:** `window.shouldShowCheatScores` returns `debugUpgradesVisible || !!(gameState && gameState.usedCheat)`. This is purely for UI display.

### 4.3 Debug menu exposes unlimited economy manipulation

**Lines 4920–4949:** The Debug upgrade category (hidden until Q is pressed) contains:
- `+100,000 credits`
- `+1,000,000 credits`
- `+100,000,000 credits`

All with `cost: 0` and `maxLevel: Infinity`. This makes the debug menu a full cheat engine. The `usedCheat` flag is set (line 8535), but as noted above, this is client-honor only.

**The Q key toggle (line 9396–9406)** is discoverable by anyone who reads the source or accidentally presses Q.

### 4.4 database.rules.json assessment

```json
{
  "rules": {
    "scores": {
      ".read": true,
      ".write": "newData.exists() && newData.hasChildren(['initials', 'wave', 'time', 'date', 'ranking']) && newData.child('initials').isString() && newData.child('initials').val().length >= 2 && newData.child('initials').val().length <= 3 && newData.child('initials').val().matches(/^[A-Z0-9]+$/) && newData.child('wave').isNumber() && newData.child('wave').val() >= 1 && newData.child('wave').val() <= 1000 && newData.child('time').isNumber() && newData.child('time').val() >= 0 && newData.child('ranking').isNumber() && newData.child('ranking').val() == newData.child('wave').val() * 100000 - newData.child('time').val()",
      ".indexOn": "ranking"
    }
  }
}
```

**What the rules prevent:**
- Missing fields
- Non-numeric wave/time
- Invalid initials (must be 2–3 uppercase alphanumeric)
- Mismatched ranking formula

**What the rules do NOT prevent:**
- Fabricated scores that satisfy the formula (trivial)
- Repeated submissions by the same user/IP
- Submissions from bots/scripts
- Scores with impossible wave/time combinations (e.g., wave 50 with time = 0 when the wave duration is 60+ seconds)
- The `cheat` field is completely unvalidated — the rules do not even check it exists, so `cheat: false` scores pass silently.

**Severity:** The leaderboard is essentially unauthenticated. For a competitive game, this is a critical weakness. For a casual single-player game, it may be acceptable, but it should be documented as such.

---

## 5. Top 10 Prioritized Improvements

The following are **not** covered by `IMPROVEMENT_PLAN.md` (which focuses on UX, daily seeds, achievements, and leaderboard integrity options). These are engineering fixes found during the review.

| # | Issue | Location | Priority | Effort |
|---|-------|----------|----------|--------|
| 1 | **Fix resumeGame dt spike:** `lastTime = 0` on resume causes the next frame to compute `dt ≈ tab_uptime_seconds`, capped at 0.1s. This means the first frame after every pause/resume always hits the cap, making pause/resume feel slightly wrong. | Line 4112 | **High** | 1 line |
| 2 | **Replace O(n) splice in ObjectPool.release with swap-pop:** `active.splice(index, 1)` is O(n). Use `active[index] = active[active.length - 1]; active.pop();` to make release O(1). This matters when 30+ enemies are killed in one frame (Macross volley, laser cleave). | Line 2042 | **High** | 3 lines |
| 3 | **Add AbortController signal to leaderboard button listener:** The Firebase module script attaches a bare listener at line 171. It should use `{ signal: eventListenerController.signal }` and be re-attached after cleanup. | Line 171 | **Medium** | 3 lines |
| 4 | **Implement actual schema migration in `migrateSavedGameData`:** Currently a no-op. Add field renames, default backfills, and clamping for values that changed across versions. Specifically: migrate numeric `enemy.type` to string, clamp `macrossMissileCount` to current cap, ensure `base.missileRadiusBase` exists. | Lines 4121–4136 | **Medium** | ~30 lines |
| 5 | **Cache inline enemy card text measurements:** `drawEnemyInlineCard` calls `ctx.measureText` for every enemy every frame. Cache `measureText` results in a `Map` keyed by `(type, healthPercent)` or similar. | Lines 7304–7322 | **Medium** | ~15 lines |
| 6 | **Use CONFIG.DELTA_TIME_CAP in gameLoop instead of hardcoded 0.1:** The cap at line 5258 uses the literal `0.1`, ignoring the config value at line 1357. | Line 5258 | **Low** | 1 line |
| 7 | **Resize fogCanvas on window resize:** Currently `fogCanvas` dimensions are set once on first draw and never updated. Add a resize handler that updates `fogCanvas.width/height` when `canvasWidth`/`canvasHeight` change. | Lines 1993–1999 | **Medium** | 5 lines |
| 8 | **Remove dynamic reward card listener leaks:** `showWaveRewardScreen` creates click listeners on cards/buttons that are never removed. Use `AbortController` per-screen or delegate clicks via a single container listener. | Lines 6711, 6719, 6736, 6752 | **Medium** | ~10 lines |
| 9 | **Batch particle updates to reduce array.splice churn:** Replace the `particles` array with a ring buffer or pre-allocated object pool. At minimum, collect dead particle indices in a pass and batch-splice or rebuild the array once per frame. | Lines 3052–3065 | **Low** | ~20 lines |
| 10 | **Document leaderboard trust model:** Add a comment in `database.rules.json` and the Firebase module script stating that scores are client-honor and the leaderboard is not cryptographically verified. This sets user expectations correctly. | `database.rules.json`, line 5 | **Low** | 3 lines |

---

## 6. Cross-check with IMPROVEMENT_PLAN.md

The following items from `IMPROVEMENT_PLAN.md` are **already identified** and were intentionally **not duplicated** above:

- **Phase 1.1:** Enemy Stats panel traits (icon + behavior description) — planned, not implemented.
- **Phase 1.2:** Wave composition preview next to “Send Next Wave” — planned, partially exists (v3.94 added color-coded composition lines).
- **Phase 1.3:** Inline card decluttering / compact tag mode — planned.
- **Phase 1.4:** Behavior state on enemy (shield pips, healer aura, splitter badge) — planned.
- **Phase 1.5:** Enemy Identified popup counterplay line — planned.
- **Phase 2:** Daily seeded run + endless scaling audit + achievements — planned.
- **Phase 3:** Per-weapon stats readout, upgrade tooltips with deltas, damage numbers toggle, touch pass — planned.
- **Phase 4:** Leaderboard integrity (sanity caps, run-summary hash, Cloud Functions) — planned and acknowledged.
- **Phase 5:** Balance simulation harness, smoke-check expansion, housekeeping — planned.

The review above focuses on **bugs and structural issues not covered** by the improvement plan.

---

## 7. Summary

Orbital Defense v3.106 is a feature-rich, polished canvas game with excellent visual feedback (Juice FX, CRT overlay, braided missiles, fog-of-war) and a deep upgrade tree. The single-file constraint is well-managed for its scope, but the code is now large enough that global-state spaghetti, hardcoded constants, and O(n) hot-path operations are beginning to create real maintenance and correctness risks.

**Most critical fixes:**
1. Fix the resumeGame dt spike (line 4112).
2. Fix ObjectPool.release to be O(1) (line 2042).
3. Wire the leaderboard button into the AbortController lifecycle (line 171).
4. Make `migrateSavedGameData` actually migrate data (line 4121).

**Most critical security acknowledgment:**
The Firebase leaderboard operates on client-honor. The `database.rules.json` validates data shape but not plausibility. IMPROVEMENT_PLAN.md Phase 4 lists the right mitigation paths (Cloud Functions, run-summary hash, sanity caps). Until then, the leaderboard should be treated as a “fun” feature, not a competitive one.

---
*End of review.*
