# Orbital Defense - Change Log

## v3.131
- XP enemy is now targeted by the cannon like a real enemy before it is
  identified: the cannon acquires and fires at it, bullets strike (hit spark)
  but deal no damage — the contact is invulnerable to the cannon. This wastes
  fire on the XP contact, signalling it is special and motivating the Enemy
  Identification upgrade.
- Once Enemy Identification is purchased, the cannon no longer targets the XP
  contact at all (bullets pass through it), leaving it for the manual laser to
  destroy. The manual laser's ability to destroy XP contacts is unchanged.

## v3.130
- Radar Sweep Width is now a child of Radar Sweep Speed. It cannot be purchased
  until Radar Sweep Speed is pushed to its maximum (100%). The width button
  renders as a sub-button connected to the speed button and shows a
  "Requires max Sweep Speed" lock line until the prerequisite is met; clicking
  it before then shows a toast.
- Radar Sweep Width cost raised from 300 to 2500 per level so it is an expensive
  late-game sink. Each level still widens the sweep 10% → 100%, and at 100% the
  sweep covers everything (full 360° coverage, no sweep drawn).
- Added info descriptions for the Sweep Speed and Sweep Width upgrades.

## v3.129
- Wave-reward popup is now deferred until after the boss's death explosion
  has played out. When the boss dies, the wave is held open for a short
  game-time delay (respecting slow-mo and pause) while the explosion
  renders, then the reward screen appears. The next wave does not start
  until the player picks a reward.
- The wave timer freezes at the moment of boss death during that delay, so
  the post-wave time bonus is no longer consumed by the explosion/reward
  wait.

## v3.128
- Cannons and lasers can no longer target a radar contact once it has faded to
  invisible. Targeting is now gated on the contact being visibly painted — the
  sweep is on it, it is in the fresh-paint flare, or it is still in the visible
  fade window (before the 50% invisible mark). Once it goes invisible it drops
  off the targeting list until the next sweep repaints it. This closes the loop
  where a contact painted once stayed shootable forever.

## v3.127
- Radar contact fade is now an ember-like flicker. Contacts hold full
  appearance for the first 25% of the sweep wait, then colour fades to grey
  (25%→37.5%), then grey fades to invisible (37.5%→50%) with a fire-light
  flicker shimmering the alpha in and out as it dies. From 50% on the contact
  is fully gone, so the player loses it and has to wait for the next sweep to
  repaint it — the "where are they?" worry the design is aiming for.
- Each enemy flickers on its own phase (derived from its bearing) so the
  shimmer is irregular across the field rather than a uniform pulse.

## v3.126
- Initial cannon range is now halved at game start, while the sensor radius
  stays at its previous full value. Enemies get painted in the gap between the
  sensor ring and the cannon ring, then fade to nothing before they can be
  engaged, making it obvious the player needs to upgrade cannon range.
- The first Electronic FOV (Sensor Range) upgrade is now granted for free at
  start, so the sensor ring is visible immediately without any purchase. The
  upgrade tree shows it owned at level 1.
- Added a `sensorBaseRange` floor so the sensor radius never collapses when the
  cannon is halved or weapons are undersized; the sensor ring only grows when
  the player upgrades Sensor Range or cannon range beyond the floor.
- Save/restore now persists `sensorBaseRange` (defaults to 0 for old saves,
  preserving their behaviour).

## v3.125
- Wave-1 pacing is now slow and deliberate for teaching. A new early-wave spawn
  factor ramps the spawn rate from 20% on wave 1 back to full by wave 5 (matching
  the speed-ramp horizon), and the wave's total enemy count scales with it so
  the boss still triggers correctly. Combined with the existing slow movement,
  the first contact arrives quickly but enemies no longer swarm the base.
- Scan radius now leads cannon range by 10px at base, so contacts appear just
  outside cannon range and have room to fade before being engaged.
- Fixed the close-spawn bug from v3.124 that could spawn enemies inside cannon
  range (causing instant impacts). Spawns now floor just outside the scan radius
  on early waves and scale back out to the normal off-screen distance as the
  speed ramp reaches full.
- Radar fade is now clearly visible: contacts hold full appearance for the first
  half of the sweep cycle, transition color → grey over the next 25%, then fade
  to fully invisible over the final 25% — the enemy survives long enough now
  (slow + detected outside cannon range) to see the whole fade play out.

