# Orbital Defense - Change Log

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
