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
For Codex-specific orchestration and usage-accounting workflow, see
[CODEX.md](CODEX.md).

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

### v3.104
- Enemy Stats now sizes itself from a hidden `#999000` worst-case row and locks
  enemy order by first identified health, preventing distracting row reshuffles.
- The Send Next Wave button now matches the cyan fog-callout styling.

### v3.103
- Enemy Stats is narrower again and keeps enemy rows stable: Kamikaze stays first
  and other enemy types keep discovery order instead of jumping around.
- The Info card now says `Click Here for Instructions.`, and the full guide
  overlay includes controls, stat labels, XP Boost notes, and enemy type icons.

### v3.102
- Enemy Stats is wider and keeps enemy rows on one line, while right-side panels
  use a darker retro HUD treatment with gold borders.
- The Info / How To Play card now shows only hover help text, and the full guide
  overlay explains enemy colors, stats, movement, upgrades, and XP Boost.

### v3.101
- The Info / How To Play menu card is now a larger fixed help panel for hover
  text, so upgrade help no longer covers nearby buttons.
- Battle Status bottom text now reads `Total: E = Enemies: N`.

### v3.100
- Battle Status now uses `E` for per-wave enemy counts and shows the compact
  bottom legend as `Total: E = Enemies: N`.
- Upgrade hover callouts now more aggressively avoid covering visible menu
  buttons, trying above, below, and right-side placements before falling back.

### v3.99
- Battle Status wave details now expand above a bottom Total Enemies row, with
  compact per-wave enemy counts and a bottom legend.
- Upgrade hover help now uses a fog-callout-style canvas panel with a connector
  line to the hovered card and placement that avoids covering nearby buttons.

### v3.98
- Left-side upgrade menu hover tips now show compact live system stats or upgrade
  explanations beside the hovered card.
- Battle Status now collapses under Total Enemies, keeping Enemy Stats compact
  until the wave details are expanded.

### v3.97
- XP Boost progress now lives on the left-side XP Boost card with the cyan XP
  marker, live banked-charge count, and a Manual Targeting hover tip for saving,
  spending, and stacking charges.
- The separate right-side XP Status panel has been removed.

### v3.96
- Battle Status now lives inside the Enemy Stats box (Send Next Wave, compact
  per-wave lines, Total Enemies), and each enemy row's `#` shows how many of
  that type are still expected across active waves.

### v3.95
- Enemy Stats panel now shows a colored behavior icon per enemy type with compact
  live metrics (`#` count on field, `»` speed, `♥` health), and the right-hand
  panels are restyled to match the upgrade-button look.

### v3.94
- Battle Status now shows a color-coded composition preview for each incoming wave
  (counts per enemy type), so you can prepare the right upgrades before pressing
  Send Next Wave.

### v3.93
- The red homing lock ring now shows around the targeted enemy for the first purchased
  missiles too (it previously needed the Homing upgrade, whose radius was 0 before purchase).

### v3.92
- Missile trails no longer shrink when you slow time; they keep full-speed length and shape,
  just progressing slower.

### v3.91
- Beam Splitter's cap is now gated by Laser Damage: its total damage can't exceed the main
  laser's damage, so you must upgrade Laser Damage to raise the splitter cap. It keeps its own
  independent damage line (doubling per level, split across Kamikazes).

### v3.90
- Beam Splitter is now a fully independent damage line: upgrading Laser Damage no longer
  auto-strengthens it. It has its own damage (doubling per level, split across the Kamikazes
  in range) with a 10-level cap for a long, separate upgrade path.

### v3.89
- New Laser **Recharge** upgrade (between Damage and Range) speeds up laser fire rate by 15%
  per level. Beam Splitter reworked to fire up to four Kamikaze split beams.

### v3.88
- Beam Splitter sub-lethal hits now chip away at Kamikaze health instead of
  being silently discarded, so splitter volleys visibly reduce health bars.

### v3.87
- Laser System now shows weapon recharge progress on its left-side category
  button, and Beam Splitter replaces Wide Beam with up to four Kamikaze split
  bolts whose power cap advances with Laser Damage.