## v3.124
- Early-wave spawns now pull in proportion to the slow-speed factor, so on the
  10%-speed waves enemies spawn close enough that they still arrive at the base
  at the normal pace despite crawling. Spawn rate itself was never changed; this
  just closes the travel-time gap so it no longer feels like a long wait between
  contacts. The spawn distance scales back out to its normal off-screen value as
  the per-wave speed ramp reaches full.
- Radar contacts now respect the Enemy Visuals (identification) upgrade. Before
  identification, every painted contact renders as a uniform small grey circle —
  real size and color stay hidden. Once identification is bought, the sweep
  shows the enemy's true size and color, then fades color → grey → near-invisible
  over the final 25% of the sweep cycle, so players can watch contacts go stale
  and feel the need to upgrade the sweep to keep re-confirming them.

## v3.123
- Replaced the estimated-position ghost and "EST POS" label with a smoother
  fade model. A painted enemy now renders at its real position and fades from
  its own color through grey to nearly invisible, timed to the sweep so it
  almost vanishes just before the wedge comes back around to repaint it. The
  fresh-paint blip flare still pops when the sweep finds the contact. Players
  can see enemies are there and watch them fade, which makes the case for
  upgrading Radar Sweep to keep re-confirming them.

## v3.122
- Reworded the one-time radar nudge toast to "Upgrade Sensor Sweep to pick up
  enemies earlier and confirm their locations." so the call to action is
  clearer for new players.

## v3.121
- Replaced the abrupt half-pace cutoff with a gentler learn-the-radar ramp:
  enemies now start at 1/10 of normal speed on wave 1 and climb ~1.6x per wave
  (wave 1: 10%, 2: 16%, 3: 26%, 4: 41%, 5: 66%, 6+: full speed). This gives new
  players several waves to learn the sensor sweep and buy Radar Sweep upgrades
  before the pressure reaches its normal level. The ramp only touches the
  early-wave factor; the usual per-wave difficulty scaling still applies on top.

## v3.120
- Grey estimated tracks now carry an "EST POS" label so players can tell at a
  glance that the grey contact is a guessed position, not the real target.
- The first time a contact fades to a grey track in a run, a one-time toast
  nudge points players at the Sensors → Radar Sweep upgrades as the way to
  buy permanent live tracking (the nudge fires once per run, then stays quiet).
- Half-pace waves 1–2 carried over from v3.119 groundwork: enemies run at 50%
  speed on the first two waves so new players can learn the radar before the
  pressure ramps up; wave 3+ returns to the normal progression.
- Weapons respect the radar: turrets, missiles, and the laser only engage
  contacts the sweep has painted at least once — a never-detected enemy is
  invisible to fire control. A grey estimated track is enough to shoot at.

## v3.119
- The Radar Sweep is now a tactical sensor mechanic instead of a cosmetic
  overlay. An 80s-style green phosphor sweep (afterglow trail, bright leading
  edge, faint scope rings) rotates inside sensor range. Enemies only render as
  live, colored contacts while the sweep paints them; each paint flares the
  contact up with an expanding blip ring and a throttled sonar ping (respects
  the SFX toggle).
- Between paints, contacts fade to grey estimated tracks whose accuracy
  improves per paint: the 1st paint gives a rough position fix with a random
  error and no motion estimate; the 2nd paint fixes the true position and
  bearing but only 75% of the speed; from the 3rd paint the track is perfect
  and follows the real target continuously.
- Two new Sensors upgrades: Radar Sweep Width and Radar Sweep Speed, each
  10 levels from 10% to 100% (cost 300, ×1.5 per level). Width sets the lit
  wedge angle; at 100% the sweep disappears and coverage is a permanent 360°
  view (pre-radar behavior). Speed raises the rotation rate for faster
  re-acquisition.
- The radar can still be disabled entirely from the FX cog menu, which
  restores always-visible enemies.
- Removed the CRT Curvature and Boot Animation effects after testing.
- Weapons targeting is unchanged (turrets have their own fire control); the
  radar governs what the player can see.

## v3.118
- Fixed the FX cog button doing nothing on click. The main script is inline,
  so its `defer` attribute is ignored and the FX panel wiring ran during
  parse, before the panel markup at the end of the page existed. The wiring
  now waits for DOMContentLoaded.

