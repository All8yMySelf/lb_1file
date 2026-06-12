# Agent Workflow

This repository is often edited by multiple local agents. Keep changes small,
check the worktree before editing, and avoid overwriting another agent's local
work.

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

If there are unrelated local changes, do not revert or stage them without
explicit user approval. Work only with the files needed for the requested task.

## Version And Docs

For a publishable game update:

- Bump the centralized `GAME_VERSION` value in `index.html`.
- Keep the browser title and start-screen title derived from that version.
- Also bump the static `<title>` fallback tag in `index.html` to match —
  it is hardcoded and the smoke check fails if it disagrees with
  `GAME_VERSION`.
- Add matching entries to `CHANGELOG.md` and the README change log summary.
- Keep `index.html` self-contained apart from the existing Firebase CDN scripts
  and checked-in media assets.

For any local change that the user will test before publishing, also bump the
visible game version and update the change notes before handing it back. The
tester should be able to confirm from the browser title or start screen that
they are running the changed build, even for small fixes.

## Checks

Run the smoke check before committing or pushing:

```sh
node scripts/smoke_check.mjs
```

Also run `git diff --check` before committing when practical.

## Publishing

Preferred release flow:

```sh
git switch codex/local-work
git status --short --branch
node scripts/smoke_check.mjs
git diff --check
git add README.md CHANGELOG.md index.html
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

## Current State (2026-06-12)

Live (`testing`) is at v2.97. Versions v2.87–v2.97 reworked the missile
system; see `CHANGELOG.md` for the per-version detail. Code landmarks in
`index.html`:

- Missile upgrade ladder: Missiles > Radius > Damage > Homing (8 grades,
  80%) > Macros > Lifespan, with offshoot cards Retarget (off Radius) and
  Smart AI (off Macros). Indices are the `UPGRADE_MISSILE_*` constants; new
  upgrades must be appended to the category array because saves match
  upgrades by name and `applyUpgradeEffect` rehydrates them on load.
- The Macross Missile Massacre fires from a canvas card drawn under the XP
  Boost card (`drawMacrossMenuButton`, click region type `macross_button`)
  or via the M hotkey. The old bottom-bar DOM button was removed. Each use
  adds 5s to the next recharge (`gameState.macrossUseCount` /
  `macrossCooldownTotal`, both persisted in saves).
- The homing radius circle toggle is a small switch drawn on the Homing
  card (click region type `homing_radius_toggle`; state in
  `showMissileRadius`, persisted in localStorage). The circle draws around
  a missile's locked target, or around the missile while it searches.
- Braided is the only missile flight style (`missileStyleConfig`); the
  Itano/Helix styles and the style-cycling button were removed.
- Missile travel range is `missileTargetingRadius * base.missileRangeMultiplier`
  (Lifespan upgrade, 1.1 at grade 0 up to 1.9 maxed).

Known follow-ups (not yet requested — confirm with the user before doing):

- Smart AI health estimates ignore boss shield absorption, so shielded
  enemies can survive a "perfect" volley.
- Lifespan grade 0 (110% of missile radius) is a sharp nerf versus the old
  hardcoded 190% travel limit; cost/level tuning may be needed after
  playtesting.
- Smart AI intentionally applies only to the Macross volley; the user has
  been offered (but not requested) extending it to regular missiles.
