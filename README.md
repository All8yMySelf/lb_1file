# Orbital Defense

This repository contains a small browser game written entirely in a single HTML file. The goal of the challenge is to keep all the game's HTML, CSS and JavaScript code self-contained so that it can be played by simply opening `index.html`.

## Playing

Open `index.html` in any modern browser. The game will load immediately with no additional assets required. Use the on-screen instructions or the hotkeys listed on the start screen to play.
For detailed controls and tips see [HOW_TO_PLAY.md](HOW_TO_PLAY.md).

The start screen also includes a background music selector. Use the arrows to
cycle through the available tracks or choose **Off** to disable it entirely.
The slider beside the selector adjusts the music volume and defaults to 25%.

## Controls

- **Theme** — cycles through different visual styles.
- **Mute** — turns game sounds on or off.
- **SFX** — toggles beep sound effects.
- **Time controls** — unlock higher and lower battle speeds through the new
  time-control upgrades, then adjust speed from the compact control cluster.

## Checks

Run the local smoke check before publishing changes:

```sh
node scripts/smoke_check.mjs
```

For local multi-agent workflow and publishing notes, see [AGENTS.md](AGENTS.md).

## About

`index.html` now embeds the original `styles.css` and `themes.js` directly inside `<style>` and `<script>` tags. There are no external dependencies beyond the Firebase scripts loaded from a CDN.

The previous `css/` and `js/` folders have been removed as part of the single-file challenge.

The repository also includes a `favicon.ico` so browsers display an icon in the
tab when the game is loaded. A `database.rules.json` file is provided as an
example Firebase security rules configuration.

## Leaderboard Setup

A Firebase Realtime Database is required to store and serve the global
leaderboard. The global leaderboard is now fully operational. Create a database in your Firebase project and configure the rules
similar to the example below:

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

Scores are ranked using the formula `ranking = wave * 100000 - time` where
`wave` is the lowest wave that was still active when the player was defeated.
This ensures sending multiple waves early will not inflate scores. Higher waves
and faster completion times result in a better leaderboard position.

The database must allow writes at `/scores` so the game can submit new
entries. A `permission_denied` error in the browser console typically means the
rules are misconfigured or a submitted score does not match the required
initials, wave, time, and ranking validation.

`database.rules.json` contains the same example configuration shown above and can be used as a template for your security rules. This file is only a reference and is not read by the game directly.

## Change Log

The game is under active development. Below is a brief summary of recent updates.
See [CHANGELOG.md](CHANGELOG.md) for the full history.


### v2.80
- XP kills bank charges on a new XP Boost button; each press doubles fire
  rate, stacking with halved durations (20s, 10s, 5s...).

### v2.79
- Splitter children dodge sideways out of the bullet stream when they spawn.

### v2.78
- Repair Crew overheals past max health; active perks show in a HUD readout;
  Bounty Contract bonuses appear in the floating kill text.

### v2.77
- Enemy archetypes, wave rewards, and Juice FX are now always on; debug
  toggles removed.

### v2.76
- Macross-style missile choreography with four switchable flight styles
  (bottom "Missiles" button); cheaper first missile purchase and up to 12
  missiles.

### v2.75
- Parallax starfield inside the visible sensor circle and a soft glow on the
  base; the fog outside stays greyed out to mark sensor coverage.

### v2.74
- Juice FX pass behind the debug toggle: floating credit/damage text,
  hit-stop on kills, screen shake, and kill-combo callouts.

### v2.73
- Pick-1-of-3 wave reward perks after each cleared wave, behind the debug
  "Wave Rewards" toggle.

### v2.72
- Four experimental enemy archetypes (Splitter, Shielded, Healer, Kamikaze
  swarm) behind the debug "Enemy Archetypes" toggle.

### v2.71
- The hidden debug menu (Q) now has persistent ON/OFF toggles for upcoming
  experimental features: Enemy Archetypes, Wave Rewards, and Juice FX.

### v2.70
- Internal cleanup: split the monolithic draw routine into focused layers,
  removed dead and duplicated drawing code, and trimmed a redundant per-frame
  pass over the enemy pool. No intended gameplay or visual change.

