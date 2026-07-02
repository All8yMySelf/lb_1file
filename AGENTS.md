# Agent Workflow

This file is the canonical instruction file for every coding agent working in
this repository, including Codex/OpenAI, Claude, Hermes, Ollama-backed models,
and local scripts. Do not create separate model-specific instruction files with
different rules. If a tool requires a model-specific filename, make that file a
thin pointer back to `AGENTS.md`.

This repository is often edited by multiple local agents. Keep changes small,
check the worktree before editing, and avoid overwriting another agent's local
work.

## Repository Shape

- `index.html` is the self-contained Orbital Defense game. Keep it
  self-contained apart from the existing Firebase CDN scripts and checked-in
  media assets.
- `README.md` contains the project overview and recent change log summary.
- `CHANGELOG.md` contains the detailed release history.
- `HOW_TO_PLAY.md` contains player-facing instructions.
- `scripts/smoke_check.mjs` validates the current game version, static title
  fallback, and basic release invariants.
- `database.rules.json` and `FIREBASE_SECURITY.md` document Firebase security.
- `music*.mp3`, `favicon.ico`, and other checked-in assets are runtime assets.

## Branches

- `testing` is the GitHub default branch and should be treated as the live
  branch for published updates.
- `codex/local-work` is the shared local staging branch used for agent changes
  before they are promoted to `testing`.
- If you are already on another feature branch, inspect the branch and diff
  before deciding whether to stay there or switch.

## Before Editing

Run:

```sh
git status --short --branch
git branch -vv
```

If there are unrelated local changes, do not revert, overwrite, delete, or stage
them without explicit user approval. Work only with the files needed for the
requested task.

Prefer `rg` / `rg --files` for search. Avoid commands that dump large files or
large diffs into the chat unless that output is necessary for the task.

## Version And Docs

Every time any agent modifies `index.html`, bump the visible patch version
before handing the work back. No exceptions, even for one-line fixes.

The version appears in three places and all three must match:

1. Static title fallback:
   `<title>Orbital Defense vX.YY - Optimised</title>`
2. Start-screen title:
   `<h1 id="gameTitle">Orbital Defense vX.YY</h1>`
3. Central constant:
   `const GAME_VERSION = 'X.YY';`

For any publishable game update, or any local change the user will test before
publishing:

- Increment the patch number after the dot by 1, for example `3.80` -> `3.81`.
- Keep the browser title and start-screen title derived from the version.
- Keep the hardcoded static `<title>` fallback tag in sync; the smoke check
  fails if it disagrees with `GAME_VERSION`.
- Add matching entries to `CHANGELOG.md` and the README change log summary.
- Keep `index.html` self-contained apart from the existing Firebase CDN scripts
  and checked-in media assets.

## Checks

Run the smoke check before committing or pushing:

```sh
node scripts/smoke_check.mjs
```

Also run this before committing when practical:

```sh
git diff --check
```

If you changed JavaScript logic in `index.html`, use targeted code inspection
and the smoke check at minimum. If you start a local server for manual testing,
state the URL and leave no background process running unless the user asked for
it.

## Publishing

Preferred release flow:

```sh
git switch codex/local-work
git status --short --branch
node scripts/smoke_check.mjs
git diff --check
git add README.md CHANGELOG.md index.html AGENTS.md
git commit -m "Release vX.YY ..."
git push origin codex/local-work
git switch testing
git merge --ff-only codex/local-work
git push origin testing
```

Use explicit file paths with `git add` unless the user has confirmed that the
entire worktree belongs in the release.

If the fast-forward merge fails, stop and inspect history instead of forcing the
branch. Do not rewrite `testing` unless the user explicitly asks for that.

## Project Conventions

- Saves match upgrades by name and `applyUpgradeEffect` rehydrates them on
  load. When adding upgrades, append to the relevant category array instead of
  inserting in the middle.
- When adding a side-branch upgrade, update both the purchase prerequisite and
  the visual connector in `drawCollapsibleUpgradeElement()`. The player should
  be able to tell which parent unlocks each child card from the line alone.
- Keep UI text and version strings consistent across `index.html`, README, and
  changelog.
- Avoid unrelated refactors. This is a one-file game, so small local changes are
  easier to review and safer to publish.
- Do not add external runtime dependencies unless the user explicitly asks and
  the repo still works as a static page.
- If tool-specific instructions are needed for a particular agent environment,
  keep them outside the repo or in a tiny pointer file that refers back to this
  canonical file. Do not duplicate release rules in multiple files.

## Upgrade Connector Map

Current side-branch parent/child links:

