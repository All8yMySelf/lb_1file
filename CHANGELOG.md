# Orbital Defense - Change Log

## v3.33
- Made Ghost Thin the default missile trail style and reset the temporary Trail
  selector storage so live builds open on the chosen style.

## v3.32
- Made Ghost Smoke the default missile trail style and reset the temporary
  trail selector to a new Ghost-only test set.
- Extended missile trail history again and retuned the Ghost variants so white
  smoke starts directly behind the missile with orange flame layered over it.

## v3.31
- Added a temporary bottom Trail selector with the current missile trail as
  Default plus ten longer flame-to-smoke variants for visual testing.
- New trail variants layer dark orange flame, dark grey smoke, white haze, and
  fade-out while keeping the current Default trail unchanged.

## v3.30
- Locked Hatch Lock opacity to the selected former 5/10 tuning and removed the
  temporary bottom Hatch opacity button.

## v3.29
- Retuned Hatch opacity levels so 1/10 is the strongest reference and 2/10
  through 10/10 step progressively less visible.

## v3.28
- Added a bottom Hatch opacity control with ten persisted transparency levels
  for comparing the locked Hatch Lock target disc in-game.

## v3.27
- Locked missile homing visuals to Hatch Lock and removed the temporary homing
  style selector.
- Hatch Lock now shows a dashed ring around searching missiles and a stronger
  hatched red disc beneath locked targets.

## v3.25
- Reduced the homing style cycle to Red Disc, Dashed Lock, Dashed Glow, and
  Hatched Disc.
- Added Dashed Glow as a combined transparent disc plus dashed red lock ring.
- Added Hatched Disc with a fog-like diagonal hatch pattern and contact shadow
  so it reads as sitting underneath enemies and range rings.

## v3.24
- Increased the Red Disc homing style visibility with a stronger transparent
  fill, edge, and shadow so the depth effect is easier to read.

## v3.23
- Added a bottom-screen Homing style button with the existing ring as the
  default plus ten alternate missile homing-radius displays.
- Added a faint red filled-disc homing style that draws beneath enemies and
  range rings with a soft shadowed depth effect.

## v3.22
- Missile trails are locked to the Needle Core look after testing the temporary
  selector variants.
- Removed the missile trail style cycling button from the bottom controls.
- Documented missile trail art as a follow-up area because the anime missile
  massacre look still needs a stronger dedicated visual pass.

## v3.18
- Defense Systems now uses a green category outline instead of inheriting the
  cannon purple outline.

## v3.17
- Weapon category colours are now consistent: Cannon is purple, Laser is
  yellow, and Missile is red across upgrade borders and range rings.
- The fired laser beam now uses the same yellow as the Laser System border and
  targeting range.

## v3.16
- Missiles that lose and reacquire targets now use a softer retargeting turn
  window, creating a wider arc instead of snapping sharply onto the new target.

## v3.15
- Missiles now use an anime-style white body with a red nose cone.
- Missile trails now render as segmented smoke: bright white near the missile,
  fading through grey and then out to transparent.

## v3.14
- Defense Health is now an unlimited +10% max-health upgrade based on the
  player's current max health, including boss and perk health gains.
- The Health upgrade card now shows the current max health and the next +10%
  value instead of fixed level targets.

## v3.13
- Clicking the game screen outside canvas UI buttons now collapses any open
  upgrade category panels.

## v3.12
- Tactical Zoom now keeps bullets and missiles alive until they leave the
  actually visible world area, instead of clipping them at the old unzoomed
  canvas bounds.

## v3.11
- Tactical Zoom now keeps the fog-of-war hash overlay full-screen while
  cutting out the correctly zoomed sensor reveal area.

## v3.10
- Missile lifespan now uses total distance traveled instead of straight-line
  distance from launch, so retargeting, weaving, and circling inside the
  missile radius still consume the same travel budget.

## v3.09
- Missile tail failure now starts at 75% of travel life and the tail is fully
  gone at 90%.
- The final 10% of travel is unguided tumbling drift with no homing radius,
  while collisions still deal damage.

## v3.08
- Missile tails now start shrinking and failing with 20% of travel life left,
  disappear completely for the final 5%, and no longer draw a homing radius
  during that final drift.
- In the final 5% of range, missiles lose guidance and tumble ballistically
  while keeping momentum; they can still collide and deal damage until they
  expire.

## v3.07
- Tactical Zoom now expands the starfield to cover the full revealed sensor
  area, so stars fill the visible playfield out to the largest active range
  while the fog pattern remains outside it.

## v3.06
- Range ring label panels now resolve overlaps in screen space so zoomed or
  moving labels do not stack on top of each other.

