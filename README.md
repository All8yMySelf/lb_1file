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
      ".write": true,
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
rules are misconfigured.

`database.rules.json` contains the same example configuration shown above and can be used as a template for your security rules. This file is only a reference and is not read by the game directly.

## Change Log

The game is under active development. Below is a brief summary of recent updates.
See [CHANGELOG.md](CHANGELOG.md) for the full history.


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