## v3.117
- Retro FX settings moved from the hidden Debug menu to a cog button in the
  bottom controls: clicking it opens a transparent panel with live checkboxes
  (plus All on / All off), so effects can be auditioned mid-game. The v3.116
  Debug menu FX entries are removed.
- Removed the Phosphor Glow effect entirely; it hurt readability.
- Boss warning improved for the fog-of-war gap between spawn and visibility:
  the banner now reads "BOSS IN THE FOG — CLOSING IN", and a pulsing red
  chevron with a BOSS label tracks along the sensor edge toward any boss that
  is still hidden, disappearing once the boss becomes visible.

## v3.116
- Added the Retro FX pack: 13 new presentational effects, every one
  individually toggleable from the hidden Debug upgrade menu (press Q, open
  Debug) so you can audition them and keep only what you like. Choices persist
  in localStorage and there is an "FX: Toggle All" entry to flip everything at
  once. All effects default to On.
  - CRT authenticity: Phosphor Glow (canvas rings/base/barrels + HUD text),
    CRT Curvature (rounded tube corners, edge shadow, subtle brightness
    flicker), Boot Animation (CRT power-on line when a run starts), Impact
    Glitch (chromatic aberration + signal tears when the base takes a hit).
  - Game juice: Muzzle Flash + barrel recoil on the cannon, Death Flash
    (white flash frame + shockwave ring on kills, bigger for bosses), Combo
    Meter (persistent kill-streak readout, bottom center), Boss Warning
    (letterboxed flashing WARNING banner when a boss spawns), Boss Slow-Mo
    (brief slow motion when a boss dies), Low-HP Pulse (red edge pulse and
    health flicker below 30% health), Wave Banner (typewriter WAVE N INCOMING
    on each new wave).
  - Ambience: Shooting Stars and a rotating Radar Sweep inside sensor range.

## v3.115
- Removed the v3.113 HUD Font experiment button after testing; the theme
  default font won. The v3.114 HUD fixes (CRT overlay over the HUD, soft
  drop shadow instead of the black outline) are kept.

## v3.114
- The top HUD (credits, wave, health) now sits below the global CRT overlay so
  scanlines pass over it, matching the bottom controls.
- Removed the hard black outline and dark halo from HUD text that washed it
  out; HUD text now uses a soft drop shadow, and the glow font styles apply
  correctly.

## v3.113
- Added a HUD Font button to the bottom controls that cycles the top HUD text
  (credits, wave, health) through four styles: theme default, VT323 with a
  phosphor glow, Press Start 2P arcade, and Share Tech Mono with glow and
  letter-spacing. Only the top HUD is affected and the choice persists in
  localStorage.

## v3.112
- Expanded the Enemy Identified popup into a larger tactical dossier with an
  in-game-size enemy visual, role, behavior, stat explanations, weapon estimates,
  and upgrade advice.
- Enemy dossiers now calculate current cannon shots to kill and show current or
  locked laser, missile, and specialist weapon guidance per enemy type.

## v3.111
- Moved the Info / hover-help card to the bottom of the left menu stack, after
  XP Boost and any other action cards, so its variable height no longer shifts
  the upgrade category buttons.

## v3.110
- Bottom controls and the Support me widget now sit below the global CRT overlay
  so scanlines pass over them like the rest of the game.
- Enemy Stats now matches the Hotkeys panel width before Enemy Identification is
  purchased, wrapping the locked-message text instead of widening the panel.

## v3.109
- Removed the remaining bottom decorative lines from the Support me widget and
  bottom control buttons.
- Forced injected Support me widget internals to stay borderless and shadowless.

## v3.108
- Removed the boxed border treatment from the bottom controls and Support me
  widget in favor of a lighter bottom HUD line/glow.
- Support me text now uses the same yellow accent as the Fog of War title.

## v3.107
- Bottom controls now match the Retro HUD side-panel styling with translucent
  dark panels, cyan borders, scanlines, and compact square buttons.
- The Support me widget wrapper now uses the same bottom-HUD treatment as the
  theme, enemy info, music, and sound controls.

## v3.106
- Left-side Info / hover-help card is now the same 170px width as the other
  upgrade menu category buttons.
