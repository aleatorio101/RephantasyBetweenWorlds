import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';
import FicharioScene from './scenes/FicharioScene.js';
import { CreditsScene } from './scenes/CreditsScene.js';
import BattleScene_floresta from './scenes/BattleScene_floresta.js';
import BattleScene_dg from './scenes/BattleScene_dg.js';
import BattleScene_dg_boss from './scenes/BattleScene_dg_boss.js';
import BattleScene_FinalBoss from './scenes/BattleScene_FinalBoss.js';
import { FlorestaScene } from './scenes/FlorestaScene.js';
import { QuartoScene } from './scenes/QuartoScene.js';
import { SalaScene } from './scenes/SalaScene.js';
import { CavernaScene } from './scenes/CavernaScene.js';
import LoreInicioScene from './scenes/LoreInicioScene.js';
import LoreSalaScene from './scenes/LoreSalaScene.js';
import LoreLaraScene from './scenes/LoreLaraScene.js';
import LoreBatalhaFinalScene from './scenes/LoreBatalhaFinalScene.js';
import PosFinalBossScene from './scenes/PosFinalBossScene.js';
import Final1Scene from './scenes/Final1Scene.js';
import Final2Scene from './scenes/Final2Scene.js';

const config = {
    type: Phaser.AUTO,
    title: 'Rephantasy: Between Worlds',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [BootScene, MenuScene, GameScene, CreditsScene, BattleScene_floresta, FlorestaScene, QuartoScene, SalaScene, CavernaScene, BattleScene_dg, BattleScene_dg_boss, BattleScene_FinalBoss, FicharioScene, LoreInicioScene, LoreSalaScene, LoreLaraScene, LoreBatalhaFinalScene, PosFinalBossScene, Final1Scene, Final2Scene],
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