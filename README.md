# Orbital Defence Elite

This repository contains a small browser game written entirely in a single HTML file. The goal of the challenge is to keep all the game's HTML, CSS and JavaScript code self-contained so that it can be played by simply opening `index.html`.

## Playing

Open `index.html` in any modern browser. The game will load immediately with no additional assets required. Use the on-screen instructions or the hotkeys listed on the start screen to play.
High scores are saved in your browser via `localStorage`, so they persist between sessions. After a game ends you can enter up to three initials on the Game Over screen to submit your score to the online leaderboard.

## About

`index.html` now embeds the original `styles.css` and `themes.js` directly inside `<style>` and `<script>` tags. There are no external dependencies besides the Phaser library pulled from a CDN.

The previous `css/` and `js/` folders have been removed as part of the single-file challenge.

The repository also includes a `favicon.ico` so browsers display an icon in the
tab when the game is loaded.

## Global Leaderboard

This version uses Firebase Realtime Database for the global leaderboard.
Follow these steps to set up your own instance:

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com) and create a new project.
2. Add a web app and copy the Firebase config values.
3. In the Firebase console open **Build > Realtime Database** and create a database in **test mode**.
4. Copy `firebaseConfig.template.js` to `firebaseConfig.js` and replace the placeholders with your config values. The new file is ignored by Git so your credentials stay private.
5. Deploy the game to GitHub Pages or open it locally to test.
6. Scores will be written under the `scores` path and the top ten will appear in the leaderboard section.
7. Players submit scores by entering their initials on the Game Over screen.
8. To prevent unauthorized writes, consider using HTTP referrer restrictions or enabling Firebase App Check.

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