- Info / hover-help card text reduced to 12px so it fits comfortably inside the
  170px button width.
- Fog of War callout title and body text reduced to 12px (10px on small screens).

## v3.105
- Right-side Hotkeys and Enemy Stats panels now match the canvas Fog of War
  callout styling: clean cyan border, same translucent dark background, yellow
  headers, white body text, and CRT scanline overlay.
- All right-side panel text is now 16px, matching the left-side upgrade menu
  button text, and the Fog of War callout body/title text is also 16px.
- The left-side Info / hover-help card now uses the same Fog-of-War appearance
  (cyan border, dark translucent background, white text).
- Reduced the hidden Enemy Stats sizing row from `#999000` to `#99000` to avoid
  over-reserving panel width.

## v3.104
- Enemy Stats now measures a hidden worst-case `#999000` row for each known enemy
  type and sizes the panel to the required width instead of using the broader
  fixed range.
- Enemy Stats ordering now inserts newly identified enemies by their first
  identified health value, then locks that order so live stat changes do not
  reshuffle the list.
- The Send Next Wave button now uses the cyan fog-callout treatment for its
  border, text, hover state, and background.

## v3.103
- Enemy Stats is tightened back down while keeping the compact rows on one line
  for large active-wave counts.
- Enemy Stats rows now use a stable order with Kamikaze pinned first, then newly
  discovered enemy types kept in discovery order so the list no longer jumps
  around as health and wave data changes.
- The Info card now says `Click Here for Instructions.`, and the centered How To
  Play overlay includes the main controls, stat labels, XP Boost notes, and a
  color/icon guide for enemy types.

## v3.102
- Enemy Stats is wider and keeps each enemy row on one line, leaving room for
  three-digit counts and long health values.
- Right-side panels now use the darker retro HUD treatment with gold borders,
  and the How To Play overlay has a matching centered guide panel.
- The left Info / How To Play card now shows only hover help text, without a
  separate title inside the card.

## v3.101
- The Info / How To Play menu card is now a larger help panel: hovering menu
  buttons and upgrade cards writes their compact help text into that fixed card
  instead of showing a floating callout over the upgrade tree.
- Battle Status bottom text now reads `Total: E = Enemies: N`.

## v3.100
- Battle Status now labels per-wave counts with `E` and shows the compact bottom
  legend as `Total: E = Enemies: N`.
- Upgrade hover callouts now choose from more above/below/right placements and
  strongly prefer positions that do not overlap any visible menu button.

## v3.99
- Battle Status details now expand above the Total Enemies row, keeping Total
  Enemies pinned at the bottom with an expand-up arrow and a compact enemy-count
  legend for the per-wave rows.
- Upgrade menu hover help now uses a fog-callout-style canvas panel with corner
  brackets and a connector line to the hovered card, choosing a nearby position
  that avoids covering other menu buttons when possible.

## v3.98
- Left-side upgrade menu hover tips now show compact category stats on system
  headers and short purpose/current-state/cost notes on upgrade cards, positioned
  to the right of the hovered card so they do not cover the button.
- Battle Status is now compact by default: Total Enemies stays visible under
  Enemy Stats, with an arrow to expand Send Next Wave and per-wave details.

## v3.97
- Retired the separate right-side XP Status panel and folded XP Boost progress into
  the left-side XP Boost card, including the matching cyan XP marker and live
  banked-charge count.
- XP Boost now shows a Manual Targeting hover tip explaining that XP charges can
  be saved, spent, and stacked.

## v3.96
- Battle Status merged into the Enemy Stats box: below the enemy rows sit Send Next
  Wave, one compact line per active wave (`W3 E57 0:43` — wave, enemies left, time
  left), and the Total Enemies line. Folding Enemy Stats now folds all of it.
- The `#` metric on each enemy row now means how many of that type are still expected
  (unspawned + alive across active waves) instead of currently-on-field, replacing the
  colored per-wave composition line, which has been removed.

## v3.95
- Enemy Stats panel redesigned: each identified enemy gets a colored icon hinting at its
  behavior (● Normal, ▶ Fast, ■ Tank, ⬢ Shielded, ✱ Splitter, ✚ Healer, ▲ Kamikaze,
  ★ Boss, ◆ XP) plus compact metrics — `#` how many are on the field right now,
  `»` speed, `♥` health. Counts update live as enemies spawn and die.