### v3.86
- Laser kills now cleave enemies into two fading halves, and overkill creates a
  transparent carry-through beam based on remaining laser power.

### v3.85
- Supersonic missiles now fire only at bosses, once per boss, while Super Salvo
  adds guided boss-seeking MIRV payloads in +2 steps; every 10th wave now brings
  two bosses.

### v3.84
- Wave rewards now unlock only after the wave boss is destroyed; blocked rewards
  show as greyed-out previews explaining that the boss must be defeated first.

### v3.83
- Supersonic now branches directly from Supersonic Research, and Super Warhead
  has an expensive wave-capped damage ladder that can scale toward half-boss
  hits at matching wave grades.

### v3.82
- Upgrade tree side-branch connector lines now more clearly show prerequisite
  relationships, including Auto XP Targeting directly under Manual Targeting.

### v3.81
- Laser System now has a high-cost Auto XP Targeting upgrade under Manual
  Targeting, allowing XP enemies in laser range to be shot automatically for XP
  Boost charges.

### v3.80
- Enemies now spawn outside the current fog-of-war reveal boundary, so expanded
  sensor or weapon ranges reveal enemies as they cross inward instead of after
  they are already inside the largest range ring.

### v3.79
- Missile trails now use one fixed medium-detail smoke/flame renderer at every
  missile count, so late-wave swarms no longer switch to a different look.

### v3.78
- Credit totals, upgrade prices, research costs, reward unlocks, and credit gain
  text now show comma-separated thousands and millions again.

### v3.77
- The Q debug performance overlay now uses a fixed width and sits above the Fog
  of War callout instead of the bottom support button area.

### v3.76
- Q debug mode now shows an FPS/performance overlay, and high missile-count
  fights spend less frame time on trails, homing-radius rings, target scans, and
  particle bursts.

### v3.75
- Weapon reward labels are back beside their category buttons, with expanded
  upgrade panels now drawing over them when panels overlap.

### v3.74
- Weapon reward labels now sit inside their left-side category buttons, avoiding
  overlap with expanded upgrade cards.

### v3.73
- Reward bonuses now highlight the affected numbers on upgrade cards in yellow
  rather than adding separate reward text rows.

### v3.72
- Reward targeting can now be unlocked for Missiles and Laser, letting Damage
  and Rapid Loader rewards apply to specific weapon categories with yellow
  category bonus labels.

### v3.71
- Buying Laser System now immediately gives the laser a real firing range, and
  wave reward choices now include a Skip Reward button.

### v3.70
- Left-side category buttons stay compact again while expanded branch cards
  still avoid overlaps and keep connector lines attached to their parents.

### v3.69
- Missile count now scales to 100, parked Macross mines cap at 500, and
  side-branch upgrade cards auto-space to avoid overlapping each other.

### v3.68
- The debug menu now includes +1,000,000 and +100,000,000 credit grant buttons
  in addition to the existing +100,000 option.

### v3.67
- The Fog of War text box and highlighted hatch circle now move together as a
  single callout and hide when the whole callout cannot fit in fog.

### v3.66
- Laser and missile range calculations now enforce the 110% cannon-radius
  minimum directly, including when loading older saved radius values.

### v3.65
- Newly activated non-cannon systems now start at least 10% beyond the current
  cannon radius so their rings do not overlap the cannon targeting ring.

### v3.64
- The Fog of War callout is more compact, keeps range-info popups from covering
  it, and only points at fog that is outside the current reveal radius.

### v3.63
- The Fog of War callout now uses brighter hatch lines inside the highlighted
  sample circle so the pattern is easier to identify.

### v3.62
- Ring info now includes a Fog of War callout that highlights the diagonal fog
  pattern and explains that better sensor or weapon range reveals enemies
  sooner.

### v3.46
- Wide Beam power is no longer capped by Laser Damage level; it can be upgraded
  to level 10 so its per-target damage matches the focused beam.

### v3.45
- Wide Beam upgrade card now shows actual per-target damage values, matching the
  Laser Damage card format.