- Cannon `Multibarrel` -> `Focus Radius`.
- Laser `Damage` -> `Manual Targeting`.
- Laser `Manual Targeting` -> `Auto XP Targeting`.
- Laser `Damage` -> `Wide Beam`.
- Sensors `Enemy Identification` -> `Target Analysis AI`.
- Sensors `Target Analysis AI` -> `Ordnance Sync`.
- Sensors `Ordnance Sync` -> `Fire Control AI`.
- Missile `Radius` -> `Retarget`.
- Missile `Macros` -> `Smart AI`.
- Missile `Smart AI` -> `Missiles to Mines`.
- Missile `Missiles to Mines` -> `Magnetic Mines`.
- Missile `Supersonic Research` -> `Supersonic`.
- Missile `Supersonic` -> `Super Warhead`.
- Missile `Supersonic` -> `Super Salvo`.
- Missile `Super Salvo` -> `Salvo AI`.
- Missile `Super Salvo` -> `Salvo Speed`.

Draw connector lines behind child cards so they do not obscure card text or
borders. Use vertical connectors for stacked direct descendants and elbow
connectors for children anchored to a parent in the previous column.

## Current State (2026-07-02)

Live (`testing`) is at v3.85. Versions v3.76-v3.85 added the Q-debug
performance overlay, improved high-missile-count performance, restored
comma-separated currency formatting, stabilized missile trail visuals, fixed
enemy spawning so enemies appear outside the current fog-of-war reveal boundary,
added Auto XP Targeting under Laser Manual Targeting, and clarified upgrade tree
connector lines. Supersonic activation now branches from Supersonic Research,
Super Warhead is an expensive wave-capped damage ladder, wave rewards now
require explicit boss destruction, and Supersonic weapons are boss-only. See
`CHANGELOG.md` for per-version detail.

Code landmarks in `index.html`:

- Missile upgrade ladder: Missiles > Radius > Damage > Homing (8 grades,
  80%) > Macros > Lifespan, with offshoot cards Retarget (off Radius) and
  Smart AI (off Macros). Indices are the `UPGRADE_MISSILE_*` constants.
- The Macross Missile Massacre fires from a canvas card drawn under the XP
  Boost card (`drawMacrossMenuButton`, click region type `macross_button`)
  or via the M hotkey. Each use adds 5s to the next recharge
  (`gameState.macrossUseCount` / `macrossCooldownTotal`, both persisted in
  saves).
- The homing radius circle toggle is a small switch drawn on the Homing card
  (click region type `homing_radius_toggle`; state in `showMissileRadius`,
  persisted in localStorage). The circle draws around a missile's locked target,
  or around the missile while it searches.
- Braided is the only missile flight style (`missileStyleConfig`); the
  Itano/Helix styles and the style-cycling button were removed.
- Missile travel range is `missileTargetingRadius * base.missileRangeMultiplier`
  (Lifespan upgrade, 1.1 at grade 0 up to 1.9 maxed).
- Enemy visibility and spawn distance share the reveal-radius calculation via
  `getEnemyRevealRadius()` / `getEnemySpawnRadius()`.
- Q-debug mode uses `debugUpgradesVisible` and `drawDebugOverlay()` for FPS,
  timing, and live object counts.
- Auto XP Targeting is a high-cost Laser side-branch off Manual Targeting. It
  automatically fires the existing XP laser path at XP enemies in laser range
  when the normal laser cooldown is ready.
- Supersonic Research unlocks the Supersonic activation card as its direct
  child. Super Warhead then scales Supersonic damage by grade: one grade unlocks
  per wave, with late grades tuned toward about half of the matching wave boss's
  health. Keep the wave cap and visual connectors aligned if this ladder
  changes.
- Supersonic missiles and their MIRV payloads target bosses only. The carrier
  fires once per boss when that boss enters sensor/supersonic range; do not let
  this path select normal, archetype, or XP enemies. Super Salvo payload counts
  increase by 2 per level.
- Every 10th wave spawns two bosses. Wave rewards require all bosses in that
  wave to be explicitly destroyed.
- Wave rewards must only be granted when the wave boss is explicitly destroyed.
  Boss base-impact or any other non-kill boss resolution should show the locked,
  greyed-out reward preview instead of granting a perk.

Known follow-ups (not yet requested; confirm with the user before doing):

- Smart AI health estimates ignore boss shield absorption, so shielded enemies
  can survive a "perfect" volley.
- Lifespan grade 0 (110% of missile radius) is a sharp nerf versus the old
  hardcoded 190% travel limit; cost/level tuning may be needed after
  playtesting.
- Smart AI intentionally applies only to the Macross volley; the user has been
  offered, but has not requested, extending it to regular missiles.