- Right-hand panels (Hotkeys, Enemy Stats, XP Status, Battle Status) restyled to match
  the upgrade/button look: themed border and background instead of the plain dark box.

## v3.94
- Battle Status now previews each wave's composition: a color-coded line under the wave
  entry shows counts per enemy type (e.g. `24No 5Fa 4Ta 4Ka 1Bo`), colors matching the
  enemies on the field. Counts cover unspawned enemies (Kamikaze slots expand to their
  full swarm) plus everything still alive, and shrink as the wave is cleared.
- Wave composition is now pre-rolled when a wave starts (same spawn distribution as
  before) so the preview is truthful, and it survives save/load.

## v3.93
- The red homing lock ring now shows around the targeted enemy for the first purchased
  missiles too, not just after the Homing upgrade. Previously the ring radius came from
  the Homing upgrade (0 before it's purchased), so basic missiles showed no lock even
  though they were already assigned a target. The ring now falls back to an enemy-sized
  circle when the homing radius is 0; Homing-upgraded behavior is unchanged.

## v3.92
- Missile trails no longer shrink when you slow time with the time-control dock.
  Trail points are now distance-gated to full-speed spacing, so at slow speed the
  trail keeps the same length and shape as at full speed — it just progresses
  slower. Full-speed and fast-forward behavior is unchanged.

## v3.91
- Beam Splitter's purchasable cap is now gated by Laser Damage: its total damage may not exceed
  the main laser's damage. The splitter keeps its own independent damage line (still doubles per
  level, does not scale with Laser Damage), but once it reaches the laser-damage ceiling the
  player must upgrade Laser Damage to raise the cap before buying more splitter levels. Cap
  rises ~1 splitter level per Laser Damage level (capped at the splitter's hard max of 10). The
  card shows an "Upgrade Laser Damage" prompt while gated.

## v3.90
- Beam Splitter is now a fully independent damage line: its damage no longer scales with
  Laser Damage, so upgrading Laser Damage no longer auto-strengthens the splitter. It has its
  own damage that doubles per level (`LASER_SPLITTER_BASE_DAMAGE` x 2^(level-1)), split evenly
  across the Kamikazes in range. Cap raised to 10 (cost still rises x1.5 per level), giving a
  long, separate upgrade path for varied builds.

## v3.89
- New Laser **Recharge** upgrade (between Damage and Range): each level adds 15% laser
  fire rate, so the laser recharges faster to keep up with fast Kamikaze swarms.
- Beam Splitter reworked to fire up to four Kamikaze split beams with its own damage model.

## v3.88
- Fixed Beam Splitter (and focused laser) sub-lethal hits doing no damage.
  `applyLaserCleaveStrike` previously discarded any volley whose damage was
  below the target's shield plus health; it now chips away at shield first
  then health, so Kamikaze health bars visibly decrease across splitter volleys.

## v3.87
- Laser System category button now shows laser recharge progress, dropping back
  when a laser volley fires and filling back up as the weapon recharges.
- Renamed the Kamikaze side-beam upgrade to Beam Splitter and changed its
  visual from a cone sweep into up to four separate split laser bolts.
- Beam Splitter damage is capped by Laser Damage progression: it can be upgraded
  toward parity with the focused laser, then requires more Laser Damage levels
  before additional splitter power can be purchased.

## v3.86
- Reworked laser kills into a cleave experiment: lethal laser hits split enemies
  into two fading halves with separate particle sprays instead of using the
  normal radial explosion.
- Laser shots now only destroy targets when laser power meets or exceeds the
  target's remaining shield plus health; weaker shots draw a faint hit beam but
  do not damage the target.
- Overkill power now creates a carry-through laser segment whose transparency
  scales with the remaining beam power after the kill.

## v3.85
- Supersonic missiles are now boss-only weapons: they wait for a boss inside
  sensor range and fire once per boss instead of cycling through normal enemies.
- Super Salvo now upgrades MIRV payloads by twos, with guided payloads that also
  seek bosses only.
- Every 10th wave now spawns two bosses, and both must be destroyed to earn the
  wave reward.

## v3.84
- Wave rewards now require an explicitly destroyed wave boss instead of any
  resolved boss state, so boss base-impact no longer grants reward choices.
- When rewards are blocked, the reward screen previews the would-have-been
  choices greyed out with a message that the wave's boss must be destroyed.

## v3.83
- Made Supersonic activation draw as a direct child of completed Supersonic
  Research instead of another main missile-spine card.
- Reworked Super Warhead into an expensive wave-capped damage ladder: each wave
  unlocks one more grade, and late grades scale toward roughly half of that
  wave's boss health per Supersonic hit.
- Raised the Supersonic damage floor so the weapon starts meaningfully strong
  before the boss-health scaling curve overtakes it.

## v3.82
- Clarified laser, sensor, and supersonic missile side-branch connector lines so
  visual upgrade links match their actual prerequisites.
- Auto XP Targeting now draws as a direct child of Manual Targeting.

## v3.81
- Added a high-cost Auto XP Targeting laser upgrade below Manual Targeting,
  letting the laser automatically fire at XP enemies in range and bank XP Boost
  charges without manual clicks.
- The XP status and enemy intel text now mention the automatic XP targeting
  option once the manual laser path is available.

## v3.80
- Fixed enemy spawn distance so normal, boss, archetype, and XP enemies spawn
  outside the current reveal boundary, using the larger of the screen edge and
  the active sensor/largest weapon range plus a buffer.
- Enemy visibility and spawning now share the same reveal-radius calculation, so
  enemies enter view by crossing the fog-of-war edge instead of appearing well
  inside it after range upgrades.

## v3.79
- Replaced the missile-count-based trail simplification with one fixed
  medium-detail smoke/flame trail renderer, so missile trails look the same
  whether there are a few missiles or a full late-wave swarm on screen.
- Kept the circular missile trail buffer optimization from v3.76 so the stable
  trail look still avoids the old per-frame trail array churn.

## v3.78
- Restored comma-separated formatting for visible credit totals, upgrade prices,
  Supersonic research cost, reward unlock prices, credit-cache rewards, and
  floating credit gain text.

## v3.77
- Moved the Q-debug performance overlay above the Fog of War callout when that
  callout is visible, keeping it clear of the bottom support button.
- Gave the Q-debug performance overlay a fixed-width layout with padded stats
  so changing missile, particle, enemy, or bullet counts no longer resize it.

## v3.76
- Added a Q-debug FPS overlay showing FPS, frame/update/draw timing, and live
  missile, bullet, enemy, and particle counts.
- Improved high-missile-count performance by reusing missile trail point
  buffers, adaptively simplifying missile trail rendering under load, reducing
  homing-radius debug ring density during large untargeted volleys, and capping
  missile launch/impact particle bursts.
- Reworked missile target selection and retargeting hot paths to use squared
  distance checks and one-pass candidate lists instead of repeated `Math.hypot`
  filter/sort work.

## v3.75
- Restored weapon reward bonus labels to the right of their category buttons and
  changed upgrade menu draw order so expanded panels render over those labels
  when they overlap.

## v3.74
- Moved weapon reward bonus labels inside the left category buttons so they no
  longer overlap expanded upgrade cards.

## v3.73
- Reward-modified upgrade cards now highlight the adjusted numbers in yellow on
  the normal stat line instead of adding separate `Reward DMG/RATE` rows.

## v3.72
- Replaced reward skipping with purchasable reward-target unlocks for Missile
  and Laser rewards.
- Damage and Rapid Loader rewards now apply to a selected unlocked weapon target
  instead of always folding into Cannon.
- Weapon reward bonuses now display in yellow beside their left-side category
  headers and inside affected expanded upgrade cards.

## v3.71
- Fixed Laser activation so buying the Laser System immediately creates a real
  laser firing range at the 110% cannon-radius minimum instead of only setting
  reveal range.
- Added a Skip Reward button to the wave reward screen.

## v3.70
- Restored compact left-side category spacing while keeping side-branch upgrade
  cards collision-aware within the expanded tree.
- Branch connector lines now draw from the parent card to displaced child cards
  so moved upgrade cards still show what they depend on.

## v3.69
- Raised the regular Missile count cap from 12 to 100 so very high-count
  missile builds can be tested.
- Raised the parked mine cap to 500 so a fully upgraded Macross mine volley can
  keep all spare missiles instead of expiring at the old cap.
- Added automatic vertical spacing for side-branch upgrade cards and reserved
  the expanded tree height so growing upgrade trees do not overlap later UI.

## v3.68
- Added debug-menu credit grants for +1,000,000 and +100,000,000 credits,
  alongside the existing +100,000 credit option.

## v3.67
- The Fog of War label and highlighted hatch circle now move as one grouped
  callout, staying attached and hiding when the full callout cannot fit in fog.

## v3.66
- Generalized the 110% cannon-radius minimum into the laser and missile range
  formulas themselves, so first-purchase rings and stale saved radius bases both
  stay outside the cannon targeting ring.

## v3.65
- New non-cannon systems now start with a radius at least 10% beyond the
  current cannon range, preventing laser, missile, or stun rings from spawning
  directly on top of the cannon targeting ring.

## v3.64
- Made the Fog of War callout more compact and reserved its screen space so
  range-info popups move out of its way.
- The highlighted fog sample now chooses a position outside the current reveal
  radius, and hides when there is no visible fog area left to identify.

## v3.63
- Brightened the Fog of War callout sample so the diagonal hatch lines inside
  the highlighted circle are easier to see.

## v3.62
- Added a Fog of War callout to the ring-info overlay, with a highlighted
  sample of the diagonal fog pattern and guidance about expanding sensor or
  weapon range to spot enemies earlier.

## v3.46
- Wide Beam power now matches its displayed value: each level is +10% of focused
  damage, and the cap against Laser Damage level is removed so it can be upgraded
  all the way to match the focused beam's damage.

## v3.45
- Wide Beam upgrade card now displays actual per-target damage numbers (like the
  Laser Damage card) instead of percentages.

## v3.44
- Wide Beam is now a single upgrade that activates at level 1 and then scales
  its power by 10% per extra level, capped at the current Laser Damage level.
- Removed the separate Wide Beam Power sub-button; power upgrades now appear on
  the Wide Beam card itself once it is enabled.

## v3.43
- Wide beam spread now renders in the same yellow laser colour as the focused
  beam, with opacity scaled by its relative power (10% power = ~10% visible).

## v3.42
- Restored the missing `STUN_RADIUS_INCREMENT_PER_LEVEL` configuration that was
  accidentally dropped; this fixes both enemy visibility and the Special Weapon
  (Stun) radius ring disappearing after the wide beam power work.

## v3.41
- Wide Beam is now upgradeable with Wide Beam Power, increasing wide beam
  destruction by 10% per level (up to 10 levels).

## v3.40
- Wide Beam now draws as a cone-shaped spread instead of three thick individual
  beams and deals 1/10 focused-beam damage per Kamikaze.
- Focused laser beam at Fast/Boss targets is restored to the original thin
  single beam look.

## v3.39
- Fixed enemy reveal radius so the laser's effective firing range also expands
  visibility; prevents enemies from being hidden when Laser Range outpaces the
  base acquisition reveal radius.

## v3.38
- Fixed a visibility regression where splitting Laser Damage and Laser Range hid
  enemies beyond cannon/missile/sensor range; laser acquisition now restores its
  own reveal radius.

## v3.37
- Separated Laser System into independent Damage and Range upgrades, mirroring
  the Special Weapon split.
- Laser radius anchors at acquisition range and grows via its own upgrade.
- Added Wide Beam sub-upgrade that lets the laser sweep Kamikazes with a wider
  beam, splitting total laser strength proportionally across the beam width.

## v3.36
- Decoupled missile radius from later cannon range upgrades by anchoring missile
  radius independently when missiles are acquired.
- Sensor range now tracks the furthest active radius while preserving its
  Electronic FOV buffer distance beyond that ring.

## v3.35
- Locked missile trails to the selected Thin Needle look and removed the
  temporary bottom Trail selector.
- Missile Radius, Electronic FOV, and Stun Radius now use Tactical Zoom as the
  unlock for unlimited post-cap upgrades.
- Split Special Weapons into Stun Field strength and separate Stun Radius
  upgrades.

## v3.34
- Kept Ghost Thin as the default missile trail and replaced the alternate Trail
  selector entries with nine thinner/smoother Ghost Thin variants.

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
