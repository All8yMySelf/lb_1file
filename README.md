# Orbital Defence Elite

This repository contains a small browser game written entirely in a single HTML file. The goal of the challenge is to keep all the game's HTML, CSS and JavaScript code self-contained so that it can be played by simply opening `index.html`.

## Playing

Open `index.html` in any modern browser. The game will load immediately with no additional assets required. Use the on-screen instructions or the hotkeys listed on the start screen to play.
High scores are saved in your browser via `localStorage`, so they persist between sessions.

## About

`index.html` now embeds the original `styles.css` and `themes.js` directly inside `<style>` and `<script>` tags. There are no external dependencies besides the Phaser library pulled from a CDN.

The previous `css/` and `js/` folders have been removed as part of the single-file challenge.

The repository also includes a `favicon.ico` so browsers display an icon in the
tab when the game is loaded.

## Global Leaderboard Setup

High scores can optionally be shared to a public Google Sheet using a small
Google Apps Script. Scores are posted from the game via the `LEADERBOARD_URL`
constant in [`index.html`](index.html). Deploying your own script lets you
control the shared leaderboard location.

1. Create a new Google Sheet and name its first sheet `Leaderboard`.
2. Add header cells **A1-D1** labeled `name`, `wave`, `time` and `date`. Incoming
   scores will appear in these columns.
3. Open **Extensions → Apps Script** from the sheet and replace the default code
   with:

   ```javascript
   function doGet() {
     return ContentService.createTextOutput(
       JSON.stringify(SpreadsheetApp.getActive().getSheetByName('Leaderboard')
       .getDataRange().getValues()));
   }

   function doPost(e) {
     SpreadsheetApp.getActive().getSheetByName('Leaderboard')
       .appendRow([e.parameter.name, e.parameter.wave, e.parameter.time,
                   e.parameter.date]);
     return ContentService.createTextOutput('OK');
   }
   ```

4. Deploy the script as a **web app** (allow access for *Anyone*) and copy the
   URL provided.
5. Replace the value of `LEADERBOARD_URL` in `index.html` with your copied URL so
   the game can post and fetch scores.

Once deployed, each submitted score populates a row in the sheet with the
player's name, wave reached, completion time in seconds and submission date.

## Change Log

The game is under active development. Below is a brief summary of recent updates.
See [CHANGELOG.md](CHANGELOG.md) for the full history.

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

### v2.31
- Added a clickable Focus Radius selector that saves your preference.
- Updated version references and refined notch visuals.
- Removed redundant code for a leaner single-file build.

### v2.32
- Added persistent Top 10 High Scores feature.
- Minor optimizations.

### v2.33
- Upgrade categories can now be expanded or collapsed.
- Reduced upgrade button font size so long labels fit.

### v2.30
- Major UI overhaul with a more compact HUD and screens.
- Introduced a Debug panel for quickly awarding credits.
- Added the Focus Radius upgrade and visual ring indicator.
- Implemented missile homing improvements and toggle controls.

## License

This project is licensed under the [MIT License](LICENSE).