### v2.69
- Q on the leaderboard screen now cleanly toggles cheat scores on and off for
  everyone, without affecting the in-game debug menu.

### v2.68
- Leaderboard scores from runs that used the debug credit cheat are flagged and
  hidden from normal players; cheat users (or anyone with the debug menu open
  via Q) see them marked with `[Q]`.

### v2.67
- Refactored the single-file internals so upgrade definitions and initial game
  state are easier to maintain while keeping `index.html` directly playable.
- Added workflow guidance that every testable local change should bump the
  visible version and changelog before handoff.

### v2.66
- Saved active battle objects so hard-refreshing the page can restore enemies,
  projectiles, particles, and wave state instead of resuming with an empty field.
- Preserved stacked-wave progress on load and added smoke-check coverage for the
  runtime save format.

### v2.65
- Greyed out fully maxed upgrade categories and maxed upgrade rows while keeping
  them clickable for review.
- Improved ring info label placement so large range labels stay out of the
  right-side status panels and remain anchored to the visible ring edge.

### v2.64
- Centralized the displayed game version so the browser title and start screen
  use the same source value.
- Tightened leaderboard validation documentation to match the Firebase rules.
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

### v2.63
- Improved the opening sensor warning layout so the text is centered and constrained.
- Enemy Info now defaults to Inline mode when starting a new game.
- Inline enemy cards use shorter wrapped locked-health messaging.
- Loaded save games now resume immediately instead of starting paused.
- Time-speed controls now dock under the Time Control upgrade category.
- Fog of war now uses a grey hidden-area overlay with repeated dark hash marks and recurring FOG labels.

### v2.62
- Bumped the game version after 17 merged updates on May 27, 2026.
- Added purchasable time-control upgrades that unlock wider speed limits.
- Moved compact time-speed controls beside the sensor controls.
- Added an SFX toggle for beep sound effects.
- Restyled ring info and inline enemy HUD cards with theme-aware translucent panels and clearer text.
- Improved enemy stat panels with health-based sorting, corrected wave speed scaling, cleaner alignment, and less duplicate HP text.
- Moved the Send Next Wave button into the Battle Status panel.
- Improved theme readability, including the renamed Neon theme and Pixel Black and White HUD contrast.
- Fixed ring, targeting-range, and canvas layering so HUD and range information render above shadow and overlay effects.
- Clarified labels for unidentified non-enemy objects.

### v2.45
- Start screen now warns the game is still in development.
- Title increased in size and simplified to "Orbital Defense".

### v2.44
- Show the lowest undefeated wave on the Game Over screen.
- Leaderboard scoring now uses the earliest unfinished wave.
- Remaining enemy count is displayed during each wave.

### v2.43
- Leaderboard uses the earliest active wave when calculating scores.

### v2.42
- Info upgrade uses a standalone layout without connecting lines.
### v2.41
- XP enemy despawns instantly when a boss is destroyed.

### v2.40
- Leaderboard ranking now uses `wave * 100000 - time` and stores only the top 10 scores.
- The global leaderboard is fully operational.

### v2.38
- Minor bug fixes.

### v2.37
- Added Electronic FOV sensor upgrade with visible radius ring.
- Enemies outside the sensor radius remain hidden until entering it.

### v2.36
- Added Sensors upgrade category with enemy outlines, health bars and targeting AI.
- Targeted enemies now keep solid red brackets for a short time.

### v2.35
- Polished upgrade lines and swapped triangle notches for rectangles.

### v2.34
- Redesigned upgrade menu with flowchart layout and visible costs.
- Categories highlight when affordable upgrades are available.
- Missile homing fixed with range limit and wave timer resumes correctly.

### v2.33
- Upgrade categories can now be expanded or collapsed.
- Reduced upgrade button font size so long labels fit.

### v2.32
- Minor optimizations.

### v2.31
- Added a clickable Focus Radius selector that saves your preference.
- Updated version references and refined notch visuals.
- Removed redundant code for a leaner single-file build.

### v2.30
- Major UI overhaul with a more compact HUD and screens.
- Introduced a Debug panel for quickly awarding credits.
- Added the Focus Radius upgrade and visual ring indicator.
- Implemented missile homing improvements and toggle controls.

## License

This project is licensed under the [MIT License](LICENSE).
