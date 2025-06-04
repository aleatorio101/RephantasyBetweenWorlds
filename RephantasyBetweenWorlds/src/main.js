import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import  BattleScene_dg  from './scenes/BattleScene_dg.js';

const config = {
    type: Phaser.AUTO,
    title: 'Rephantasy: Between Worlds',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [BootScene, MenuScene, GameScene, CreditsScene, BattleScene_dg],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    }
};

new Phaser.Game(config);