### v3.44
- Wide Beam is now a single upgrade: activates at level 1, then each extra
  level adds 10% power, capped at the current Laser Damage level.

### v3.43
- Wide beam spread now matches the focused beam colour and scales its opacity
  to its relative power, making weak spreads nearly transparent.

### v3.42
- Fixed a regression where enemy visibility and the Special Weapon stun radius
  ring disappeared; restored the missing stun radius increment constant.

### v3.41
- Wide Beam Power upgrade added: increases wide beam destruction by 10% per
  level (max 10 levels).

### v3.40
- Wide Beam draws a cone spread at Kamikazes (1/10 focused damage each)
  instead of three thick beams.
- Focused Fast/Boss laser beam restored to a thin single beam.

### v3.39
- Enemy reveal radius now follows the laser's effective firing range so
  purchased Laser Range upgrades keep targets visible.

### v3.38
- Fixed enemy visibility regression from the laser split; laser acquisition
  now provides its own reveal radius.

### v3.37
- Laser System is now split into independent Damage and Range upgrades.
- Laser radius anchors at acquisition range and grows via its own upgrade.
- New Wide Beam upgrade sweeps Kamikazes with a wider beam that spreads total
  laser strength proportionally across its width.

### v3.36
- Missile radius no longer changes when cannon radius is upgraded.
- Sensor range now follows the furthest active radius while keeping its
  Electronic FOV buffer distance beyond that ring.

### v3.35
- Locked missile trails to Thin Needle and removed the temporary Trail button.
- Tactical Zoom now unlocks unlimited post-cap Missile Radius, Electronic FOV,
  and Stun Radius upgrades.
- Special Weapons now separates Stun Field strength from Stun Radius.

### v3.34
- Kept Ghost Thin as the default missile trail and replaced the alternate Trail
  selector entries with nine thinner/smoother variants.

### v3.33
- Made Ghost Thin the default missile trail style and reset the Trail selector
  storage so the live build opens on it.

### v3.32
- Made Ghost Smoke the default missile trail and added ten Ghost-style variants
  with white smoke starting behind the missile and orange flame layered over it.

### v3.31
- Added a temporary Trail button with the current missile trail as Default plus
  ten longer flame-to-smoke trail variants for testing.

### v3.30
- Locked Hatch Lock opacity to the selected former 5/10 tuning and removed the
  temporary Hatch opacity button.

### v3.29
- Retuned Hatch opacity so 1/10 is the strongest option and the remaining
  levels get progressively fainter.

### v3.28
- Added a bottom Hatch opacity control with ten saved transparency levels for
  testing the locked Hatch Lock target disc.

### v3.27
- Missile homing visuals are locked to Hatch Lock, with the temporary style
  selector removed.
- Hatch Lock shows a dashed ring while searching and a stronger hatched red
  disc under locked enemies.

### v3.22
- Missile trails are locked to Needle Core and the temporary trail style
  selector has been removed.
- Follow-up noted: the anime missile massacre trail art needs a stronger
  dedicated visual pass.

### v3.18
- Defense Systems now uses a green outline instead of the cannon purple
  category colour.

### v3.17
- Weapon colours are now consistent: Cannon purple, Laser yellow, and Missile
  red for upgrade borders, range rings, and the fired laser beam.

### v3.16
- Retargeting missiles now arc more naturally toward reacquired targets instead
  of making a sharp snap turn.

### v3.15
- Missiles now have white anime-style bodies with red tips and smoky trails
  that fade from white to grey to transparent.

## Follow-ups

- Missile trail art: revisit the Macross/Itano-style missile massacre look.
  Needle Core is the current best option, but the trails still need a stronger
  custom visual treatment than the tested selector variants.

### v3.14
- Defense Health is now an unlimited +10% max-health upgrade that shows the
  current value and next value, including boss and perk health gains.

### v3.13
- Clicking the playfield outside upgrade buttons now collapses open upgrade
  panels.

### v3.12
- Bullets and missiles now continue across the full visible Tactical Zoom view
  instead of disappearing at the old unzoomed canvas edge.

