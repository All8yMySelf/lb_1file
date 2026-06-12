# Orbital Defense - Change Log

## v2.75
- Added a three-layer parallax starfield rendered only inside the visible
  sensor circle, so the lit zone reads as "what your sensors can see" against
  the greyed-out fog outside.
- Stars shift against base movement (parallax), drift slowly with game speed,
  and twinkle.
- The starfield regenerates automatically when the window is resized.
- Added a soft glow to the base.

## v2.74
- Added a "game feel" pass behind the debug "Juice FX" toggle, purely
  presentational:
  - Floating credit text (`+$X`) rises from each kill; the base shows the
    damage it takes (`-X`).
  - Brief hit-stop on kills (stronger on boss kills) makes impacts land.
  - Screen shake when the base is hit and when a boss dies; the canvas clear
    stays put so edges don't smear.
  - Kill-combo counter: chained kills within 2 seconds pop a `COMBO xN!`
    callout at every 5th kill.
- All effects reset on new game and have zero effect when the toggle is off.

## v2.73
- Added choice-based wave rewards behind the debug "Wave Rewards" toggle:
  clearing a wave pauses the game and offers a pick-1-of-3 perk choice.
- Perk pool: Repair Crew (heal 30% now), Reinforced Hull (+20 max health),
  Overcharged Rounds (+15% bullet damage), Rapid Loader (+10% fire rate),
  Bounty Contract (+25% kill credits), Credit Cache (instant wave-scaled
  credits).
- Perks last the whole run, stack, survive save/load, and are folded into
  upgrade recomputation so buying upgrades later doesn't erase them.
- Multiple waves clearing together queue their reward choices back to back.

## v2.72
- Added four experimental enemy archetypes, active only while the debug
  "Enemy Archetypes" toggle is ON, appearing from wave 2 in ~25% of spawns:
  - **Splitter** (orange): splits into two smaller, faster children when
    destroyed (not when it reaches the base).
  - **Shielded** (blue): a shield ring absorbs damage before health; the ring
    fades as the shield weakens.
  - **Healer** (green): slowly regenerates nearby allies inside its pulsing
    aura ring.
  - **Kamikaze** (pink): arrives in swarms of four; fast, fragile, and hits
    the base three times harder than its size suggests.
- Archetype stats scale with wave difficulty like classic enemies, integrate
  with enemy identification/intel, and survive save/load.
- Wave completion counting stays consistent with swarms and splits.

## v2.71
- Added three experimental feature toggles to the hidden debug menu (Q),
  below +100,000 credits: Enemy Archetypes, Wave Rewards, and Juice FX.
- Toggles show their ON/OFF state, persist across reloads, and can be
  flipped individually so upcoming features can be tested before going live.
  They have no gameplay effect yet.
- Removed an unreachable wave-stats fallback in the debug purchase handler.

## v2.70
- Split the monolithic `drawGame` into focused layer functions (range rings,
  base, gun barrels, enemies, projectiles, upgrade menu) with no intended
  visual change.
- Deduplicated the upgrade-menu drawing code: one shared measurement helper,
  one focus-notch bar renderer, and one sub-upgrade button renderer replace
  three near-identical blocks.
- Removed the dead `drawRingUIElement` function (unused since the v2.9 ring UI
  was replaced; it referenced an undefined variable and would have crashed if
  called).
- Folded the per-frame target-lock countdown into the existing enemy update
  loop, removing a duplicate pass over the enemy pool.
- Completed waves now also release their boss-tracking entries so long runs
  don't accumulate stale state.
- Routed the remaining unconditional debug logs through `DEBUG_MODE`.

## v2.69
- On the leaderboard screen, Q is now a pure show/hide toggle for cheat
  scores — even for players whose own run used the cheat.
- Q no longer flips the in-game debug menu state while the leaderboard is
  open.

## v2.68
- Scores from runs that used the debug +100,000 credits cheat are now flagged
  in the leaderboard database.
- Normal players only see clean scores on the leaderboard; cheat-flagged
  entries are hidden.
- Players who used the cheat this run, or who have the debug menu open
  (Q key), see the full leaderboard with a `[Q]` marker next to cheat scores.
- Pressing Q while the leaderboard is open refreshes it immediately.

## v2.67
- Refactored the one-file game internals while keeping `index.html` as the
  playable artifact.
- Moved upgrade definitions into a dedicated factory so future upgrades are
  easier to add and inspect.
- Split game, wave, base, sensor, and input initialization into focused helper
  functions without intentionally changing gameplay behavior.
- Updated agent workflow notes so every testable local change bumps the visible
  game version and changelog before handoff.

## v2.66
- Saved active enemies, bullets, missiles, particles, and canvas state so hard
  refreshes can restore the in-progress battle instead of clearing the screen.
- Restored saved multi-wave state without overwriting it during load, while
  preserving compatibility with older local saves.
- Added smoke-check coverage for runtime-state saves and hard-refresh restore
  behavior.

## v2.65
- Greyed out fully maxed upgrade categories and maxed upgrade rows while keeping
  them clickable so purchased upgrades can still be inspected.
