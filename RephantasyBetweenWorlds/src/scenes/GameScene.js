import PauseOverlay from '../ui/PauseOverlay.js';

export class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        this.spawnOverride = false;
        if (data && data.playerX !== undefined && data.playerY !== undefined) {
            this.spawnOverride = true;
            this.spawnX = data.playerX;
            this.spawnY = data.playerY;
        }
        this.events.on('shutdown', this.shutdown, this);
    }

    create() {
        this.mapMusic = this.sound.add('map_music', { loop: true, volume: 0.5 });
        this.mapMusic.play();
        const map = this.make.tilemap({ key: 'Lara' });


        const tilesets = [
            map.addTilesetImage('assets_spritesheet_v2_free', 'tileset2'),
            map.addTilesetImage('tileset_version1.1', 'tileset1'),
            map.addTilesetImage('assets_version1.1', 'tileset3'),
            map.addTilesetImage('terrain_tiles_v2', 'terrain'),
            map.addTilesetImage('graveyard_tileset_32x32', 'graveyard'),
            map.addTilesetImage('GoldMine_Inactive', 'goldmine'),
            map.addTilesetImage('dirtpath_tiles', 'dirtpath'),
            map.addTilesetImage('decorations', 'decorations1'),
            map.addTilesetImage('Decorationspre', 'decorations2'),
            map.addTilesetImage('Aurora Tileset', 'aurora'),
        ];



        const layers = [
            map.createLayer('Tile Layer 2', tilesets),
            map.createLayer('Tile Layer 3', tilesets),
            map.createLayer('Tile Layer 1', tilesets),
            map.createLayer('Tile Layer 4', tilesets),
        ];

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        //Configura colisÃ£o
        const collisionLayer = map.getObjectLayer('colisao');
        this.walls = this.physics.add.staticGroup();

        collisionLayer.objects.forEach(obj => {
            this.walls.create(
                obj.x + obj.width / 2,
                obj.y + obj.height / 2,
                null
            )
                .setSize(obj.width, obj.height)
                .setOrigin(0.5, 0.5)
                .setVisible(false);
        });

        this.player = this.physics.add.sprite(
            this.spawnOverride ? this.spawnX : 1350,
            this.spawnOverride ? this.spawnY : 250,
            'Siegel_esquerda'
        );
        this.player.setCollideWorldBounds(true);


        if (this.registry.get('spawnOverride')) {
            this.player.setX(this.registry.get('spawnX'));
            this.player.setY(this.registry.get('spawnY'));
        }

        const florestaZone = map.getObjectLayer('floresta').objects[0];

        this.florestaTrigger = this.physics.add.staticSprite(
            florestaZone.x + florestaZone.width / 2,
            florestaZone.y + florestaZone.height / 2,
            null
        ).setSize(florestaZone.width, florestaZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.florestaTrigger, () => {
            this.scene.start('FlorestaScene');
        });

        const CavernaZone = map.getObjectLayer('dentro_caverna').objects[0];

        this.CavernaZone = this.physics.add.staticSprite(
            CavernaZone.x + CavernaZone.width / 2,
            CavernaZone.y + CavernaZone.height / 2,
            null
        ).setSize(CavernaZone.width, CavernaZone.height).setVisible(false);

        this.physics.add.overlap(this.player, this.CavernaZone, () => {
            this.scene.start('CavernaScene');
        });

        this.cursors = this.input.keyboard.createCursorKeys();


        this.physics.add.collider(this.player, this.walls);


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);


        this.pauseOverlay = new PauseOverlay(this);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyESC)) {
            this.pauseOverlay.toggle();
        }
        if (this.pauseOverlay.isPaused) return;

        const speed = 100;
        this.player.setVelocity(0);

        const directions = [
            { key: 'left', isDown: this.cursors.left.isDown, setVelocity: () => this.player.setVelocityX(-speed), anim: 'walk_left', texture: 'Siegel_esquerda' },
            { key: 'right', isDown: this.cursors.right.isDown, setVelocity: () => this.player.setVelocityX(speed), anim: 'walk_right', texture: 'Siegel_direita' },
            { key: 'up', isDown: this.cursors.up.isDown, setVelocity: () => this.player.setVelocityY(-speed), anim: 'walk_up', texture: 'Siegel_up' },
            { key: 'down', isDown: this.cursors.down.isDown, setVelocity: () => this.player.setVelocityY(speed), anim: 'walk_down', texture: 'Siegel_down' }
        ];

        let moved = false;

        for (const dir of directions) {
            if (dir.isDown) {
                dir.setVelocity();
                this.player.anims.play(dir.anim, true);
                this.lastDirection = dir.key;
                moved = true;
                if (Phaser.Math.Between(1, 700) <= 1) {
                    this.scene.start('BattleScene_floresta', {
                        previousScene: this.scene.key,
                        playerX: this.player.x,
                        playerY: this.player.y
                    });
                }
                break;
            }
        }

        if (!moved) {
            this.player.anims.stop();
            const lastDir = directions.find(d => d.key === this.lastDirection);
            if (lastDir) {
                this.player.setTexture(lastDir.texture);
            }
        }
    }
    shutdown() {
        if (this.mapMusic && this.mapMusic.isPlaying) {
            this.mapMusic.stop();
            this.mapMusic.destroy();
        }
    }
}