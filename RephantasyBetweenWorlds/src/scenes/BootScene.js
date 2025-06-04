export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
this.load.image('menu_bg', 'assets/sprites/menu_bg.jpeg');
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
    // Mapa
        this.load.tilemapTiledJSON('Lara', 'assets/maps/Lara/lara.json');
        this.load.tilemapTiledJSON('Floresta', 'assets/maps/floresta/floresta.json');
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
        this.scene.start('MenuScene');
    }
}