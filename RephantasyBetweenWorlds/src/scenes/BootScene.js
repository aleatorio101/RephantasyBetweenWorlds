import createAnimations from '../mov/mov.js';

export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('menu_bg', 'assets/sprites/menu_bg.jpeg');
        this.load.audio('menu_music', 'assets/sounds/bgm/Title Theme.mp3');
        this.load.audio('map_music', 'assets/sounds/bgm/The Calm Before The Storm.mp3');
        this.load.audio('map_dung_music', 'assets/sounds/bgm/GoldenSun Soundtrack 04 - The Sanctum of Sol.mp3');
        this.load.audio('cenas_music', 'assets/sounds/bgm/Ys VIII -Lacrimosa of DANA- OST - One Dream, One Reality.mp3');
        this.load.audio('cena_boss', 'assets/sounds/bgm/[High Quality] Shadow of the Colossus OST 02 - Prohibited Arts.mp3');
        this.load.audio('credit', 'assets/sounds/bgm/The Final of The Fantasy.mp3');
        this.load.audio('badending', 'assets/sounds/bgm/[High Quality] Shadow of the Colossus OST 09 - The End of the Battle.mp3');
        this.load.audio('guudending', 'assets/sounds/bgm/Pokémon XY - BlackWhite Emotion Music (HQ).mp3');

        //carrega tilesets de lara
        this.load.image('tileset1', 'assets/maps/Lara/tileset_version1.1.png');
        this.load.image('terrain', 'assets/maps/Lara/terrain_tiles_v2.png');
        this.load.image('graveyard', 'assets/maps/Lara/graveyard_tileset_32x32.png');
        this.load.image('goldmine', 'assets/maps/Lara/GoldMine_Inactive.png');
        this.load.image('dirtpath', 'assets/maps/Lara/dirtpath_tiles.png');
        this.load.image('decorations1', 'assets/maps/Lara/decorations.png');
        this.load.image('decorations2', 'assets/maps/Lara/Decorationspre.png');
        this.load.image('aurora', 'assets/maps/Lara/Aurora Tileset.png');
        this.load.image('tileset2', 'assets/maps/Lara/assets_spritesheet_v2_free.png');
        this.load.image('tileset3', 'assets/maps/Lara/assets_version1.1.png');

        //carrega tilesets de floresta
        this.load.image('tileset1', 'assets/maps/floresta/tileset_version1.1.png');
        this.load.image('terrain', 'assets/maps/floresta/terrain_tiles_v2.png');
        this.load.image('graveyard', 'assets/maps/floresta/graveyard_tileset_32x32.png');
        this.load.image('goldmine', 'assets/maps/floresta/GoldMine_Inactive.png');
        this.load.image('dirtpath', 'assets/maps/floresta/dirtpath_tiles.png');
        this.load.image('decorations1', 'assets/maps/floresta/decorations.png');
        this.load.image('decorations2', 'assets/maps/floresta/Decorationspre.png');
        this.load.image('aurora', 'assets/maps/floresta/Aurora Tileset.png');
        this.load.image('tileset2', 'assets/maps/floresta/assets_spritesheet_v2_free.png');
        this.load.image('tileset3', 'assets/maps/floresta/assets_version1.1.png');

        //carrega tilesets de quarto
        this.load.image('floor', 'assets/maps/quarto/6_floors.png');
        this.load.image('interior', 'assets/maps/quarto/tileset_16x16_interior.png');
        this.load.image('escada', 'assets/maps/quarto/wooden_stairs-ns_1.png');

        //carrega tilesets de sala
        this.load.image('floor', 'assets/maps/sala/6_floors.png');
        this.load.image('interior', 'assets/maps/sala/tileset_16x16_interior.png');
        this.load.image('escada', 'assets/maps/sala/wooden_stairs-ns_1.png');

        //carrega tilesets de Caverna
        this.load.image('dungAuto', 'assets/maps/dungeon/Dungeon_Autotiles.png');
        this.load.image('dungWater', 'assets/maps/dungeon/Dungeon_WaterAnimation.png');
        this.load.image('dungDec', 'assets/maps/dungeon/DungeonDecorations.png');
    // Mapa
        this.load.tilemapTiledJSON('Lara', 'assets/maps/Lara/lara.json');
        this.load.tilemapTiledJSON('Quarto', 'assets/maps/quarto/quarto.json');
        this.load.tilemapTiledJSON('Sala', 'assets/maps/sala/sala.json');
        this.load.tilemapTiledJSON('Floresta', 'assets/maps/floresta/floresta.json');
        this.load.tilemapTiledJSON('Caverna', 'assets/maps/dungeon/caverna-front.json');
        this.load.image('Siegel_down', 'assets/sprites/Siegel_down_idle.png');
        this.load.image('Siegel_up', 'assets/sprites/Siegel_up_idle.png');
        this.load.image('Siegel_esquerda', 'assets/sprites/Siegel_esquerda_idle.png');
        this.load.image('Siegel_direita', 'assets/sprites/Siegel_direita_idle.png');
        this.load.spritesheet('Siegel_down_walk', 'assets/sprites/Siegel_down_walk.png', { frameWidth: 30, frameHeight: 30 });
        this.load.spritesheet('Siegel_up_walk', 'assets/sprites/Siegel_up_walk.png', { frameWidth: 30, frameHeight: 30 });
        this.load.spritesheet('Siegel_esquerda_walk', 'assets/sprites/Siegel_esquerda_walk.png', { frameWidth: 30, frameHeight: 30 });
        this.load.spritesheet('Siegel_direita_walk', 'assets/sprites/Siegel_direita_walk.png', { frameWidth: 30, frameHeight: 30 });
    }

    create() {
        createAnimations(this); 
        this.scene.start('MenuScene');
    }
}