## v3.05
- Tactical Zoom now keeps range ring label panels and text at normal screen
  size while the rings themselves continue to scale with the playfield.

## v3.04
- Tactical Zoom now appears as a normal Sensor upgrade directly under
  Calculate Enemies' Health instead of being drawn as a side branch.

## v3.03
- Added a Tactical Zoom Sensor upgrade under Calculate Enemies' Health.
- Once unlocked, pinch zoom on touch devices and mouse-wheel zoom on desktop
  scale the tactical playfield around the base while the upgrade UI and HUD
  stay fixed-size.

## v3.02
- Macross Missile Massacre now combines both strategic cooldown rules:
  the base reload starts at 15 seconds on the wave Macros is activated and
  rises by 1 second per later wave, while each previous use in the current
  wave adds another 5 seconds to the next recharge.
- Starting a new wave resets the per-use penalty back to that wave's base
  reload.

## v3.01
- Macross Missile Massacre reload timing now keys off the wave where the
  Macros upgrade is first activated: 15 seconds on that wave, then +1 second
  per later wave.
- Superseded in v3.02 by restoring the per-use +5 second penalty within each
  wave.

## v3.00
- Missiles now enter a burnout phase after 75% of their lifespan distance:
  their smoke trail fades, their body fades, and their steering starts to
  wobble and drift before they disappear at full range.
- Burnout missiles still collide and deal damage until they fully expire.

## v2.99
- Added two Sensor upgrades under Target Analysis AI:
  - Ordnance Sync separates cannon and missile reservations so bullets avoid
    enemies already covered by incoming missiles, and missiles avoid cannon
    reservations.
  - Fire Control AI extends that separation to the laser, so the laser prefers
    targets not already covered by cannon or missile damage.

## v2.98
- Macross Missile Massacre cooldown penalties now reset at the start of each
  new wave. Within a wave, each use still adds 5 seconds to the next recharge,
  but the next wave starts that penalty cycle fresh.

## v2.97
- Every Macross Missile Massacre launch now adds 5 seconds to the next
  recharge, so the more you lean on it the longer it takes to come back.
  The card's progress bar reflects the lengthened recharge, and the use
  count carries through saves.

## v2.96
- New "Lifespan" upgrade on the missile ladder controlling how far a missile
  can travel after launch. The base allowance is the distance from the base
  to the missile radius edge plus 10%; each of 8 grades adds another 10%,
  with the final grade matching the old hardcoded 190% travel limit.
- Note this means un-upgraded missiles now expire sooner than before (110%
  of the radius instead of 190%) until Lifespan is bought.

## v2.95
- New "Retarget" upgrade, drawn as an offshoot of the missile Radius card
  (requires Radius). When a missile's enemy is destroyed and the missile is
  still inside the base's missile targeting range, the base assigns it the
  closest enemy within that range — even one outside the missile's own
  homing radius. Macross volley missiles keep their own homing instead.

## v2.94
- The homing radius circle now draws around the missile's locked target
  rather than the missile itself (one circle per enemy, however many
  missiles are inbound). When the target dies and a missile survives, the
  circle shifts to that missile while it hunts for a new target, then jumps
  to whatever it locks next.

## v2.93
- The Smart AI card is now drawn as an offshoot of the Macros card (one step
  down the ladder, connected to it), matching how Focus Radius hangs off
  Guns and Manual Targeting hangs off Laser. It greys out until Macros is
  bought.

## v2.92
- The Macross Missile Massacre button moved from the bottom bar to a card
  directly under the XP Boost card in the upgrade menu, appearing once the
  Macros upgrade is bought.
- While reloading the card is grey and its background fills left-to-right as
  the cooldown recharges, so you can judge when it will be ready; at 100% the
  card turns green and clicking it fires the volley.

## v2.91
- The homing radius visibility toggle now lives on the Homing upgrade card
  itself as a small on/off switch (top-right corner); the bottom-bar button
  has been removed. The setting still persists between sessions.
- Homing can now be upgraded to grade 8 (80%), up from grade 5 (50%).
- The homing radius circle around missiles is fainter.

## v2.90
- Macross Missile Massacre volley size is now capped at 200 missiles
  (50 -> 100 -> 200); higher Macros grades keep improving damage and
  cooldown. Old saves above the cap are clamped on load.
- The homing radius circle drawn around each missile is the missile's real
  acquisition radius, so what you see is exactly what the homing logic uses.

## v2.89
- Braided is now the one and only missile style. The Itano and Helix styles
  and the bottom "Missiles" style-cycling button have been removed.

