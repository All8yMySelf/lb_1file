# Debug Upgrade Toggle Design

The debug category grants instant credits for testing. It should remain hidden
from normal players. A new boolean `debugUpgradesVisible` controls whether the
category appears in the upgrade list.

* **Default**: `debugUpgradesVisible` is `false` so the category does not render
  and is ignored when checking upgrade availability.
* **Toggle**: Pressing the `Q` key flips this flag and redraws the UI. When
  visible, the debug upgrade behaves like any other upgrade.
* **Hotkeys**: The toggle is intentionally undocumented and not listed in the
  hotkeys overlay.

This design keeps the code self-contained without adding new UI elements.
