export class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        this.load.image('menu_bg', 'assets/sprites/menu_bg.jpeg');
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
    // Mapa
        this.load.tilemapTiledJSON('Lara', 'assets/maps/Lara/lara.json');
        this.load.spritesheet('hero', 'assets/sprites/hero.png', { frameWidth: 6, frameHeight: 6 });
    }

    create() {
        this.scene.start('MenuScene');
    }
}