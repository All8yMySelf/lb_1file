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

## Global Leaderboard

Scores are automatically synced to a shared Google Sheet whenever you finish a
run and have an internet connection. The game submits your name, wave, time and
date to the URL defined by `LEADERBOARD_URL` in
[`index.html`](index.html), which points to a hosted Apps Script that backs the
public leaderboard. In some environments the request may fail because the
leaderboard does not provide CORS headers. The code now sends the score using
`no-cors` mode so the request still completes even if the response cannot be
read.

If you prefer to maintain your own leaderboard or require full CORS support,
deploy a copy of the script yourself and update `LEADERBOARD_URL` in both
`index.html` and `leaderboard_tester.html` to point at your deployment. The file
[`apps-script.js`](apps-script.js) contains a minimal Apps Script you can paste
into a new project to back your own sheet. Replace `SHEET_ID` with the ID of a
Google Sheet and deploy the project as a web app, then use that URL for
`LEADERBOARD_URL`.

For convenience a small page, [`leaderboard_tester.html`](leaderboard_tester.html),
is included for manually submitting scores and verifying the leaderboard
endpoint works as expected.

## Change Log

The game is under active development. Below is a brief summary of recent updates.
See [CHANGELOG.md](CHANGELOG.md) for the full history.

### v2.38
- Local high scores replace lower entries on the global leaderboard.
- Global leaderboard dates no longer include a time value.

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