- Reworked ring info label placement so large cannon, stun, focus, and sensor
  range labels avoid the right-side HUD and stay attached to visible ring
  positions.

## v2.64
- Centralized the displayed game version so the browser title and start screen
  use the same source value.
- Tightened leaderboard validation rules and documentation, including enforcing
  the ranking formula before leaderboard writes are accepted.
- Improved small-screen HUD and control wrapping so the game controls fit more
  reliably on mobile viewports.
- Added save metadata and migration validation so old local saves remain
  loadable while future save changes have an explicit compatibility check.
- Fixed stored preference parsing so setting music volume to zero remains muted
  after reload.
- Added a local smoke-check script for version consistency, Firebase rule
  validation, single-file assumptions, and inline JavaScript syntax.
- Removed stale implementation comments and unused missile placeholder state from
  the single-file game.

## v2.63
- Improved the opening sensor warning layout so the text is centered and
  constrained instead of running across the full screen.
- Changed Enemy Info to default to Inline mode when starting a new game.
- Shortened and wrapped inline enemy info cards so locked health messages do
  not stretch across the playfield.
- Fixed loaded saves so they resume playing immediately instead of starting
  paused.
- Docked unlocked time-speed controls under the Time Control upgrade category.
- Redesigned the fog-of-war overlay with a grey hidden-area treatment, repeated
  dark hash marks, and recurring FOG labels.

## v2.62
- Bumped the game version after 17 merged updates on May 27, 2026.
- Added purchasable time-control upgrades that unlock wider speed limits.
- Moved compact time-speed controls beside the sensor controls.
- Added an SFX toggle for beep sound effects.
- Restyled ring info and inline enemy HUD cards with theme-aware translucent
  panels and improved text readability.
- Improved enemy stat panels with health-based sorting, corrected wave speed
  scaling, cleaner alignment, and less duplicate HP text.
- Moved the Send Next Wave button into the Battle Status panel.
- Improved theme readability, including the renamed Neon theme and Pixel Black
  and White HUD contrast.
- Fixed ring, targeting-range, and canvas layering so HUD and range information
  render above shadow and overlay effects.
- Clarified labels for unidentified non-enemy objects.

## v2.45
- Added a development warning on the start screen.
- Game title increased in size and renamed to "Orbital Defense".

## v2.44
- Show lowest undefeated wave in Game Over statistics.
- Leaderboard scoring uses the earliest unfinished wave.
- Remaining enemy count displays during each wave.

## v2.43
- Leaderboard now uses the earliest active wave on death to prevent inflated
  scores when multiple waves are queued.

## v2.42
- Info upgrade uses a standalone layout without connecting lines.

## v2.41
- XP enemy despawns instantly when a boss is destroyed.

## v2.40
- Leaderboard ranking formula updated to `wave * 100000 - time`.
- Leaderboard now only stores the top 10 scores.
- Cleaned up project files and removed obsolete data.

## v2.39
- Leaderboard ranking now uses `wave * 100000 - time` and only stores the top 10 entries.

## v2.38
- Switched to a Firebase-only leaderboard; local storage has been removed.
- Dates returned from the global leaderboard no longer include a time component.

## v2.37.1
- Improved touch controls so upgrades open on a single tap.

## v2.37
- Introduced inexpensive "Electronic FOV" upgrade to expand detection radius.
- Displays a faint sensor ring and hides enemies until they enter this range.

## v2.36
- Added "Sensors" upgrade category with enemy outlines, health bars and targeting AI.
- Targeted enemies now keep solid red brackets briefly after locking on.

## v2.35
- Polished line connections and made focus radius notches rectangular.

## v2.34
- Fire rate button layout and cost highlights for upgrades.
- Cannon category renamed and menu uses flowchart layout.
- Missile homing fixed with range checks; wave timer resumes after pause.


## v2.33
- Upgrade categories are now collapsible.
- Reduced font size of upgrade buttons to prevent text clipping.

## v2.32
- Added persistent Top 10 High Scores feature
- Scores include 3-character initials, score, and date
- Scores were initially saved in browser `localStorage` (now replaced by Firebase)
- Retro arcade-style visual leaderboard
- Automatically initializes when no high scores exist

## v2.31
- Added clickable block-based Focus Radius selector with save persistence
- Updated version references
- Improved notch visibility to ensure blocks are noticeable
- Switched to rectangular notch styling and removed obsolete menu border code


## v2.30
- Major UI update: Reduced HUD, Game Over screen, and title sizes
- Removed instruction list from Start screen
- Added Debug panel to add 100,000 credits
- Fixed Multi-Barrel firing direction (now fires straight)
- Added independent barrel targeting for closest N enemies
- Introduced "Focus Radius" upgrade to allow all barrels to focus fire when enemy is in range
- Added faint visual ring to represent selected Focus Radius
- Added logic for missile homing with radius, reacquisition, and turning speed upgrades
- Added toggle for displaying missile homing radius
- Prepared upgrade code for slider-based and visual selection tools
- Added infrastructure for future upgrade control with terminal-style UI
