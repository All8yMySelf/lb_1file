# Implement hidden debug upgrade toggle

1. Define `debugUpgradesVisible = false` alongside other global flags.
2. Skip the debug category in `updateUpgradeAvailabilityFlags` and when drawing
   upgrade lists unless the flag is true.
3. Bind the `Q` key in the main `keydown` handler to toggle the flag and redraw
   the game.
4. The hotkeys overlay does not mention this shortcut.