## v2.88
- New "Smart AI" upgrade (4 grades, requires Macross) for the Macross Missile
  Massacre. The volley reads each enemy's health and splits itself across
  enemies closest-first instead of dumping every missile on one target.
- Grade 1 estimates missiles-per-enemy at 70% accuracy; each grade adds 10%
  up to a spot-on 100% at grade 4.
- Missiles left over after every enemy is covered launch out in all
  directions and use their own homing to acquire new arrivals.
- Without Smart AI the massacre behaves as before: every missile converges
  on the boss, or the nearest enemy.

## v2.87
- New "Homing Radius" toggle button shows a faint circle around every missile
  marking its homing acquisition radius, so you can verify how far missiles
  see and that they lock the correct enemies.
- The toggle is remembered between sessions and defaults to On.

## v2.86
- Reworked XP Boost stacking into timed active layers instead of one replaced
  timer. Each active layer doubles fire rate, up to seven active layers.
- New XP Boost charge durations are 20s, 10s, 5s, 4s, 3s, 2s, and 2s. Each
  new charge appends its duration to the remaining boost tail while raising
  the multiplier.
- The XP Boost card now drains as a progress bar across the active boost tail
  and shows active layers out of seven.

## v2.85
- Missile style cycling now keeps only Itano, Helix, and a new Braided mode;
  Classic and Starburst are no longer selectable.
- Braided missiles burst outward, curl back, twist around each other with
  phase-spaced paths, then tighten together onto the target before impact.
- Old saved missile-style preferences migrate to the closest remaining mode.

## v2.84
- Fixed enemy visibility so enemies are drawn when they enter any active reveal
  radius: sensors, cannon targeting, missile targeting, laser range, or stun
  field.
- Missile targets no longer appear invisible just because they are outside the
  sensor radius.

## v2.83
- Cleaned up XP Status after the XP Boost card move: the panel no longer
  repeats banked charge information that already lives on the Boost card.
- The "Destroy with Manual Laser..." hint now disappears once Manual Targeting
  has been purchased.

## v2.82
- Moved XP Boost out of the bottom controls and into the canvas upgrade menu
  below the upgrade categories, so it sits with the rest of the tactical cards.
- The XP Boost card now acts as its own countdown display: while active, the
  card shows the multiplier, remaining seconds, charges, and a shrinking
  progress fill.
- Removed the active boost timer from XP Status so the timer lives on the
  clickable Boost card.

## v2.81
- Wave reward choices are now deterministic for fair high-score runs: each
  cleared wave still offers 3 rewards, but the options rotate by wave number
  through the six-reward list instead of being randomly sampled.

## v2.80
- XP enemies now bank charges instead of instantly doubling fire rate: a new
  "XP Boost (N)" button pops up at the bottom showing how many charges you
  hold, and they persist across waves and save/load.
- Press the button to spend a charge: double fire rate for 20 seconds.
  Pressing again while a boost runs doubles the rate again (x4, x8, ...),
  with each stacked window lasting half as long (20s, 10s, 5s, 2.5s minimum).
- The XP Status panel shows banked charges and the live multiplier/timer.

## v2.79
- Splitter children now burst out perpendicular to your line of fire (left
  and right of the bullet stream) instead of spawning randomly, so they no
  longer get mowed down the instant they appear.

## v2.78
- Repair Crew now overheals: the 30% restore stacks past max health (e.g.
  130/100), and wave heals and health upgrades no longer strip the surplus.
- Active wave-reward perks are now visible in a gold readout under the HUD
  (e.g. `DMG +15% | BOUNTY +25% | HULL +20`).
- Bounty Contract kills show the bonus explicitly in the floating credit
  text — `+$13 (+3)` in green instead of plain gold.

## v2.77
- Enemy archetypes, wave rewards, and Juice FX are now permanently on for all
  players; their debug toggles have been removed.
- The hidden debug menu (Q) keeps only the +100,000 credits entry.

## v2.76
- Macross missile massacre: missiles now scatter outward in arcs with
  streaking trails, twirl, then whip around and coalesce on their target.
- New bottom "Missiles" button cycles four flight styles so the best look can
  be picked during play: Classic (old behavior), Itano (spiral scatter and
  converge — the anime one, default), Helix (corkscrew approach), and
  Starburst (radial burst, wide arc back). The choice persists across
  reloads.
- Styled Macross volleys share one focus target (boss first, else nearest
  enemy) so the whole swarm visibly converges on a single point.
- Missiles are cheaper to get into and go further: first purchase cost
  2000 -> 800, max missile count 6 -> 12.

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
