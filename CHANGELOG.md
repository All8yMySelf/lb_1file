# Orbital Defence Elite - Change Log

## v2.32
- Added persistent Top 10 High Scores feature
- Scores include 3-character initials, score, and date
- Stored in external file `highscores.json`
- Retro arcade-style visual leaderboard
- Automatically handles missing or empty high score file

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
