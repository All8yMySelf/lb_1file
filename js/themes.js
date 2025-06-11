// Orbital Defence Elite - Theme Definitions
// V2.19.1: Modified black and white themes to have white backgrounds
// V2.19: Added two new black and white themes
const THEMES = [
    { // Theme 1: Orbital Elite (Default)
        name: "Orbital Elite",
        cssVariables: {
            '--bg-gradient': 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            '--body-bg': '#000',
            '--text-color': '#fff',
            '--hud-color': '#fff',
            '--title-color': '#fff',
            '--final-stats-color': '#cfab52',
            '--button-bg': 'rgba(44, 34, 15, 1)',
            '--button-text': 'rgba(230, 181, 75, 1)',
            '--button-border': 'rgba(230, 181, 75, 1)',
            '--button-hover-bg': '#1c1404',
            '--button-disabled-bg': '#2f240c',
            '--button-disabled-text': '#ac4834',
            '--upgrade-title-color': 'rgba(230, 181, 75, 1)',
            '--toggle-active-bg': '#1c1404',
            '--toggle-active-text': '#e6b54b',
            '--toast-bg': 'rgba(0, 0, 0, 0.7)',
            '--toast-text': '#fff',
            '--switch-bg': '#2f240c',
            '--switch-slider-color': 'rgba(230, 181, 75, 1)',
            '--switch-checked-bg': '#1c1404',
            '--switch-label-color': 'rgba(230, 181, 75, 1)',
            '--stats-border': 'rgba(230, 181, 75, 0.3)',
            '--stats-bg': 'rgba(0, 0, 0, 0.4)',
            '--hotkey-bg': 'rgba(0, 0, 0, 0.6)',
            '--hotkey-text': 'rgba(230, 181, 75, 0.8)',
            '--canvas-bg': 'rgba(0, 0, 0, 0.7)',
            '--crt-overlay-bg': 'linear-gradient(rgba(0, 0, 0, 0.6) 50%, transparent 100%)',
            '--crt-overlay-blend': 'overlay',
            '--crt-scanline-color': 'rgba(0, 0, 0, 0.1)',
            '--crt-vignette': 'radial-gradient(circle at center, transparent 60%, rgba(0, 0, 0, 0.6) 100%)',
            '--crt-interlace-color': 'rgba(0, 0, 0, 0.25)',
            '--font-family': "'Press Start 2P', monospace"
        },
        canvasColors: {
            base: 'rgb(94, 79, 162)',
            baseHit: 'yellow',
            bullet: 'white',
            missile: 'orange',
            macrossMissile: '#ff4500',
            missileTrail: 'rgba(255, 165, 0, 0.6)',
            laser: 'rgba(255, 0, 0, 0.8)',
            laserGlow: 'rgba(255, 255, 0, 0.6)',
            particleDefault: '#ffffff',
            particleHit: 'white',
            particleExplosion: ['#ffffff', '#ffff00'], // Base colors, actual color passed in
            particleStun: 'cyan',
            particleLaunch: 'orange',
            enemyNormal: '#f46d43',
            enemyFast: '#fee08b',
            enemyTank: '#d53e4f',
            enemyBoss: '#9e0142',
            enemyHealthBarBg: '#500',
            enemyHealthBarFg: '#0f0',
            enemyStunEffect: 'rgba(0, 255, 255, 0.8)',
            ringCannon: 'rgba(94, 79, 162, 0.6)',
            ringCannonUpgrade: 'rgba(148, 0, 211, 0.8)',
            ringMissile: 'rgba(50, 136, 189, 0.6)',
            ringMissileUpgrade: 'rgba(30, 144, 255, 0.8)',
            ringLaser: 'rgba(255, 0, 0, 0.5)',
            ringLaserUpgrade: 'rgba(255, 0, 0, 0.8)',
            ringStun: 'rgba(0, 255, 255, 0.5)',
            ringStunUpgrade: 'rgba(0, 255, 255, 0.8)',
            ringUpgradeBoxBg: 'rgba(50, 50, 50, 0.7)',
            ringUpgradeBoxAvailable: 'rgba(0, 255, 0, 0.7)', // Pulsing handled in draw
            ringUpgradeBoxText: 'rgba(230, 181, 75, 1)', // Cost text color
            ringUpgradeBoxMax: 'rgba(230, 181, 75, 1)', // MAX text color
            gunBarrel: 'white',
            baseDragIndicator: 'rgba(200, 200, 255, 0.6)',
            baseReturnIndicator: 'rgba(120, 255, 120, 0.6)',
            upgradeRingLaser: 'rgba(255, 0, 0, 0.6)',
            upgradeRingMissile: 'rgba(255, 165, 0, 0.6)'
        },
        particlePalettes: { // For createParticle color mapping
            red: ['#ff0000', '#cc0000', '#880000', '#550000'],
            orange: ['#ff7700', '#cc5500', '#883300', '#552200'],
            yellow: ['#ffff00', '#cccc00', '#888800', '#555500'],
            white: ['#ffffff', '#cccccc', '#888888', '#555555'],
            cyan: ['#00ffff', '#00cccc', '#008888', '#005555']
        }
    },
    { // Theme 2: Vector Grid
        name: "Vector Grid",
        cssVariables: {
            '--bg-gradient': '#000000', // Solid black
            '--body-bg': '#000',
            '--text-color': '#00ffcc', // Bright cyan
            '--hud-color': '#00ffcc',
            '--title-color': '#ff00ff', // Magenta title
            '--final-stats-color': '#ffff00', // Yellow stats
            '--button-bg': 'rgba(0, 0, 0, 0.5)',
            '--button-text': '#00ff00', // Bright green
            '--button-border': '#00ff00',
            '--button-hover-bg': 'rgba(0, 50, 0, 0.8)',
            '--button-disabled-bg': 'rgba(0, 20, 0, 0.5)',
            '--button-disabled-text': '#008800',
            '--upgrade-title-color': '#ff00ff', // Magenta
            '--toggle-active-bg': 'rgba(0, 50, 50, 0.8)',
            '--toggle-active-text': '#00ffff',
            '--toast-bg': 'rgba(0, 0, 0, 0.8)',
            '--toast-text': '#00ffcc',
            '--switch-bg': '#003322',
            '--switch-slider-color': '#00ff00',
            '--switch-checked-bg': '#005500',
            '--switch-label-color': '#00ffcc',
            '--stats-border': 'rgba(0, 255, 0, 0.5)',
            '--stats-bg': 'rgba(0, 0, 0, 0.6)',
            '--hotkey-bg': 'rgba(0, 0, 0, 0.7)',
            '--hotkey-text': '#00ffaa',
            '--canvas-bg': 'rgba(0, 0, 0, 0.9)', // Darker canvas
            '--crt-overlay-bg': 'linear-gradient(rgba(0, 10, 0, 0.3) 50%, transparent 100%)', // Subtle green overlay
            '--crt-overlay-blend': 'screen', // Brighter blend
            '--crt-scanline-color': 'rgba(0, 255, 0, 0.08)', // Faint green scanlines
            '--crt-vignette': 'radial-gradient(circle at center, transparent 70%, rgba(0, 0, 0, 0.5) 100%)',
            '--crt-interlace-color': 'rgba(0, 0, 0, 0.15)',
            '--font-family': "'Courier New', Courier, monospace" // More blocky font
        },
        canvasColors: { // Focus on outlines, bright colors
            base: '#00ffcc', // Cyan outline
            baseHit: '#ffffff',
            bullet: '#ff00ff', // Magenta bullets
            missile: '#00ff00', // Green missiles
            macrossMissile: '#ffff00', // Yellow Macross
            missileTrail: 'rgba(0, 255, 0, 0.5)',
            laser: 'rgba(255, 0, 255, 0.8)', // Magenta laser
            laserGlow: 'rgba(255, 100, 255, 0.6)',
            particleDefault: '#ffffff',
            particleHit: '#ffffff',
            particleExplosion: ['#ffffff', '#00ffff', '#ff00ff'], // White, Cyan, Magenta sparks
            particleStun: '#ffff00', // Yellow stun
            particleLaunch: '#00ff00',
            enemyNormal: '#00ffcc', // Cyan
            enemyFast: '#ffff00', // Yellow
            enemyTank: '#ff00ff', // Magenta
            enemyBoss: '#ffffff', // White boss
            enemyHealthBarBg: '#333333',
            enemyHealthBarFg: '#00ff00', // Green health
            enemyStunEffect: 'rgba(255, 255, 0, 0.8)', // Yellow stun ring
            ringCannon: 'rgba(0, 255, 255, 0.6)', // Cyan
            ringCannonUpgrade: 'rgba(100, 255, 255, 0.9)',
            ringMissile: 'rgba(0, 255, 0, 0.6)', // Green
            ringMissileUpgrade: 'rgba(100, 255, 100, 0.9)',
            ringLaser: 'rgba(255, 0, 255, 0.6)', // Magenta
            ringLaserUpgrade: 'rgba(255, 100, 255, 0.9)',
            ringStun: 'rgba(255, 255, 0, 0.6)', // Yellow
            ringStunUpgrade: 'rgba(255, 255, 100, 0.9)',
            ringUpgradeBoxBg: 'rgba(30, 30, 30, 0.7)',
            ringUpgradeBoxAvailable: 'rgba(0, 255, 0, 0.7)',
            ringUpgradeBoxText: '#00ff00',
            ringUpgradeBoxMax: '#00ffcc',
            gunBarrel: '#ffffff',
            baseDragIndicator: 'rgba(0, 100, 255, 0.6)',
            baseReturnIndicator: 'rgba(0, 255, 100, 0.6)',
            upgradeRingLaser: 'rgba(255, 0, 255, 0.6)',
            upgradeRingMissile: 'rgba(0, 255, 0, 0.6)'
        },
        particlePalettes: { // Single bright colors
            red: ['#ff0000'],
            orange: ['#ff7700'],
            yellow: ['#ffff00'],
            white: ['#ffffff'],
            cyan: ['#00ffff']
        }
    },
    { // Theme 3: Black and White
        name: "Black and White",
        cssVariables: {
            '--bg-gradient': 'linear-gradient(135deg, #ffffff, #cccccc, #999999)',
            '--body-bg': '#fff',
            '--text-color': '#000',
            '--hud-color': '#000',
            '--title-color': '#000',
            '--final-stats-color': '#333333',
            '--button-bg': 'rgba(200, 200, 200, 1)',
            '--button-text': '#000000',
            '--button-border': '#000000',
            '--button-hover-bg': '#cccccc',
            '--button-disabled-bg': '#e6e6e6',
            '--button-disabled-text': '#999999',
            '--upgrade-title-color': '#000000',
            '--toggle-active-bg': '#cccccc',
            '--toggle-active-text': '#000000',
            '--toast-bg': 'rgba(255, 255, 255, 0.8)',
            '--toast-text': '#000',
            '--switch-bg': '#cccccc',
            '--switch-slider-color': '#000000',
            '--switch-checked-bg': '#999999',
            '--switch-label-color': '#000000',
            '--stats-border': 'rgba(0, 0, 0, 0.3)',
            '--stats-bg': 'rgba(255, 255, 255, 0.4)',
            '--hotkey-bg': 'rgba(255, 255, 255, 0.6)',
            '--hotkey-text': 'rgba(0, 0, 0, 0.8)',
            '--canvas-bg': 'rgba(255, 255, 255, 0.7)',
            '--crt-overlay-bg': 'linear-gradient(rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
            '--crt-overlay-blend': 'overlay',
            '--crt-scanline-color': 'rgba(0, 0, 0, 0.1)',
            '--crt-vignette': 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.6) 100%)',
            '--crt-interlace-color': 'rgba(0, 0, 0, 0.25)',
            '--font-family': "'Press Start 2P', monospace"
        },
        canvasColors: {
            base: '#333333',
            baseHit: '#000000',
            bullet: '#000000',
            missile: '#333333',
            macrossMissile: '#000000',
            missileTrail: 'rgba(50, 50, 50, 0.6)',
            laser: 'rgba(0, 0, 0, 0.8)',
            laserGlow: 'rgba(50, 50, 50, 0.6)',
            particleDefault: '#000000',
            particleHit: '#000000',
            particleExplosion: ['#000000', '#333333'],
            particleStun: '#777777',
            particleLaunch: '#333333',
            enemyNormal: '#333333',
            enemyFast: '#000000',
            enemyTank: '#777777',
            enemyBoss: '#ffffff',
            enemyHealthBarBg: '#cccccc',
            enemyHealthBarFg: '#00ff00', // Keep green for health bar
            enemyStunEffect: 'rgba(100, 100, 100, 0.8)',
            ringCannon: 'rgba(100, 100, 100, 0.6)',
            ringCannonUpgrade: 'rgba(50, 50, 50, 0.8)',
            ringMissile: 'rgba(150, 150, 150, 0.6)',
            ringMissileUpgrade: 'rgba(100, 100, 100, 0.8)',
            ringLaser: 'rgba(50, 50, 50, 0.5)',
            ringLaserUpgrade: 'rgba(0, 0, 0, 0.8)',
            ringStun: 'rgba(100, 100, 100, 0.5)',
            ringStunUpgrade: 'rgba(50, 50, 50, 0.8)',
            ringUpgradeBoxBg: 'rgba(200, 200, 200, 0.7)',
            ringUpgradeBoxAvailable: 'rgba(0, 255, 0, 0.7)', // Keep green for available upgrade box
            ringUpgradeBoxText: '#000000',
            ringUpgradeBoxMax: '#333333',
            gunBarrel: '#000000',
            baseDragIndicator: 'rgba(50, 50, 50, 0.6)',
            baseReturnIndicator: 'rgba(100, 100, 100, 0.6)'
        },
        particlePalettes: {
            red: ['#000000', '#333333', '#777777'],
            orange: ['#333333', '#777777', '#aaaaaa'],
            yellow: ['#000000', '#333333'],
            white: ['#000000', '#333333', '#777777', '#aaaaaa'],
            cyan: ['#333333', '#777777']
        }
    },
    { // Theme 4: Pixel Black and White
        name: "Pixel Black and White",
        cssVariables: {
            '--bg-gradient': 'linear-gradient(135deg, #ffffff, #cccccc, #999999)',
            '--body-bg': '#fff',
            '--text-color': '#000',
            '--hud-color': '#000',
            '--title-color': '#000',
            '--final-stats-color': '#333333',
            '--button-bg': 'rgba(200, 200, 200, 1)',
            '--button-text': '#000000',
            '--button-border': '#000000',
            '--button-hover-bg': '#cccccc',
            '--button-disabled-bg': '#e6e6e6',
            '--button-disabled-text': '#999999',
            '--upgrade-title-color': '#000000',
            '--toggle-active-bg': '#cccccc',
            '--toggle-active-text': '#000000',
            '--toast-bg': 'rgba(255, 255, 255, 0.8)',
            '--toast-text': '#000',
            '--switch-bg': '#cccccc',
            '--switch-slider-color': '#000000',
            '--switch-checked-bg': '#999999',
            '--switch-label-color': '#000000',
            '--stats-border': 'rgba(0, 0, 0, 0.3)',
            '--stats-bg': 'rgba(255, 255, 255, 0.4)',
            '--hotkey-bg': 'rgba(255, 255, 255, 0.6)',
            '--hotkey-text': 'rgba(0, 0, 0, 0.8)',
            '--canvas-bg': 'rgba(255, 255, 255, 0.7)',
            '--crt-overlay-bg': 'linear-gradient(rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
            '--crt-overlay-blend': 'overlay',
            '--crt-scanline-color': 'rgba(0, 0, 0, 0.1)',
            '--crt-vignette': 'radial-gradient(circle at center, transparent 60%, rgba(255, 255, 255, 0.6) 100%)',
            '--crt-interlace-color': 'rgba(0, 0, 0, 0.25)',
            '--font-family': "'Press Start 2P', cursive" // Using a pixel font
        },
        canvasColors: {
            base: '#333333',
            baseHit: '#000000',
            bullet: '#000000',
            missile: '#333333',
            macrossMissile: '#000000',
            missileTrail: 'rgba(50, 50, 50, 0.6)',
            laser: 'rgba(0, 0, 0, 0.8)',
            laserGlow: 'rgba(50, 50, 50, 0.6)',
            particleDefault: '#000000',
            particleHit: '#000000',
            particleExplosion: ['#000000', '#333333'],
            particleStun: '#777777',
            particleLaunch: '#333333',
            enemyNormal: '#333333',
            enemyFast: '#000000',
            enemyTank: '#777777',
            enemyBoss: '#ffffff',
            enemyHealthBarBg: '#cccccc',
            enemyHealthBarFg: '#00ff00', // Keep green for health bar
            enemyStunEffect: 'rgba(100, 100, 100, 0.8)',
            ringCannon: 'rgba(100, 100, 100, 0.6)',
            ringCannonUpgrade: 'rgba(50, 50, 50, 0.8)',
            ringMissile: 'rgba(150, 150, 150, 0.6)',
            ringMissileUpgrade: 'rgba(100, 100, 100, 0.8)',
            ringLaser: 'rgba(50, 50, 50, 0.5)',
            ringLaserUpgrade: 'rgba(0, 0, 0, 0.8)',
            ringStun: 'rgba(100, 100, 100, 0.5)',
            ringStunUpgrade: 'rgba(50, 50, 50, 0.8)',
            ringUpgradeBoxBg: 'rgba(200, 200, 200, 0.7)',
            ringUpgradeBoxAvailable: 'rgba(0, 255, 0, 0.7)', // Keep green for available upgrade box
            ringUpgradeBoxText: '#000000',
            ringUpgradeBoxMax: '#333333',
            gunBarrel: '#000000',
            baseDragIndicator: 'rgba(50, 50, 50, 0.6)',
            baseReturnIndicator: 'rgba(100, 100, 100, 0.6)'
        },
        particlePalettes: {
            red: ['#000000', '#333333', '#777777'],
            orange: ['#333333', '#777777', '#aaaaaa'],
            yellow: ['#000000', '#333333'],
            white: ['#000000', '#333333', '#777777', '#aaaaaa'],
            cyan: ['#333333', '#777777']
        }
    }
];