### v3.11
- Tactical Zoom now keeps the fog-of-war hash overlay filling the full screen
  while revealing the correctly zoomed sensor area.

### v3.10
- Missile lifespan now counts actual distance traveled, so retargeted or
  weaving missiles cannot exceed their travel budget by staying near base.

### v3.09
- Missile tails now shrink from 75% to 90% of travel life, then missiles
  tumble unguided for the final 10%.

### v3.08
- Missile tails shrink and vanish near end-of-life; the final 5% is unguided
  tumbling drift that can still hit enemies before expiry.

### v3.07
- Tactical Zoom now fills the full revealed sensor area with stars out to the
  largest active range, with fog remaining outside.

### v3.06
- Range ring labels now shift apart in screen space to avoid overlapping
  during Tactical Zoom.

### v3.05
- Range ring label text now stays readable at normal screen size while using
  Tactical Zoom.

### v3.04
- Tactical Zoom now appears in the main Sensor list directly below
  Calculate Enemies' Health.

### v3.03
- Added Tactical Zoom under Sensors, unlocked from Calculate Enemies' Health,
  for pinch or mouse-wheel zooming of the playfield without scaling the UI.

### v3.02
- Macross reload now combines the activation-wave base timer with the
  within-wave +5s penalty for each previous use.

### v3.01
- Macross Missile Massacre reload starts at 15 seconds on the wave where
  Macros is first activated, then rises by 1 second each later wave.

### v3.00
- Missiles now fade their smoke and body, wobble, and drift after 75% of their
  lifespan distance while still dealing collision damage until they expire.

### v2.99
- Added Ordnance Sync and Fire Control AI Sensor upgrades to reduce wasted
  overlap between cannon, missile, and laser targeting.

### v2.98
- Macross Missile Massacre's +5s recharge penalty resets on each new wave,
  while repeated uses within the same wave still get progressively slower.

### v2.97
- Every Macross Missile Massacre launch adds 5 seconds to the next recharge,
  making repeated use progressively slower to come back.

### v2.96
- New Lifespan missile upgrade: travel allowance starts at base-to-radius
  +10% and each of 8 grades adds another 10% (maxed matches the old limit).

### v2.95
- New Retarget upgrade (offshoot of the Radius card): the base reassigns a
  surviving missile to the closest enemy inside its missile targeting ring.

### v2.94
- The homing radius circle draws around the missile's locked target, and only
  around the missile itself while it hunts for a new one.

### v2.93
- The Smart AI card now branches off the Macros card in the upgrade menu.

### v2.92
- The Macross button moved from the bottom bar to a card under XP Boost with
  a recharge progress bar that turns green when ready.

### v2.91
- The homing radius toggle moved onto the Homing upgrade card; Homing now
  upgrades to 80% (8 grades); the radius circle is fainter.

### v2.90
- The Macross volley is capped at 200 missiles.

### v2.89
- Braided is the only missile flight style; the style-cycling button was
  removed.

### v2.88
- New Smart AI upgrade for the Macross volley: health-based missile
  allocation across enemies closest-first (70%–100% accuracy over 4 grades),
  with spare missiles fanning out in all directions.

### v2.87
- New homing radius visibility toggle showing each missile's acquisition
  circle.

### v2.86
- XP Boost now stacks as up to seven timed layers: each charge doubles fire
  rate and appends a shorter duration to the active boost tail.

### v2.85
- Missile styles are now Itano, Helix, and Braided; Braided combines the burst
  and corkscrew feel into twisting convergent strikes.

### v2.84
- Enemies are now visible inside any active targeting or sensor radius, fixing
  invisible missile targets outside sensor range.

### v2.83
- XP Status no longer duplicates Boost charge details, and its Manual Laser
  hint hides after Manual Targeting is purchased.

### v2.82
- XP Boost moved into the upgrade menu as a clickable progress-card with the
  active multiplier and countdown shown directly on the button.

### v2.81
- Wave reward choosers now offer 3 deterministic options based on wave number,
  removing random reward luck from high-score runs.

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
